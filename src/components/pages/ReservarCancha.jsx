import { Form, Button, Container, Card, Row, Col } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { crearReservaApi, listarReservasApi } from "../../helpers/queries";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

// Función para obtener la fecha local en formato YYYY-MM-DD
const obtenerFechaLocal = () => {
  const fecha = new Date();
  const offset = fecha.getTimezoneOffset();
  fecha.setMinutes(fecha.getMinutes() - offset);
  return fecha.toISOString().split("T")[0];
};

const fechaHoy = obtenerFechaLocal();

const obtenerIdDesdeToken = (token) => {
  try {
    if (!token) return null;
    const payloadBase64 = token.split(".")[1];
    const payloadJson = atob(payloadBase64);
    const payload = JSON.parse(payloadJson);
    return payload.id || payload.uid || payload._id || null;
  } catch (error) {
    console.error("No se pudo leer el token:", error);
    return null;
  }
  
};

const ReservarCancha = () => {
  const [reservas, setReservas] = useState([]); 
  const [cargando, setCargando] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
    watch,
  } = useForm({
    mode: "onBlur",
    defaultValues: {
      cancha: "",
      precio: 0,
      fecha: fechaHoy, 
    },
  });

  const navegacion = useNavigate();
  const canchaSeleccionada = watch("cancha");

  const obtenerReservas = async () => {
    try {
      const respuesta = await listarReservasApi();
      if (respuesta.ok) {
        setReservas(respuesta.data);
      }
    } catch (error) {
      console.error("Error al cargar reservas:", error);
    }
  };

  useEffect(() => {
    obtenerReservas();
  }, []);

  useEffect(() => {
    const preciosBackend = {
      "Fútbol 5": 50000,
      "Fútbol 7": 120000,
      "Fútbol 11": 200000,
    };

    if (canchaSeleccionada) {
      setValue("precio", preciosBackend[canchaSeleccionada] || 0);
    }
  }, [canchaSeleccionada, setValue]);

  const onSubmit = async (datos) => {
    const session = JSON.parse(sessionStorage.getItem("usuarioKey")) || {};
    const usuarioId = session.uid || session.id || obtenerIdDesdeToken(session.token);

    if (!usuarioId) {
      Swal.fire("Error", "No se pudo identificar el usuario logueado.", "error");
      return;
    }

    const nuevaReserva = {
      usuario: usuarioId,
      cancha: datos.cancha,
      fecha: datos.fecha,
      hora: datos.hora,
      precio: parseFloat(datos.precio),
      estado: "pendiente",
    };

    setCargando(true);
    const respuesta = await crearReservaApi(nuevaReserva, session.token);

    if (respuesta.ok) {
      const nuevasReservasActualizadas = [respuesta.data, ...reservas];
      setReservas(nuevasReservasActualizadas);

      await Swal.fire("Éxito", "Reserva creada correctamente", "success");
      reset();
      
      navegacion("/admin/reservas", { state: { reservas: nuevasReservasActualizadas } });
    } else {
      Swal.fire("Error", respuesta.data?.mensaje || "Error al crear la reserva", "error");
    }
    setCargando(false);
  };

  return (
    <Container className="my-5">
      <Row className="justify-content-center">
        <Col md={8} lg={6}>
          <Card className="reservar-cancha-card shadow">
            <Card.Body className="p-4">
              <h2 className="text-center mb-4 text-white">Crear Reserva</h2>
              <Form onSubmit={handleSubmit(onSubmit)}>
                
                <Form.Group className="mb-3">
                  <Form.Label className='text-white'>Seleccionar Cancha</Form.Label>
                  <Form.Select
                    {...register("cancha", { required: "Selecciona una cancha" })}
                    isInvalid={!!errors.cancha}
                  >
                    <option value="">Seleccione...</option>
                    <option value="Fútbol 5">Fútbol 5</option>
                    <option value="Fútbol 7">Fútbol 7</option>
                    <option value="Fútbol 11">Fútbol 11</option>
                  </Form.Select>
                  <Form.Control.Feedback type="invalid">{errors.cancha?.message}</Form.Control.Feedback>
                </Form.Group>

                <Row>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label className="text-white">Fecha</Form.Label>
                      <Form.Control
                        type="date"
                        min={fechaHoy} 
                        {...register("fecha", { 
                          required: "La fecha es obligatoria",
                          validate: (valor) => valor >= fechaHoy || "No puedes reservar en una fecha pasada" 
                        })}
                        isInvalid={!!errors.fecha}
                      />
                      <Form.Control.Feedback type="invalid">
                        {errors.fecha?.message}
                      </Form.Control.Feedback>
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label className="text-white">Hora</Form.Label>
                      <Form.Control
                        type="time"
                        step="3600" // Restringe el selector a horas en punto (3600 segundos = 1 hora)
                        {...register("hora", {
                          required: "La hora es obligatoria",
                          validate: {
                            rangoHorario: (valor) => {
                              const hora = parseInt(valor.split(":")[0]);
                              const esValida = (hora >= 9 && hora <= 23) || (hora >= 0 && hora < 2);
                              return esValida || "Horario permitido: 09:00 AM a 02:00 AM";
                            },
                            soloEnPunto: (valor) => {
                              const minutos = valor.split(":")[1];
                              return minutos === "00" || "Solo se permiten reservas en horas en punto (ej: 10:00)";
                            }
                          }
                        })}
                        isInvalid={!!errors.hora}
                      />
                      <Form.Control.Feedback type="invalid">{errors.hora?.message}</Form.Control.Feedback>
                    </Form.Group>
                  </Col>
                </Row>

                <Form.Group className="mb-4">
                  <Form.Label className="text-white">Precio ($)</Form.Label>
                  <Form.Control
                    type="number"
                    readOnly
                    className="bg-secondary text-white fw-bold"
                    {...register("precio", {
                      min: { value: 40000, message: "El mínimo es 50.000" },
                      max: { value: 200000, message: "El máximo es 200.000" }
                    })}
                    isInvalid={!!errors.precio}
                  />
                  <Form.Control.Feedback type="invalid">{errors.precio?.message}</Form.Control.Feedback>
                  <Form.Text className="text-info">Precio fijo según la cancha seleccionada.</Form.Text>
                </Form.Group>

                <Button 
                  variant="success" 
                  type="submit" 
                  className="w-100 py-2 fw-bold shadow"
                  disabled={cargando}
                >
                  {cargando ? "Creando..." : "Confirmar Reserva"}
                </Button>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default ReservarCancha;

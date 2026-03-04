
import { useEffect, useState } from "react";
import { Button, Card, Col, Container, Form, Row, Spinner } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { Link, useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";
import {
  crearProductoApi,
  editarProductoApi,
  obtenerProductoApi,
} from "../../helpers/queries";

const FormularioProducto = () => {
  const { id } = useParams();
  const navegacion = useNavigate();
  const esEdicion = Boolean(id);
  const [cargandoProducto, setCargandoProducto] = useState(esEdicion);
  const [guardando, setGuardando] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    mode: "onBlur",
    defaultValues: {
      nombre: "",
      descripcion: "",
      precio: "",
      stock: 0,
      imagen: "",
    },
  });

  useEffect(() => {
    if (!esEdicion) return;

    const cargarProducto = async () => {
      setCargandoProducto(true);
      const respuesta = await obtenerProductoApi(id);

      if (!respuesta.ok || !respuesta.data) {
        await Swal.fire({
          title: "No se pudo cargar",
          text: "El producto no existe o hubo un problema al consultar.",
          icon: "error",
        });
        navegacion("/admin/productos");
        return;
      }

      const producto =
        respuesta.data?.producto ||
        respuesta.data?.data ||
        respuesta.data;

      if (!producto || typeof producto !== "object") {
        await Swal.fire({
          title: "Formato inválido",
          text: "El backend devolvió un formato de producto no esperado.",
          icon: "error",
        });
        navegacion("/admin/productos");
        return;
      }

      reset({
        nombre: producto.nombre || producto.nombreProducto || "",
        descripcion: producto.descripcion || producto.descripcion_breve || "",
        precio: producto.precio ?? "",
        stock: producto.stock ?? 0,
        imagen: producto.imagen || producto.img || "",
      });
      setCargandoProducto(false);
    };

    cargarProducto();
  }, [esEdicion, id, navegacion, reset]);

  const onSubmit = async (datos) => {
    const usuario = JSON.parse(sessionStorage.getItem("usuarioKey")) || {};

    const nombre = datos.nombre.trim();
    const descripcion = datos.descripcion.trim();
    const imagen = datos.imagen.trim();
    const payload = {
      // Compatibilidad con esquemas que usan nombre/descripcion/imagen
      nombre,
      descripcion,
      imagen,
      // Compatibilidad con esquemas que usan nombreProducto/descripcion_breve/img
      nombreProducto: nombre,
      descripcion_breve: descripcion,
      img: imagen,
      precio: Number(datos.precio),
      stock: Number(datos.stock),
    };

    setGuardando(true);
    const respuesta = esEdicion
      ? await editarProductoApi(id, payload, usuario.token)
      : await crearProductoApi(payload, usuario.token);

    if (respuesta.ok) {
      await Swal.fire({
        title: esEdicion ? "Producto actualizado" : "Producto creado",
        text: esEdicion
          ? "Los cambios se guardaron correctamente."
          : "El producto se creó correctamente.",
        icon: "success",
        timer: 1200,
        showConfirmButton: false,
      });
      navegacion("/admin/productos");
    } else {
      await Swal.fire({
        title: "No se pudo guardar",
        text: respuesta.data?.mensaje || "Revisá los datos e intentá nuevamente.",
        icon: "error",
      });
    }

    setGuardando(false);
  };

  if (cargandoProducto) {
    return (
      <Container className="my-5 text-center text-white">
        <Spinner animation="border" className="me-2" />
        Cargando producto...
      </Container>
    );
  }

  return (
    <Container className="my-4">
      <Row className="justify-content-center">
        <Col md={10} lg={8}>
          <Card className="bg-dark text-white border-0 shadow-lg">
            <Card.Body className="p-4">
              <div className="d-flex justify-content-between align-items-center gap-2 mb-4 flex-wrap">
                <h1 className="h3 mb-0">
                  {esEdicion ? "Editar producto" : "Crear producto"}
                </h1>
                <Button as={Link} to="/admin/productos" variant="outline-light" size="sm">
                  Volver
                </Button>
              </div>

              <Form onSubmit={handleSubmit(onSubmit)}>
                <Form.Group className="mb-3">
                  <Form.Label>Nombre</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Ej: Pelota profesional N5"
                    {...register("nombre", {
                      required: "El nombre es obligatorio",
                      minLength: {
                        value: 2,
                        message: "Debe tener al menos 2 caracteres",
                      },
                    })}
                    isInvalid={!!errors.nombre}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.nombre?.message}
                  </Form.Control.Feedback>
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Descripción</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={4}
                    placeholder="Descripción breve del producto"
                    {...register("descripcion", {
                      required: "La descripción es obligatoria",
                      minLength: {
                        value: 10,
                        message: "Debe tener al menos 10 caracteres",
                      },
                    })}
                    isInvalid={!!errors.descripcion}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.descripcion?.message}
                  </Form.Control.Feedback>
                </Form.Group>

                <Row>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>Precio</Form.Label>
                      <Form.Control
                        type="number"
                        step="0.01"
                        placeholder="0"
                        {...register("precio", {
                          required: "El precio es obligatorio",
                          min: {
                            value: 1,
                            message: "Debe ser mayor a 0",
                          },
                        })}
                        isInvalid={!!errors.precio}
                      />
                      <Form.Control.Feedback type="invalid">
                        {errors.precio?.message}
                      </Form.Control.Feedback>
                    </Form.Group>
                  </Col>

                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>Stock</Form.Label>
                      <Form.Control
                        type="number"
                        placeholder="0"
                        {...register("stock", {
                          required: "El stock es obligatorio",
                          min: {
                            value: 0,
                            message: "No puede ser negativo",
                          },
                        })}
                        isInvalid={!!errors.stock}
                      />
                      <Form.Control.Feedback type="invalid">
                        {errors.stock?.message}
                      </Form.Control.Feedback>
                    </Form.Group>
                  </Col>
                </Row>

                <Form.Group className="mb-4">
                  <Form.Label>Imagen (URL)</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="https://..."
                    {...register("imagen", {
                      required: "La URL de imagen es obligatoria",
                    })}
                    isInvalid={!!errors.imagen}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.imagen?.message}
                  </Form.Control.Feedback>
                </Form.Group>

                <Button
                  type="submit"
                  className="btn-verde-cancha w-100"
                  disabled={guardando}
                >
                  {guardando
                    ? esEdicion
                      ? "Guardando cambios..."
                      : "Creando producto..."
                    : esEdicion
                      ? "Guardar cambios"
                      : "Crear producto"}
                </Button>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default FormularioProducto;

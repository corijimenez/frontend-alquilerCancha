
import { useEffect, useRef, useState } from "react";
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
  const [imagenArchivo, setImagenArchivo] = useState(null);
  const [imagenPreview, setImagenPreview] = useState("");
  const [arrastreActivo, setArrastreActivo] = useState(false);
  const [fileInputKey, setFileInputKey] = useState(0);
  const inputFileRef = useRef(null);

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    trigger,
    formState: { errors },
  } = useForm({
    mode: "onBlur",
    defaultValues: {
      nombre: "",
      descripcion: "",
      precio: "",
      stock: 1,
      categoria: "",
      subcategoria: "",
      imagen: "",
    },
  });

  useEffect(() => {
    if (!esEdicion) return;

    const cargarProducto = async () => {
      setCargandoProducto(true);
      const usuario = JSON.parse(sessionStorage.getItem("usuarioKey")) || {};
      const respuesta = await obtenerProductoApi(id, usuario.token);

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
        stock: producto.stock ?? 1,
        categoria: producto.categoria || "",
        subcategoria: producto.subcategoria || "",
        imagen: producto.imagen || producto.img || "",
      });
      setImagenArchivo(null);
      setImagenPreview(producto.imagen || producto.img || "");
      setCargandoProducto(false);
    };

    cargarProducto();
  }, [esEdicion, id, navegacion, reset]);

  const procesarArchivo = async (archivo) => {
    if (!archivo) return;
    if (!archivo.type.startsWith("image/")) {
      await Swal.fire("Archivo inválido", "Seleccioná una imagen válida.", "warning");
      return;
    }

    const previewUrl = URL.createObjectURL(archivo);
    setImagenArchivo(archivo);
    setImagenPreview(previewUrl);
    // Si se carga imagen local, la URL queda vacía para mantener opción única.
    setValue("imagen", "", { shouldValidate: true });
    trigger("imagen");
  };

  const onArchivoSeleccionado = async (e) => {
    const archivo = e.target.files?.[0];
    await procesarArchivo(archivo);
  };

  const onDropImagen = async (e) => {
    e.preventDefault();
    setArrastreActivo(false);
    const archivo = e.dataTransfer.files?.[0];
    await procesarArchivo(archivo);
  };

  const limpiarImagenLocal = () => {
    setImagenArchivo(null);
    setFileInputKey((prev) => prev + 1);
    trigger("imagen");
  };

  const onSubmit = async (datos) => {
    const usuario = JSON.parse(sessionStorage.getItem("usuarioKey")) || {};
    const imagenUrl = datos.imagen.trim();
    const imagenFinal = imagenArchivo || imagenUrl;

    if (!imagenFinal) {
      await Swal.fire({
        title: "Imagen requerida",
        text: "Agregá una imagen por URL o subí una desde tu PC.",
        icon: "warning",
      });
      return;
    }

    const nombre = datos.nombre.trim();
    const descripcion = datos.descripcion.trim();
    const categoria = (datos.categoria || "").trim().toLowerCase();
    const subcategoria = (datos.subcategoria || "").trim();
    const payloadJson = {
      nombre,
      descripcion,
      imagen: imagenUrl,
      precio: Number(datos.precio),
      stock: Number(datos.stock),
      categoria,
      subcategoria,
    };

    let payload = payloadJson;
    if (imagenArchivo) {
      const formData = new FormData();
      formData.append("nombre", nombre);
      formData.append("descripcion", descripcion);
      formData.append("precio", String(Number(datos.precio)));
      formData.append("stock", String(Number(datos.stock)));
      formData.append("categoria", categoria);
      formData.append("subcategoria", subcategoria);
      formData.append("imagen", imagenArchivo);
      payload = formData;
    }

    setGuardando(true);
    let respuesta = esEdicion
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
      const detalleErrores = Array.isArray(respuesta.data?.errors)
        ? respuesta.data.errors.map((e) => e.msg || e.message).filter(Boolean).join(" | ")
        : "";
      await Swal.fire({
        title: "No se pudo guardar",
        text:
          respuesta.data?.mensaje ||
          respuesta.data?.message ||
          detalleErrores ||
          "Revisá los datos e intentá nuevamente.",
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
                        value: 3,
                        message: "Debe tener al menos 3 caracteres",
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
                            value: 20000,
                            message: "El precio mínimo es $20.000",
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
                            value: 1,
                            message: "Debe ser al menos 1",
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

                <Row>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>Categoría</Form.Label>
                      <Form.Select
                        {...register("categoria", {
                          required: "La categoría es obligatoria",
                        })}
                        isInvalid={!!errors.categoria}
                      >
                        <option value="">Seleccioná una categoría</option>
                        <option value="bebidas">Bebidas</option>
                        <option value="ropa">Ropa</option>
                        <option value="calzado">Calzado</option>
                        <option value="accesorios">Accesorios</option>
                        <option value="equipamiento">Equipamiento</option>
                      </Form.Select>
                      <Form.Control.Feedback type="invalid">
                        {errors.categoria?.message}
                      </Form.Control.Feedback>
                    </Form.Group>
                  </Col>

                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>Subcategoría</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Ej: Pelotas, Botines, Camisetas"
                        {...register("subcategoria", {
                          required: "La subcategoría es obligatoria",
                        })}
                        isInvalid={!!errors.subcategoria}
                      />
                      <Form.Control.Feedback type="invalid">
                        {errors.subcategoria?.message}
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
                      onChange: (e) => {
                        const url = (e.target.value || "").trim();
                        // Si hay URL, limpiar imagen local para usar una sola opción.
                        if (url && imagenArchivo) {
                          setImagenArchivo(null);
                          setFileInputKey((prev) => prev + 1);
                        }
                        if (!imagenArchivo) {
                          setImagenPreview(url);
                        }
                      },
                      validate: (value) => {
                        const url = (value || "").trim();
                        if (imagenArchivo) return true;
                        if (!url) return true;
                        return (
                          /^https:\/\/.+\.(jpg|jpeg|png|gif|webp|bmp|svg)$/i.test(url) ||
                          "La URL debe comenzar con https:// y terminar en extensión de imagen"
                        );
                      },
                    })}
                    isInvalid={!!errors.imagen}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.imagen?.message}
                  </Form.Control.Feedback>
                </Form.Group>

                <Form.Group className="mb-4">
                  <Form.Label>O subir imagen desde tu PC</Form.Label>

                  <input
                    key={fileInputKey}
                    ref={inputFileRef}
                    type="file"
                    accept="image/*"
                    className="d-none"
                    onChange={onArchivoSeleccionado}
                  />

                  <div
                    role="button"
                    tabIndex={0}
                    onClick={() => inputFileRef.current?.click()}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" || e.key === " ") inputFileRef.current?.click();
                    }}
                    onDragEnter={(e) => {
                      e.preventDefault();
                      setArrastreActivo(true);
                    }}
                    onDragOver={(e) => {
                      e.preventDefault();
                      setArrastreActivo(true);
                    }}
                    onDragLeave={(e) => {
                      e.preventDefault();
                      setArrastreActivo(false);
                    }}
                    onDrop={onDropImagen}
                    style={{
                      border: `2px dashed ${arrastreActivo ? "#1F8A3B" : "rgba(255,255,255,0.45)"}`,
                      borderRadius: "12px",
                      padding: "18px",
                      textAlign: "center",
                      cursor: "pointer",
                      background: arrastreActivo ? "rgba(31,138,59,0.15)" : "rgba(255,255,255,0.04)",
                    }}
                  >
                    Arrastrá una imagen aquí o hacé click para elegir un archivo
                  </div>

                  {imagenArchivo && (
                    <div className="mt-2">
                      <Button
                        type="button"
                        size="sm"
                        variant="outline-warning"
                        onClick={limpiarImagenLocal}
                      >
                        Quitar imagen local
                      </Button>
                    </div>
                  )}
                </Form.Group>

                {imagenPreview && (
                  <Form.Group className="mb-4">
                    <Form.Label>Vista previa</Form.Label>
                    <div className="border rounded overflow-hidden">
                      <img
                        src={imagenPreview}
                        alt="Vista previa del producto"
                        style={{ width: "100%", maxHeight: "260px", objectFit: "cover" }}
                      />
                    </div>
                  </Form.Group>
                )}

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

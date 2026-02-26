import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import "./Contacto.css";

const Contacto = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    Swal.fire({
      title: "¡Mensaje enviado!",
      text: "Nos pondremos en contacto pronto.",
      icon: "success",
      confirmButtonColor: "#1F8A3B",
    });
    reset();
  };

  return (
    <div className="contacto-container">
      {/* 1. BANNER HERO */}
      <section className="banner-hero">
        <img
          src="/cancha11.jpg"
          alt="Cancha de fútbol"
          className="banner-img"
        />{" "}
        <div className="banner-overlay"></div>
        <div className="container banner-content">
          <h1 className="display-3 fw-bold">Contáctanos</h1>
        </div>
      </section>

      {/* 2. INFO CARDS (Debajo del banner) */}
      <section className="info-section py-5">
        <div className="container">
          <div className="row g-4 justify-content-center">
            <div className="col-md-4">
              <a className="info-card" href="/reservas">
                <div className="info-icon-container">
                  <i className="bi bi-calendar-check"></i>
                </div>
                <div className="info-text" >
                  <h5>Reservas</h5>
                  <p>Disponibilidad inmediata 24/7.</p>
                </div>
              </a>
            </div>
            <div className="col-md-4">
              <a className="info-card" href="/tienda">
                <div className="info-icon-container">
                  <i className="bi bi-trophy"></i>
                </div>
                <div className="info-text">
                  <h5>Productos exclusivos</h5>
                  <p>No te pierdas de nuestros productos personalizados.</p>
                </div>
              </a>
            </div>
            <div className="col-md-4">
              <div className="info-card">
                <div className="info-icon-container">
                  <i className="bi bi-geo-alt"></i>
                </div>
                <div className="info-text">
                  <h5>Ubicación</h5>
                  <p>Gral. Paz 576, SMT.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. FORMULARIO Y MAPA */}
      <section className="main-contact-area container pb-5 mb-5">
        <div className="row g-5 align-items-stretch my-3">
          {/* Formulario */}
          <div className="col-lg-6">
            <div className="card contacto-card h-100">
              <div className="card-body p-4 p-md-5">
                <h3 className="fw-bold mb-4 section-title">
                  Envíanos un mensaje
                </h3>
                <form onSubmit={handleSubmit(onSubmit)} noValidate>
                  <div className="row">
                    {/* NOMBRE */}
                    <div className="col-md-6 mb-3">
                      <label className="form-label fw-bold small">NOMBRE</label>
                      <input
                        type="text"
                        className={`form-control custom-input ${errors.nombre ? "is-invalid" : ""}`}
                        {...register("nombre", {
                          required: "El nombre es obligatorio",
                          minLength: {
                            value: 3,
                            message: "Debe tener al menos 3 caracteres",
                          },
                          maxLength: {
                            value: 40,
                            message: "Máximo 40 caracteres",
                          },
                          pattern: {
                            value: /^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]+$/,
                            message: "Solo se permiten letras",
                          },
                        })}
                      />
                      {errors.nombre && (
                        <small className="text-danger">
                          {errors.nombre.message}
                        </small>
                      )}
                    </div>

                    {/* TELÉFONO */}
                    <div className="col-md-6 mb-3">
                      <label className="form-label fw-bold small">
                        TELÉFONO
                      </label>
                      <input
                        type="tel"
                        className={`form-control custom-input ${errors.telefono ? "is-invalid" : ""}`}
                        {...register("telefono", {
                          required: "El teléfono es obligatorio",
                          pattern: {
                            value: /^[0-9]{8,15}$/,
                            message: "Debe contener entre 8 y 15 números",
                          },
                        })}
                      />
                      {errors.telefono && (
                        <small className="text-danger">
                          {errors.telefono.message}
                        </small>
                      )}
                    </div>
                  </div>

                  {/* EMAIL */}
                  <div className="mb-3">
                    <label className="form-label fw-bold small">EMAIL</label>
                    <input
                      type="email"
                      className={`form-control custom-input ${errors.email ? "is-invalid" : ""}`}
                      {...register("email", {
                        required: "El email es obligatorio",
                        pattern: {
                          value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                          message: "Ingrese un email válido",
                        },
                      })}
                    />
                    {errors.email && (
                      <small className="text-danger">
                        {errors.email.message}
                      </small>
                    )}
                  </div>

                  {/* MENSAJE */}
                  <div className="mb-4">
                    <label className="form-label fw-bold small">MENSAJE</label>
                    <textarea
                      className={`form-control custom-input ${errors.mensaje ? "is-invalid" : ""}`}
                      rows="5"
                      placeholder="¿En qué podemos ayudarte?"
                      {...register("mensaje", {
                        required: "El mensaje es obligatorio",
                        minLength: {
                          value: 10,
                          message:
                            "El mensaje debe tener al menos 10 caracteres",
                        },
                        maxLength: {
                          value: 300,
                          message: "Máximo 300 caracteres",
                        },
                      })}
                    ></textarea>
                    {errors.mensaje && (
                      <small className="text-danger">
                        {errors.mensaje.message}
                      </small>
                    )}
                  </div>

                  <button
                    type="submit"
                    className="btn btn-verde-cancha w-100 py-3 fw-bold text-uppercase"
                  >
                    Enviar Mensaje
                  </button>
                </form>
              </div>
            </div>
          </div>

          {/* Mapa */}
          <div className="col-lg-6">
            <div className="map-wrapper shadow-sm h-100">
              <iframe
                className="map-iframe"
                src="https://www.google.com/maps?q=General%20Paz%20576%2C%20Piso%209%2C%20Oficina%202%2C%20San%20Miguel%20de%20Tucum%C3%A1n%2C%20Tucum%C3%A1n%2C%20Argentina&output=embed"
                allowfullscreen
                loading="lazy"
                referrerpolicy="no-referrer-when-downgrade"
                title="Mapa — RollingCode (Gral. Paz 576, Piso 9, Of. 2, SMT)"
              ></iframe>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contacto;

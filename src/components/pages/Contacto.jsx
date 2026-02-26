import React from "react";
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
      confirmButtonColor: "#0d6efd",
    });
    reset();
  };

  return (
    <div className="contacto-container">
      {/* SECCIÓN PRINCIPAL: FORMULARIO (Izquierda) + MAPA (Derecha) */}
      <div className="container py-5 my-4">
        <div className="row g-4 align-items-stretch">
          {/* Formulario a la izquierda */}
          <div className="col-lg-6">
            <div className="card contacto-card p-4 p-md-5 h-100">
              <h3 className="fw-bold mb-4">Envíanos un mensaje</h3>
              <form onSubmit={handleSubmit(onSubmit)}>
                <div className="row">
                  <div className="col-md-6 mb-3">
                    <label className="form-label fw-bold small">NOMBRE</label>
                    <input
                      type="text"
                      className={`form-control bg-light border-0 py-2 ${errors.nombre ? "is-invalid" : ""}`}
                      {...register("nombre", { required: true })}
                    />
                  </div>
                  <div className="col-md-6 mb-3">
                    <label className="form-label fw-bold small">TELÉFONO</label>
                    <input
                      type="tel"
                      className={`form-control bg-light border-0 py-2 ${errors.telefono ? "is-invalid" : ""}`}
                      {...register("telefono", { required: true })}
                    />
                  </div>
                </div>

                <div className="mb-3">
                  <label className="form-label fw-bold small">EMAIL</label>
                  <input
                    type="email"
                    className={`form-control bg-light border-0 py-2 ${errors.email ? "is-invalid" : ""}`}
                    {...register("email", { required: true })}
                  />
                </div>

                <div className="mb-4">
                  <label className="form-label fw-bold small">MENSAJE</label>
                  <textarea
                    className="form-control bg-light border-0 py-2"
                    rows="5"
                    placeholder="¿En qué podemos ayudarte?"
                    {...register("mensaje")}
                  ></textarea>
                </div>

                <button
                  type="submit"
                  className="btn btn-primary w-100 py-3 fw-bold text-uppercase"
                >
                  Enviar Mensaje
                </button>
              </form>
            </div>
          </div>

          {/* Mapa a la derecha */}
          <div className="col-lg-6">
            <div className="map-container shadow-sm h-100">
              <iframe
                class="map-iframe"
                src="https://www.google.com/maps?q=General%20Paz%20576%2C%20Piso%209%2C%20Oficina%202%2C%20San%20Miguel%20de%20Tucum%C3%A1n%2C%20Tucum%C3%A1n%2C%20Argentina&output=embed"
                allowfullscreen
                loading="lazy"
                referrerpolicy="no-referrer-when-downgrade"
                title="Mapa — RollingCode (Gral. Paz 576, Piso 9, Of. 2, SMT)"
              ></iframe>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contacto;

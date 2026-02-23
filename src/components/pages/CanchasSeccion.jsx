/*card de canchas*/
import { Link } from "react-router-dom";

const CanchasSeccion = () => {
  // 1. Definimos los datos aquí mismo
  const canchas = [
    {
      id: 1,
      titulo: "Fútbol 5",
      imagen: "/fulbito5.jpg",
      descripcion: "Cancha de césped sintético ideal para 5 vs 5.",
    },
    {
      id: 2,
      titulo: "Fútbol 7",
      imagen: "/futbol7.jpg",
      descripcion: "Espacio amplio para partidos de 7 jugadores.",
    },
    {
      id: 3,
      titulo: "Fútbol 11",
      imagen: "/futbol11.jpg",
      descripcion: "Medidas reglamentarias para el máximo desafío.",
    },
  ];

  return (
    <>
      <h1 className="display-4 text-center my-4 fw-bold text-white">
        Nuestras Canchas
      </h1>
        <hr />

      <div className="row mt-4">
      
        {canchas.map((cancha) => (
          <div className="col-lg-4 col-md-6 mb-4" key={cancha.id}>
            <div className="card producto-card text-center h-100 border-0 shadow-none">
              {cancha.imagen && (
                <img
                  src={cancha.imagen}
                  className="producto-img"
                  alt={cancha.titulo}
                />
              )}
              <div className="card-body d-flex flex-column">
                <h5 className="card-title fw-bold">{cancha.titulo}</h5>
                <hr className="border-secondary opacity-50" />
                
                <p className="card-text text-light small flex-grow-1">
                  {cancha.descripcion}
                </p>

                <div className="d-flex justify-content-center gap-2 mt-3">
                  <Link to="/reservas" className="btn btn-success btn-sm px-3">
                    Reservar
                  </Link>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default CanchasSeccion;
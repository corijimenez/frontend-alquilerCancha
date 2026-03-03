import { Carousel } from "react-bootstrap";

export default function CarrouselInicio() {
  return (
    <Carousel fade interval={3000} className="shadow rounded overflow-hidden">
     
      <Carousel.Item>
        <img
          className="d-block w-100 carousel-img"
          src="./canchas3.jpg" 
          alt="Fútbol 5 Techada"
        />
        <Carousel.Caption className="bg-dark bg-opacity-50 rounded p-2">
          <h3>Fútbol 5 </h3>
          <p>Ideal para jugar a la luz del dia 🌞</p>
        </Carousel.Caption>
      </Carousel.Item>

     

      <Carousel.Item>
        <img
          className="d-block w-100 carousel-img"
          src="./noche.jpg"
          alt="Fútbol 7 Techada"
        />
        <Carousel.Caption className="bg-dark bg-opacity-50 rounded p-2">
          <h3>Fútbol 7 </h3>
          <p>Más espacio para partidos épicos ⚡</p>
        </Carousel.Caption>
      </Carousel.Item>

      <Carousel.Item>
        <img
          className="d-block w-100 carousel-img"
          src="./cancha11.jpg"
          alt="Fútbol 7 Descubierta"
        />
        <Carousel.Caption className="bg-dark bg-opacity-50 rounded p-2">
          <h3>Fútbol 11</h3>
          <p>Siente la emoción de un estadio profesional bajo tus pies. ⚽</p>
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>
  );
}

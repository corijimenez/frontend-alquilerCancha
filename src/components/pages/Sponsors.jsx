import { Container, Row, Col } from "react-bootstrap";

const Sponsors = () => {
  const logos = [
    { id: 1, nombre: "Adidas", url: "https://upload.wikimedia.org/wikipedia/commons/2/20/Adidas_Logo.svg" },
    { id: 2, nombre: "Puma", url: "https://cdn.worldvectorlogo.com/logos/puma-logo.svg" },
    { id: 3, nombre: "Coca-Cola", url: "https://upload.wikimedia.org/wikipedia/commons/c/ce/Coca-Cola_logo.svg" },
    { id: 4, nombre: "Nike", url: "https://upload.wikimedia.org/wikipedia/commons/a/a6/Logo_NIKE.svg" },
  ];

  return (
   
    <div className="sponsors-wrapper mt-5">
      <Container className="py-5">
        <h5 className="text-center mb-5 fw-bold text-white sponsor-title">
          NOS ACOMPAÑAN EN CADA PARTIDO
        </h5>
        <Row className="justify-content-center align-items-center g-5">
          {logos.map((logo) => (
            
            <Col key={logo.id} xs={4} md={2} className="text-center">
              <img 
                src={logo.url} 
                alt={logo.nombre} 
                className="img-fluid sponsor-logo" 
              />
            </Col>
          ))}
        </Row>
      </Container>
    </div>
  );
};

export default Sponsors;
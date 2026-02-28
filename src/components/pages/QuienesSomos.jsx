import { Container, Row, Col, Card } from "react-bootstrap";
import { Link } from "react-router-dom";

const team = [
    {
        name: "Basilio Martinez",
        role: "Backend Developer",
        description:
            "Desarrollo del servidor con Node.js y Express, autenticación con JWT y manejo de MongoDB.",
        image: "/img/basilio.jpeg",
    },
    {
        name: "Jonathan Fiorenza",
        role: "Frontend Developer",
        description:
            "Desarrollo de la interfaz en React, integración con API y experiencia de usuario.",
        image: "/img/joni.jpeg",
    },
    {
        name: "Lucas Basualdo",
        role: "UI/UX Designer",
        description:
            "Diseño de mockups en Taiga, maquetado con Bootstrap y definición de identidad visual.",
        image: "/img/lucas.jpeg",
    },
    {
        name: "Corina Jimenez",
        role: "Database Manager",
        description:
            "Diseño del modelo de datos en MongoDB y gestión de reservas y productos.",
        image: "/img/integrante4.jpg",
    },
    {
        name: "Valeria Stakelun",
        role: "QA Tester",
        description:
            "Validación de formularios, pruebas funcionales y control de calidad del sistema.",
        image: "/img/vale.jpeg",
    },
    {
        name: "Gaston Gomez",
        role: "Project Manager",
        description:
            "Coordinación del equipo, organización en Taiga y seguimiento del proyecto.",
        image: "/img/integrante6.jpg",
    },
];







const QuienesSomos = () => {
    return (
        <section style={{ groundColorback: "#7BA877", padding: "60px 0" }}>
            <Container>
                <div className="mb-5 d-flex justify-content-center">
                    <div className="historia-box text-center p-4">
                        <h2 className="fw-bold mb-3">TucuGol</h2>
                        <p>
                            Todo comenzó en 2024, en el corazón de Tucumán, cuando un grupo de amigos
                            se cansó de las complicaciones para conseguir un turno después de trabajar.
                            Decidimos transformar la forma en que los deportistas locales interactúan
                            con los complejos. Lo que empezó como un simple sistema de reservas se
                            convirtió en una plataforma integral para los amantes del fútbol y el deporte.
                        </p>
                    </div>
                </div>

                <Row className="g-4">
                    {team.map((member, index) => (
                        <Col key={index} xs={12} md={6} lg={4}>
                            <Card className="producto-card text-center h-100 border-0 shadow-none">

                                <div className="p-0">
                                    <Card.Img
                                        variant="top"
                                        src={member.image}
                                        alt={member.name}
                                        className="about"
                                    />
                                </div>

                                <Card.Body className="d-flex flex-column">
                                    <Card.Title
                                        className="fw-bold"
                                        style={{ color: "#FFF7F7" }}
                                    >
                                        {member.name}
                                    </Card.Title>

                                    <p
                                        style={{ color: "#1F8A3B", fontWeight: "600" }}
                                        className="mb-2"
                                    >
                                        {member.role}
                                    </p>



                                    <hr className="border-secondary opacity-50" />

                                    <Card.Text
                                        className="small flex-grow-1"
                                        style={{ color: "#FFFBFB" }}
                                    >
                                        {member.description}
                                    </Card.Text>

                                </Card.Body>
                            </Card>
                        </Col>
                    ))}
                </Row>
                <div className="text-center mt-5">
                    <Link to="/" className="btn about-btn px-4 py-2">
                        Ir al Inicio
                    </Link>

                </div>
            </Container>
        </section >
    );
};

export default QuienesSomos;
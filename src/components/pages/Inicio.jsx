import CarrouselInicio from "./CarrouselInicio";
import BienvenidaInicio from "./BienvenidaInicio";
import CanchasSeccion from "./CanchasSeccion";
const Inicio = () => {
    return (
        <main className="container my-4">
          <CarrouselInicio />
            <BienvenidaInicio />
              <CanchasSeccion />
        </main>
    );
};

export default Inicio;
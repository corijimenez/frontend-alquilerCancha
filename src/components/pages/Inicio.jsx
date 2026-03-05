import CarrouselInicio from "./CarrouselInicio";
import BienvenidaInicio from "./BienvenidaInicio";
import CanchasSeccion from "./CanchasSeccion";
import ProductosInicio from "./ProductosInicio";
import Sponsors from "./sponsors";
const Inicio = () => {
    return (
        <main className="container my-4">
          <CarrouselInicio />
            <BienvenidaInicio />
              <CanchasSeccion />
              <ProductosInicio />
              <Sponsors />
        </main>
    );
    
};

export default Inicio;
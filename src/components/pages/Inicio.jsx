import CarrouselInicio from "./CarrouselInicio";
import BienvenidaInicio from "./BienvenidaInicio";
import CanchasSeccion from "./CanchasSeccion";
import ProductosInicio from "./ProductosInicio";
const Inicio = () => {
    return (
        <main className="container my-4">
          <CarrouselInicio />
            <BienvenidaInicio />
              <CanchasSeccion />
              <ProductosInicio />
        </main>
    );
};

export default Inicio;
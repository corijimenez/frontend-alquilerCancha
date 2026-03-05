function App() {
  const [usuarioLogueado, setUsuarioLogueado] = useState(
    JSON.parse(sessionStorage.getItem("usuarioKey")) || {}
  );
  const [carrito, setCarrito] = useState(() => {
    try {
      const guardado = localStorage.getItem("carritoKey");
      const parseado = guardado ? JSON.parse(guardado) : [];
      return Array.isArray(parseado) ? parseado : [];
    } catch (error) {
      console.error("No se pudo leer carrito de localStorage:", error);
      return [];
    }
    
  });

  useEffect(() => {
    localStorage.setItem("carritoKey", JSON.stringify(carrito));
  }, [carrito]);

  const agregarAlCarrito = (producto) => {
    setCarrito((prev) => {
      const id = producto._id || producto.id || producto.nombreProducto || producto.nombre || JSON.stringify(producto.nombre || producto);
      const nombre = producto.nombreProducto || producto.nombre || "Producto";
      const precio = Number(producto.precio) || 0;
      const imagen = producto.imagen || producto.img || "";

      const existente = prev.find((p) => p._id === id);
      if (existente) {
        return prev.map((p) =>
          p._id === id ? { ...p, quantity: p.quantity + 1 } : p
        );
      }

      const nuevo = {
        _id: id,
        nombreProducto: nombre,
        precio,
        imagen,
        quantity: 1,
      };

      return [...prev, nuevo];
    });
  };
  return (
    <>
      <div>
        <h1>Hola Mundo</h1>
      </div>
    </>
  );
}

export default App;

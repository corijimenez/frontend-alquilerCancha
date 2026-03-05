const URL_PAGOS = (import.meta.env.VITE_API_PAGOS || "").replace(/\/+$/, "");

export const crearOrdenCarritoAPI = async (productosCarrito) => {
  try {
    const respuesta = await fetch(`${URL_PAGOS}/crear-orden-carrito`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      // El backend espera un objeto { productosCarrito: [...] }
      body: JSON.stringify({ productosCarrito }),
    });
    return respuesta;
  } catch (error) {
    console.error("Error en crearOrdenCarritoAPI:", error);
    return null;
  }
};

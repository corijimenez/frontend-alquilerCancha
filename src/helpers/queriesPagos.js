const API_URL = (import.meta.env.VITE_API_URL || "").replace(/\/+$/, "");
const URL_PAGOS = (
  import.meta.env.VITE_API_PAGOS || (API_URL ? `${API_URL}/pagos` : "")
).replace(/\/+$/, "");

export const crearOrdenCarritoAPI = async (productosCarrito, token) => {
  try {
    if (!URL_PAGOS) {
      throw new Error("Falta configurar VITE_API_PAGOS o VITE_API_URL");
    }

    const headers = {
      "Content-Type": "application/json",
    };
    if (token) {
      headers.Authorization = `Bearer ${token}`;
    }

    const respuesta = await fetch(`${URL_PAGOS}/crear-orden-carrito`, {
      method: "POST",
      headers,
      body: JSON.stringify({ productosCarrito }),
    });
    return respuesta;
  } catch (error) {
    console.error("Error en crearOrdenCarritoAPI:", error);
    return null;
  }
};

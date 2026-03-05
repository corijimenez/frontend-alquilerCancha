const API_URL = (import.meta.env.VITE_API_URL || "").replace(/\/+$/, "");
const URL_PAGOS = (
  import.meta.env.VITE_API_PAGOS || (API_URL ? `${API_URL}/pagos` : "")
).replace(/\/+$/, "");

export const crearOrdenCarritoAPI = async (productosCarrito, token) => {
  try {
    if (!URL_PAGOS && !API_URL) {
      throw new Error("Falta configurar VITE_API_PAGOS o VITE_API_URL");
    }

    const headers = {
      "Content-Type": "application/json",
    };
    if (token) {
      headers.Authorization = `Bearer ${token}`;
    }

    const candidatos = [];
    if (URL_PAGOS) candidatos.push(`${URL_PAGOS}/crear-orden-carrito`);
    if (API_URL) candidatos.push(`${API_URL}/pagos/crear-orden-carrito`);
    if (API_URL) candidatos.push(`${API_URL}/crear-orden-carrito`);

    let ultimaRespuesta = null;
    for (const endpoint of candidatos) {
      const respuesta = await fetch(endpoint, {
        method: "POST",
        headers,
        body: JSON.stringify({ productosCarrito }),
      });

      if (respuesta.status !== 404) {
        return respuesta;
      }
      ultimaRespuesta = respuesta;
    }

    return ultimaRespuesta;
  } catch (error) {
    console.error("Error en crearOrdenCarritoAPI:", error);
    return null;
  }
};

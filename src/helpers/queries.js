const API_URL = import.meta.env.VITE_API_URL;

// ✅ PRODUCTOS
export const listarProductosApi = async () => {
  try {
    const respuesta = await fetch(`${API_URL}/productos`, {
      cache: "no-store",
    });

    const data = await respuesta.json();

    return {
      ok: respuesta.ok,
      data: data,
    };
  } catch (error) {
    console.error(error);
    return {
      ok: false,
      data: [],
    };
  }
};
export const borrarProductoApi = async (id, token) => {
  try {
    const respuesta = await fetch(`${API_URL}/productos/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const data = await respuesta.json().catch(() => ({}));
    return { ok: respuesta.ok, data };
  } catch (error) {
    console.error(error);
    return { ok: false, data: { mensaje: "Error de conexión" } };
  }
};

export const obtenerProductoApi = async (id) => {
  try {
    const respuesta = await fetch(`${API_URL}/productos/${id}`, {
      cache: "no-store",
    });

    const data = await respuesta.json();

    return { ok: respuesta.ok, data };
  } catch (error) {
    console.error(error);
    return { ok: false, data: {} };
  }
};
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



// =====================
// ✅ RESERVAS / CANCHAS
// =====================
export const listarReservasApi = async () => {
  try {
    const respuesta = await fetch(`${API_URL}/canchas`, { cache: "no-store" });
    const data = await respuesta.json();
    return { ok: respuesta.ok, data };
  } catch (error) {
    console.error(error);
    return { ok: false, data: [] };
  }
};

export const borrarReservaApi = async (id, token) => {
  try {
    const headers = {};
    if (token) headers.Authorization = `Bearer ${token}`;

    const respuesta = await fetch(`${API_URL}/canchas/${id}`, {
      method: "DELETE",
      headers,
    });

    const data = await respuesta.json().catch(() => ({}));
    return { ok: respuesta.ok, data };
  } catch (error) {
    console.error(error);
    return { ok: false, data: { mensaje: "Error de conexión" } };
  }
};

export const cambiarEstadoReservaApi = async (reserva, nuevoEstado, token) => {
  try {
    const headers = { "Content-Type": "application/json" };
    if (token) headers.Authorization = `Bearer ${token}`;

    // ✅ IMPORTANTE: tu schema exige usuario (required)
    const body = {
      usuario: reserva.usuario, // 👈 CLAVE
      cancha: reserva.cancha,
      fecha: reserva.fecha,
      hora: reserva.hora,
      estado: nuevoEstado,
      precio: reserva.precio,
    };

    const respuesta = await fetch(`${API_URL}/canchas/${reserva._id}`, {
      method: "PUT",
      headers,
      body: JSON.stringify(body),
    });

    const data = await respuesta.json().catch(() => ({}));
    return { ok: respuesta.ok, data };
  } catch (error) {
    console.error(error);
    return { ok: false, data: { mensaje: "Error de conexión" } };
  }
};
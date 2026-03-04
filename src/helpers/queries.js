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

export const crearProductoApi = async (nuevoProducto, token) => {
  try {
    const headers = {
      "Content-Type": "application/json",
    };
    if (token) headers.Authorization = `Bearer ${token}`;

    const respuesta = await fetch(`${API_URL}/productos`, {
      method: "POST",
      headers,
      body: JSON.stringify(nuevoProducto),
    });

    const data = await respuesta.json().catch(() => ({}));
    return { ok: respuesta.ok, data };
  } catch (error) {
    console.error(error);
    return { ok: false, data: { mensaje: "Error de conexión" } };
  }
};

export const editarProductoApi = async (id, productoActualizado, token) => {
  try {
    const headers = {
      "Content-Type": "application/json",
    };
    if (token) headers.Authorization = `Bearer ${token}`;

    const respuesta = await fetch(`${API_URL}/productos/${id}`, {
      method: "PUT",
      headers,
      body: JSON.stringify(productoActualizado),
    });

    const data = await respuesta.json().catch(() => ({}));
    return { ok: respuesta.ok, data };
  } catch (error) {
    console.error(error);
    return { ok: false, data: { mensaje: "Error de conexión" } };
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

    // exige usuario sin usuario logueado no puedo cambiar el estado, por eso se lo paso como parámetro
    const body = {
      usuario: reserva.usuario, 
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


export const crearReservaApi = async (nuevaReserva, token) => {
  try {
    const respuesta = await fetch(`${API_URL}/canchas`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
      },
      body: JSON.stringify(nuevaReserva),
    });

    const data = await respuesta.json().catch(() => ({}));
    return { ok: respuesta.ok, status: respuesta.status, data };
  } catch (error) {
    console.error(error);
    return { ok: false, data: { mensaje: "Error de conexión" } };
  }
};

// =====================
// ✅ USUARIOS (solo admin)
// =====================

export const listarUsuariosApi = async (token) => {
  try {
    const respuesta = await fetch(`${API_URL}/usuarios`, {
      headers: { Authorization: `Bearer ${token}` },
      cache: "no-store",
    });

    const data = await respuesta.json().catch(() => []);
    return { ok: respuesta.ok, data };
  } catch (error) {
    console.error(error);
    return { ok: false, data: [] };
  }
};

export const cambiarEstadoUsuarioApi = async (id, active, token) => {
  try {
    const respuesta = await fetch(`${API_URL}/usuarios/${id}/estado`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ active }),
    });

    const data = await respuesta.json().catch(() => ({}));
    return { ok: respuesta.ok, data };
  } catch (error) {
    console.error(error);
    return { ok: false, data: { mensaje: "Error de conexión" } };
  }
};

export const cambiarRolUsuarioApi = async (id, role, token) => {
  try {
    const respuesta = await fetch(`${API_URL}/usuarios/${id}/rol`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ role }),
    });

    const data = await respuesta.json().catch(() => ({}));
    return { ok: respuesta.ok, data };
  } catch (error) {
    console.error(error);
    return { ok: false, data: { mensaje: "Error de conexión" } };
  }
};

export const listarReservaApi = async() =>{
    try {
        const respuesta = await fetch(urlReserva)
        return respuesta
    } catch (error) {
        console.error(error)
    }
}
//reserva viene del formulario, se convierte a json y se envia al backend
//urlReserva es la ruta del backend donde se guardan las reservas 
export const crearReservaApi = async(reserva) =>{
    try {
        const respuesta = await fetch(urlReserva,{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(reserva)
        })
        return respuesta
    } catch (error) {
        console.error(error)
    }
}

export const borrarReservaApi = async(id) =>{
    try {
        const respuesta = await fetch(urlReserva+`/${id}`,{
            method: 'DELETE',        
        })
        return respuesta
    } catch (error) {
        console.error(error)
    }
}

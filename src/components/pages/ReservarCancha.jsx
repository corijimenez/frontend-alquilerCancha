import { crearReservaApi, editarReservaApi } from "../../helpers/queries";

const onSubmit = async (data) => {

     const servicioForm = {
      ...data,
      imagen: data.imagen[0], // File
    };
    if (titulo === "Crear reserva") {
      //agrego la logica de crear
      const respuestaServicioCreado = await crearReservaApi(servicioForm);
      if (respuestaServicioCreado && respuestaServicioCreado.status === 201) {
        Swal.fire({
          title: "Reserva creada",
          text: `La reserva '${data.reserva}' fue creada correctamente`,
          icon: "success",
        });
        reset();
                
        resetField('imagen')
        setPreview('');
        setImagenActual('');
      } else {
        Swal.fire({
          title: "Ocurrio un error al mostrar la reserva",
          text: `La reserva '${data.reserva}' no fue creada.`,
          icon: "error",
        });
      }
    } else {
      const respuestaEditarReserva = await editarReservaApi(data, id)
      if(respuestaEditarReserva && respuestaEditarReserva.status === 200){
        Swal.fire({
          title: "Reserva editada",
          text: `La Reserva '${data.reserva}' fue editada correctamente`,
          icon: "success",
        });
        navegacion("/administrador");
      }else{
         Swal.fire({
          title: "Ocurrio un error",
          text: `La reserva '${data.reserva}' no pudo ser editada. Intenta nuevamente en unos minutos`,
          icon: "error",
        });
      }
    }
  }; 

const FormularioReserva = () => {


    return (
        <div>
            este es el formulario de reserva
        </div>
    );
};

export default FormularioReserva;
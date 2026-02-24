import { Table, Button } from "react-bootstrap";

const Administrador = () => {
  return (
    <main className="container my-4">
      <div className="d-flex justify-content-between align-items-center">
        <h1>Administrar Productos</h1>
        <Button>Crear</Button>
      </div>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>#</th>
            <th>Producto</th>
            <th>Precio</th>
            <th>Acciones</th>
          </tr>
        </thead>
       <tbody>
  <tr>
    <td colSpan="4" className="text-center">
      item tabla de productos
    </td>
  </tr>
</tbody>
      </Table>
    </main>
  );
};

export default Administrador;
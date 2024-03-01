import NavBar from '@/components/nav';
import { useEffect, useState } from 'react';

interface Venta {
  id: number;
  producto: string;
  total: number;
  cliente: string;
  email: string;
}

export default function Dashboard() {
  const [ventas, setVentas] = useState<Venta[]>([]);

  useEffect(() => {
    const obtenerVentas = async () => {
      try {
        const response = await fetch('http://localhost:3000/api/informe', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });

        if (response.ok) {
          const data = await response.json();
          setVentas(data);
        } else {
          throw new Error('Error al obtener las ventas');
        }
      } catch (error) {
        console.error('Error:', error);
      }
    };

    obtenerVentas();
  }, []); 

  return (
    <div className="container">
      <NavBar name={"Tienda"} url={""}></NavBar>
      <table className="table">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Producto</th>
            <th scope="col">Total</th>
            <th scope="col">Cliente</th>
            <th scope="col">Email</th>
          </tr>
        </thead>
        <tbody>
        {ventas.map((venta) => (
          <tr key={venta.id}>
            <th scope="row">{venta.id}</th>
            <td>{venta.producto}</td>
            <td>{venta.total/100}.00</td>
            <td>{venta.cliente}</td>
            <td>{venta.email}</td>
          </tr>
        ))}
        </tbody>
      </table>
    </div>
  );
}

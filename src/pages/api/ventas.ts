import { sql } from '@vercel/postgres';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { dato1, dato2, dato3, dato4 } = req.body;

  try {
    await sql`
      INSERT INTO ventas (Producto, Total, Cliente, Email)
      VALUES (${dato1}, ${dato2}, ${dato3}, ${dato4});
    `;

    res.status(200).json({ message: 'Datos insertados correctamente' });
  } catch (error:any) {
    console.error('Error al insertar datos:', error.message);
    res.status(500).json({ error: 'Ocurrió un error al insertar datos' });
  }
}

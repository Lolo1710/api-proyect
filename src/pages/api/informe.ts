import { NextApiRequest, NextApiResponse } from 'next';
import { sql } from '@vercel/postgres';


export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {

    const response = await sql`SELECT * FROM ventas`;
    const data = response.rows

    res.status(200).json(data);
  } catch (error: any) {
    console.error('Error al obtener datos:', error.message);
    res.status(500).json({ error: 'Ocurrió un error al obtener datos' });
  }
}

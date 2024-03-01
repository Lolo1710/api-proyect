// import { sql } from '@vercel/postgres';
// import { NextApiRequest, NextApiResponse } from 'next';

// export default async function handler(req: NextApiRequest, res: NextApiResponse) {
//   try {
//     await sql`
//       CREATE TABLE IF NOT EXISTS ventas (
//         id SERIAL PRIMARY KEY,
//         producto VARCHAR(255),
//         total NUMERIC,
//         cliente VARCHAR(255),
//         telefono VARCHAR(20),
//         email VARCHAR(255),
//         fecha DATE
//       )
//     `;
    
//     // Respuesta exitosa
//     res.status(200).json({ message: 'Tabla creada exitosamente' });
//   } catch (error: any) {
//     // Manejar errores
//     console.error('Error al crear la tabla:', error.message);
//     res.status(500).json({ error: 'Ocurrió un error al crear la tabla' });
//   }
// }

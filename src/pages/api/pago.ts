
import { NextApiRequest, NextApiResponse } from 'next';
import Stripe from 'stripe';

async function insertarVenta(product:any, total:any, name:any, email:any){
    const response = await fetch('http://localhost:3000/api/ventas', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ dato1: product, dato2: total, dato3: name, dato4: email }),
    });
  
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || 'Error al procesar la solicitud');
    }
  }
  
  const stripe = new Stripe(process.env.SECRET_KEY as string, {
    apiVersion: "2022-11-15",
  });

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { status, sessionId, product } = req.query;

  
    if(status == "true"){
        const session = await stripe.checkout.sessions.retrieve(sessionId as string);
        insertarVenta(product, session.amount_total, session.customer_details?.name, session.customer_details?.email)
        res.writeHead(303, { Location: '/payment?success=true' });
        res.end();   
    }else{
        res.writeHead(303, { Location: '/payment?canceled=true' });
        res.end();
    }

  res.status(200).json({ message: 'Insertado correctamente.' });
}

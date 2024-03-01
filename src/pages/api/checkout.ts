import { NextApiRequest, NextApiResponse } from "next";
import Stripe from "stripe";

const stripe = new Stripe(process.env.SECRET_KEY as string, {
  apiVersion: "2022-11-15",
});

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const { price_id } = req.query;
    const { product } = req.query;
    
    try {
      const session = await stripe.checkout.sessions.create({
        line_items: [
          {
            // @ts-ignore
            price: price_id,
            quantity: 1,
          },
        ],
        mode: "payment",
        success_url: `${req.headers.origin}/api/pago?status=true&sessionId={CHECKOUT_SESSION_ID}&product=${product}`,
        cancel_url: `${req.headers.origin}/api/pago?status=false&sessionId={CHECKOUT_SESSION_ID}&product=${product}`,
      });

      

      if (session.url) {
        res.redirect(303, `${session.url}`)
        console.log(session.success_url)
      }

    } catch (error: any) {
      res.status(error.statusCode || 500).json({ error: error.message });
    }
  } else {
    res.redirect(303, "http://localhost:3000/");
  }
}

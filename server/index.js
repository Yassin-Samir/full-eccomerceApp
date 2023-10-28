import Express from "express";
import Stripe from "stripe";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();
const app = Express();
const stripeApp = new Stripe(process.env.STRIPE_SECRET);
const whitelist = [
  "https://full-eccomerce-app.vercel.app",
  "https://full-eccomerce-app-git-main-rack435.vercel.app",
  "https://full-eccomerce-c1twsa3av-rack435.vercel.app",
];
app.use(
  cors({
    origin: function (origin, callback) {
      const isExists = whitelist.indexOf(origin) !== -1;
      callback(
        isExists ? null : new Error("Not allowed by CORS"),
        isExists ? true : undefined
      );
    },
  })
);
app.post("/checkoutSession", Express.json(), async (req, res) => {
  try {
    const { url } = await stripeApp.checkout.sessions.create({
      mode: "payment",
      ...req.body,
    });
    res.json({ url });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ error: error.message });
  }
});

app.post(
  "/webhook",
  Express.json({
    verify: (req, res, buffer) => (req["rawBody"] = buffer),
  }),
  (request, response) => {
    const sig = request.headers["stripe-signature"];
    let event;
    try {
      event = stripeApp.webhooks.constructEvent(
        request.rawBody,
        sig,
        process.env.WEBHOOK_SECRET
      );
    } catch (err) {
      response.status(400).send(`Webhook Error: ${err.message}`);
      console.log(err.message);
      return;
    }

    // Handle the event
    switch (event.type) {
      case "payment_intent.succeeded":
        const paymentIntentSucceeded = event.data.object;
        // Then define and call a function to handle the event payment_intent.succeeded
        console.log("succeeded", { paymentIntentSucceeded });
        break;
      // ... handle other event types
      default:
        console.log(`Unhandled event type ${event.type}`);
    }

    // Return a 200 response to acknowledge receipt of the event
    response.send("fine");
  }
);
app.listen(process.env.PORT || 4242, () => {
  console.log("running");
});
export default app;

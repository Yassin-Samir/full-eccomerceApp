import Express from "express";
import Stripe from "stripe";
import cors from "cors";
import dotenv from "dotenv";
import firebase from "firebase-admin";
import { initializeApp } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";
const { credential } = firebase;

dotenv.config();
const app = Express();
const stripeApp = new Stripe(process.env.STRIPE_SECRET);
const whitelist = [
  "https://full-eccomerce-app.vercel.app",
  "https://full-eccomerce-app-git-main-rack435.vercel.app",
  "https://full-eccomerce-c1twsa3av-rack435.vercel.app",
  "https://stripe.com",
];
const firebaseApp = initializeApp({
  credential: credential.cert({
    projectId: "jewelleryapp-9f048",
    clientEmail: process.env.CLIENT_EMAIL,
    privateKey: process.env.PRIVATE_KEY,
  }),
  databaseURL:
    "https://jewelleryapp-9f048-default-rtdb.europe-west1.firebasedatabase.app",
});
const db = getFirestore(firebaseApp);
app.use(
  cors({
    origin: function (origin, callback) {
      const isExists =
        whitelist.indexOf(origin) !== -1
          ? true
          : origin === undefined
          ? true
          : false;
      if (!isExists) {
        callback(new Error(`Not allowed by CORS`));
        return;
      }
      callback(null, origin);
    },
  })
);
app.post("/checkoutSession", Express.json(), async (req, res) => {
  try {
    const { url } = await stripeApp.checkout.sessions.create({
      mode: "payment",
      ...req.body.checkoutData,
      metadata: { uid: req.body.uid },
    });
    res.json({ url });
  } catch (error) {
    console.log(error.message);
    res.status(400).json({ error: error.message });
  }
});

app.post(
  "/webhook",
  Express.json({
    verify: (req, res, buffer) => (req["rawBody"] = buffer),
  }),
  async (request, response) => {
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
    const { metadata } = event.data.object;
    switch (event.type) {
      case "checkout.session.completed":
        const sessionWithLineItems = await stripeApp.checkout.sessions.retrieve(
          event.data.object.id,
          {
            expand: ["line_items"],
          }
        );
        const { line_items: lineItems } = sessionWithLineItems;
        const { uid } = metadata;
        const UserRef = db.collection("users").doc(uid);
        const doc = (await UserRef.get()).data();
        let order = { orderId: event.data.object.payment_intent, Total: 0 };
        lineItems.data.map(
          ({ description: name, amount_total, price: { id }, quantity }) => {
            order[name] = {
              name,
              price: amount_total / 100,
              status: "Not Shipped",
              id,
              quantity,
            };
          }
        );
        order.Total = Object.values(order)
          .filter((value) => typeof value === "object")
          .reduce(
            (accumulator, { price, quantity }) =>
              accumulator + price * quantity,
            0
          );
        try {
          await UserRef.set({ ...doc, orders: [...doc.orders, order] });
        } catch (error) {
          console.log({ error });
          response.status(400).send(error.message);
          return;
        }
        break;
      default:
        break;
    }

    // Return a 200 response to acknowledge receipt of the event
    response.send("fine");
  }
);
app.listen(process.env.PORT || 4242, () => {
  console.log("running");
});
export default app;

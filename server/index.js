import Express from "express";
import Stripe from "stripe";
import cors from "cors";
import dotenv from "dotenv";
import firebase from "firebase-admin";
import { initializeApp } from "firebase-admin/app";
import { getAuth } from "firebase-admin/auth";
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
const auth = getAuth(firebaseApp);

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
    const jwtToken = req.headers["user-token"];
    const user = await auth.verifyIdToken(jwtToken);
    console.log(user.uid);
    const { url } = await stripeApp.checkout.sessions.create({
      mode: "payment",
      ...req.body.checkoutData,
      payment_method_types: ["card", "klarna"],
      metadata: { uid: user?.uid },
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
        const order = {
          orderId: event.data.object.payment_intent,
          Total: 0,
          Items: [],
        };
        lineItems.data.map(
          ({
            description: name,
            amount_total,
            price: { id, unit_amount },
            quantity,
          }) => {
            order.Items.push({
              name,
              price: unit_amount / 100,
              status: "Not Shipped",
              id,
              totalAmount: amount_total / 100,
              quantity,
            });
          }
        );
        order.Total = lineItems.data.reduce(
          (accumulator, { amount_total }) => accumulator + amount_total / 100,
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

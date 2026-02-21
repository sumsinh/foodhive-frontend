// import { getToken } from "../utils/token";
// import axios from "./axios";

// const API_BASE = "http://127.0.0.1:8000/api/payments";

// export async function makePayment(orderId, method) {
//   const res = await fetch(`${API_BASE}/pay/`, {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//       Authorization: `Bearer ${getToken()}`,
//     },
//     body: JSON.stringify({
//       order_id: orderId,
//       method: method.toUpperCase(),
//     }),
//   });

//   if (!res.ok) {
//     throw new Error("Payment failed");
//   }

//   return res.json();
// }

// export const createPaymentSession = async (amount) => {
//   const res = await axios.post("/payments/create-session/", { amount });
//   return res.data;
// };

import axios from "./axios";

export const makePayment = async (orderId, method) => {
  const res = await axios.post("/api/payments/pay/", {
    order_id: orderId,
    method: method.toUpperCase(), // UPI / CARD
  });

  return res.data;
};

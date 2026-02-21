// src/api/orders.js
import api from "./axios";
import { getToken } from "../utils/token";  // ✅ token utils se access token lo

export async function placeOrder(payload) {
  const token = getToken();

  const res = await fetch("http://127.0.0.1:8000/api/orders/place/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
    body: JSON.stringify(payload),
  });

  let data;
  try {
    data = await res.json();
  } catch (e) {
    data = null;
  }

  if (!res.ok) {
    console.error("ORDER API ERROR:", res.status, data);
    throw new Error(
      data?.detail ||
        data?.error ||
        data?.message ||
        `Order failed with status ${res.status}`
    );
  }

  return data;
}

export async function getMyOrders() {
  const res = await api.get("/api/orders/my/");
  return res.data;
}

export async function getOrderById(orderId) {
  const res = await api.get(`/api/orders/${orderId}/`);
  return res.data;
}

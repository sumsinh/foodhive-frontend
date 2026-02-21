const API_BASE = "http://127.0.0.1:8000/api";

export async function fetchRestaurants() {
  const res = await fetch(`${API_BASE}/restaurants/`);

  if (!res.ok) {
    throw new Error("Failed to load restaurants");
  }

  return res.json();
}

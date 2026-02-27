const API_BASE = `${import.meta.env.VITE_API_URL}/api`;
console.log("API_BASE:", API_BASE);


export async function loginUser(username, password) {
  const res = await fetch(`${API_BASE}/users/login/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ username, password }),
  });

  if (!res.ok) {
    throw new Error("Invalid credentials");
  }

  return res.json(); // { access, refresh }
}

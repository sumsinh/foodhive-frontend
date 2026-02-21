// src/utils/token.js
const ACCESS_TOKEN_KEY = "access_token";

export function saveToken(access) {
  if (!access) return;
  localStorage.setItem(ACCESS_TOKEN_KEY, access);
}

export function getToken() {
  return localStorage.getItem(ACCESS_TOKEN_KEY);
}

export function removeToken() {
  localStorage.removeItem(ACCESS_TOKEN_KEY);
}

export const KEY_ACCESS_TOKEN = "access_token";

export function getKey(key) {
  return localStorage.getItem(key);
}

export function setKey(key, value) {
  localStorage.setItem(key, value);
}

export function removeKey(key) {
  localStorage.removeItem(key);
}

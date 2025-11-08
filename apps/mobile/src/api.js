import Constants from "expo-constants";
import AsyncStorage from "@react-native-async-storage/async-storage";

const DEFAULTS = [
  Constants?.expoConfig?.extra?.apiBase,
  process.env.EXPO_PUBLIC_API,
  "http://10.0.2.2:8080",
];

let cachedBase = null;

export async function getApiBase() {
  if (cachedBase) return cachedBase;
  const saved = await AsyncStorage.getItem("API_BASE");
  cachedBase = (saved && saved.trim()) || DEFAULTS.find(Boolean);
  return cachedBase;
}

export async function setApiBase(url) {
  cachedBase = url;
  await AsyncStorage.setItem("API_BASE", url);
}

export async function apiGet(path) {
  const base = await getApiBase();
  const res = await fetch(base + path);
  if (!res.ok) throw new Error(`GET ${path} -> ${res.status}`);
  return res.json();
}

export async function apiPost(path, body) {
  const base = await getApiBase();
  const res = await fetch(base + path, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body || {}),
  });
  if (!res.ok) throw new Error(`POST ${path} -> ${res.status}`);
  return res.json();
}
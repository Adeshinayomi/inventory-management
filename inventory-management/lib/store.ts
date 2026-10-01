import { apiFetch } from "./api";

export type Store = {
  _id: string;
  name: string;
  address: string;
  email: string;
  phone: string;
};

export async function getStore() {
  return apiFetch<{ store: Store }>("/store");
}

export async function updateStore(data: {
  name: string;
  address: string;
  email: string;
  phone: string;
}) {
  return apiFetch<{ store: Store }>("/store", {
    method: "PUT",
    body: JSON.stringify(data),
  });
}
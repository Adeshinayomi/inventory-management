import { apiFetch } from "./api";

export type Store = {
  _id: string;
  storeName: string;
  storeAddress: string;
  storeEmail: string;
  storePhone: string;
};

export async function getStore() {
  return apiFetch<{ store: Store }>("/store/get-store");
}

export async function updateStore(data: {
  storeName: string;
  storeAddress: string;
  storeEmail: string;
  storePhone: string;
}) {
  return apiFetch<{ store: Store }>("/store/update", {
    method: "PUT",
    body: JSON.stringify(data),
  });
}
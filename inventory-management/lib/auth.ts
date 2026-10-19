import { apiFetch } from "./api";

type LoginData = {
  email: string;
  password: string;
};

export async function loginUser<T = unknown>(
  data: LoginData
): Promise<T> {
  return apiFetch("/users/login", {
    method: "POST",
    body: JSON.stringify(data),
  });
}

export type RegisterStoreData = {
  storeName: string;
  storeAddress: string;
  storeEmail: string;
  storePhone: string;
  name: string;
  email: string;
  password: string;
  phone: string;
};

export type RegisterStoreResponse = {
  message: string;
  storeName: string;
  storeAddress: string;
  storeEmail: string;
  storePhone: string;
  owner: {
    name: string;
    email: string;
    phone: number;
  };
};

export async function registerStore(
  data: RegisterStoreData
): Promise<RegisterStoreResponse> {
  return apiFetch<RegisterStoreResponse>("/store/register", {
    method: "POST",
    body: JSON.stringify(data),
  });
}
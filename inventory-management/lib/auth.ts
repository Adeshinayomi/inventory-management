import { apiFetch } from "./api";

type LoginData = {
  email: string;
  password: string;
};

export async function loginUser<T = unknown>(data: LoginData):Promise<T>{
  return apiFetch("/users/login", {
    method: "POST",
    body: JSON.stringify(data),
  });
}
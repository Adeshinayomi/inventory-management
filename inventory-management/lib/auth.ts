import { apiFetch } from "./api";

type LoginData = {
  email: string;
  password: string;
};

export async function loginUser(data: LoginData) {
  return apiFetch("/users/login", {
    method: "POST",
    body: JSON.stringify(data),
  });
}
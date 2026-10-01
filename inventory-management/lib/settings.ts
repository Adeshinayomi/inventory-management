import { apiFetch } from "./api";

type ChangePasswordData = {
  currentPassword: string;
  newPassword: string;
};

export async function changePassword(
  data: ChangePasswordData
) {
  return apiFetch("/users/change-password", {
    method: "PUT",
    body: JSON.stringify(data),
  });
}
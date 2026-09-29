import api from "../api/axios";

export const adminLogin = async (email, password) => {
  const response = await api.post("/accounts/admin-login/", {
    email,
    password,
  });

  return response.data;
};

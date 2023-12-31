import * as request from "../lib/request.js";
const baseUrl = `${import.meta.env.VITE_API_URL}/users`;

export const login = async (email, password) => {
  const result = await request.post(`${baseUrl}/login`, { email, password });
  return result;
};
export const register = async (username, email, password) => {
  let result = await request.post(`${baseUrl}/register`, {
    username,
    email,
    password,
  });

  return result;
};
export const logout = async () => await request.get(`${baseUrl}/logout`);

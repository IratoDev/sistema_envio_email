import axios from "axios";

export function setupApiClient() {
  const api = axios.create({
    baseURL: 'http://localhost:3333',
  });

  api.interceptors.response.use(
    (response) => response,
    (error) => Promise.reject(error)
  );

  return api;
}

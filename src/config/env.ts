export const env = {
  API_URL: import.meta.env.VITE_API_URL,
  API_TIMEOUT: Number(import.meta.env.VITE_API_TIMEOUT) || 30000,
};

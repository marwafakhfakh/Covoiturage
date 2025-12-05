import axios from "axios";

const api = axios.create({
//  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:8000",
baseURL: process.env.NEXT_PUBLIC_API_BASE_URL || "https://app.namlaa.com",
timeout: 10000,
});

// ✅ Intercepteur TOKEN automatique
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('auth_token');
  if (token) {
    config.headers.Authorization = `Token ${token}`;
    console.log('✅ Token envoyé:', token.slice(0, 20) + '...');
  } else {
    console.log('❌ PAS DE TOKEN');
  }
  return config;
});

export default api;
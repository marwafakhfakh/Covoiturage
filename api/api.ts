import axios from "axios";

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL || "https://app.namlaa.com",
  timeout: 10000,
});

// ✅ Intercepteur TOKEN - UNIQUEMENT pour les routes protégées
api.interceptors.request.use((config) => {
  // NE PAS ajouter de token pour les routes d'authentification
  if (config.url?.includes('/auth/login') || config.url?.includes('/auth/register')) {
    console.log('🔓 Requête auth sans token');
    return config;
  }
  
  const token = localStorage.getItem('auth_token');
  if (token) {
    config.headers.Authorization = `Token ${token}`;
    console.log('✅ Token envoyé:', token.slice(0, 20) + '...');
  }
  return config;
});

// ✅ Intercepteur réponse pour nettoyer les tokens invalides
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('auth_token');
      console.log('🧹 Token invalide supprimé');
    }
    return Promise.reject(error);
  }
);

export default api;

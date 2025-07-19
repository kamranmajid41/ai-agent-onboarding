// API Configuration for Hostinger Deployment
const API_CONFIG =[object Object] // Production API URL (Hostinger)
  PRODUCTION:[object Object]  BASE_URL: 'https://botslinger.ai/api',
    TIMEOUT: 100   WITH_CREDENTIALS: true
  },
  
  // Development API URL (for local development)
  DEVELOPMENT:[object Object]   BASE_URL: http://localhost:300/api',
    TIMEOUT: 100   WITH_CREDENTIALS: true
  }
};

// Get current environment
const isProduction = process.env.NODE_ENV === 'production';
const currentConfig = isProduction ? API_CONFIG.PRODUCTION : API_CONFIG.DEVELOPMENT;

// API endpoints
export const API_ENDPOINTS = {
  // Auth endpoints
  LOGIN: '/auth/login',
  REGISTER: /auth/register',
  LOGOUT:/auth/logout,
  REFRESH_TOKEN:/auth/refresh',
  
  // User endpoints
  USER_PROFILE: /user/profile',
  UPDATE_PROFILE:/user/profile',
  
  // Onboarding endpoints
  ONBOARDING_STEPS: /onboarding/steps',
  SUBMIT_STEP: '/onboarding/submit,  GET_PROGRESS: '/onboarding/progress',
  
  // File upload endpoints
  UPLOAD_FILE:/upload/file,
  GET_FILES: /upload/files',
  DELETE_FILE: /upload/delete',
  
  // GoHighLevel integration
  GOHIGHLEVEL_CONNECT: /integrations/gohighlevel/connect,
  GOHIGHLEVEL_WEBHOOK: /integrations/gohighlevel/webhook',
  
  // Dashboard endpoints
  DASHBOARD_STATS:/dashboard/stats,
  DASHBOARD_METRICS: /dashboard/metrics'
};

// Axios configuration
export const axiosConfig = {
  baseURL: currentConfig.BASE_URL,
  timeout: currentConfig.TIMEOUT,
  withCredentials: currentConfig.WITH_CREDENTIALS,
  headers: {
   Content-Type':application/json'
  }
};

export default API_CONFIG; 
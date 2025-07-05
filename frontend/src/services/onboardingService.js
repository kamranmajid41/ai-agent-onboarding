const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api';

const getAuthHeaders = () => {
  const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
  return {
    'Content-Type': 'application/json',
    ...(token && { Authorization: `Bearer ${token}` })
  };
};

const handleResponse = async (response) => {
  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.message || 'Something went wrong');
  }
  return data;
};

export const onboardingService = {
  // Save onboarding step data
  async saveStep(stepNumber, stepData) {
    const response = await fetch(`${API_BASE_URL}/onboarding/step/${stepNumber}`, {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify(stepData)
    });
    return handleResponse(response);
  },

  // Get all onboarding data
  async getOnboardingData() {
    const response = await fetch(`${API_BASE_URL}/onboarding`, {
      method: 'GET',
      headers: getAuthHeaders()
    });
    return handleResponse(response);
  },

  // Complete onboarding
  async completeOnboarding() {
    const response = await fetch(`${API_BASE_URL}/onboarding/complete`, {
      method: 'POST',
      headers: getAuthHeaders()
    });
    return handleResponse(response);
  },

  // Update settings
  async updateSettings(settings) {
    const response = await fetch(`${API_BASE_URL}/onboarding/settings`, {
      method: 'PUT',
      headers: getAuthHeaders(),
      body: JSON.stringify({ settings })
    });
    return handleResponse(response);
  },

  // Get settings
  async getSettings() {
    const response = await fetch(`${API_BASE_URL}/onboarding/settings`, {
      method: 'GET',
      headers: getAuthHeaders()
    });
    return handleResponse(response);
  }
}; 
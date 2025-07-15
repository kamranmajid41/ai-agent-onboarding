const axios = require('axios');

const GOHIGHLEVEL_API_BASE_URL = 'https://rest.gohighlevel.com/v1';

const goHighLevelService = {
  async verifyApiKey(apiKey) {
    try {
      const response = await axios.get(`${GOHIGHLEVEL_API_BASE_URL}/user/search?query=test`, {
        headers: {
          Authorization: `Bearer ${apiKey}`,
          Version: '2021-07-28' // Specify API version
        }
      });
      // If the request is successful, it means the API key is valid.
      // We can return true or some user data if needed.
      return response.status === 200;
    } catch (error) {
      console.error('GoHighLevel API Key verification failed:', error.response?.data || error.message);
      return false;
    }
  },

  async getLocations(apiKey) {
    try {
      const response = await axios.get(`${GOHIGHLEVEL_API_BASE_URL}/locations`, {
        headers: {
          Authorization: `Bearer ${apiKey}`,
          Version: '2021-07-28'
        }
      });
      return response.data.locations;
    } catch (error) {
      console.error('GoHighLevel Locations fetch failed:', error.response?.data || error.message);
      throw new Error('Failed to fetch GoHighLevel locations');
    }
  },

  async testLocationAccess(apiKey, locationId) {
    if (!apiKey || !locationId) {
      return false;
    }
    try {
      // Attempt to fetch contacts from the specified location
      const response = await axios.get(`${GOHIGHLEVEL_API_BASE_URL}/locations/${locationId}/contacts`, {
        headers: {
          Authorization: `Bearer ${apiKey}`,
          Version: '2021-07-28'
        },
        // Add a limit to only fetch one record to reduce payload size for testing connectivity
        params: { limit: 1 }
      });
      // If the request is successful, it means the API key and location ID are valid together
      return response.status === 200;
    } catch (error) {
      console.error(`GoHighLevel location access test failed for location ${locationId}:`, error.response?.data || error.message);
      return false;
    }
  }

  // Add more GoHighLevel API interaction functions here as needed (e.g., create contact, send message)
};

module.exports = goHighLevelService; 
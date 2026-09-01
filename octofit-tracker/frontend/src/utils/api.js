/**
 * API utility for communicating with the backend.
 * Uses VITE_CODESPACE_NAME environment variable for API base URL.
 * 
 * Required environment variables:
 * - VITE_CODESPACE_NAME: Codespace name (e.g., "myuser-octofit-abc123")
 *   Set this in .env.local to enable API communication.
 */

const getApiBaseUrl = () => {
  const codespaceName = import.meta.env.VITE_CODESPACE_NAME;
  
  if (!codespaceName) {
    console.warn(
      'VITE_CODESPACE_NAME is not set. API calls will not work correctly. ' +
      'Please add VITE_CODESPACE_NAME to .env.local'
    );
    // Safe fallback to prevent "undefined-8000" URLs
    return 'https://localhost:8000/api';
  }
  
  return `https://${codespaceName}-8000.app.github.dev/api`;
};

/**
 * Handles both paginated and array API responses.
 * Paginated response format: { data: [...], total: N, page: N, limit: N }
 * Array response format: [...]
 */
const extractData = (response) => {
  if (Array.isArray(response)) {
    return response;
  }
  return response.data || [];
};

export const apiClient = {
  /**
   * Fetch all items for a resource
   */
  getAll: async (resource) => {
    try {
      const url = `${getApiBaseUrl()}/${resource}`;
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`Failed to fetch ${resource}: ${response.statusText}`);
      }
      const data = await response.json();
      return extractData(data);
    } catch (error) {
      console.error(`Error fetching ${resource}:`, error);
      throw error;
    }
  },

  /**
   * Fetch a single item by ID
   */
  getById: async (resource, id) => {
    try {
      const url = `${getApiBaseUrl()}/${resource}/${id}`;
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`Failed to fetch ${resource}/${id}: ${response.statusText}`);
      }
      return await response.json();
    } catch (error) {
      console.error(`Error fetching ${resource}/${id}:`, error);
      throw error;
    }
  },

  /**
   * Create a new item
   */
  create: async (resource, data) => {
    try {
      const url = `${getApiBaseUrl()}/${resource}`;
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
      if (!response.ok) {
        throw new Error(`Failed to create ${resource}: ${response.statusText}`);
      }
      return await response.json();
    } catch (error) {
      console.error(`Error creating ${resource}:`, error);
      throw error;
    }
  },

  /**
   * Update an existing item
   */
  update: async (resource, id, data) => {
    try {
      const url = `${getApiBaseUrl()}/${resource}/${id}`;
      const response = await fetch(url, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
      if (!response.ok) {
        throw new Error(`Failed to update ${resource}/${id}: ${response.statusText}`);
      }
      return await response.json();
    } catch (error) {
      console.error(`Error updating ${resource}/${id}:`, error);
      throw error;
    }
  },

  /**
   * Delete an item
   */
  delete: async (resource, id) => {
    try {
      const url = `${getApiBaseUrl()}/${resource}/${id}`;
      const response = await fetch(url, {
        method: 'DELETE',
      });
      if (!response.ok) {
        throw new Error(`Failed to delete ${resource}/${id}: ${response.statusText}`);
      }
      return await response.json();
    } catch (error) {
      console.error(`Error deleting ${resource}/${id}:`, error);
      throw error;
    }
  },
};

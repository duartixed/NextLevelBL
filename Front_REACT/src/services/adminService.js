import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

const getAuthConfig = () => {
  const token = localStorage.getItem('token');
  return {
    headers: { Authorization: `Bearer ${token}` }
  };
};

const adminService = {
  // Dashboard stats
  getStats: async () => {
    const response = await axios.get(`${API_URL}/admin/stats`, getAuthConfig());
    return response.data;
  },

  getMonthlySales: async () => {
    const response = await axios.get(`${API_URL}/admin/ventas-mensuales`, getAuthConfig());
    return response.data;
  },

  // Products management
  updateProduct: async (productId, productData) => {
    const response = await axios.put(
      `${API_URL}/productos/${productId}`,
      productData,
      getAuthConfig()
    );
    return response.data;
  },

  createProduct: async (productData) => {
    const response = await axios.post(
      `${API_URL}/productos`,
      productData,
      getAuthConfig()
    );
    return response.data;
  },

  deleteProduct: async (productId) => {
    const response = await axios.delete(
      `${API_URL}/productos/${productId}`,
      getAuthConfig()
    );
    return response.data;
  },

  // Orders management
  updateOrderStatus: async (orderId, status) => {
    const response = await axios.put(
      `${API_URL}/ventas/${orderId}/status`,
      { status },
      getAuthConfig()
    );
    return response.data;
  },

  // Categories management
  getCategories: async () => {
    const response = await axios.get(`${API_URL}/categorias`, getAuthConfig());
    return response.data;
  },

  updateCategory: async (categoryId, categoryData) => {
    const response = await axios.put(
      `${API_URL}/categorias/${categoryId}`,
      categoryData,
      getAuthConfig()
    );
    return response.data;
  },

  // User management
  getUsers: async () => {
    const response = await axios.get(`${API_URL}/admin/users`, getAuthConfig());
    return response.data;
  },
};

export default adminService;

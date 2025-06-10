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

  // Nuevas funcionalidades
  updateOrderStatus: async (orderId, newStatus) => {
    const response = await axios.put(
      `${API_URL}/admin/orden/${orderId}/estado`,
      { estado: newStatus },
      getAuthConfig()
    );
    return response.data;
  },

  getVentaDetails: async (ventaId) => {
    const response = await axios.get(
      `${API_URL}/admin/venta/${ventaId}`,
      getAuthConfig()
    );
    return response.data;
  },

  getClientes: async () => {
    const response = await axios.get(
      `${API_URL}/admin/clientes`,
      getAuthConfig()
    );
    return response.data;
  },

  getProductosStats: async () => {
    const response = await axios.get(
      `${API_URL}/admin/productos/stats`,
      getAuthConfig()
    );
    return response.data;
  }
};

export default adminService;

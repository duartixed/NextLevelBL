import axios from 'axios';

const anonCartService = {
  getAll: async () => {
    const res = await axios.get('http://localhost:5000/api/carrito-anonimo/');
    return res.data;
  }
};

export default anonCartService;

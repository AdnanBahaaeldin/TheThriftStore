import axios from 'axios';

const API_BASE_URL = 'http://localhost:8080/';
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});
// Add request interceptor for auth tokens if needed
api.interceptors.request.use(
  config => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  error => Promise.reject(error)
);
// export const productService = {
//   getAll: () => api.get('/products'),
//   getById: (id) => api.get(/products/${id}),
//   create: (data) => api.post('/products', data),
//   update: (id, data) => api.put(/products/${id}, data),
//   delete: (id) => api.delete(/products/${id})
// };

    export const CartService = {
        addToCart: (itemId, quantity) => api.post(`/cart/add?itemId=${itemId}&quantity=${quantity}`),
        removeFromCart: (cartItemId) =>
          api.delete('/cart/remove', {
            data: cartItemId   // sends { "cartItemId": 123 } in the body
          }),
        getAllCartItems: () => api.get('cart/items'),
        updateQuantity: (itemId, quantity) => api.put('/cart/update', null, {params: { itemId, quantity },
        }),
        checkout: () => api.post('/orders/create'),
    };

    export const RegisterService = {
        signup: (userData) => api.post('/auth/signup/customer', userData), 
        login: (loginData) => api.post('/auth/login',loginData)      
    };

    
    export const SellerService = {
        add: (productData) => api.post('/customer/addProduct', productData),
        update: (productId, productData) => api.put(`/customer/updateProduct/${productId}`, productData),
        delete: (productId) => api.delete(`/customer/removeProduct/${productId}`),
        fetchAll: () => api.get('/customer/products/get')
      };

    export const CustomerService = {
      getAllProducts: () => api.get('/customer/products/getAll')
    }

    export const SearchService = {
      searchProducts: (keyword) => api.get(`/products/search?keyword= ${keyword}`)
    }


export default api;
import axios from "axios";
import { defineStore } from "pinia";
import { useAuthStore } from "./useAuthStore";

const apiUrl = 'http://localhost:4000/products';

export const useProductStore = defineStore('productStore', {
  state: () => ({
    products: [],
    loading: false,
    error: null,
  }),

  actions: {
    async fetchProducts() {
      this.loading = true;
      this.error = null;
      try {
        const res = await axios.get(`${apiUrl}`);
        this.products = res.data;
      } catch (error) {
        throw error;
      } finally {
        this.loading = false;
      }
    },

    async fetchProductsById(id) {
      this.loading = true;
      this.error = null;
      try {
        const res = await axios.get(`${apiUrl}/${id}`);
        return res.data;
      } catch (error) {
        this.error = error;
        throw error;
      } finally {
        this.loading = false;
      }
    },

    async createProduct(productData) {
      this.loading = true;
      this.error = null;
      const authStore = useAuthStore();
      const token = authStore.auth.token;
      try {
        const res = await axios.post(`${apiUrl}`, productData, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (res.status === 201) {
          this.products.push(res.data);
        }
      } catch (error) {
        this.error = error;
        throw error;
      } finally {
        this.loading = false;
      }
    },

    async updateProduct(id, productData) {
      this.loading = true;
      this.error = null;
      const authStore = useAuthStore();
      const token = authStore.auth.token;
      try {
        await axios.put(`${apiUrl}/${id}`, productData, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
      } catch (error) {
        this.error = error;
        throw error;
      } finally {
        this.loading = false;
      }
    },

    async deleteProduct(id) {
      this.loading = true;
      this.error = null;
      const authStore = useAuthStore();
      const token = authStore.auth.token;
      try {
        await axios.delete(`${apiUrl}/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        this.products = this.products.filter((product) => product.id !== id);
      } catch (error) {
        console.log(error);
        this.error = error
        throw error;
      } finally {
        this.loading = false;
      }
    },
  },

  getters: {
    getFormattedUpdatedAt: (state) => {
      return(id) => {
        const product = state.products.find((product) => product.id === id);
        if (product && product.updatedAt) {
          const date = new Date(product.updatedAt);
          return new Intl.DateTimeFormat('bs-BA').format(date);
        }
        return null;
      };
    },
  },
});
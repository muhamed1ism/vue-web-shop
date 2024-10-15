import axios from "axios";
import { defineStore } from "pinia";
import { useAuthStore } from "./useAuthStore";
import { useCartStore } from "./useCartStore";

const apiUrl = 'http://localhost:4000/orders';

const authStore = useAuthStore();
const token = authStore.auth.token;

export const useOrderStore = defineStore('orderStore', {
  state: () => ({
    orders: [],
    loading: false,
    error: null,
  }),

  actions: {
    async createOrder(orderData) {
      this.loading = true;
      this.error = null;
      try {
        const res = await axios.post(`${apiUrl}/`, orderData, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (res.status === 201) {
          this.orders.push(res.data);
          const cartStore = useCartStore();
          cartStore.cart.cartItems = [];
        }
      } catch (error) { } finally { }
    },

    async fetchUserOrders() {
      this.loading = true;
      this.error = null;
      try {
        const res = await axios.get(`${apiUrl}/`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        this.orders = res.data;
      } catch (error) {
        this.error = 'Dohvaćanje narudžbi korisnika nije uspjelo';
        console.log(error);
      } finally {
        this.loading = false;
      }
    },

    async fetchAllOrders() {
      this.loading = true;
      this.error = null;
      try {
        const res = await axios.get(`${apiUrl}/admin`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        this.orders = res.data;
      } catch (error) {
        this.error = 'Dohvaćanje svih narudžbi nije uspjelo';
        console.log(error);
      } finally {
        this.loading = false;
      }
    },

    async updateOrderStatus(id, status) {
      this.loading = true;
      this.error = null;
      try {
        const res = await axios.put(`${apiUrl}/admin/${id}/status`, { status }, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const index = this.orders.findIndex((order) => order.id === id);
        if (index !== -1) {
          this.orders[index] = { ...this.orders[index], status: res.data.status };
        }
      } catch (error) {
      console.error('Error updating order status:', error);
        this.error = 'Ažuriranje statusa narudžbe nije uspjelo';
      } finally {
        this.loading = false;
      }
    },
  },
});
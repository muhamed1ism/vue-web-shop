<template>
  <v-container>
    <v-card rounded="xl" variant="tonal" color="primary">
      <v-card-title class="font-wight-bold text-h4">Order view</v-card-title>
      <v-card-text>
        <v-row>
          <v-col cols="12" md="4">
            <div class="font-weight-medium">Order number: </div> {{ orderId }}
            <div class="font-weight-medium pt-2">Created: </div> {{ formatDate(order.createdAt) }}
            <div class="font-weight-medium pt-2">Price: </div> $ {{ formatPrice(order.total) }}
            <div v-if="authStore.auth.role === 'ADMIN'">
              <div class="font-weight-medium pt-2">Customer's email: </div> {{ userEmail }}
            </div>
            <div class="font-weight-medium pt-2">Status: </div> {{ order.status }}
            <v-card-actions v-if="authStore.auth.role === 'ADMIN' && order.status === 'PENDING'">
              <v-row class="pt-4">
                <v-col cols="6" class="text-end px-1 ">
                  <v-btn append-icon="mdi-checkbox-marked-circle-outline" variant="tonal" rounded color="green"
                    class="w-100" @click="approveOrder">Approve</v-btn>
                </v-col>
                <v-col cols="6" class="text-start px-1" justify-center>
                  <v-btn append-icon="mdi-close-circle-outline" variant="tonal" rounded color="red" class="w-100"
                    @click="cancelOrder">Reject</v-btn>
                </v-col>
              </v-row>
            </v-card-actions>
          </v-col>
          <v-col>
            <v-data-table :headers="headers" :items="products" multi-sort :items-per-page="10" class="text-primary">
              <template v-slot:item.price="{ item }">
                <div>$ {{ item.price }}</div>
              </template>
            </v-data-table>
          </v-col>
        </v-row>

      </v-card-text>
    </v-card>
  </v-container>

</template>

<script setup>
import { useAuthStore } from '@/stores/useAuthStore';
import { useOrderStore } from '@/stores/useOrderStore';
import { useProductStore } from '@/stores/useProductStore';
import { onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute();
const authStore = useAuthStore();
const productStore = useProductStore();
const orderStore = useOrderStore();
const orderId = Number(route.params.id);
const products = ref([]);
const order = ref([]);
const userEmail = ref('');

const headers = [
  { title: "ID", text: "ID", value: "productId", sortable: true },
  { title: "Name", text: "Name", value: "name", sortable: true },
  { title: "Quantity", text: "Quantity", value: "quantity", sortable: true },
  { title: "Price", text: "Price", value: "price", sortable: true },
];

const fetchOrder = async () => {
  try {
    if (authStore.auth.role === 'ADMIN') {
      await orderStore.fetchAllOrders()
    }
    if (authStore.auth.role === 'USER') {
      await orderStore.fetchUserOrders()
    }

    const fetchedOrder = orderStore.orders.filter(order => order.id === orderId);
    order.value = fetchedOrder[0];
  } catch (error) {
    console.error('Error fetching order:', error);
  }
}

const fetchProducts = async () => {
  try {
    await fetchOrder();
    if (order) {
      products.value = order.value.items;
      console.log(products.value);
      if (authStore.auth.role === 'ADMIN') {
        userEmail.value = order.value.user.email;
      }
    }
  } catch (error) {
    console.error('Error fetching products:', error);
  }
}

const approveOrder = async () => {
  try {
    await orderStore.updateOrderStatus(orderId, 'COMPLETED');
    order.value.status = 'COMPLETED';
  } catch (error) {
    console.error('Error approving order:', error);
  }
}

const cancelOrder = async () => {
  try {
    await orderStore.updateOrderStatus(orderId, 'CANCELLED');
    order.value.status = 'CANCELLED';
  } catch (error) {
    console.error('Error approving order:', error);
  }
}

onMounted(
  async () => {
    await fetchProducts();
  }
)

const formatDate = (date) => {
  const newDate = new Date(date);
  if (isNaN(newDate.getDate())) {
    return 'Invalid date';
  }

  return new Intl.DateTimeFormat('hr-HR').format(newDate);
};


const formatPrice = (value) => {
  return new Intl.NumberFormat('hr-HR', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(value);
};

</script>

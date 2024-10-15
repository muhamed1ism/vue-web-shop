<template>
  <v-container>
    <v-card rounded="xl" variant="tonal" color="primary">
      <v-card-title class="font-wight-bold text-h4">Pregled narudžbe</v-card-title>
      <v-card-text>
        <v-row>
          <v-col cols="12" md="4">
            <div class="font-weight-medium">Broj narudžbe: </div> {{ orderId }}
            <div class="font-weight-medium pt-2">Kreirana: </div> {{ formatDate(order.createdAt) }}
            <div class="font-weight-medium pt-2">Cijena: </div> {{ formatPrice(order.total) }} KM
            <div v-if="authStore.auth.role === 'ADMIN'"><div class="font-weight-medium pt-2">Email naručitelja: </div> {{ userEmail }}</div>
            <div class="font-weight-medium pt-2">Status: </div> {{ orderStatus(order.status) }}
            <v-card-actions  v-if="authStore.auth.role === 'ADMIN' && order.status === 'PENDING'">
              <v-row class="pt-4">
                <v-col cols="6" class="text-end px-1 ">
                  <v-btn append-icon="mdi-checkbox-marked-circle-outline" variant="tonal" rounded color="green"
                    class="w-100" @click="approveOrder">Prihvati</v-btn>
                </v-col>
                <v-col cols="6" class="text-start px-1" justify-center>
                  <v-btn append-icon="mdi-close-circle-outline" variant="tonal" rounded color="red" class="w-100"
                    @click="cancelOrder">Odbij</v-btn>
                </v-col>
              </v-row>
            </v-card-actions>
          </v-col>
          <v-col>
            <v-data-table :headers="headers" :items="products" multi-sort items-per-page-text="Broj stavki po stranici"
              :items-per-page="10" class="text-primary">

              <template v-slot:item.price="{ item }">
                <div>{{ item.price }} KM</div>
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
  { title: "Naziv", text: "Naziv", value: "name", sortable: true },
  { title: "Količina", text: "Količina", value: "quantity", sortable: true },
  { title: "Cijena", text: "Cijena", value: "price", sortable: true },
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

const getProductQuantity = (productId) => {
  const items = order.value.items
  if (items) {
    const item = items.find(item => item.productId === productId);
    return item ? item.quantity : null;
  } else {
    return null;
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

const orderStatus = (status) => {
  if (status === 'COMPLETED') {
    return 'PRIHVAĆENA';
  } else if (status === 'PENDING') {
    return 'NA ČEKANJU';
  } else if (status === 'CANCELLED') {
    return 'ODBIJENA';
  }
}
</script>

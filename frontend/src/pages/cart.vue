<template>
  <v-container class="d-flex align-center fill-height">
    <v-card class="w-100" variant="text">
      <v-row class="d-flex justify-center">
        <v-col cols="12" sm="10" md="7" xl="6">
          <div v-if="cartStore.cart.cartItems.length === 0" class="d-flex justify-center align-center">
            <v-card-title class="text-center text-primary text-h3">Korpa je prazna!</v-card-title>
          </div>
          <div v-for="product in products" class="mx-4">
            <v-card :key="product.id" class="my-2" variant="elevated">
              <v-row class="d-flex">
                <v-col cols="12" sm="4">
                  <v-img :src="product.imageUrl" height="100px" class="bg-secondary">
                    <template #placeholder>
                      <RouterLink :to="`/products/${product.id}`" class="text-decoration-none text-primary">
                        <v-row class="fill-height my-auto" align-content="center" justify="center">
                          <v-icon class="alt-icon text-primary">mdi-image-outline</v-icon>
                        </v-row>
                      </RouterLink>
                    </template>
                  </v-img>
                </v-col>
                <v-col>
                  <div class="d-flex flex-column flex-sm-row justify-space-between fill-height">
                    <v-card-title class="text-primary truncate-title">
                      <RouterLink :to="`/products/${product.id}`" class="text-decoration-none text-primary">
                        {{ product.name }}
                      </RouterLink>
                    </v-card-title>
                    <v-card-actions>
                      <v-btn class="text-primary" icon="mdi-close" variant="plain"
                        @click="cartStore.removeProductFromCart(product.id)" />
                    </v-card-actions>
                  </div>
                </v-col>
              </v-row>
            </v-card>
          </div>
        </v-col>

        <v-col cols="12" sm="10" md="5" lg="5" xl="4" class="d-flex flex-column">
          <v-card-title class="text-primary font-weight-medium text-h4">Korpa</v-card-title>
          <div v-for="product in products" class="mx-4 mt-2">
            <v-row :key="product.id" class="my-1 d-flex justify-space-between">
              <v-col sm="5" md="4" lg="6" xl="7">
                <v-card-subtitle class="text-start truncate-name">Naziv</v-card-subtitle>
              </v-col>
              <v-col>
                <v-card-subtitle class="text-end">Količina</v-card-subtitle>
              </v-col>
              <v-col>
                <v-card-subtitle class="text-end">Cijena</v-card-subtitle>
              </v-col>
            </v-row>
            <v-row :key="index" class="my-1 d-flex justify-space-between">
              <v-col sm="5" md="4" lg="6" xl="7">
                <v-card-subtitle class="text-start truncate-name">{{ product.name }}</v-card-subtitle>
              </v-col>
              <v-col>
                <v-card-subtitle class="text-end"> {{ cartStore.getProductQuantity(product.id) }} x</v-card-subtitle>
              </v-col>
              <v-col>
                <v-card-subtitle class="text-end">{{ product.price }} KM</v-card-subtitle>
              </v-col>
            </v-row>
          </div>
          <v-divider opacity="60%"></v-divider>
          <v-card-text class="text-end text-h5 mx-2 mt-2">
            Ukupno: {{ totalPrice }} KM
          </v-card-text>
          <v-row class="d-flex justify-center align-content-start mx-1">
            <v-col cols="12" sm="6" md="12" lg="6">
              <v-btn v-if="authStore.auth.isAuthenticated" width="100%" color="primary" size="large" variant="flat"
                append-icon="mdi-cart" @click="createOrder()" rounded >Završi
                narudžbu</v-btn>
              <v-btn v-if="!authStore.auth.isAuthenticated" width="100%" color="primary" size="large" variant="flat"
                append-icon="mdi-cart" to="/login" rounded >Završi
                narudžbu</v-btn>
            </v-col>
            <v-col cols="12" sm="6" md="12" lg="6">
              <v-btn width="100%" color="primary" size="large" variant="tonal" append-icon="mdi-chevron-right"
                to="/products" rounded >Nastavi
                kupovinu</v-btn>
            </v-col>
          </v-row>
        </v-col>
      </v-row>
    </v-card>

  </v-container>
</template>

<script setup>
import { useAuthStore } from '@/stores/useAuthStore';
import { useCartStore } from '@/stores/useCartStore';
import { useOrderStore } from '@/stores/useOrderStore';
import { computed, onMounted, watch } from 'vue';

const products = ref([]);

const authStore = useAuthStore();
const cartStore = useCartStore();
const orderStore = useOrderStore();

onMounted(
  async () => {
    await cartStore.fetchCartProducts();
    products.value = cartStore.cart.products;
  }
);

watch(
  () => cartStore.cart.cartItems,
  async () => {
    await cartStore.fetchCartProducts();
    products.value = cartStore.cart.products;
  }
);



const totalPrice = computed(() => {
  return products.value.reduce((total, product) => {
    return total += product.price * cartStore.getProductQuantity(product.id);
  }, 0);
});

const createOrder = async () => {
  try {
    const order = {
      "items": [...cartStore.cart.cartItems]
    }
    if (totalPrice.value !== 0) {
      console.log(totalPrice.value);
      await orderStore.createOrder(order);
    }
    window.location.reload();
  } catch (error) {
    if (error.resonse.status >= 400) {
      console.log(error.resonse.data.error);
      throw error;
    }
    throw error;
  }
};
</script>

<style scoped>
.truncate-name {
  max-width: 300px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.truncate-title {
  max-width: 350px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

@media (max-width: 600px) {
  .truncate-title {
    max-width: fit-content;
  }
}

@media (min-width: 601px) and (max-width: 960px) {
  .truncate-title {
    max-width: 220px;
  }
}

@media (min-width: 961px) and (max-width: 1280px) {
  .truncate-name {
    max-width: 140px;
  }
}

@media (min-width: 961px) and (max-width: 1264px) {
  .truncate-title {
    max-width: 180px;
  }
}

@media (min-width: 1265px) {
  .truncate-title {
    max-width: 300px;
  }
}
</style>

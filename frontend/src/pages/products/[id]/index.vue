<template>
  <v-container class="d-flex align-center fill-height">
    <v-card class="w-100" variant="text">
      <v-row class="d-flex justify-center">
        <v-col cols="12" sm="10" md="7" lg="7" xl="6">
          <v-img :src="product.imageUrl" height="400px" rounded="lg" class="bg-secondary"
                 @click="openImageModal(product.imageUrl)">
            <template #placeholder>
              <v-row class="d-flex justify-center align-center fill-height">
                <v-icon size="6rem" class="alt-icon text-primary">mdi-image-outline</v-icon>
              </v-row>
            </template>
          </v-img>
        </v-col>

        <v-col cols="12" sm="10" md="5" lg="5" xl="4" class="d-flex flex-column">
          <v-card-title class="text-primary text-h4">{{ product.name }}</v-card-title>
          <v-card-subtitle class="ml-2">Ažurirano: {{ formattedUpdatedAt }}</v-card-subtitle>
          <v-card-text class="ml-2 text-start text-h5">Zalihe: {{ product.stock }}</v-card-text>

          <v-spacer>
            <v-alert v-model="alertVisible" density="compact" variant="tonal" type="error" class="" rounded="xl">
              Nedovoljna količina zalihe
            </v-alert>
          </v-spacer>

          <v-row align-content="center" align="center" class="mx-6">
            <v-label class="text-h5 pr-2">Količina: </v-label>
            <v-col cols="6" sm="4" md="5" lg="4" xl="3">
              <v-text-field density="compact" variant="outlined" rounded type="number" step="1" min="0"
                :max="product.stock" v-model="quantity" @input="onQuantityChange"
                class="font-weight-medium text-end mx-2 mt-5"></v-text-field>
            </v-col>
            <v-card-text class="text-end text-h4">{{ product.price }} KM</v-card-text>
          </v-row>

          <v-card-actions class="d-flex justify-center">
            <v-row>
              <v-col cols="12" sm="6" md="4" lg="6">
                <v-btn v-if="authStore.auth.isAuthenticated" width="100%" color="primary" size="large" variant="flat" append-icon="mdi-cart"
                  rounded @click="buy()">Kupi</v-btn>
                <v-btn v-if="!authStore.auth.isAuthenticated" width="100%" color="primary" size="large" variant="flat" append-icon="mdi-cart"
                  rounded to="/login" >Kupi</v-btn>
              </v-col>
              <v-col cols="12" sm="6" md="8" lg="6">
                <v-btn v-if="cartStore.cart.isProductInCart" width="100%" color="red" rounded size="large"
                  variant="tonal" append-icon="mdi-cart-remove" @click="removeFromCart()">Ukloni iz korpe</v-btn>
                <v-btn v-if="!cartStore.cart.isProductInCart" width="100%" size="large" color="primary" variant="tonal"
                  rounded append-icon="mdi-cart-plus" @click="addToCart()">Dodaj u korpu</v-btn>
              </v-col>
            </v-row>
          </v-card-actions>
        </v-col>
      </v-row>
      <v-row justify="center">
        <v-col cols="12" sm="10" md="12" lg="12" xl="10">
          <v-card-title class="text-primary text-h5">Opis</v-card-title>
          <v-card-text class="text-medium-emphasis">{{ product.description }}</v-card-text>
        </v-col>
      </v-row>
    </v-card>

    <v-dialog v-model="imageModalVisible" max-width="600px">
      <v-card>
        <v-card-actions>
          <v-spacer />
          <v-btn color="primary" @click="imageModalVisible = false" variant="text" append-icon="mdi-close">Zatvori</v-btn>
        </v-card-actions>
        <v-img :src="selectedImageUrl" aspect-ratio="1.75"></v-img>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script setup>
import { useAuthStore } from '@/stores/useAuthStore';
import { useCartStore } from '@/stores/useCartStore';
import { useProductStore } from '@/stores/useProductStore';
import { onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';
import router from '@/router';

const route = useRoute();
const authStore = useAuthStore();
const productStore = useProductStore();
const cartStore = useCartStore();
const productId = Number(route.params.id);

const product = ref({});
const quantity = ref(1);
const alertVisible = ref(false);
const alertMessage = ref('');
const imageModalVisible = ref(false);
const selectedImageUrl = ref('');

onMounted(
  async () => {
    product.value = await productStore.fetchProductsById(productId);
    cartStore.checkisProductInCart(productId);
    quantity.value = cartStore.getProductQuantity(productId);
  }
);

const openImageModal = (imageUrl) => {
  if (imageUrl !== '') {
    selectedImageUrl.value = imageUrl;
    imageModalVisible.value = true;
  }
};

const formattedUpdatedAt = computed(() => {
  if (product.value.updatedAt) {
    const date = new Date(product.value.updatedAt);
    return new Intl.DateTimeFormat('hr-HR').format(date);
  }
  return 'N/A';
});

const onQuantityChange = () => {
  if (quantity.value < 1) {
    quantity.value = 1;
  }
  if (cartStore.cart.isProductInCart) {
    cartStore.updateProductQuantity(productId, Number(quantity.value));
  }
};

const buy = async () => {
  if (product.value.stock < quantity.value) {
    alertMessage.value = 'Nedovoljna količina zalihe';
    alertVisible.value = true;
    return;
  }
  if (!cartStore.cart.isProductInCart) {
    cartStore.addProductToCart(product.value.id, Number(quantity.value));
  }
  await router.push('/cart');
  window.location.reload();
};

const addToCart = () => {
  if (product.value.stock < quantity.value) {
    alertMessage.value = 'Nedovoljna količina zalihe';
    alertVisible.value = true;
    return;
  }
  cartStore.addProductToCart(product.value.id, Number(quantity.value))
  cartStore.checkisProductInCart(productId);
}

const removeFromCart = () => {
  cartStore.removeProductFromCart(product.value.id);
  cartStore.checkisProductInCart(productId);
}
</script>

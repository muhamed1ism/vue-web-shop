<template>
  <v-container class="px-auto">
    <v-row class="my-4 mx-2">
      <v-col cols="0" sm="7" lg="8">
        <h1 class="font-weight-medium text-primary">Artikli</h1>
      </v-col>
      <v-col cols="12" sm="5" lg="4">
        <v-text-field
          v-model="search"
          label="Pretraži"
          variant="outlined"
          density="compact"
          single-line
          hide-details
          prepend-inner-icon="mdi-magnify"
          class="text-primary"
          rounded
        />
      </v-col>
    </v-row>
    <v-row v-if="loading" justify="center">
      <v-col cols="12" class="text-center">
        <v-progress-circular indeterminate></v-progress-circular>
        <p>Loading products...</p>
      </v-col>
    </v-row>

    <v-row v-if="error" justify="center">
      <v-col cols="12" class="text-center">
        <v-alert type="error">{{ error }}</v-alert>
      </v-col>
    </v-row>

    <v-row v-if="!loading && !error" class="my-12" dense>
      <v-col v-for="product in filteredProducts" cols="12" sm="6" md="4" lg="3">
        <v-card class="mx-2 mx-lg-4 my-4 card-shadow" :key="product.id" variant="flat" rounded="lg">

          <RouterLink :to="`/products/${product.id}`" class="text-decoration-none">
            <v-img :src="product.imageUrl" height="200px" class="bg-secondary">
              <template #placeholder>
                <v-row class="fill-height" align-content="center" justify="center">
                  <v-icon size="6rem" class="alt-icon text-primary">mdi-image-outline</v-icon>
                </v-row>
              </template>
            </v-img>
          </RouterLink>
          <v-card-title>
            <RouterLink :to="`/products/${product.id}`" class="text-decoration-none text-primary">
              {{ product.name }}
            </RouterLink>
          </v-card-title>
          <v-card-text class="fit-text text-medium-emphasis">
            {{ product.description }}
          </v-card-text>
          <v-card-text class="d-flex justify-end font-weight-medium text-h6">{{ product.price }} KM</v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>

</template>

<script setup>
import {useProductStore} from '@/stores/useProductStore';
import {onMounted, ref, watch} from 'vue';

const products = ref([]);
const search = ref('');

const productStore = useProductStore();
const loading = productStore.loading;
const error = productStore.error;

onMounted(
  async () => {
    await productStore.fetchProducts();
    products.value = productStore.products;
  }
);

watch(
  () => productStore.products,
  (newProducts) => {
    products.value = newProducts;
  }
);

const filteredProducts = computed(() => {
  const query = search.value.toLowerCase();
  return products.value.filter(product =>
    product.name.toLowerCase().includes(query) ||
    product.description.toLowerCase().includes(query)
  );
});
</script>

<style scoped>
.fit-text {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
  height: 2.5rem;
}

.card-shadow {
  box-shadow: 0 0 16px 8px rgba(0, 0, 0, 0.15);
}
</style>

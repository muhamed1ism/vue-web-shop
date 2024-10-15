<template>
  <v-container class="my-12">
    <v-row class="d-flex align-center my-4 mx-2 justify-space-between">
      <v-col>
        <h1 class="font-weight-medium text-primary">Manage products</h1>
      </v-col>
      <v-col class="d-flex justify-end align-center" cols="12" sm="7" lg="6">
        <v-text-field v-model="search" prepend-inner-icon="mdi-magnify" label="Search" variant="outlined"
          density="compact" single-line hide-details rounded class="text-primary" />
        <v-btn prepend-icon="mdi-plus" class="ml-4" variant="flat" color="primary" to="/manage/create" size="large"
               rounded
        >
          Add
        </v-btn>
      </v-col>
    </v-row>

    <v-card variant="text">
      <v-data-table :headers="headers" :items="products" :search="search" multi-sort :items-per-page="10"
                    class="text-primary">

        <template v-slot:item.name="{ item }">
          <div class="truncate-name-column">{{ item.name }}</div>
        </template>
        <template v-slot:item.description="{ item }">
          <div class="truncate-description-column">{{ item.description }}</div>
        </template>
        <template v-slot:item.updatedAt="{ item }">
          <div class="truncate-date-column">{{ formatDate(item.updatedAt) }}</div>
        </template>
        <template v-slot:item.createdAt="{ item }">
          <div class="truncate-date-column">{{ formatDate(item.createdAt) }}</div>
        </template>

        <template v-slot:no-data>
          <p>No products</p>
        </template>
        <template v-slot:item.actions="{ item }">
          <v-btn icon="mdi-pencil" variant="tonal" color="primary" rounded="xl" size="small"
            :to="`/manage/update/${item.id}`" class="mx-1" />
          <v-btn icon="mdi-delete" variant="tonal" color="red" rounded="xl" size="small"
            @click="productStore.deleteProduct(item.id)" class="mx-1" />
        </template>
      </v-data-table>
    </v-card>
  </v-container>
</template>

<script setup>
import { useProductStore } from "@/stores/useProductStore";
import { onMounted, ref, watch } from "vue";

const products = ref([]);
const search = ref("");

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

const headers = [
  { title: "ID", text: "ID", value: "id", sortable: true },
  { title: "Name", text: "Name", value: "name", sortable: true },
  { title: "Description", text: "Description", value: "description", sortable: true },
  { title: "Stock", text: "Stock", value: "stock", sortable: true },
  { title: "Updated", text: "Updated", value: "updatedAt", sortable: true },
  { title: "Created", text: "Created", value: "createdAt", sortable: true },
  {
    title: "Actions",
    text: "Actions",
    value: "actions",
    sortable: false,
    align: "center",
  },
];

const formatDate = (date) => {
  const newDate = new Date(date);
  return new Intl.DateTimeFormat('hr-HR').format(newDate);
};

const deleteProduct = async (id) => {
  await productStore.deleteProduct(id);
  await productStore.fetchProducts();
  products.value = productStore.products;
}
</script>

<style scoped>
.truncate-name-column {
  max-width: 300px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.truncate-description-column {
  max-width: 300px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.truncate-date-column {
  width: 81px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

@media (max-width: 600px) {
  .truncate-description-column {
    max-width: 100px;
  }
}

@media (min-width: 601px) and (max-width: 960px) {
  .truncate-name-column {
    max-width: 150px;
  }
}

@media (min-width: 601px) and (max-width: 960px) {
  .truncate-description-column {
    max-width: 150px;
  }
}

@media (min-width: 961px) and (max-width: 1264px) {
  .truncate-name-column {
    max-width: 200px;
  }
}

@media (min-width: 961px) and (max-width: 1264px) {
  .truncate-description-column {
    max-width: 180px;
  }
}

@media (min-width: 1265px) {
  .truncate-description-column {
    max-width: 300px;
  }
}
</style>

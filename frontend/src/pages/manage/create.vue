<template>
  <v-container fluid class="fill-height">
    <v-row class="justify-center">
      <v-col cols="12" sm="8" md="6" lg="4">
        <v-card variant="flat" class="pa-4">
          <v-card-title class="text-center text-h5 text-primary">Dodaj artikal</v-card-title>
          <v-card-item>
            <v-sheet>
              <v-form @submit.prevent="submit">
                <v-label class="pl-4 text-subtitle-1 text-medium-emphasis text-primary opacity-90 font-weight-medium" text="Slika artikla" />
                <v-file-input density="compact" placeholder="Odaberite sliku artikla" variant="outlined" rounded=""
                              v-model="form.image" class="mb-1" />

                <v-label class="pl-4 text-subtitle-1 text-medium-emphasis text-primary opacity-90 font-weight-medium" text="Naziv artikla" />
                <v-text-field density="compact" placeholder="Unesite naziv artikla" variant="outlined" rounded
                  v-model="form.name" :rules="rules.name" class="mb-1" @click:append-inner="visible = !visible"/>

                <v-label class="pl-4 text-subtitle-1 text-medium-emphasis text-primary opacity-90 font-weight-medium" text="Opis artikla" />
                <v-textarea maxlength="250" counter density="compact" placeholder="Unesite opis artikla" variant="outlined" rounded
                  v-model="form.description" :rules="rules.description" class="mb-1"/>

                <v-label class="pl-4 text-subtitle-1 text-medium-emphasis text-primary opacity-90 font-weight-medium" text="Cijena" />
                <v-text-field density="compact" placeholder="Unesite cijenu artikla" variant="outlined" suffix="KM" rounded
                 type="number" step="0.01" v-model="form.price" :rules="rules.price" class="mb-1" />

                <v-label class="pl-4 text-subtitle-1 text-medium-emphasis text-primary opacity-90 font-weight-medium" text="Količina" />
                <v-text-field density="compact" placeholder="Unesite količinu u artikla" variant="outlined" rounded
                 type="number" step="1" min="0" v-model="form.stock" :rules="rules.stock" class="mb-1" />


                <v-alert v-model="alertVisible" density="compact" variant="tonal" type="error" class="mb-4" rounded="xl">
                  {{ alertMessage }}
                </v-alert>

                <v-btn type="submit" block variant="tonal" color="primary" size="large" class="my-2" rounded>Dodaj</v-btn>
              </v-form>
            </v-sheet>
          </v-card-item>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
  import { ref } from 'vue';
  import { useProductStore } from '@/stores/useProductStore';
  import { rules } from '@/components/FormValidationRules';
  import router from '@/router';

  const form = ref({
    name: "",
    description: "",
    price: 10,
    stock: 0,
    image: null,
  });
  const alertVisible = ref(false);
  const alertMessage = ref('');
  const visible = ref(false);

  const productStore = useProductStore();

  const submit = async () => {
    try {
      const formData = new FormData();
      formData.append('name', form.value.name);
      formData.append('description', form.value.description);
      formData.append('price', form.value.price);
      formData.append('stock', form.value.stock);
      if (form.value.image) {
        formData.append('image', form.value.image);
      }

      await productStore.createProduct(formData);
      await router.push('/products');
      window.location.reload();
    } catch (error) {
      if (error.response.status >= 400) {
        alertMessage.value = error.response.data.error;
        alertVisible.value = true;
      }
    }
  };
</script>

<style scoped>
</style>

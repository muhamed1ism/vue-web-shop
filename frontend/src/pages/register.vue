<template>
  <v-container fluid class="fill-height">
    <v-row class="justify-center">
      <v-col cols="12" sm="8" md="6" lg="4">
        <v-card variant="flat" class="pa-4">
          <v-card-title class="text-center text-h5 text-primary">Registracija računa</v-card-title>
          <v-card-item>
            <v-sheet>
              <v-form @submit.prevent="submit">
                <v-label class="px-4 text-subtitle-1 text-medium-emphasis text-primary opacity-90 font-weight-medium" text="Ime i prezime" />
                <v-text-field density="compact" placeholder="Unesite ime i prezime" variant="outlined"
                  v-model="form.name" :rules="rules.name" class="mb-1" rounded/>

                <v-label class="px-4 text-subtitle-1 text-medium-emphasis text-primary opacity-90 font-weight-medium" text="Email" />
                <v-text-field density="compact" placeholder="Unesite email adresu" variant="outlined"
                  v-model="form.email" :rules="rules.email" class="mb-1" rounded/>

                <v-label class="px-4 text-subtitle-1 text-medium-emphasis text-primary opacity-90 font-weight-medium" text="Lozinka" />
                <v-text-field :append-inner-icon="visible ? 'mdi-eye-off' : 'mdi-eye'"
                  :type="visible ? 'text' : 'password'" density="compact" placeholder="Unesite lozinku"
                  variant="outlined" v-model="form.password" @click:append-inner="visible = !visible"
                  :rules="rules.password" class="mb-4" rounded/>

                <v-alert v-model="alertVisible" density="compact" variant="tonal" type="error" class="mb-4" rounded="xl">
                  {{ alertMessage }}
                </v-alert>

                <v-btn type="submit" block variant="tonal" color="blue-primary text-primary" size="large" class="my-2" rounded>Registriraj
                  se</v-btn>

                <v-card-text class="text-center text-medium-emphasis">Imate li račun? <RouterLink to="/login"
                    class="text-primary text-decoration-none">Prijavi se</RouterLink></v-card-text>
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
import { useAuthStore } from '@/stores/useAuthStore';
import { rules } from '@/components/FormValidationRules';
import router from '@/router';

const form = ref({
  name: "",
  email: "",
  password: "",
});
const alertVisible = ref(false);
const alertMessage = ref('');
const visible = ref(false);

const authStore = useAuthStore();
const isAuthenticated = authStore.auth.isAuthenticated;

const submit = async () => {
  try {
    await authStore.register(form.value);
    await router.push('/');
    window.location.reload();
  } catch (error) {
    if (error.response.status >= 400) {
      alertMessage.value = error.response.data.error;
      alertVisible.value = true;
    }
  }
};

if (isAuthenticated) router.push('/');
</script>
<template>
  <v-container fluid class="fill-height">
    <v-row class="justify-center">
      <v-col cols="12" sm="8" md="6" lg="4">
        <v-card variant="flat" class="pa-4">
          <v-card-title class="text-center text-h5 text-primary">Prijava</v-card-title>
          <v-card-item>
            <v-sheet>
              <v-form @submit.prevent="submit">
                <v-label class="px-4 text-subtitle-1 text-medium-emphasis text-primary opacity-90 font-weight-medium" text="Email" />
                <v-text-field density="compact" placeholder="Email adresa" prepend-inner-icon="mdi-email-outline" rounded
                  variant="outlined" v-model="form.email" :rules="rules.email" class="mb-1" append-inner-icon="."/>

                <v-label class="px-4 text-subtitle-1 text-medium-emphasis text-primary opacity-90 font-weight-medium" text="Lozinka" />
                <v-text-field :append-inner-icon="visible ? 'mdi-eye-off' : 'mdi-eye'" rounded
                  :type="visible ? 'text' : 'password'" density="compact" placeholder="Unesite lozinku"
                  prepend-inner-icon="mdi-lock-outline" variant="outlined" v-model="form.password"
                  @click:append-inner="visible = !visible" :rules="rules.password" class="mb-4" />

                <v-alert v-model="alertVisible" density="compact" variant="tonal" type="error" class="mb-4" rounded="xl">
                  {{ alertMessage }}
                </v-alert>

                <v-btn type="submit" block variant="tonal" color="blue-primary" size="large" class="mb-8 text-primary mt-2" rounded>Prijavi
                  se</v-btn>

                <v-card-text class="text-center">
                  <RouterLink class="text-primary text-decoration-none" to="/register">
                    Napravi račun <v-icon icon="mdi-chevron-right" />
                  </RouterLink>
                </v-card-text>
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
import router from "@/router";

const form = ref({
  email: '',
  password: '',
});

const alertVisible = ref(false);
const alertMessage = ref('');
const visible = ref(false);

const authStore = useAuthStore();

const submit = async () => {
  try {
    await authStore.login(form.value);
    await router.push('/');
    window.location.reload();
  } catch (error) {
    console.log(error);
    if (error.response.status >= 400) {
      alertMessage.value = error.response.data.error;
      alertVisible.value = true;
    }
  }
}

if (authStore.auth.isAuthenticated) router.push('/');
</script>
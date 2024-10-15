<template>
  <v-container class="w-100 fill-height justify-center">
    <v-card width="90%" variant="text">
      <v-row class="w-100 pt-16" align="center">
        <v-col cols="11" md="7">
          <v-card-title class="text-h3 w-100 text-primary">O projektu</v-card-title>
          <v-card-text class="text-h5">
            {{ aboutTxt }}
          </v-card-text>
        </v-col>
        <v-col cols="11" md="5">
          <v-img :src="aboutImg" width="100%" height="100%"></v-img>
        </v-col>
      </v-row>

      <v-row class="px-6 py-2 mb-16 w-100">
        <v-card-title class="text-h4 py-2 pt-xl-6 w-100 text-primary">Tehnološki Stack</v-card-title>
        <v-card-text class="text-h6">
          <ul class="px-4">
            <li class="px-2 py-1">
              <div class="font-weight-medium mr-2">Frontend:</div>
              Vue.js s Vuetify za sučelje i Pinia Store za upravljanje stanjem.
            </li>
            <li class="px-2 py-1">
              <div class="font-weight-medium mr-2">Backend:</div>
              Express.js s Prisma ORM za rad s MySQL bazom, pokrenutom u Dockeru.
            </li>
          </ul>
        </v-card-text>
        <v-card-title class="text-h4 py-2 pt-lg-6 w-100 text-primary">Funkcionalnosti</v-card-title>
        <v-card-text class="text-h6">
          <ul class="px-4">
            <li class="px-2 py-1">
              Pregled, filtriranje i naručivanje proizvoda.
            </li>
            <li class="px-2 py-1">
              Korisnički računi s registracijom i prijavom.
            </li>
            <li class="px-2 py-1">
              Admin panel za upravljanje proizvodima i narudžbama.
            </li>
          </ul>
        </v-card-text>
      </v-row>
    </v-card>

  </v-container>
</template>

<script setup>

const aboutImg = '/about-img.png';
const aboutTxt = 'Ovaj projekt je moderna web aplikacija razvijena s Vue.js i Vuetify za\n' +
  '            Stolariju Barbarić, specijaliziranu za prodaju namještaja poput kuhinja,\n' +
  '            ormara i spavaćih soba. Aplikacija omogućava korisnicima pregled i\n' +
  '            naručivanje proizvoda online.';

</script>

<style scoped>

</style>

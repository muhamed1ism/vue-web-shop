<template>
  <v-container class="w-100 fill-height justify-center">
    <v-card width="90%" variant="text">
      <v-row class="w-100 pt-16" align="center">
        <v-col cols="11" md="7">
          <v-card-title class="text-h3 w-100 text-primary">About the Project</v-card-title>
          <v-card-text class="text-h5">
            {{ aboutTxt }}
          </v-card-text>
        </v-col>
        <v-col cols="11" md="5">
          <v-img :src="aboutImg" width="100%" height="100%"></v-img>
        </v-col>
      </v-row>

      <v-row class="px-6 py-2 mb-16 w-100">
        <v-card-title class="text-h4 py-2 pt-xl-6 w-100 text-primary">Technology Stack</v-card-title>
        <v-card-text class="text-h6">
          <ul class="px-4">
            <li class="px-2 py-1">
              <div class="font-weight-medium mr-2">Frontend:</div>
              Vue.js with Vuetify for the interface and Pinia Store for state management.
            </li>
            <li class="px-2 py-1">
              <div class="font-weight-medium mr-2">Backend:</div>
              Express.js with Prisma ORM for working with a MySQL database, running in Docker.
            </li>
          </ul>
        </v-card-text>
        <v-card-title class="text-h4 py-2 pt-lg-6 w-100 text-primary">Features</v-card-title>
        <v-card-text class="text-h6">
          <ul class="px-4">
            <li class="px-2 py-1">
              Browsing, filtering, and ordering products.
            </li>
            <li class="px-2 py-1">
              User accounts with registration and login.
            </li>
            <li class="px-2 py-1">
              Admin panel for managing products and orders.
            </li>
          </ul>
        </v-card-text>
      </v-row>
    </v-card>

  </v-container>
</template>

<script setup>

const aboutImg = '/about-img.png';
const aboutTxt = 'This project is a modern web application developed with Vue.js and Vuetify for Barbarić ' +
  'Carpentry, specialized in selling furniture such as kitchens, wardrobes, and bedrooms. The application allows ' +
  'users to browse and order products online.';

</script>

<style scoped>

</style>

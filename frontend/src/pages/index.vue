<template>
  <v-container :min-height="display.lgAndUp.value ? 'calc(100vh - 120px)' : ''" class="d-flex justify-center align-start align-sm-center">
    <v-card class="w-100" variant="text">
      <v-row class="d-flex justify-center">
        <v-col cols="12" md="12" lg="6" class="px-12">
          <v-img src="/homepage-image.jpg" alt="homepage-image" >
            <template #placeholder>
              <v-row class="fill-height my-auto" align-content="center" justify="center">
                <v-icon class="alt-icon text-primary">mdi-image-outline</v-icon>
              </v-row>
            </template>
          </v-img>
        </v-col>
        <v-col class="d-flex flex-column justify-space-around" cols="11" md="11" lg="6">
          <div>
            <v-card-title class="text-h3 font-weight-medium text-primary text-pre-wrap">Welcome to Stolarija Barbarić</v-card-title>
            <v-card-text class="text-h6 py-sm-8">
              At Barbarić Joinery, we proudly create unique wooden furniture that transforms your home into a space
              you'll enjoy. With years of experience and a dedicated team of experts, we specialize in crafting
              kitchens, bedrooms, wardrobes, and other custom-made furniture pieces.
            </v-card-text>
          </div>

          <div class="d-flex flex-column flex-sm-row py-4 py-sm-8 justify-center">
            <v-btn class="ma-1 ma-md-3" color="primary" :size="btnSize" rounded variant="flat" to="/products"
                   append-icon="mdi-arrow-right" >
              Get Started
            </v-btn>
            <v-btn class="ma-1 ma-md-3" color="primary" :size="btnSize" rounded variant="outlined" to="/about"
                   append-icon="mdi-information" >
              About
            </v-btn>
            <v-btn class="ma-1 ma-md-3" color="black" :size="btnSize" rounded variant="flat" @click="openGithub()"
                   append-icon="mdi-github" >
              Github
            </v-btn>
          </div>
        </v-col>
      </v-row>
    </v-card>
  </v-container>
  <v-card class="w-100 bg-background pb-16" variant="text">
    <v-row width="80%" justify="center">
      <v-col cols="11">
        <v-card-title class="text-h4 pb-8 text-primary font-weight-medium">Our offer includes:</v-card-title>
        <v-card-text class="text-h6 mx-8">
          <ul >
            <li class="px-4 py-1">
              Modern and classic kitchens designed to meet all your needs and aesthetic requirements.
            </li>
            <li class="px-4 py-1">
              Bedrooms that provide the perfect balance between comfort and functionality.
            </li>
            <li class="px-4 py-1">
              Built-in and classic wardrobes customized to your space, ideal for organization and maximizing space
              efficiency.
            </li>
            <li class="px-4 py-1">
              Living rooms, dressers, shelves, and other furniture tailored to your wishes, crafted with attention to
              detail.
            </li>
          </ul>
        </v-card-text>
        <v-card-text class="text-h6">
          Each piece of our furniture is made from high-quality materials, with careful emphasis on design,
          functionality, and longevity. We are here to fulfill all your ideas and desires, whether it’s a small piece
          of furniture or a complete space renovation.
        </v-card-text>
      </v-col>
    </v-row>
  </v-card>
</template>


<script setup>

import { useDisplay } from "vuetify";

const githubLink = 'https://github.com/muhamed1ism/vue-web-shop'
const openGithub = () => {
  window.open(githubLink, '_blank');
}

const display = useDisplay();

const btnSize = computed(() => {
  return display.mdAndUp.value ? 'x-large' : 'large';
})

</script>

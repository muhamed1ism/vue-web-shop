<template>
  <v-navigation-drawer
    width="300"
    location="left"
    temporary
  >
    <v-list nav>
      <v-list-item v-if="$vuetify.display.xs" class="mb-1 d-flex justify-center">
        <v-btn to="/cart" variant="plain" class="mx-4">
          <v-chip color="primary" append-icon="mdi-cart" size="large" class="text-">{{ cartStore.cart.cartItems.length }}</v-chip>
        </v-btn>
        <v-btn
          color="primary"
          variant="text"
          class="mx-4"
          :icon="isDarkMode ? 'mdi-weather-night' : 'mdi-white-balance-sunny'"
          @click="emitToggleTheme"
        />
      </v-list-item>
      <v-list-item
        v-for="(item, index) in navItems"
        color="primary"
        :key="index"
        :prepend-icon="item.icon"
        :link="true"
        :to="item.href"
        exact
        :title="item.title"
      />
    </v-list>
  </v-navigation-drawer>
</template>

<script setup>
  import { useAuthStore } from '@/stores/useAuthStore';
  import {useCartStore} from "@/stores/useCartStore";
  import {useTheme} from "vuetify";

  const authStore = useAuthStore();
  const cartStore = useCartStore();
  const isAdmin = authStore.auth.role === 'ADMIN';
  const isUser = authStore.auth.role === 'USER';

  const props = defineProps({
    isDarkMode: Boolean,
  });

  const emit = defineEmits(['toggle-theme']);

  const theme = useTheme();

  let navItems;

  const guestUserNavItems = [
    { title: 'Početna', icon: 'mdi-home', href: '/' },
    { title: 'Artikli', icon: 'mdi-shopping', href: '/products' },
    { title: 'O nama', icon: 'mdi-information', href: '/about' },
  ];

  const userNavItems = [
    { title: 'Narudžbe', icon: 'mdi-truck', href: '/orders' },
  ];

  const adminNavItems = [
    { title: 'Dodaj artikal', icon: 'mdi-plus-circle-outline', href: '/manage/create' },
    { title: 'Upravljanje artiklima', icon: 'mdi-store-edit', href: '/manage' },
    { title: 'Narudžbe', icon: 'mdi-format-list-bulleted', href: '/orders' },
  ];

  if (isAdmin) {
    navItems = [
      ...guestUserNavItems.slice(0,2),
      ...adminNavItems,
      ...guestUserNavItems.slice(2, 3),
    ];
  } else if (isUser) {
    navItems = [
      ...guestUserNavItems.slice(0, 2),
      ...userNavItems,
      ...guestUserNavItems.slice(2, 3),
    ];
  } else {
    navItems = [
      ...guestUserNavItems,
    ];
  }

  const emitToggleTheme = () => {
    emit('toggle-theme');
  }

  onMounted(() => {
    const storedTheme = localStorage.getItem('theme');
    if (storedTheme) {
      props.isDarkMode = storedTheme === 'true';
      theme.global.name.value = props.isDarkMode ? 'dark' : 'light';
    }
  })
</script>

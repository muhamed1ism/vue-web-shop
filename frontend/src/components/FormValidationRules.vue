<script>
  export const rules = {
    name: [
      (v) => !!v || "Name is required",
    ],

    email: [
      (v) => !!v || "Email is required",
      (v) => /.+@.+/.test(v) || "Email is not valid",
    ],

    password: [
      (v) => !!v || "Lozinka is required",
      (v) => (v && v.length >= 8) || "Password must be at least 8 characters",
    ],

    stock: [
      (v) => v >= 0 || 'Stock must be greater than or equal to 0',
    ],

    price: [
      (v) => !!v || 'Price is required',
      (v) => v > 0 || 'Price must be greater than 0',
    ],
  };
</script>

<template>

</template>

<style scoped>

</style>

<script>
  export const rules = {
    name: [
      (v) => !!v || "Ime i prezime su obavezni",
    ],

    email: [
      (v) => !!v || "Email je obavezan",
      (v) => /.+@.+/.test(v) || "Email nije validan",
    ],

    password: [
      (v) => !!v || "Lozinka je obavezna",
      (v) => (v && v.length >= 8) || "Lozinka mora biti duža od 8 karaktera",
    ],

    stock: [
      (v) => v >= 0 || 'Stanje zalihe ne može biti negativno',
    ],

    price: [
      (v) => !!v || 'Cijena je obavezna',
      (v) => v > 0 || 'Cijena mora biti veća od 0',
    ],
  };
</script>

<template>

</template>

<style scoped>

</style>
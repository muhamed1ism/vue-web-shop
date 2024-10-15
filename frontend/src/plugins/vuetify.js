/**
 * plugins/vuetify.js
 *
 * Framework documentation: https://vuetifyjs.com`
 */

// Styles
import '@mdi/font/css/materialdesignicons.css'
import 'vuetify/styles'

// Composables
import { createVuetify } from 'vuetify'

// https://vuetifyjs.com/en/introduction/why-vuetify/#feature-guides
export default createVuetify({
  theme: {
    defaultTheme: 'light',
    themes: {
      light: {
        colors: {
          primary: '#805426',
          secondary: '#f0eae5',
        },
      },
      dark : {
        colors: {
          primary: '#dab07c',
          secondary: '#2d2925',
          background: '212121',

        },
      },
    },
  },
})

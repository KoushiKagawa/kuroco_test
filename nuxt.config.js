require('dotenv').config();

const { ROOT_MNG_URL } = process.env;
const { ROOT_API_URL } = process.env;
const { BASE_URL } = process.env

module.exports = {
  /*
  ** Headers of the page
  */
  head: {
    title: 'koushikagawa.com',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: 'Nuxt.js project' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ],
  },
  /*
  ** Customize the progress bar color
  */
  loading: { color: '#3B8070' },
  
  axios: {
    withCredentials: true,
    
    baseURL: process.env.BASE_URL,
    credentials: true,
    withCredentials: true
         
  },

  
  /*
  ** Build configuration
  */
   build: {
    /*
    ** Run ESLint on save
    */
    extend (config, { isDev, isClient }) {
      if (isDev && isClient) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/
        })
      }
    }
  },
  css: [
    '@/assets/scss/app.scss'
  ],
  modules: [
    '@nuxtjs/axios',
    '@nuxtjs/vuetify',
    /*'bootstrap-vue/nuxt',*/
    '@nuxtjs/google-gtag',
    '@nuxtjs/tailwindcss',
    '@nuxt/content',
    '@nuxtjs/recaptcha'
  ],
  
  /*
  recaptcha: {
    hideBadge: true,
    siteKey: '6Lf0pMwcAAAAACGnNa6nqBVATAudJT0VJki6kHP-',
    version: 3
  },
  */
  recaptcha: {
    hideBadge: true,
    language: 'ja',
    siteKey: '6LdQppsdAAAAAJOXsOAcPyM-sATEb7wyT0UQphFs',
    version: 2,
    size: 'normal'        // Size: 'compact', 'normal', 'invisible' (v2)
  },
  
  'google-gtag': {
    id: 'UA-197463870-1',
    //debug: true, 
  }  ,
  env: {
    BASE_URL,
    ROOT_MNG_URL,
    ROOT_API_URL
  }
}


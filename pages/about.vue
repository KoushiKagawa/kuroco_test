<template>

  <section class="container">
    <Navbar />
    <h1 class="h1">Nuxt Bootstrap</h1>
    <b-button variant="primary">Primary Button</b-button>
    <div>
      <h1>test</h1>
      <h2>test</h2>
      <h3>test</h3>
      <h4>test</h4>
      <h5>test</h5>
    </div>
  </section>
</template>

<script>
import AppLogo from '~/components/AppLogo.vue'
import Navbar from '~/components/Navbar.vue'

export default {
  components: {
    AppLogo,
    Navbar
  }
}
</script>

<style>

</style>


<template>
  <section class="container">
    <div>
      <h1 class="title">
        KoushiKagawa.com
      </h1>
      <div class="links">
      <p>for Japanese</p>
        <a
          href="https://twitter.com/koushikagawa"
          target="_blank"
          class="button--grey">Twitter</a>
        <a
          href="https://note.com/koushikagawa"
          target="_blank"
          class="button--grey">note</a>
        <a
          href="https://github.com/KoushiKagawa"
          target="_blank"
          class="button--grey">GitHub</a>
        <a
          href="https://www.linkedin.com/in/koushikagawa/"
          target="_blank"
          class="button--grey">LinkedIn</a>
      </div>
      <div class="links">
        <a
          href="/blogs"
          class="button--grey">Blog</a>
          <a
          href="/form"
          class="button--grey">Contact</a>
      </div>
    </div>
  </section>
</template>

<script>
import AppLogo from '~/components/AppLogo.vue'

export default {
  components: {
    AppLogo
  }
}
</script>

<style>
.container {
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
}

.title {
  font-family: "Quicksand", "Source Sans Pro", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif; /* 1 */
  display: block;
  font-weight: 300;
  font-size: 100px;
  color: #35495e;
  letter-spacing: 1px;
}

.subtitle {
  font-weight: 300;
  font-size: 42px;
  color: #526488;
  word-spacing: 5px;
  padding-bottom: 15px;
}

.links {
  padding-top: 15px;
}
</style>


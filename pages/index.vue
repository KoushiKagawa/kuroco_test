<template>
  <div>
    <Header/>

    <!-- Message -->
    <div class="Main font-sans flex flex-col sm:flex-row py-2 px-6 bg-white sm:items-end">
      <div class="Copy_text flex-auto">
        <h1 class="text-5xl leading-tight">Hello, I'm Koushikagawa. I write, share and listen about web development.</h1>
      </div>
      <div class="Copy_img flex-auto">
        <img class="w-96 self-center mt-6 rounded-lg" src="@/assets/images/heatghost.JPG">
      </div>
    </div>
  
    <!-- MENU-->
    <div class="Menu grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 gap-4 font-sans py-2 px-6 bg-white mt-32">
      <div>
        <h2 class="text-3xl border-b">💁 ABOUT</h2>
          <ul class="pl-2">
            <li class="py-1 text-lg"><NuxtLink to="/about/me/">About</NuxtLink></li>
            <li class="py-1 text-lg"><a href="https://twitter.com/koshikagawa">Twitter</a></li>
            <li class="py-1 text-lg"><a href="https://github.com/KoushiKagawa">GitHub</a></li>
            <li class="py-1 text-lg"><a href="https://www.instagram.com/kagawa_en/">Instagram</a></li>
          </ul>
      </div>
      <div>
        <h2 class="text-3xl border-b">✍️ WORK</h2>
          <ul class="pl-2">
            <li class="py-1 text-lg"><a href="https://kuroco.app/docs/">Kuroco Docs</a></li>
            <li class="py-1 text-lg"><NuxtLink to="/demo/list/">Kuroco Tutorials</NuxtLink></li>
            <!--<li class="py-1 text-lg"><a href="https://www.sweet-bakery.co.jp/">SWEET bakery</a></li>-->
          </ul>
      </div>
      <div>
        <h2 class="text-3xl border-b">❤️ BLOG</h2>
        <ul
          v-for="n in response.list"
          :key="n.slug"
          class ="pl-2"
        >
          <li class="py-1 text-lg">
            <NuxtLink
                :to="'/blogs/' + n.slug"
                class="no-underline"
            >
            {{ n.subject }}
            </NuxtLink>
          </li>
        </ul>
      </div>
      <div>
        <h2 class="text-3xl border-b">🗻 for JAPANESE</h2>
          <ul class="pl-2">
            <li class="py-1 text-lg"><a href="https://koushikagawa.github.io/">About</a></li>
            <li class="py-1 text-lg"><a href="https://note.com/koushikagawa/">note</a></li>
            <li class="py-1 text-lg"><a href="https://twitter.com/koushikagawa">Twitter</a></li>
          </ul>
      </div>
    </div>

    <Footer/>

  </div>
</template>

<script>
import Menu from "@/components/Menu.vue";
import Header from "@/components/Header.vue";
import Footer from "@/components/Footer.vue";

export default {
  components: {
			Menu,
      Header,
      Footer
	},
  async asyncData({ $axios }) {
    try {
      const response = await $axios.$get(
        process.env.ROOT_MNG_URL + '/rcms-api/1/enbloglist'
      )
      return { response }
    } catch (e) {
      console.log(e.message)
    }
  }
}
</script>
<style>
</style>
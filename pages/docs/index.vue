<template>
  <div>
    <div class="Header">
      <nav class="font-sans flex flex-col text-center content-center sm:flex-row sm:text-left sm:justify-between py-2 px-6 bg-white sm:items-baseline w-full">
        <div class="mb-2 sm:mb-0 flex flex-row">
          <!--
          <div class="h-10 w-10 self-center mr-2">
            <img class="h-10 w-10 self-center" src="https://csscomps.com/images/csscomps.png" />
          </div>
          -->
          <div>
            <a href="/" class="text-2xl no-underline text-grey-darkest hover:text-blue-dark font-sans font-bold">koushikagawa.com</a><br>
            <!--<span class="text-xs text-grey-dark">Beautiful New Tagline</span>-->
          </div>
        </div>
<!--
        <div class="sm:mb-0 self-center">
          <a href="#" class="text-md no-underline text-black hover:text-blue-dark ml-2 px-1">Link1</a>
          <a href="#" class="text-md no-underline text-grey-darker hover:text-blue-dark ml-2 px-1">Link2</a>
          <a href="#" class="text-md no-underline text-grey-darker hover:text-blue-dark ml-2 px-1">Link3</a>
        </div>
-->
      </nav>
    </div>

    <div class="Main font-sans flex flex-col sm:flex-row py-2 px-6 bg-white sm:items-end">
      <div class="Copy_text flex-auto">
        <h1 class="text-5xl leading-tight">Hello, I'm Koushikagawa. I write, speak and listen about web technology.</h1>
      </div>
      <div class="Copy_img flex-auto">
        <img class="w-96 self-center" src="@/assets/images/pm_1.jpg">
      </div>
    </div>
  
    <div class="Menu grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 gap-4 font-sans py-2 px-6 bg-white mt-32">
      <div>
        <h2 class="text-4xl border-b">ABOUT</h2>
          <ul class="pl-2">
            <li class="py-2 text-xl"><NuxtLink to="/who">who</NuxtLink></li>
            <li class="py-2 text-xl"><a href="https://twitter.com/koshikagawa">Twitter</a></li>
            <li class="py-2 text-xl"><a href="https://github.com/KoushiKagawa">GitHub</a></li>
          </ul>
      </div>
      <div>
        <h2 class="text-4xl border-b">WORK</h2>
          <ul class="pl-2">
            <li class="py-2 text-xl"><a href="https://kuroco.app/docs/">Kuroco Docs</a></li>
            <li class="py-2 text-xl"><a href="https://www.sweet-bakery.co.jp/">SWEET bakery</a></li>
          </ul>
      </div>
      <div>
        <h2 class="text-4xl border-b">BLOG</h2>
        <ul
          v-for="n in response.list"
          :key="n.slug"
          class ="pl-2"
        >
          <li class="py-2 text-xl">
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
        <h2 class="text-4xl border-b">for JAPANESE</h2>
          <ul class="pl-2">
            <li class="py-2 text-xl"><a href="https://koushikagawa.github.io/">who</a></li>
            <li class="py-2 text-xl"><a href="https://note.com/koushikagawa/">note</a></li>
            <li class="py-2 text-xl"><a href="https://twitter.com/koushikagawa">twitter</a></li>
          </ul>
      </div>
    </div>

<!--        
    <Menu /> 
-->

    <div class="Description font-sans flex flex-col sm:flex-row py-2 px-6 bg-white sm:items-end">
      This site is build Nuxt.js, tailwindcss, Kuroco
    </div>

    <!--<div class="Footer font-sans flex flex-col sm:flex-row py-2 px-6 bg-white sm:items-end">-->
    <div class="Footer font-sans py-2 px-6 bg-white sm:items-end">
      <footer>
        © 2021 Copyright koushikagawa.com All rights reserved.
      </footer>
    </div>

  </div>
</template>

<script>
import Menu from "@/components/Menu.vue";

export default {
  components: {
			Menu
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
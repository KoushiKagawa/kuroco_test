<template>
  <div>
    <Header/>
  
    <!-- MENU-->
    <main class="content">
        <div class="max-w-3xl mx-auto px-4 sm:px-6 xl:max-w-3xl xl:px-0 m-4 break-words">  
            <h1 class="text-3xl font-extrabold text-gray-900 tracking-tight sm:text-4xl md:text-[4rem] md:leading-[3.5rem] leading-10">❤️ BLOG</h1>
            <ul
            v-for="n in response.list"
            :key="n.slug"
            class ="pl-2 list-disc list-inside"
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
    </main>

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
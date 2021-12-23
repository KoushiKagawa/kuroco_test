<template>
  <div>
    <Header /> 
    <div class="max-w-3xl mx-auto px-4 sm:px-6 xl:max-w-3xl xl:px-0 m-4 break-words">
      <h1>Sample list</h1>
      <div v-for="n in response.list" :key="n.slug">
        <nuxt-link :to="'/demo/samples/'+ n.slug">{{n.ymd}} {{n.subject}}</nuxt-link>
      </div>
      <DemoLink/>
    </div>
    <Footer/>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import Header from "@/components/Header.vue";
import Footer from "@/components/Footer.vue";
import DemoLink from "@/components/DemoLink.vue";

export default {
    components: {
        Header,
        Footer,
        DemoLink
	  },
    //middleware: 'auth',
    async asyncData ({ $axios }) {
        try {
            const response = await $axios.$get(process.env.ROOT_MNG_URL + '/rcms-api/1/samples')
            return { response }
        }catch (e) {
            console.log(e.message)
        }
    },
    methods: {
        ...mapActions(['logout'])
    }
}
</script>
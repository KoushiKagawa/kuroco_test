<template>
  <div>
    <div v-for="n in response.list" :key="n.slug">
      <nuxt-link :to="'/blogs/'+ n.slug">{{n.ymd}} {{n.subject}}</nuxt-link>
    </div>
  </div>
</template>

<script>
export default {
    async asyncData ({ $axios }) {
        try {
            //const response = await $axios.$get(process.env.BASE_URL + '/rcms-api/1/blogs')
            //const response = await $axios.$get('https://kagawa.g.kuroco.app/rcms-api/1/blogs')
            const response = await $axios.$get(process.env.ROOT_MNG_URL + '/rcms-api/1/blogs')
            return { response }
        }catch (e) {
            console.log(e.message)
        }
    }
}
</script>
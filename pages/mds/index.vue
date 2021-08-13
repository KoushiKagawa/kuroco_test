<template>
 <div>aaa
   <div v-for="b in mds" :key="b.slug">
     <nuxt-link :to="'/mds/'+ b.slug">{{b.title}} {{b.date}}</nuxt-link>
   </div>
 </div>
</template>
<script>
export default {
 async asyncData ({ $content, params }) {
   const query = await $content('mds' || 'index').limit(10)
   const mds = await query.fetch()
   return { mds }
 }
}
</script>
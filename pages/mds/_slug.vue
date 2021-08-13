<template>
 <article>
   <h1>{{mds.title}}</h1>
   <p>{{mds.date}}</p>
   <nuxt-content :document="mds" />
 </article>
</template>
<script>
export default {
 async asyncData ({ $content, params }) {
   const mds = await $content('mds', params.slug || 'index').fetch()
   return { mds }
 }
}
</script>
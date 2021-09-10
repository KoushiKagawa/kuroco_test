<template>
    <div>
        <Nav /> 
        <main>
            <div class="max-w-3xl mx-auto px-4 sm:px-6 xl:max-w-3xl xl:px-0 m-4">  
                  <h1 class="text-3xl font-extrabold text-gray-900 tracking-tight sm:text-4xl md:text-[4rem] md:leading-[3.5rem] leading-10">{{about.title}}</h1>
                  <nuxt-content :document="about" class="content"/>
            </div>
        </main>
    </div>
</template>
<script>
export default {
 async asyncData ({ $content, params }) {
   const about = await $content('about', params.slug || 'index').fetch()
   return { about }
 }
}
</script>
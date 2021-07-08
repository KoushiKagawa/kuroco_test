<template>
<body>
  <div class="frame-root">
    <div class="frame-content">
      <!-- header -->
      <header class="text-gray-600 body-font">
        <div class="container mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center">
          <a class="flex title-font font-medium items-center text-gray-900 mb-4 md:mb-0"><svg xmlns="http://www.w3.org/2000/svg" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" class="w-10 h-10 text-white p-2 bg-indigo-500 rounded-full" viewBox="0 0 24 24"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"></path></svg>
            <span class="ml-3 text-xl">Tailblocks</span>
          </a>
          <nav class="md:ml-auto flex flex-wrap items-center text-base justify-center">
            <a class="mr-5 hover:text-gray-900" href="/">HOME</a>
            <a class="mr-5 hover:text-gray-900" href="/form">Blog</a>
            <a class="mr-5 hover:text-gray-900"> Link</a>
            <a class="mr-5 hover:text-gray-900">Fourth Link</a>
          </nav>
          <button class="inline-flex items-center bg-gray-100 border-0 py-1 px-3 focus:outline-none hover:bg-gray-200 rounded text-base mt-4 md:mt-0">Button<svg fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" class="w-4 h-4 ml-1" viewBox="0 0 24 24"><path d="M5 12h14M12 5l7 7-7 7"></path></svg></button>
        </div>
      </header>

      <!-- main -->
      <section class="text-gray-600 body-font">
        <div class="container px-5 py-24 mx-auto">
          <div class="flex flex-wrap -m-4">
            <div v-for="n in response.list" :key="n.slug" class="p-4 md:w-1/3">
              <div class="h-full border-2 border-gray-200 border-opacity-60 rounded-lg overflow-hidden">
                <img v-if="n.ext_col_01.url" class="lg:h-48 md:h-36 w-full object-cover object-center" :src="n.ext_col_01.url" alt="blog">
                <div class="p-6">
                  <h2 class="tracking-widest text-xs title-font font-medium text-gray-400 mb-1">CATEGORY</h2>
                  <h1 class="title-font text-lg font-medium text-gray-900 mb-3"><nuxt-link :to="'/blogs/'+ n.slug">{{n.ymd}}{{n.subject}}</nuxt-link></h1>
                  <p class="leading-relaxed mb-3">Photo booth fam kinfolk cold-pressed sriracha leggings jianbing microdosing tousled waistcoat.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  </div>
</body>
</template>

<script>
export default {
    async asyncData ({ $axios }) {
        try {
            const response = await $axios.$get(process.env.ROOT_MNG_URL + '/rcms-api/1/search')
            return { response }
        }catch (e) {
            console.log(e.message)
        }
    }
}
</script>
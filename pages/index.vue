<template>
  <div>
    <Nav /> 
    <main>
    <div class="max-w-3xl mx-auto px-4 sm:px-6 xl:max-w-5xl xl:px-0 m-4">    
      <div class="divide-y divide-gray-200">
        <h1 class="text-3xl font-extrabold text-gray-900 tracking-tight sm:text-4xl md:text-[4rem] md:leading-[3.5rem]">Popular blog posts</h1>
        <ul
          v-for="n in response.list"
          :key="n.slug"
          class ="divide-y divide-gray-200"
        >
          <NuxtLink
            :to="'/blogs/' + n.slug"
            class="light:bg-light-surface dark:bg-dark-surface flex flex-col-reverse lg:flex-row mb-8 rounded p-4 sm:p-8 lg:p-4 light:hover:bg-gray-200 dark:hover:bg-gray-800 cursor-pointer transition-colors duration-300 ease-linear"
          >
          <li class="py-1.5">
            <article class="space-y-2 xl:grid xl:grid-cols-4 xl:space-y-0 xl:items-baseline">
              <dl>
                <dt class="sr-only">Published on</dt>
                <dd class="text-base font-medium text-gray-500 mr-4">
                  <time datetime="2021-08-11T19:30:00.000Z">{{ n.ymd }}</time>
                  <img
                    v-if="n.ext_col_01.url"
                    class="h-48 xxlmin:w-1/2 xxlmax:w-full object-cover rounded-md"
                    :src="n.ext_col_01.url"
                  />
                </dd>
              </dl>
              <div class="space-y-5 xl:col-span-3">
                <div class="space-y-6">
                  <h2 class="text-2xl font-bold tracking-tight"><span>{{ n.subject }}</span></h2>
                  <div class="prose max-w-none text-gray-500">
                    <div class="prose max-w-none">
                      <p>{{ n.ext_col_02 }}</p>
                    </div>
                  </div>
                </div>
                <div class="text-base font-medium">
                  <span class="text-teal-600 hover:text-teal-700" aria-label="Read &quot;Introducing Tailwind UI Ecommerce&quot;">Read more -></span>
                </div>
              </div>
            </article>
          </li>
          </NuxtLink>
          <!--
          <NuxtLink
            :to="'/sample/' + n.slug"
            class="light:bg-light-surface dark:bg-dark-surface flex flex-col-reverse lg:flex-row mb-8 rounded p-4 sm:p-8 lg:p-4 light:hover:bg-gray-200 dark:hover:bg-gray-800 cursor-pointer transition-colors duration-300 ease-linear"
          >
          <h2 class="font-bold">{{ n.subject }}</h2>
          <p class="font-bold text-gray-600 text-sm">{{ n.ymd }}</p>
          <img
              v-if="n.ext_col_01.url"
              class="h-48 xxlmin:w-1/2 xxlmax:w-full object-cover"
              :src="n.ext_col_01.url"
          />
          </NuxtLink>
          -->
        </ul>
      </div>
    </div>
    </main>
  </div>
</template>

<script>
import Nav from "@/components/Nav.vue";

export default {
  components: {
			Nav
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

<template>
    <div class="Menu grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 gap-4 font-sans py-2 px-6 bg-white mt-8">
      <div>
        <h2 class="text-4xl border-b">ABOUT</h2>
          <ul class="pl-2">
            <li class="py-2 text-xl"><NuxtLink to="/sample">who</NuxtLink></li>
            <li class="py-2 text-xl"><NuxtLink to="/sample">about</NuxtLink></li>
          </ul>
      </div>
      <div>
        <h2 class="text-4xl border-b">WORK</h2>
          <ul class="pl-2">
            <li class="py-2 text-xl"><NuxtLink to="/sample">who</NuxtLink></li>
            <li class="py-2 text-xl"><NuxtLink to="/sample">about</NuxtLink></li>
            <li class="py-2 text-xl"><NuxtLink to="/sample">about</NuxtLink></li>
          </ul>
      </div>
      <div>
        <h2 class="text-4xl border-b">BLOG</h2>
        <!--
          <ul class="pl-2">
            <li class="py-2 text-xl"><NuxtLink to="/sample">who</NuxtLink></li>
            <li class="py-2 text-xl"><NuxtLink to="/sample">about</NuxtLink></li>
            <li class="py-2 text-xl"><NuxtLink to="/sample">about</NuxtLink></li>
          </ul>
        -->
        <!--
        <ul
          v-for="n in response.list"
          :key="n.slug"
          class ="pl-2"
        >
          <li class="py-2 text-xl">
            <NuxtLink
                :to="'/blogs/' + n.slug"
            >
            {{ n.subject }}
            </NuxtLink>
          </li>
        </ul>
        -->
      </div>
      <div>
        <h2 class="text-4xl border-b">PROJECT</h2>
          <ul class="pl-2">
            <li class="py-2 text-xl"><NuxtLink to="/sample">who</NuxtLink></li>
            <li class="py-2 text-xl"><NuxtLink to="/sample">about</NuxtLink></li>
            <li class="py-2 text-xl"><NuxtLink to="/sample">about</NuxtLink></li>
          </ul>
      </div>
    </div>
</template>

<script>
export default {
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
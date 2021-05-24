<template>
  <section class="container">
    <div>
        test
    </div>
  </section>
</template>

<script>
export default {
    async asyncData ({ $axios }) {
        try {
            const response = await $axios.$get(process.env.ROOT_MNG_URL + '/rcms-api/1/contact')
            return { response }
            console.log("ok")
        }catch (e) {
            console.log(e.message)
            console.log("error")
        }
    }
}
</script>
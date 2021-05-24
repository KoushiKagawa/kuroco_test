<template>
    <div>
        <h1 class="title">{{ response.details.subject }}</h1>
        <div class="post" v-html="response.details.contents"></div>
    </div>
</template>

<script>
export default {
    async asyncData ({ $axios, params }) {
        try {
            const response = await $axios.$get(process.env.ROOT_MNG_URL + '/rcms-api/2/blogdetail/' + `${params.slug}`)
            console.log(response);
            return { response }
        }catch (e) {
            console.log(e.message)
        }
    }
}
</script>
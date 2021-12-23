<template>
    <div>
        <Header />
        <div class="max-w-3xl mx-auto px-4 sm:px-6 xl:max-w-3xl xl:px-0 m-4 break-words">
            <h1 class="title">{{ response.details.subject }}</h1>
            <div class="post" v-html="response.details.contents"></div>
        </div>
        <Footer/>
    </div>
</template>

<script>
import Header from "@/components/Header.vue";
import Footer from "@/components/Footer.vue";

export default {
    components: {
        Header,
        Footer
	},

    async asyncData ({ $axios, params }) {
        try {
            const response = await $axios.$get(process.env.ROOT_MNG_URL + '/rcms-api/1/sampledetail/' + `${params.slug}`)
            console.log(response);
            return { response }
        }catch (e) {
            console.log(e.message)
        }
    }
}
</script>
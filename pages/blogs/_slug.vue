<template>
    <div>
        <Header /> 
        <main class="content">
            <div class="max-w-3xl mx-auto px-4 sm:px-6 xl:max-w-3xl xl:px-0 m-4 break-words">  
                <h1 class="text-3xl font-extrabold text-gray-900 tracking-tight sm:text-4xl md:text-[4rem] md:leading-[3.5rem] leading-10">{{ response.details.subject }}</h1>
                <img class="object-cover w-full h-full my-4 rounded-md" :src="response.details.ext_col_01.url">
                <div v-html="response.details.contents"></div>
            </div>
        </main>
        <Footer /> 
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
            const response = await $axios.$get(process.env.ROOT_MNG_URL + '/rcms-api/1/enblogdetail/' + `${params.slug}`)
            //const response = await $axios.$get('/rcms-api/1/enblogdetail/' + `${params.slug}`)
            console.log(response);
            return { response }
        }catch (e) {
            console.log(e.message)
        }
    }
}
</script>
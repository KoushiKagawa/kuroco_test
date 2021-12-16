<template>
    <div>
        <Header /> 
        <main class="content">
            <div class="max-w-3xl mx-auto px-4 sm:px-6 xl:max-w-3xl xl:px-0 m-4 break-words">
                <h1>{{trial.title}}</h1>
                <nuxt-content :document="trial" />
            </div>
        </main>
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

    async asyncData ({ $content, params }) {
        const trial = await $content('trial', params.slug || 'index').fetch()
        return { trial }
    }
}
</script>

<style scoped>
table, td, th {
    border-collapse: collapse;
    border: 1px solid #333;
}
</style>
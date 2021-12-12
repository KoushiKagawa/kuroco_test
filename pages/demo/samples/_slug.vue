<template>
    <div>
        <Header />
        <div class="max-w-3xl mx-auto px-4 sm:px-6 xl:max-w-3xl xl:px-0 m-4 break-words">
            <h1 class="title">{{ response.details.subject }}</h1>
            <div class="post" v-html="response.details.contents"></div>

            <!-- コメント -->
            <h3>コメントする</h3>
            
            <form @submit.prevent="login">
                <p v-if="loginStatus !== null" :style="{ color: resultMessageColor }">
                    {{ resultMessage }}
                </p>
                <textarea 
                    v-model="message"
                    class="form-textarea mt-1 block w-full"
                    rows="3"
                    placeholder="add multiple lines"
                ></textarea>
                <!--
                <input v-model="email" name="email" type="email" placeholder="email">
                <input
                    v-model="password"
                    name="password"
                    type="password"
                    placeholder="password"
                >
                -->
                <button type="submit">
                    コメントする
                </button>
            </form>

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
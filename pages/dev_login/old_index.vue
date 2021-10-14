<template>
    <div class="login-form">
        <form @submit.prevent="login">
        <p class="error" v-if="error">{{ error }}</p>
        <p><input type="text" v-model="email" placeholder="email" name="email"/></p>
        <p><input type="text" v-model="password" placeholder="password" name="password"/></p>
        <div class="login-btn">
            <button type="submit">ログイン</button>
        </div>
        </form>
    </div>
</template>

<script>
export default {
    async asyncData ({ $axios }) {
        try {
            const response = await $axios.$get(process.env.ROOT_MNG_URL + '/rcms-api/1/samples')
            return { response }
        }catch (e) {
            console.log(e.message)
        }
    }
}
</script>
<template>
  <form @submit.prevent="login">
    <p v-if="loginStatus !== null" :style="{ color: resultMessageColor }">
        {{ resultMessage }}
    </p>
    <input name="email" type="email" v-model="email" placeholder="email" />
    <input
      name="password"
      type="password"
      v-model="password"
      placeholder="password"
    />
    <button type="submit">ログイン</button>
    <nuxt-link to="/news">newsページへ</nuxt-link>
  </form>
</template>

<script>
export default {
  data() {
    return {
      email: '',
      password: '',
      loginStatus: null,
      resultMessage: null,
    }
  },
  computed: {
    resultMessageColor() {
      switch (this.loginStatus) {
        case 'success':
          return 'green'
        case 'failure':
          return 'red'
        default:
          return ''
      }
    },
  },
  methods: {
async login() {
      
      try {
      const payload = {
          email: this.email,
          password: this.password,
        }
        await this.$store.dispatch('login', payload)
      
      this.loginStatus = 'success'
        this.resultMessage = 'ログインに成功しました。'
      } catch (e) {
        this.loginStatus = 'failure'
        this.resultMessage = 'ログインに失敗しました。'
      }
    },
  },
}
</script>
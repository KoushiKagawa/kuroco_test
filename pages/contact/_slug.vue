
<template>
  <div>
    <h1>フォーム</h1>
    <form @submit.prevent>
      <label>入力：
        <b-form-input v-model="name" placeholder="入力ください" type="text" @keyup.enter="submit" />
      </label>
      <b-button type="submit" @click="submit">
        送信
      </b-button>
    </form>
  </div>
</template>

<script>
export default {
    async asyncData ({ $axios, params }) {
        try {
            const response = await $axios.$get(process.env.ROOT_MNG_URL + '/rcms-api/1/contact/' + `${params.slug}`)
            console.log(response);
            return { response }
        }catch (e) {
            console.log(e.message)
        }
    }
}
</script>
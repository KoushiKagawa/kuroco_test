<template>
    <div>
      <h1 class="title">{{ response.details.subject }}</h1>
      <div class="post" v-html="response.details.contents"></div>

      ## firebase
    <iframe
        :src="response.details.ext_col_02.url"
        width="640"
        height="360"
        frameborder="0"
        allowfullscreen
    ></iframe>

        ## Vimeo
      <iframe
        :src="response.details.ext_col_03.url"
        width="640"
        height="360"
        frameborder="0"
        allowfullscreen
    ></iframe>
    
    ## 画像
    {{ response.details.ext_col_01.url }}

    <img src="https://kagawa.g.kuroco-img.app/v=1623906367/files/topics/959_ext_01_0.png">
    <img :src="response.details.ext_col_01.url">
    

    </div>

    
    
</template>

<script>
export default {
    async asyncData ({ $axios, params }) {
        try {
            const response = await $axios.$get(process.env.ROOT_MNG_URL + '/rcms-api/1/blogdetail/' + `${params.slug}`)
            console.log(response);
            return { response }
        }catch (e) {
            console.log(e.message)
        }
    }
}
</script>
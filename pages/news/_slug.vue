<template>
    <div>
      <h1 class="title">{{ response.details.subject }}</h1>
      <div class="post" v-html="response.details.contents"></div>
             <div>
            <ul v-for="comment in comments" :key="comment.comment_id">
                <li>
                    {{ comment.note }} by {{ comment.name }}
                    <button v-if="comment.member_id === profile.member_id" type="button" @click="() => deleteComment(comment.comment_id)">
                        削除
                    </button>
                </li>
            </ul>
            <form @submit.prevent="submitComment">
                <input v-model="inputComment" type="text" placeholder="comment">
                <button type="submit" :disabled="inputComment === ''">
                    送信
                </button>
            </form>
        </div>
    </div>
    
</template>

<script>
/* eslint-disable camelcase */
/* eslint-disable nuxt/no-this-in-fetch-data */

async function getAllComments (topics_id) {
    const { list } = await this.$axios.$get(
        process.env.BASE_URL + '/rcms-api/8/comments',
        {
            params: {
                module_id: topics_id,
                cnt: 999
            }
        }
    )
    return list
}


export default {
    async asyncData ({ $axios, params }) {
        try {
/*
            const response = await $axios.$get(process.env.BASE_URL + '/rcms-api/1/sampledetail/' + `${params.slug}`)
            console.log(response);
            return { response }
*/
//            const profile = await $axios.$get(process.env.BASE_URL + '/rcms-api/8/profile')
            const response = await $axios.$get(
                process.env.BASE_URL + '/rcms-api/1/sampledetail/' + `${params.slug}`
            )
            //return { profile, response, comments: await getAllComments.call({ $axios }, response.details.topics_id) }

/*
            const profile = await $axios.$get(process.env.BASE_URL + '/rcms-api/8/profile')
            const response = await $axios.$get(
                process.env.BASE_URL + '/rcms-api/1/sampledetail/' + `${params.slug}`
            )
            return { profile, response, comments: await getAllComments.call({ $axios }, response.details.topics_id) }
*/
    }catch (e) {
            console.log(e.message)
        }
    },
    data () {
        return {
            profile: null,
            response: null,
            comments: [],
            inputComment: ''
        }
    },
    methods: {
        async submitComment () {
            await this.$axios.$post('/rcms-api/8/comment', {
                module_id: this.response.details.topics_id,
                name: `${this.profile.name1} ${this.profile.name2}`,
                mail: this.profile.email,
                note: this.inputComment
            })
            this.comments = await getAllComments.call(this, this.response.details.topics_id)
            this.inputComment = ''
        },
        async deleteComment (commentId) {
            await this.$axios.$post(`/rcms-api/8/comment/${commentId}`, {})
            this.comments = await getAllComments.call(this, this.response.details.topics_id)
        }
    }
}
</script>
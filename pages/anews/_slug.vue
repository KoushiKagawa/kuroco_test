<template>
    <div>
        <h1 class="title">
            {{ response.details.subject }}
        </h1>
        <div class="post" v-html="response.details.contents" />
        <div>
            please type your name: <input v-model="userName" type="text" placeholder="your name">
        </div>
        <div>
            <ul v-for="comment in comments" :key="comment.comment_id">
                <li>
                    {{ comment.note }} by {{ comment.name }}
                    <button type="button" @click="() => deleteComment(comment.comment_id)">
                        delete
                    </button>
                </li>
            </ul>
            <form @submit.prevent="submitComment">
                <input v-model="inputComment" type="text" placeholder="comment">
                <button type="submit" :disabled="inputComment === '' || userName === ''">
                    submit
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
        process.env.BASE_URL + '/rcms-api/1/comments',
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
            const response = await $axios.$get(
                //process.env.BASE_URL + '/rcms-api/4/newsdetail/1'   // 実装簡易化のために、記事IDを"1"で仮指定しています
                process.env.ROOT_MNG_URL + '/rcms-api/1/sampledetail/' + `${params.slug}`
            )
            return { response, comments: await getAllComments.call({ $axios }, response.details.topics_id) }
        } catch (e) {
            console.log(e.message)
        }
    },
    data () {
        return {
            userName: '',
            response: null,
            comments: [],
            inputComment: ''
        }
    },
    methods: {
        async submitComment () {
            await this.$axios.$post('/rcms-api/1/comment', {
                module_id: this.response.details.topics_id,
                name: this.userName,
                note: this.inputComment
            })
            this.comments = await getAllComments.call(this, this.response.details.topics_id)
            this.inputComment = ''
        },
        async deleteComment (commentId) {
            await this.$axios.$post(`/rcms-api/1/comment/delete/${commentId}`, {
            })
            this.comments = await getAllComments.call(this, this.response.details.topics_id)
            this.inputComment = ''
        }
    }
}
</script>
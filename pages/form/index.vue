<template>
    <div>
        <Nav /> 
        <main>
            <div class="max-w-3xl mx-auto px-4 sm:px-6 xl:max-w-3xl xl:px-0 m-4">  
                <h1 class="text-3xl font-extrabold text-gray-900 tracking-tight sm:text-4xl md:text-[4rem] md:leading-[3.5rem] leading-10">Contact me</h1>
                <div>
                    <div class="row--status">
                        <h2>{{ name }}</h2>
                    </div>
<form>
            <div class="mb-6">
              <label
                for="name"
                class="block mb-2 text-sm text-gray-600"
              >
                お名前
                <span class="text-xs text-red-500">(必須)</span>
              </label>
              <input
                id="name"
                type="text"
                name="name"
                placeholder="お名前太郎"
                class="w-full px-3 py-2 placeholder-gray-300 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-indigo-100 focus:border-indigo-300"
              />
            </div>
            <div class="mb-6">
              <label
                for="email"
                class="block mb-2 text-sm text-gray-600"
              >
                メールアドレス
                <span class="text-xs text-red-500">(必須)</span>
              </label>
              <input
                id="email"
                type="email"
                name="email"
                placeholder="your@example.com"
                class="w-full px-3 py-2 placeholder-gray-300 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-indigo-100 focus:border-indigo-300"
              />
            </div>
            <div class="mb-6">
              <label
                for="phone"
                class="text-sm text-gray-600"
              >
                電話番号
              </label>
              <input
                id="phone"
                type="text"
                name="phone"
                placeholder="0312345678"
                class="w-full px-3 py-2 placeholder-gray-300 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-indigo-100 focus:border-indigo-300"
              />
            </div>
            <div class="mb-6">
              <label
                for="message"
                class="block mb-2 text-sm text-gray-600"
              >
                内容
                <span class="text-xs text-red-500">(必須)</span>
              </label>
              <textarea
                id="message"
                rows="5"
                name="message"
                placeholder="お問い合わせ内容です"
                class="w-full px-3 py-2 placeholder-gray-300 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-indigo-100 focus:border-indigo-300"
              >
              </textarea>
            </div>
            <div class="mb-6">
              <button
                @click="handleOnSubmit"
                class="w-full px-3 py-4 font-bold text-white bg-green-500 rounded-md focus:bg-green-600 focus:outline-none"
              >
                送信する
              </button>
            </div>
          </form>

            </div>
          </div>
        </main>
    </div>
</template>
<script>
import Nav from "@/components/Nav.vue";

const FORM_ID = 6 // 作成したフォーム定義のID

export default {

    head() {
    return {
      script: [
        {
          src: "https://www.google.com/recaptcha/api.js?render=6Lf0pMwcAAAAACGnNa6nqBVATAudJT0VJki6kHP-"
        }
      ]
    }
  },
    components: {
		Nav,
  
  },

async mounted() {
  try {
    await this.$recaptcha.init()
  } catch (e) {
    console.error(e);
  }
},
async onSubmit() {
  try {
    const token = await this.$recaptcha.execute('login')
    console.log('ReCaptcha token:', token)

    // send token to server alongside your form data

  } catch (error) {
    console.log('Login error:', error)
  }
},
beforeDestroy() {
  this.$recaptcha.destroy()
},


async asyncData({ $axios }) {
    const response = await $axios.$get(
      process.env.ROOT_MNG_URL + `/rcms-api/1/form/${FORM_ID}`
    )
    return {
      name: response.details.inquiry_name,
      info: response.details.inquiry_info,
      thanksText: response.details.thanks_text,
      cols: Object.entries(response.details.cols).map(([k, v]) => ({
        objKey: k,
        ...v,
      })),
    }
  },
  data: () => {
    return {
      submitted: false,
      submittedId: null,
      error: null,
    }
  },
  methods: {
    textLines2texts(textLines = '') {
      return textLines.split('\r\n')
    },
    async handleOnSubmit(e) {
      e.preventDefault()

      // collect input elements
      const formInputElements = Array.from(this.$refs.form.elements).filter(
        (elm) => elm.tagName.toLowerCase() === 'input'
      )

      // transform key:value inputs to an object
      const body = formInputElements
        .map((elm) => ({ [elm.name]: elm.value }))
        .reduce((prev, cur) => ({ ...prev, ...cur }), {})

      try {
        // post data
        const { id } = await this.$axios.$post(
          process.env.ROOT_MNG_URL + `/rcms-api/1/form?id=${FORM_ID}`,
          body
        )
        this.error = null
        this.submittedId = id
        this.submitted = true
      } catch (e) {
        this.error = [`${e}`, ...e.response.data.errors]
      }
    },
    handleOnBack(e) {
      e.preventDefault()
      this.submitted = false
    },
  },
}
</script>
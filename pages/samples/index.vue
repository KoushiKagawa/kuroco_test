<template>
  <div>
    <h2>1. foo:コンテンツ一覧</h2>
    <div class="max-w-3xl mx-auto px-4 sm:px-6 xl:max-w-3xl xl:px-0 m-4" v-for="n in foo.list" :key="n.slug">
      <nuxt-link :to="'/samples/'+ n.slug">{{n.ymd}} {{n.subject}}</nuxt-link>
    </div>

    <h2>2.bar</h2>
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
                <inquiry-recaptcha ref="recaptcha" :is-succeeded.sync="canSubmit" />
              
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
    
  </div>
</template>

<script>
export default {
    async asyncData({ $axios }) {
      const [foo, bar] = await Promise.all([
        $axios.$get(process.env.BASE_URL + '/rcms-api/1/samples'),
        $axios.$get(process.env.BASE_URL + `/rcms-api/1/form/7`)
      ]);
      return { 
        foo,
        name: bar.details.inquiry_name,
        info: bar.details.inquiry_info,
        thanksText: bar.details.thanks_text,
        cols: Object.entries(bar.details.cols).map(([k, v]) => ({
          objKey: k,
          ...v,
      })),};
    },
}
</script>
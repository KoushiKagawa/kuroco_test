<template>
<body>
  <div class="frame-root">
    <div class="frame-content">
      <!-- header -->


      <!-- main -->
      <section class="text-gray-600 body-font">
        <div class="container px-5 py-24 mx-auto">
          <div class="flex flex-wrap -m-4">
            <div v-for="n in response.list" :key="n.slug" class="p-4 md:w-1/3">
              <div class="h-full border-2 border-gray-200 border-opacity-60 rounded-lg overflow-hidden">
                <img v-if="n.ext_col_01.url" class="lg:h-48 md:h-36 w-full object-cover object-center" :src="n.ext_col_01.url" alt="blog">
                <div class="p-6">
                  <h2 class="tracking-widest text-xs title-font font-medium text-gray-400 mb-1">CATEGORY</h2>
                  <h1 class="title-font text-lg font-medium text-gray-900 mb-3"><nuxt-link :to="'/blogs/'+ n.slug">{{n.ymd}}{{n.subject}}</nuxt-link></h1>
                  <p class="leading-relaxed mb-3">Photo booth fam kinfolk cold-pressed sriracha leggings jianbing microdosing tousled waistcoat.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  </div>
</body>
</template>

<script>

export default {

  /*
    async asyncData ({ $axios }) {
        try {
            const response = await $axios.$get(process.env.ROOT_MNG_URL + '/rcms-api/1/blogs')
            return { response }
        }catch (e) {
            console.log(e.message)
        }
    }
    */
    async asyncData ({ route, $axios }) {

        const requestNews = async () => {
            const response = await $axios.$get(process.env.ROOT_MNG_URL + '/rcms-api/1/blogs');
            return { response };
        };
        const requestNewsPreview = async (previewToken) => {
            const response = await $axios.$get(process.env.ROOT_MNG_URL + '/rcms-api/1/blogs/preview' + '?preview_token=' + previewToken);
            return { response: { list: [response.details] } };
        };

        // URLのクエリに、
        // preview_tokenが存在する場合は、previewエンドポイントへ、
        // preview_tokenが存在しない場合は、newsエンドポイントへ、
        // リクエストします。
        try {
            const previewToken = route.query.preview_token;
            return previewToken !== undefined ?
                await requestNewsPreview(previewToken) :
                await requestNews();
        }catch (e) {
            console.log(e.message)
        }
    }
}
</script>
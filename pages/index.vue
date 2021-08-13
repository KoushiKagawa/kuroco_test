<template>
<body>
  <div class="frame-root">
    <div class="frame-content">
      <!-- header -->
      <Navbar/>

      <!-- main -->
      <section class="text-gray-600 body-font">
        <div class="container px-5 py-24 mx-auto">
          <div>
            <h1 class="inline-block text-3xl font-extrabold text-gray-900 tracking-tight">
              KoushiKagawa.com
            </h1>
            <div class="links">
              <p>for Japanese</p>
              <div class="rounded-t-xl overflow-hidden bg-gradient-to-r from-purple-50 to-purple-100 bg-white p-8">
                <div class="grid grid-cols-3 grid-rows-3 grid-flow-col gap-4">
                  <div class="bg-purple-500 rounded-md h-12 flex items-center justify-center text-white text-2xl font-extrabold">
                    <a
                    href="https://twitter.com/koushikagawa"
                    target="_blank"
                    >Twitter</a>
                  </div>
                  <div class="bg-purple-500 rounded-md h-12 flex items-center justify-center text-white text-2xl font-extrabold">
                    <a
                    href="https://note.com/koushikagawa"
                    target="_blank"
                    >note</a>
                  </div>
                  <div class="bg-purple-500 rounded-md h-12 flex items-center justify-center text-white text-2xl font-extrabold">
                    <a
                  href="https://github.com/KoushiKagawa"
                  target="_blank"
                  >GitHub</a>
                  </div>
                  <div class="bg-purple-500 rounded-md h-12 flex items-center justify-center text-white text-2xl font-extrabold">
                    <a
                  href="https://www.linkedin.com/in/koushikagawa/"
                  target="_blank"
                  >LinkedIn</a>
                  </div>
                  <div class="bg-purple-500 rounded-md h-12 flex items-center justify-center text-white text-2xl font-extrabold">
                    <a
                  href="/blogs"
                  >Blog</a>
                  </div>
                  <div class="bg-purple-500 rounded-md h-12 flex items-center justify-center text-white text-2xl font-extrabold">
                    <a
                  href="/form"
                  >Contact</a>
                  </div>
                  <div class="bg-purple-500 rounded-md h-12 flex items-center justify-center text-white text-2xl font-extrabold">
                    <a
                  href="/samples"
                  >Sample</a>
                  </div>
                  <div class="bg-purple-500 rounded-md h-12 flex items-center justify-center text-white text-2xl font-extrabold">
                    <a
                  href="/video"
                  >Video</a>
                  </div>
                  <div class="bg-purple-500 rounded-md h-12 flex items-center justify-center text-white text-2xl font-extrabold">
                    <a
                  href="/mds"
                  >Markdown</a>
                  </div>
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
import AppLogo from '~/components/AppLogo.vue'
import Navbar from '~/components/Navbar.vue'

export default {
  components: {
    AppLogo,
    Navbar
  }
}
</script>



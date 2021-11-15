<template>
    <div>
        <Header /> 
        <main class="content">
            <div class="max-w-3xl mx-auto px-4 sm:px-6 xl:max-w-3xl xl:px-0 m-4 break-words">  
                <ul>
                    <li>content list</li>
                    <li><NuxtLink to="/news">content list</NuxtLink></li>
                </ul>
            </div>
        </main>
    </div>
</template>

<script>
import Header from "@/components/Header.vue";

export default {
    components: {
            Header
	},
}
</script>
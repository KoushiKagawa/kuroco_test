<template>
    <div>
        <div>
        <h2 class="title">Cart items</h2>
        <ul v-if="cartItems">
            <span>Delivery free: {{ cartItems.deliv_fee }}</span>
            <span>Subtotal: {{ cartItems.subtotal }}</span>
            <span>Total amount: {{ cartItems.total }}</span>
            <li class="cart-item" v-for="item in cartItems.items" :key="item.product_id">
                <span class="product_id">ID: {{ item.product_id }}</span>
                <span class="quantity">Quantity: {{ item.quantity }}</span>
            </li>
            <div>
                <NuxtLink to="/ec/purchase">Go purchase</NuxtLink>
            </div>
        </ul>
        </div>
        <div>
            <h2 class="title">Product list</h2>
            <ul v-if="productList">
                <li class="list-item" v-for="item in productList" :key="item.product_id">
                    <div class="title">{{ item.subject }}</div>
                    <div class="price">{{ item.price_02 }}</div>
                    <div class="cart" @click="addCart(item.product_id)">Add cart</div>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
export default {
    auth: false,
    async asyncData ({ $axios, params }) {
        try {
            
            //const profile = await $axios.$get('/profile')
            const profile = await $axios.$get(process.env.ROOT_MNG_URL + '/rcms-api/7/profile')
            let cartItems = {
                details: null
            }
            if (profile.ec_cart_id) {
                cartItems = await $axios.$get(process.env.ROOT_MNG_URL + '/rcms-api/7/cart-items/' + profile.ec_cart_id)
            }
            const productList = await $axios.$get(process.env.ROOT_MNG_URL + '/rcms-api/7/product-list')

            return {
                'cartItems': cartItems.details,
                'productList': productList.list
            }
        }catch (e) {
            console.log(e.message)
        }
    },
    data() {
        return {
            paymentId: {}
        }
    },
    methods: {
        async addCart(product_id) {
            const profile = await this.$axios.$get(process.env.ROOT_MNG_URL + '/rcms-api/7/profile')
            const addItem = {
                ec_cart_id: profile.ec_cart_id,
                item: {
                    product_id: product_id,
                    quantity: 1
                }
            }
            const addCartResp = await this.$axios.$post(process.env.ROOT_MNG_URL + '/rcms-api/7/add-cart', addItem)
            if (addCartResp.errors.length == 0) {
                alert('Success add cart')
                const cartListResp = await this.$axios.$get(process.env.ROOT_MNG_URL + '/rcms-api/7/cart-items/' + profile.ec_cart_id)
                this.cartItems = cartListResp.details
            } else {
                alert(addCartResp.errors[0].message)
            }
        }
    }
}
</script>
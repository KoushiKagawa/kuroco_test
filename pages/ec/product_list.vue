<template>
    <div>
        <div>
        <h2 class="title">Cart items</h2>
        <div v-if="cartItems" class="box">
            <ul>
                <h3>購入商品</h3>
                <li class="cart-item" v-for="item in cartItems.items" :key="item.product_id">
                    <div class="product_id">ID: {{ item.product_id }}</div>
                    <div class="quantity">購入数: {{ item.quantity }}</div>
                </li>
            </ul>
            <ul>
                <h3>注文内容</h3>
                <li>
                    <div>配送料: {{ cartItems.deliv_fee }}</div>
                    <div>商品の小計: {{ cartItems.subtotal }}</div>
                    <div>合計: {{ cartItems.total }}</div>
                </li>
            </ul>
            <div>
                <NuxtLink to="/ec/purchase" class="btn">カートに進む</NuxtLink>
            </div>
        
        </div>
        <div v-else>まだカートにアイテムはありません。</div>
        </div>
        <div class="box">
            <h2 class="title">Product list</h2>
            <ul v-if="productList" class="ul">
                <li class="list-item" v-for="item in productList" :key="item.product_id">
                    <div class="title">商品名：{{ item.subject }}</div>
                    <div class="title">商品名：{{ item.subject }}</div>
                    <div class="price">価格：{{ item.price_02 }} 円</div>
                    <div class="cart btn" @click="addCart(item.product_id)">購入する</div>
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

<style scoped>
div.box{
border: solid 1px #ddd;
border-radius :8px;
padding: 10px;
margin:10px;
}

li {
  border-radius :8px;
  box-shadow :0px 0px 5px silver;
  padding: 0.5em 0.5em 0.5em 2em;
  margin: 20px;
}

.btn,
a.btn {
  color: #fff;
  background-color: #fd9535;
}
.btn:hover,
a.btn:hover {
  color: #fff;
  background: #fd9535;
}

a.btn--radius {
   border-radius: 100vh;
}
</style>
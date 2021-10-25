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
        </ul>
        </div>
        <div>
            <h2 class="title">Purchase info</h2>
            <input name="name1" v-model="orderer.name1" /> <input name="name2" v-model="orderer.name2" /><br/>
            <input name="zip_code" v-model="orderer.zip_code" maxlength="7" minlength="7" /><br/>
            <select name="tdfk_cd" v-model="orderer.tdfk_cd">
                <option value="">-- No selected --</option>
                <option value="01">北海道</option>
                <!-- 省略 -->
                <option value="13">東京都</option>
                <!-- 省略 -->
                <option value="47">沖縄県</option>
            </select><br/>
            <input name="address1" v-model="orderer.address1" /><br/>
            <input name="address2" v-model="orderer.address2" /><br/>
            <input name="address3" v-model="orderer.address3" /><br/>
            <input name="tel" v-model="orderer.tel" /><br/>
            <input name="email" v-model="orderer.email" /><br/>
        </div>
        <div>
            <h2 class="title">Payment info</h2>
            <div class="payment" >
                <span>Selected payment >> </span>
                <select v-model="paymentId">
                    <option value="0">-- No selected --</option>
                    
                    <!--
                    <option v-for="payment_info, payment_id in paymentList" :key="payment_id"
                        :value="payment_id"
                    >{{ payment_info.payment_type }}
                    </option>
                    -->
                    <option v-for="payment_id in paymentList" :key="payment_id"
                        :value="payment_id"
                    >{{ payment_info.payment_type }}
                    </option>
                    
                </select>
            </div>
            <!-- Add credit card information entry forms, etc. as needed. -->
            <!-- 必要に応じてクレジットカード情報入力フォームなどを追加 -->
            <div @click="normalBuy()">
                Buy cart items with selected payment
            </div>
        </div>
    </div>
</template>

<script>
export default {
    auth: false,
    async asyncData ({ $axios, params }) {
        try {
            //const profile = await $axios.$get('/profile')
            const profile = await this.$axios.$get(process.env.ROOT_MNG_URL + '/rcms-api/7/profile')
            let cartItems = {
                details: null
            }
            let orderer = {}
            if (profile.ec_cart_id) {
                cartItems = await $axios.$get(process.env.ROOT_MNG_URL + '/rcms-api/7/cart-items/' + profile.ec_cart_id)
                orderer.name1 = profile.name1
                orderer.name2 = profile.name2
                orderer.zip_code = profile.zip_code
                orderer.tdfk_cd = profile.tdfk_cd
                orderer.address1 = profile.address1
                orderer.address2 = profile.address2
                orderer.address3 = profile.address3
                orderer.tel = profile.tel
                orderer.email = profile.email
            }
            return {
                'cartItems': cartItems.details,
                'paymentList': cartItems.payment_list,
                'orderer': orderer
            }
        }catch (e) {
            console.log(e.message)
        }
    },
    data() {
        return {
            paymentId: 0
        }
    },
    methods: {
        async normalBuy() {
            if (!this.paymentId) {
                alert('Please select payment')
                return
            }
            const profile = await this.$axios.$get(process.env.ROOT_MNG_URL + '/rcms-api/7/profile')
            if (!profile.ec_cart_id) {
                alert('No loggedin')
                return
            }
            const order = {
                ec_cart_id: profile.ec_cart_id,
                ec_payment_id: parseInt(this.paymentId),
                orderer: this.orderer
            }
            this.$axios.$post(process.env.ROOT_MNG_URL + '/rcms-api/7/purchase ', order)
            .then((response) => {
                if (response.errors.length === 0) {
                    alert('Success purchase')
                    this.cartItems = null
                }
            })
            .catch((error) => {
                alert(error.response.data.errors[0].message)
            })
        }
    },
}
</script>
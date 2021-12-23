<template>
    <div>
        <div class="box">
            <h2 class="title">注文内容</h2>
            <ul v-if="cartItems">
                <div>配送料: {{ cartItems.deliv_fee }}</div>
                <div>商品の小計: {{ cartItems.subtotal }}</div>
                <div>合計: {{ cartItems.total }}</div>
                
                <li class="cart-item" v-for="item in cartItems.items" :key="item.product_id">
                    <div class="product_id">ID: {{ item.product_id }}</div>
                    <div class="quantity">購入数: {{ item.quantity }}</div>
                </li>
            </ul>
        </div>
        <div class="box">
            <h2 class="title">購入者情報</h2>
            <label for="cheese">お名前</label>
            <input name="name1" v-model="orderer.name1" /> <input name="name2" v-model="orderer.name2" /><br/>
            <label for="cheese">郵便番号</label>
            <input name="zip_code" v-model="orderer.zip_code" maxlength="7" minlength="7" /><br/>
            <label for="cheese">住所</label>
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
            <label for="cheese">電話番号</label>
            <input name="tel" v-model="orderer.tel" /><br/>
            <label for="cheese">メールアドレス</label>
            <input name="email" v-model="orderer.email" /><br/>
        </div>
        <div class="box">
            <h2 class="title">支払い方法</h2>
            <div class="payment" >
                <span>お支払い方法を選択する >> </span>
                <select v-model="paymentId">
                    <option value="0">-- 選択する --</option>
                    <option v-for="(paymment_info, payment_id) in paymentList" :key="payment_id"
                        :value="payment_id"
                    >{{ paymment_info.payment_type }}
                    </option>
                </select>
            </div>
            <!-- Add credit card information entry forms, etc. as needed. -->
            <!-- 必要に応じてクレジットカード情報入力フォームなどを追加 -->
            <div @click="normalBuy()" class="cart btn">
                注文を確定する
            </div>
        </div>
    </div>
</template>

<script>
export default {
    auth: false,
    async asyncData ({ $axios, params }) {
        try {
            const profile = await $axios.$get(process.env.ROOT_MNG_URL + '/rcms-api/7/profile')
            
            /*const profile = await $axios.$get('/profile')*/
            let cartItems = {
                details: null
            }
            let orderer = {}
            if (profile.ec_cart_id) {
                cartItems = await $axios.$get(process.env.ROOT_MNG_URL + '/rcms-api/7/cart-items/' + profile.ec_cart_id)
                
                orderer.name1 = profile.name1
                orderer.name1 = profile.name2
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
            const profile = await this.$axios.$get(process.env.ROOT_MNG_URL + '/rcms-api/8/profile')
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

input, select {
    width: 100%;
    padding: 10px 15px;
    font-size: 16px;
    border-radius: 3px;
    border: 1px solid #ddd;
    box-sizing: border-box;
    margin: 10px;
}

label{
    margin: 0px 10px;
}
</style>
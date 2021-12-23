export const state = () => ({
    profile: null,
  })
  
  export const getters = {
    authenticated(state) {
      return state.profile !== null
    },
  }
  
  export const mutations = {
    setProfile(state, { profile }) {
      state.profile = profile
    },
    updateLocalStorage(state, payload) {
            Object.entries(payload).forEach(([key, val]) => {
              localStorage.setItem(key, val)
            })
          },
  }

  export const actions = {

    async login({ commit }, payload) {
            // ダミーリクエスト(1秒待機の後成功/失敗する)
/*
            const shouldSuccess = true
            const request = new Promise((resolve, reject) =>
              setTimeout(
                () => (shouldSuccess ? resolve() : reject(Error+('login failure'))),
                1000
              )
            )
            await request
*/
            await this.$axios.$post(process.env.ROOT_MNG_URL + '/rcms-api/7/login', payload)
//            commit('setProfile', { profile: {} }) // ダミーのオブジェクトをstore.
            const profileRes = await this.$axios.$get(process.env.ROOT_MNG_URL + '/rcms-api/8/login/profile')
            commit('setProfile', { profile: profileRes.data })
            
            commit('updateLocalStorage', { authenticated: true })
          },


//    async restoreLoginState({ commit }) {

    async logout({ commit }) {
            try {
              await this.$axios.$post(process.env.BASE_URL + '/rcms-api/2/logout')
            } catch {
              /** No Process */
              /** エラーが返却されてきた場合は、結果的にログアウトできているものとみなし、これを無視します。 */
            }
            commit('setProfile', { profile: null })
            commit('updateLocalStorage', { authenticated: false })
          },
          async restoreLoginState({ commit, dispatch }) {

        const authenticated = JSON.parse(localStorage.getItem('authenticated'))

    if (!authenticated) {
        await dispatch('logout')
    throw new Error('need to login')
    }
//      commit('setProfile', { profile: {} }) // ダミーのオブジェクトをstore.
//       await null
//    const profileRes = await this.$axios.$get(process.env.BASE_URL + '/rcms-api/8/login/profile')
//   commit('setProfile', { profile: profileRes.data })

try {
          const profileRes = await this.$axios.$get(process.env.BASE_URL + '/rcms-api/2/login/profile')
          commit('setProfile', { profile: profileRes.data })
        } catch {
          await dispatch('logout')
          throw new Error('need to login')
        }

},
   }
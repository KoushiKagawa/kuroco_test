export const state = () => ({
    profile: null
})

export const getters = {
    authenticated (state) {
        return state.profile !== null
    }
}

export const mutations = {
    setProfile (state, { profile }) {
        state.profile = profile
    },
    updateLocalStorage (state, payload) {
        Object.entries(payload).forEach(([key, val]) => {
            localStorage.setItem(key, val)
        })
    }
}

export const actions = {
    async login ({ commit }, payload) {
        await this.$axios.$post(process.env.ROOT_MNG_URL + '/rcms-api/8/login', payload)
        //await this.$axios.$post(process.env.BASE_URL + '/rcms-api/8/login', payload)
        
        const profileRes = await this.$axios.$get(process.env.ROOT_MNG_URL + '/rcms-api/8/login/profile')
        commit('setProfile', { profile: profileRes.data })
        commit('updateLocalStorage', { authenticated: true })
    },
    async logout ({ commit }) {
        try {
            await this.$axios.$post(process.env.BASE_URL + '/rcms-api/1/logout')
        } catch {
            /** No Process */
            /** エラーが返却されてきた場合は、結果的にログアウトできているものとみなし、これを無視します。 */
        }
        commit('setProfile', { profile: null })
        commit('updateLocalStorage', { authenticated: false })

        this.$router.push('/login')
    },
    async restoreLoginState ({ commit, dispatch }) {
        const authenticated = JSON.parse(localStorage.getItem('authenticated'))

        if (!authenticated) {
            await dispatch('logout')
                        throw new Error('need to login')
                    }
                    try {
                        const profileRes = await this.$axios.$get(process.env.BASE_URL + '/rcms-api/1/profile')
                        commit('setProfile', { profile: profileRes.data })
                    } catch {
                        await dispatch('logout')
            throw new Error('need to login')
        }
    }
}
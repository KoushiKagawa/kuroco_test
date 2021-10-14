export default async ({ app, store, redirect }) => {
    if (!store.getters.authenticated) {
        try {
            await store.dispatch('restoreLoginState')
        } catch (err) {
            return redirect('/login')
        }
    }
}
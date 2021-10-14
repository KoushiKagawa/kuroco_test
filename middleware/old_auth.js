export default async ({ app, store, redirect }) => {
    if (!store.getters.authenticated) {
      //return redirect('/login')
      try {
          await store.dispatch('restoreLoginState')
        } catch (err) {
          return redirect('/login')
        }
    }
  
    //await null
  }
export default function auth({ to, next, store }) {
  if (!store.getters.user && !store.getters.isAuthorized && to.meta.authRequired) {
    next('/login')
  } else {
    next()
  }
}
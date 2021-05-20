import $router from "@/router"
import AuthApi from "../api/auth"

export default {
  state: {
    user: null,
    isAuthorized: false,
    isLoading: false
  },
  mutations: {
    MUTATION_change_user(state, user) {
      state.user = user
    },
    MUTATION_change_is_auth(state, auth) {
      state.isAuthorized = auth
    },
    MUTATION_loading(state, loading) {
      state.isLoading = loading
    },
    SET_SNACKBAR() {
      console.log("SET_SNACKBAR")
    }
  },
  actions: {
    async ACTION_set_user({ commit }) {
      try {
        commit('MUTATION_loading', true)
        const { status, data } = await AuthApi.getMe()

        if (status === 200) {
          commit('MUTATION_change_user', data.user)
          commit('MUTATION_change_is_auth', true)
          commit('SET_SNACKBAR', { text: `Welcome, ${data.user && data.user.username}`, color: "successDarken" })
          $router.push('/main')
        }
      } catch (e) {
        commit('SET_SNACKBAR', { text: e.message, color: 'error' })
        console.log("ACTION_set_user", e)
      } finally {
        commit('MUTATION_loading', false)
      }
    },
    async ACTION_login({ commit }, userForm) {
      try {
        commit('MUTATION_loading', true)
        const { status, data } = await AuthApi.login(userForm)
        if (status === 200) {
          commit('MUTATION_change_user', data.user)
          commit('MUTATION_change_is_auth', true)
          commit('SET_SNACKBAR', { text: `Welcome, ${data.user && data.user.username}`, color: "successDarken" })
          $router.push('/main')
        }
      } catch (e) {
        commit('SET_SNACKBAR', { text: e.message, color: 'error' })
        console.error('ACTION_login', e)
      } finally {
        commit('MUTATION_loading', false)
      }
    },
    async ACTION_register({ commit }, userForm) {
      try {
        commit('MUTATION_loading', true)
        const { status, data } = await AuthApi.register(userForm)

        if (status === 200) {
          commit('MUTATION_change_user', data.user)
          commit('MUTATION_change_is_auth', true)
          commit('SET_SNACKBAR', { text: `Welcome, ${data.user && data.user.username}`, color: "successDarken" })
          $router.push('/main')
        }
      } catch (e) {
        commit('SET_SNACKBAR', { text: e.message, color: 'error' })
        console.error('ACTION_register', e)
      } finally {
        commit('MUTATION_loading', false)
      }
    },
    async ACTION_logout({ commit }) {
      AuthApi.logout()
      commit('MUTATION_change_user', {})
      commit('MUTATION_change_is_auth', false)
      localStorage.setItem('token', '')
      $router.push('/login')
    }
  },
  getters: {
    getUser: state => state.user,
    userName: state => state.user.username,
    isAuthorized: state => state.isAuthorized,
    isLoading: state => state.isLoading
  }
}
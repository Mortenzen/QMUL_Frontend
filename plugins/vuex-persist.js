import createPersistedState from 'vuex-persistedstate'

export default ({ app, store, isHMR }) => {
  window.onNuxtReady(() => {
    createPersistedState({
      key: 'vuex',
      paths: ['user']
    })(store)
  })
}

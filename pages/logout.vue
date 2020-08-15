<template>
  <v-layout />
</template>

<script>
import { mapMutations } from 'vuex'

export default {
  mounted () {
    this.logout()
  },

  methods: {
    logout () {
      this.$router.push('/')
      this.setUser()
    },
    ...mapMutations(['setUser'])
  }

}
</script>

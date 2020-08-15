<template>
<v-layout /> 
</template>

<script>
import { mapMutations } from 'vuex'

export default {
    mounted () {
        this.logout();
    },
   
 methods: {
    logout () {
       location.replace("https://ramziproject.co.uk/");
      this.setUser()
    },
    ...mapMutations(['setUser'])
  }

}
</script>

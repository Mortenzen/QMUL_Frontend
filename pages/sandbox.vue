<template>
  <v-card>
    <v-card-title>Users in database: {{ userLen }}</v-card-title>
    <v-data-table
      :headers="headers"
      :items="userItems"
      :items-per-page="5"
      class="elevation-1"
    />
  <!-- <v-card>
    {{ users }}
  </v-card> -->
  </v-card>
</template>

<script>
export default {
  data () {
    return {
      users: [],
      headers: [
        {
          text: 'Name',
          align: 'start',
          sortable: true,
          value: 'name'
        },
        { text: 'E-mail', value: 'email' },
        { text: 'Location', value: 'location' }
      ]
    }
  },
  computed: {
    userItems () {
      return Object.keys(this.users).map(key => this.users[key])
    },
    userLen () {
      return this.userItems.length
    }
  },
  async mounted () {
    const data = await this.$axios.get('get-data')
    this.users = data.data
  }

}
</script>

<style>

</style>

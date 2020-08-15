<template>
  <v-card>
    <v-data-table
      :headers="headers"
      :items="roomItems"
      :items-per-page="5"
      class="elevation-1"
    >
      <template v-slot:item.accepptedUsers="{ item }">
        <v-chip v-for="user in item.accepptedUsers" :key="user" class="ma-2">
          {{
            user
          }}
        </v-chip>
      </template>
    </v-data-table>
  </v-card>
</template>

<script>
export default {
  data () {
    return {
      rooms: [],
      timer: null,
      headers: [
        {
          text: 'Location',
          align: 'start',
          sortable: true,
          value: 'name'
        },
        { text: 'State', value: 'state' },
        { text: 'Last seen', value: 'lastSeen' },
        { text: 'Acceppted users', value: 'accepptedUsers' }
      ]
    }
  },
  computed: {
    roomItems () {
      return Object.keys(this.rooms).map(key => this.rooms[key])
    }
  },
  mounted () {
    this.timer = setInterval(this.getData, 1000)
    this.getData()
  },
  beforeDestroy () {
    clearInterval(this.timer)
  },
  methods: {
    async getData () {
      const data = await this.$axios.get('get-rooms', { progress: false })
      this.rooms = data.data
    }
  }
}
</script>

<style></style>


<template>
  <v-card
    class="mx-auto"
    style="max-width: 500px;"
  >
    <v-system-bar
      color="deep-purple darken-2"
      dark
    >
      <v-spacer />
    </v-system-bar>
    <v-toolbar
      color="deep-purple accent-2"
      cards
      dark
      flat
    >
      <v-card-title class="title font-weight-regular">
        Insert Moderator
      </v-card-title>
      <v-spacer />
    </v-toolbar>
    <v-form
      ref="form"
      v-model="form"
      class="pa-4 pt-6"
    >
      <v-text-field
        v-model="name"
        :rules="[rules.required]"
        filled
        color="deep-purple"
        label="Name"
      />

      <v-text-field
        v-model="email"
        :rules="[rules.email]"
        filled
        color="deep-purple"
        label="Email address"
        type="email"
      />

      <v-text-field
        v-model="password"
        :rules="[rules.password, rules.length(6)]"
        filled
        color="deep-purple"
        counter="6"
        label="Password"
        style="min-height: 96px"
        type="password"
      />
    </v-form>
    <v-divider />
    <v-card-actions>
      <v-btn
        text
        @click="$refs.form.reset()"
      >
        Clear
      </v-btn>
      <v-spacer />
      <v-btn
        :disabled="!form"
        :loading="isLoading"
        class="white--text"
        color="deep-purple accent-4"
        depressed
        @click="sendData()"
      >
        Submit
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  data: () => ({
    name: undefined,
    email: undefined,
    form: false,
    isLoading: false,
    password: undefined,

    rules: {
      email: v => !!(v || '').match(/@/) || 'Please enter a valid email',
      length: len => v => (v || '').length >= len || `Invalid character length, required ${len}`,
      password: v => !!(v || '').match(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*(_|[^\w])).+$/) ||
          'Password must contain an upper case letter, a numeric character, and a special character',
      required: v => !!v || 'This field is required'
    }
  }),

  methods: {
    sendData () {
      this.$axios.post('insert-moderator', {
        name: this.name,
        email: this.email,
        password: this.password
      })
        .then(function (response) {
          console.log(response)
          location.reload()
        })
        .catch(function (error) {
          console.log(error)
        })
    }
  }
}

// <template>
// <v-layout />
// </template>
</script>

<template>
  <v-card class="mx-auto" style="max-width: 500px;">
    <v-system-bar color="deep-purple darken-2" dark>
      <v-spacer />
    </v-system-bar>
    <v-toolbar color="deep-purple accent-2" cards dark flat>
      <v-card-title class="title font-weight-regular">
        Admin Login
      </v-card-title>
      <v-spacer />
    </v-toolbar>
    <v-form ref="form" v-model="form" class="pa-4 pt-6">
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
        filled
        color="deep-purple"
        label="Password"
        style="min-height: 96px"
        type="password"
      />
    </v-form>
    <v-divider />
    <v-card-actions>
      <v-btn text @click="$refs.form.reset()">
        Clear
      </v-btn>
      <v-spacer />
      <v-btn
        :disabled="!form"
        :loading="isLoading"
        class="white--text"
        color="deep-purple accent-4"
        depressed
        @click="login()"
      >
        Submit
      </v-btn>
    </v-card-actions>
    <v-dialog v-model="dialog" absolute max-width="400" persistent>
      <v-card>
        <v-card-title class="headline grey lighten-3">
          Legal
        </v-card-title>
        <v-card-text>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat. Duis aute irure dolor in
          reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
          pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
          culpa qui officia deserunt mollit anim id est laborum.
        </v-card-text>
        <v-divider />
        <v-card-actions>
          <v-btn text @click="(agreement = false), (dialog = false)">
            No
          </v-btn>
          <v-spacer />
          <v-btn
            class="white--text"
            color="deep-purple accent-4"
            @click="login"
          >
            Yes
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-card>
</template>

<script>
import { mapMutations, mapState } from 'vuex'

export default {
  data: () => ({
    agreement: false,
    dialog: false,
    email: undefined,
    form: false,
    isLoading: false,
    password: undefined,
    phone: undefined,
    rules: {
      email: v => !!(v || '').match(/@/) || 'Please enter a valid email',
      length: len => v =>
        (v || '').length >= len || `Invalid character length, required ${len}`,
      password: v =>
        !!(v || '').match(
          /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*(_|[^\w])).+$/
        ) ||
        'Password must contain an upper case letter, a numeric character, and a special character',
      required: v => !!v || 'This field is required'
    }
  }),
  mounted () {
    if (this.user) {
      this.$router.push('/rooms')
    }
  },
  computed: {
    ...mapState(['user'])
  },
  watch: {
    user (user) {
      if (user) {
        this.$router.push('/rooms')
      }
    }
  },
  methods: {
    async login () {
      const user = await this.$axios
        .post('moderator-login', {
          email: this.email,
          password: this.password
        })
        .catch(_err => this.setUser())
      this.setUser(user.data)
    },
    ...mapMutations(['setUser'])
  }
}

// <template>
// <v-layout />
// </template>
</script>

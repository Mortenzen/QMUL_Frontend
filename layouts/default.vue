<template>
  <v-app dark>
    <v-navigation-drawer v-model="drawer" :mini-variant="miniVariant" :clipped="clipped" fixed app>
      <v-list>
        <v-list-item v-for="(item, i) in userItems" :key="i" :to="item.to" router exact>
          <v-list-item-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title v-text="item.title" />
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-app-bar :clipped-left="clipped" fixed app>
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
      <v-toolbar-title v-text="title" />
      <v-spacer />
      <span v-if="user">Hello {{ user.name }}</span>
    </v-app-bar>
    <v-main>
      <v-container>
        <nuxt />
      </v-container>
    </v-main>
    <v-navigation-drawer v-model="rightDrawer" :right="right" temporary fixed>
      <v-list>
        <v-list-item @click.native="right = !right">
          <v-list-item-action>
            <v-icon light>
              mdi-repeat
            </v-icon>
          </v-list-item-action>
          <v-list-item-title>Switch drawer (click me)</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-footer :absolute="!fixed" app>
      <span>&copy; {{ new Date().getFullYear() }}</span>
    </v-footer>
  </v-app>
</template>

<script>
import { mapState } from 'vuex'

export default {
  data () {
    return {
      clipped: false,
      drawer: false,
      fixed: false,
      items: [
        {
          icon: 'mdi-login',
          title: 'Login',
          to: '/',
          private: false
        },
        {
          icon: 'mdi-account-multiple',
          title: 'User List',
          to: '/sandbox',
          private: false
        },
        {
          icon: 'mdi-home',
          title: 'Rooms',
          to: '/rooms',
          private: false
        },
        {
          icon: 'mdi-account-plus',
          title: 'Insert New User',
          to: '/newuser',
          private: true
        },
        {
          icon: 'mdi-home-plus',
          title: 'New Room',
          to: '/newroom',
          private: true
        },
        {
          icon: 'mdi-account-plus',
          title: 'Insert New Moderator',
          to: '/newmoderator',
          private: true
        },
        {
          icon: 'mdi-lock-plus',
          title: 'Insert New Access',
          to: '/newaccess',
          private: true
        },
        {
          icon: 'mdi-account-minus',
          title: 'Remove User',
          to: '/test',
          private: true
        },
        {
          icon: 'mdi-account-minus',
          title: 'Remove Access',
          to: '/test',
          private: true
        },
        {
          icon: 'mdi-logout',
          title: 'Logout',
          to: '/logout',
          private: true
        }
      ],
      miniVariant: false,
      right: true,
      rightDrawer: false,
      title: 'Queen Mary University Project'
    }
  },
  computed: {
    userItems () {
      return this.items.filter(
        item => !item.private || (item.private && this.user)
      ).filter(item => (item.title !== 'Login' || !this.user))
    },
    ...mapState({
      user: 'user'
    })
  }
}
</script>

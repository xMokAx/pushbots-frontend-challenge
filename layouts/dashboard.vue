<template>
  <v-app>
    <v-navigation-drawer v-model="drawer" light app temporary>
      <div class="pa-4 d-flex justify-space-between">
        <Logo class="logo" />
        <v-btn icon @click.stop="toggleDrawer">
          <v-icon>mdi-chevron-left</v-icon>
        </v-btn>
      </div>

      <v-divider></v-divider>
      <v-list>
        <v-list-item
          v-for="(item, i) in items"
          :key="i"
          :to="item.to"
          tag="nuxt-link"
        >
          <v-list-item-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title v-text="item.title" />
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <div>
      <v-app-bar color="primary" dark>
        <v-app-bar-nav-icon @click.stop="toggleDrawer"></v-app-bar-nav-icon>

        <v-toolbar-title class="d-none d-md-block"><SecLogo /></v-toolbar-title>
        <v-text-field
          type="text"
          prepend-inner-icon="mdi-magnify"
          background-color="teal"
          placeholder="Search your app"
          dense
          solo
          flat
          hide-details
        />
        <v-spacer></v-spacer>

        <v-tooltip bottom>
          <template v-slot:activator="{ on }">
            <div
              class="icon mx-3 d-flex flex-wrap justify-center align-center"
              v-on="on"
            >
              <v-icon>mdi-account-group</v-icon>
              <small class="pa-1">{{ user.totalDevices }}</small>
            </div>
          </template>
          <span>Devices</span>
        </v-tooltip>

        <v-tooltip bottom>
          <template v-slot:activator="{ on }">
            <div
              class="icon mr-3 d-flex flex-wrap justify-center align-center"
              v-on="on"
            >
              <v-icon>mdi-apps</v-icon>
              <small class="pa-1">{{ user.totalApps }}</small>
            </div>
          </template>
          <span>Applications</span>
        </v-tooltip>

        <div class="d-none d-md-flex flex-column mr-4">
          <strong class="subtitle-2">{{ user.name }}</strong>
          <v-chip small color="secondary">
            <v-icon small left>mdi-crown</v-icon>
            {{ user.plan }}
          </v-chip>
        </div>
        <v-avatar>
          <img :src="user.avatar" :alt="`${user.name}'s avatar'`" />
        </v-avatar>
        <v-menu left bottom>
          <template v-slot:activator="{ on }">
            <v-btn icon v-on="on">
              <v-icon>mdi-dots-vertical</v-icon>
            </v-btn>
          </template>

          <v-list dense>
            <v-list-item @click="() => {}">
              <v-list-item-title>
                <v-icon left>mdi-settings</v-icon>
                Account settings
              </v-list-item-title>
            </v-list-item>
            <v-list-item @click="logout">
              <v-list-item-title>
                <v-icon left> mdi-logout-variant</v-icon>
                Logout
              </v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>
      </v-app-bar>
    </div>
    <nuxt />
    <Toast />
  </v-app>
</template>

<script>
import SecLogo from '../components/SecLogo'
import Logo from '../components/Logo'
import Toast from '../components/Toast'
export default {
  components: {
    SecLogo,
    Logo,
    Toast
  },
  head() {
    return {
      meta: [
        {
          hid: 'og:url',
          property: 'og:url',
          content: process.env.BASE_URL + this.$router.history.current.fullPath
        }
      ]
    }
  },
  data() {
    return {
      user: this.$auth.user,
      drawer: false,
      items: [
        {
          icon: 'mdi-account',
          title: 'Profile',
          to: '/profile'
        },
        {
          icon: 'mdi-star',
          title: 'Upgrade',
          to: '/upgrade'
        },
        {
          icon: 'mdi-credit-card-outline',
          title: 'Payment',
          to: '/payment'
        },
        {
          icon: 'mdi-history',
          title: 'Invoices',
          to: '/invoices'
        }
      ]
    }
  },
  methods: {
    logout() {
      this.$auth.logout()
    },
    toggleDrawer() {
      this.drawer = !this.drawer
    }
  }
}
</script>

<style scoped>
@media screen and (max-width: 600px) {
  .icon {
    font-size: 10px !important;
  }
}
.logo {
  fill: #004d40;
}
</style>

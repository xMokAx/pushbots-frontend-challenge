<template>
  <v-container tag="main" class="flex-grow-1">
    <v-tabs show-arrows background-color="grey lighten-5" class="pb-3">
      <v-tabs-slider></v-tabs-slider>
      <v-tab v-for="{ icon, text } in filterTabs" :key="text" tag="button">
        <v-icon>{{ icon }}</v-icon>
        {{ text }}
      </v-tab>
    </v-tabs>
    <v-row>
      <v-col v-for="app in apps" :key="app.id" cols="12" md="6">
        <AppCard :app="app" />
      </v-col>
    </v-row>
    <v-pagination
      v-model="page"
      :length="totalApps / limit"
      :total-visible="10"
      :page="page"
      class="py-4 px-4"
    ></v-pagination>
    <Loader :is-loading="isLoading" />
  </v-container>
</template>

<script>
import { mapMutations, mapState, mapActions } from 'vuex'
import {
  GET_APPS_SUCCESS,
  GET_APPS_FAILURE
} from '../store/apps/mutation-types'
import { SHOW_TOAST } from '../store/toast/mutation-types'
import Loader from '../components/Loader'
import AppCard from '../components/AppCard'
export default {
  components: {
    Loader,
    AppCard
  },
  data() {
    return {
      filterTabs: [
        { icon: 'mdi-check', text: 'complete' },
        { icon: 'mdi-settings', text: 'in setup' },
        { icon: 'mdi-share', text: 'shared' },
        { icon: 'mdi-chart-bar', text: 'active' }
      ]
    }
  },
  computed: {
    ...mapState('apps', ['totalApps', 'limit', 'skip', 'apps', 'isLoading']),
    page: {
      get() {
        return this.$store.state.apps.page
      },
      set(newPage) {
        this.fetchApps(newPage)
      }
    }
  },
  async fetch({ store, $axios }) {
    const { limit, skip } = store.state.apps
    try {
      const res = await $axios.get(
        `/api/apps?take=${limit}&skip=${skip}&sortBy=title&direction=desc`
      )
      store.commit(`apps/${GET_APPS_SUCCESS}`, res.data)
    } catch (err) {
      store.commit(
        `toast/${SHOW_TOAST}`,
        {
          color: 'error',
          text: 'Failed to get apps. Please, check your connection.'
        },
        { root: true }
      )
      store.commit(`apps/${GET_APPS_FAILURE}`)
    }
  },
  methods: {
    ...mapMutations('toast', [SHOW_TOAST]),
    ...mapActions('apps', ['fetchApps'])
  },
  layout: 'dashboard'
}
</script>

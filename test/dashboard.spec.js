import { mount, createLocalVue } from '@vue/test-utils'
import Vue from 'vue'
import Vuex from 'vuex'
import Vuetify from 'vuetify'
import { state, mutations, actions } from '../store/apps'
import DashboardPage from '../pages/dashboard.vue'

const vuetify = new Vuetify()
Vue.use(Vuetify)

const localVue = createLocalVue()
localVue.use(Vuex)

const storeOptions = {
  modules: {
    apps: {
      namespaced: true,
      state: state(),
      mutations,
      actions
    }
  }
}
const store = new Vuex.Store(storeOptions)

describe('Dashboard Page', () => {
  it('Should match snapshot', () => {
    const wrapper = mount(DashboardPage, {
      localVue,
      vuetify,
      store,
      stubs: ['nuxt-link']
    })
    expect(wrapper.html()).toMatchSnapshot()
  })
})

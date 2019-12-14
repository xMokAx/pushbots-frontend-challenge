import { mount, createLocalVue } from '@vue/test-utils'
import Vue from 'vue'
import Vuex from 'vuex'
import Vuetify from 'vuetify'
import axios from 'axios'
import { state, mutations, actions } from '../store/apps'
import { GET_APPS_START } from '../store/apps/mutation-types'
import { mutations as toastMutations } from '../store/toast'
import DashboardPage from '../pages/dashboard.vue'

const resolvePromises = () => new Promise((resolve) => setImmediate(resolve))

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
    },
    toast: {
      namespaced: true,
      mutations: toastMutations
    }
  }
}
const store = new Vuex.Store(storeOptions)

const $axios = axios.create({
  baseURL: 'https://pushbots-fend-challenge.herokuapp.com'
})

describe('Dashboard Page', () => {
  beforeAll(async () => {
    const res = await $axios.post('/login', {
      email: 'frontend@ninja.com',
      password: '12345'
    })

    $axios.defaults.headers.common.Authorization = 'Bearer ' + res.data.token
    store.$axios = $axios
  })

  let wrapper
  beforeEach(() => {
    wrapper = mount(DashboardPage, {
      localVue,
      vuetify,
      store,
      stubs: ['nuxt-link'],
      sync: false,
      mocks: {
        $axios
      }
    })
  })

  afterEach(() => {
    wrapper.destroy()
  })

  it('Should match snapshot', () => {
    expect(wrapper.html()).toMatchSnapshot()
  })

  it('Should render apps data', async () => {
    // Calling nuxt fetch and waiting for the async promise to be solved
    await wrapper.vm.$options.fetch({ store, $axios })
    await resolvePromises()

    // Checking that the first app title is rendered
    expect(wrapper.find('.v-card').text()).toContain(wrapper.vm.apps[0].title)
  })

  it('Should change page number and fetch apps when pagination buttons are clicked', async () => {
    const dispatchSpy = jest.spyOn(store, 'dispatch')
    const commitSpy = jest.spyOn(store, 'commit')

    const secondPageButton = wrapper.findAll('.v-pagination__item').at(1)
    secondPageButton.trigger('click')
    expect(wrapper.vm.page).toBe(2)

    expect(dispatchSpy).toHaveBeenCalledWith('apps/fetchApps', 2)

    expect(commitSpy).toHaveBeenCalledWith(
      `apps/${GET_APPS_START}`,
      2,
      undefined
    )

    await wrapper.vm.$nextTick()

    const nextPageButton = wrapper.findAll('.v-pagination__navigation').at(1)
    nextPageButton.trigger('click')

    expect(wrapper.vm.page).toBe(3)
  })
})

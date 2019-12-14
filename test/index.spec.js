import { mount } from '@vue/test-utils'
import Vue from 'vue'
import Vuetify from 'vuetify'
import HomePage from '../pages/index.vue'

Vue.use(Vuetify)

describe('Home Page', () => {
  it('Should match snapshot', () => {
    const wrapper = mount(HomePage, {
      stubs: ['nuxt-link']
    })
    expect(wrapper.html()).toMatchSnapshot()
  })
})

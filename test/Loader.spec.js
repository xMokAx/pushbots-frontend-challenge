import Vue from 'vue'
import Vuetify from 'vuetify'
import { mount } from '@vue/test-utils'
import Loader from '../components/Loader'

Vue.use(Vuetify)

const propsData = {
  isLoading: true
}

describe('Loader', () => {
  const wrapper = mount(Loader, {
    propsData
  })

  it('Should match snapshot', () => {
    expect(wrapper.html()).toMatchSnapshot()
  })
})

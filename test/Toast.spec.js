import Vue from 'vue'
import Vuetify from 'vuetify'
import { mount } from '@vue/test-utils'
import Toast from '../components/Toast'

Vue.use(Vuetify)

const computed = {
  isToastShown: {
    get() {
      return true
    },
    set() {
      return false
    }
  },
  toastOptions() {
    return {
      color: 'error',
      text: 'Email or Password is wrong',
      icon: 'mdi-alert'
    }
  }
}

describe('Toast', () => {
  it('Should match snapshot', () => {
    const wrapper = mount(Toast, {
      computed
    })
    expect(wrapper.html()).toMatchSnapshot()
  })
})

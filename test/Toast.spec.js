import Vue from 'vue'
import Vuetify from 'vuetify'
import Vuex from 'vuex'
import { mount, createLocalVue } from '@vue/test-utils'
import Toast from '../components/Toast'
import { mutations, state, getters } from '../store/toast'
import { SHOW_TOAST, CLOSE_TOAST } from '../store/toast/mutation-types'

Vue.use(Vuetify)

const localVue = createLocalVue()
localVue.use(Vuex)

const storeOptions = {
  modules: {
    toast: {
      namespaced: true,
      state: state(),
      mutations,
      getters
    }
  }
}

const store = new Vuex.Store(storeOptions)

store.commit(`toast/${SHOW_TOAST}`, {
  color: 'error',
  icon: 'mdi-alert',
  text: 'Email or Password is wrong'
})

describe('Toast', () => {
  let wrapper
  beforeEach(() => {
    wrapper = mount(Toast, {
      localVue,
      store
    })
  })

  afterEach(() => {
    wrapper.destroy()
  })

  it('Should match snapshot', () => {
    expect(wrapper.html()).toMatchSnapshot()
  })

  it('Should render with toastOptions', () => {
    expect(wrapper.text()).toBe(wrapper.vm.toastOptions.text)
  })

  it('Should close toast when close button is clicked', () => {
    const closeButton = wrapper.find('button')
    closeButton.trigger('click')
    expect(wrapper.vm.isToastShown).toBeFalsy()
  })

  it('Should render nothing if isToastShown is false', () => {
    store.commit(`toast/${CLOSE_TOAST}`)
    expect(wrapper.isEmpty()).toBeTruthy()
  })
})

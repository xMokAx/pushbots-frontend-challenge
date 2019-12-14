import Vue from 'vue'
import Vuex from 'vuex'
import Vuetify from 'vuetify'
import { mount, createLocalVue } from '@vue/test-utils'
import LoginForm from '../components/LoginForm'
import { mutations, state, getters } from '../store/toast'

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

const propsData = {
  loading: false
}

describe('LoginForm', () => {
  let wrapper
  beforeEach(() => {
    wrapper = mount(LoginForm, {
      localVue,
      propsData,
      store,
      stubs: ['nuxt-link'],
      sync: false,
      mocks: {
        $auth: {
          loginWith: () => Promise.resolve()
        }
      }
    })
  })

  afterEach(() => {
    wrapper.destroy()
  })

  it('Should match snapshot', () => {
    expect(wrapper.html()).toMatchSnapshot()
  })

  it('Should call onSubmit on login button click or form submit', () => {
    const submitSpy = jest.spyOn(wrapper.vm, 'onSubmit')
    const form = wrapper.find('form')
    form.trigger('submit.prevent')
    expect(submitSpy).toBeCalled()

    const loginButton = wrapper.find('[type="submit"]')
    loginButton.trigger('submit')
    expect(wrapper.vm.onSubmit).toBeCalled()
  })
})

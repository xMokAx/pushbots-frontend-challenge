import Vue from 'vue'
import Vuetify from 'vuetify'
import { mount } from '@vue/test-utils'
import LoginForm from '../components/LoginForm'

Vue.use(Vuetify)

const propsData = {
  loading: false
}

describe('LoginForm', () => {
  let wrapper
  beforeEach(() => {
    wrapper = mount(LoginForm, {
      propsData,
      stubs: ['nuxt-link'],
      sync: false
    })
  })

  it('Should match snapshot', () => {
    expect(wrapper.html()).toMatchSnapshot()
  })

  it('Should call onSubmit on click', () => {
    const onSubmit = jest.fn()
    wrapper.setMethods({ onSubmit })
    const loginButton = wrapper.find('[type="submit"]')
    loginButton.element.disabled = false
    loginButton.trigger('submit')
    expect(onSubmit).toBeCalled()
  })
})

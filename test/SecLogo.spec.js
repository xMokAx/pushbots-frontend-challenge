import { mount } from '@vue/test-utils'
import SecLogo from '@/components/SecLogo.vue'

describe('SecLogo', () => {
  test('is a Vue instance', () => {
    const wrapper = mount(SecLogo)
    expect(wrapper.html()).toMatchSnapshot()
  })
})

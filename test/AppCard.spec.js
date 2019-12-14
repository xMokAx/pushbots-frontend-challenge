import Vue from 'vue'
import Vuetify from 'vuetify'
import { mount } from '@vue/test-utils'
import AppCard from '../components/AppCard'

Vue.use(Vuetify)

const propsData = {
  app: {
    id: '28d1e966-7508-4ee9-a594-74eb146b7671',
    title: 'fumbling needy knife',
    icon: 'https://picsum.photos/50/50',
    totalUsers: 62336,
    platforms: {
      ios: true,
      android: true,
      chrome: true,
      firefox: true,
      opera: true,
      safari: true
    },
    chartData: [
      {
        label: '2019-11-13',
        value: 27
      },
      {
        label: '2019-11-14',
        value: 121
      },
      {
        label: '2019-11-15',
        value: 938
      },
      {
        label: '2019-11-16',
        value: 517
      },
      {
        label: '2019-11-17',
        value: 748
      },
      {
        label: '2019-11-18',
        value: 845
      },
      {
        label: '2019-11-19',
        value: 693
      },
      {
        label: '2019-11-20',
        value: 324
      }
    ]
  }
}

describe('AppCard', () => {
  it('Should match snapshot', () => {
    const wrapper = mount(AppCard, {
      propsData
    })
    expect(wrapper.html()).toMatchSnapshot()
  })
})

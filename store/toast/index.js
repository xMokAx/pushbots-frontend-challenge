import { SHOW_TOAST, CLOSE_TOAST } from './mutation-types'

const icons = {
  error: 'mdi-alert',
  success: 'mdi-check',
  info: 'mdi-information',
  warning: 'mdi-exclamation'
}

export const state = () => ({
  isToastShown: false,
  toastOptions: {
    color: '',
    text: '',
    icon: ''
  }
})

export const mutations = {
  [SHOW_TOAST]: (state, toastOptions) => {
    state.isToastShown = true
    state.toastOptions = {
      icon: icons[toastOptions.color],
      ...toastOptions
    }
  },
  [CLOSE_TOAST]: (state) => {
    state.isToastShown = false
  }
}

export const actions = {}

export const getters = {
  toastOptions: (state) => state.toastOptions
}

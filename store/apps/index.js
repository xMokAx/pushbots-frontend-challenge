import { SHOW_TOAST } from '../toast/mutation-types'
import {
  GET_APPS_START,
  GET_APPS_SUCCESS,
  GET_APPS_FAILURE
} from './mutation-types'

export const state = () => ({
  isLoading: false,
  totalApps: 0,
  limit: 4,
  skip: 0,
  page: 1,
  apps: []
})

export const mutations = {
  [GET_APPS_START]: (state, page) => {
    state.isLoading = true
    state.page = page
    state.skip = page * state.limit - state.limit
  },
  [GET_APPS_SUCCESS]: (state, data) => {
    state.isLoading = false
    state.apps = data.data
    state.totalApps = data.total
  },
  [GET_APPS_FAILURE]: (state) => {
    state.isLoading = false
  }
}

export const actions = {
  async fetchApps({ commit, state }, page) {
    commit(GET_APPS_START, page)
    const { skip, limit } = state
    try {
      const res = await this.$axios.get(
        `/api/apps?take=${limit}&skip=${skip}&sortBy=title&direction=desc`
      )
      commit(GET_APPS_SUCCESS, res.data)
    } catch (error) {
      commit(
        `toast/${SHOW_TOAST}`,
        {
          color: 'error',
          text: 'Failed to get apps. Please, check your connection.'
        },
        { root: true }
      )
      commit(GET_APPS_FAILURE)
    }
  }
}

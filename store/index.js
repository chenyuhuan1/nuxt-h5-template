export const state = () => {
  return {
    token: ''
  }
}

export const mutations = {
  // 设置token
  SETTOKEN(state, token) {
    state.token = token
  }
}

export const getters = {
}

export const actions = {
  // nuxtServerInit(a, { route }) {
  // }
}

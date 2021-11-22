import { login, logout, userList } from '@/api/user'
import { getToken, setToken, removeToken } from '@/utils/auth'
import router, { resetRouter } from '@/router'
import Layout from '@/layout'
import { initMenu } from '@/utils/addMenu'
import { MessageBox, Message } from 'element-ui'
import store from '@/store'

const getDefaultState = () => {
  return {
    token: getToken(),
    name: '',
    password: '',
    userId: '',
    setRouters: []
  }
}

const state = getDefaultState()

const mutations = {
  RESET_STATE: (state) => {
    Object.assign(state, getDefaultState())
  },
  SET_TOKEN: (state, token) => {
    state.token = token
  },
  SET_NAME: (state, name) => {
    state.name = name
  },
  SET_PASSWORD: (state, password) => {
    state.password = password
  },
  SET_USERID: (state, userId) => {
    state.userId = userId
  },
  SET_ROUTER: (state, setRouters) => {
    state.setRouters = setRouters
  }
}

const actions = {
  // user login
  login({ commit }, userInfo) {
    const { username, password } = userInfo
    return new Promise((resolve, reject) => {
      login({ username: username.trim(), password: password }).then(response => {
        if (response.code === 0) {
          const { sid, user } = response.body
          commit('SET_TOKEN', sid)
          commit('SET_NAME', user.name)
          commit('SET_USERID', user.userId)
          commit('SET_PASSWORD', password)
          setToken(sid)
          userList().then(res => {
            initMenu(res.body)
            router.push({ path: this.redirect || store.getters.setRouters[0].children[0].path })
            // this.loading = false
          })
        } else {
          Message.error(response.body)
          // this.loading = false
        }
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },

  // user logout
  logout({ commit, state }) {
    return new Promise((resolve, reject) => {
      const param = {
        username: store.getters.name,
        password: store.getters.password
      }
      logout(param).then(() => {
        removeToken() // must remove  token  first
        resetRouter()
        commit('RESET_STATE')
        location.reload()
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },

  // remove token
  resetToken({ commit }) {
    return new Promise(resolve => {
      removeToken() // must remove  token  first
      commit('RESET_STATE')
      resolve()
    })
  },
  addRouter({ commit }, menus) {
    return new Promise((resolve, reject) => {
      commit('SET_ROUTER', menus)
      resolve(menus)
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}


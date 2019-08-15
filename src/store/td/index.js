import TdServer from '../../servers/td' // 相关server
// import { get, post } from '@/servers/http'
const state = {
  actList: [],
  mediaList: [],
  planList: []
}

const getters = {
  actList: state => state.actList,
  mediaList: state => state.mediaList,
  planList: state => state.planList
}

const mutations = {
  setActList (state, actList) {
    state.actList = actList
  },
  setMediaList (state, mediaList) {
    state.mediaList = mediaList
  },
  setPlanList (state, planList) {
    state.planList = planList
  }
}

const actions = {
  getActList ({ commit }, payload) {
    // if (state.actList.length) {
    //   return state.actList
    // } else {
    return TdServer.queryAccountList({
      start: 0,
      length: 100000
    }).then(res => {
      if (res.flag === 'S') {
        commit('setActList', res.data.rows)
        return res.data
      }
    })
    // }
  },
  getPlanList ({ commit }, payload) {
    // if (state.actList.length) {
    //   return state.actList
    // } else {
    return TdServer.queryPlanList({
      start: 0,
      length: 100000
    }).then(res => {
      if (res.flag === 'S') {
        commit('setPlanList', res.data.rows)
        return res.data
      }
    })
    // }
  },
  getMediaList ({ commit }, payload) {
    if (state.mediaList.length) {
      return state.mediaList
    } else {
      return TdServer.queryMediaList({}).then(res => {
        if (res.flag === 'S') {
          commit('setMediaList', res.data.rows)
          return res.data
        }
      })
    }
  }
}

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}

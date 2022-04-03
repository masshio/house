import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'
Vue.use(Vuex)
const store = new Vuex.Store({
  state: {
    token: '',
    name: '',
    id: '',
    isAdmin: '',
    uavatar: '',
  },
  mutations: {
    SET_TOKEN(state, token) {
      state.token = token;
    },
    SET_NAME(state, name) {
      state.name = name;
    },
    SET_ID(state, {uid, uavatar, rname}) {
      state.id = uid;
      state.uavatar = uavatar;
      state.rname = rname;
    },
    SET_ISADMIN(state, flag) {
      state.isAdmin = flag;
    },
    LOGOUT(state) {
      state.token = '';
      state.name = '';
      state.id = '';
      state.isAdmin = '';
    }
  },
  actions: {
  },
  modules: {
  },
  plugins: [createPersistedState({ //数据状态持久化
    storage: window.localStorage,
    reducer(val) {
      return {
        token: val.token,
        name: val.name,
        id: val.id,
        isAdmin: val.isAdmin,
        uavatar: val.uavatar,
        rname: val.rname
      }
    }
})]
})
export default store

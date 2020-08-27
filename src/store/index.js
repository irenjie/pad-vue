import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        /* 属性 */
        userInfo: JSON.parse(localStorage.getItem("userInfo"))
    },
    mutations: {
        /* setter */

        // sessionStorage 基于 session 的存储,只能存储基本数据，存对象时需序列化
        SET_USERINFO: (state, userInfo) => {
            state.userInfo = userInfo;
            localStorage.setItem("userInfo", JSON.stringify(userInfo))
        },
        REMOVE_INFO: (state, userInfo) => {
            state.token = ''
            state.userInfo = {}
            localStorage.setItem("token", '')
            localStorage.setItem("userInfo", JSON.stringify(''))
        }
    },
    getters: {
        /* getter */
        getToken: state => {
            return state.token
        },
        getUserInfo: state => {
            return state.userInfo
        }
    },
    actions: {},
    modules: {}
})

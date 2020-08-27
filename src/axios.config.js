import axios from 'axios'
import router from './router'
import store from './store'
import ElementUI from 'element-ui'

// 全局请求开头(后端)
/*axios.defaults.baseURL = "http://192.168.90.82:39081/hypad"*/

// request 拦截器
axios.interceptors.request.use(config => {
    return config
})

// response 拦截器
axios.interceptors.response.use(response => {

        if (response.data == null || !response.data.msg)
            return response;
        // 处理 Result
        let result = response.data;

        if (result) {
            result.message = response.data.msg
        }

        if (result.code == 200) {
            // 登陆成功弹出消息并放行
            if (result.message != 'OK') {
                ElementUI.Message.success(result.message)
            }
            return response
        } else {
            // 登陆异常，抛出异常，阻止 axios 继续处理($axios.post...)
            ElementUI.Message.error(result.message)
            return Promise.reject(result.message)
        }
    },
    // 后端抛出 Exception
    error => {
        if (error.response.status === 400) {
            store.commit("REMOVE_INFO")
            router.push("/login")
        }
        ElementUI.Message.error(error.response.data.msg);
        return Promise.reject(error)
    })

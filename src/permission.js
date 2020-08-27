/*
 * 路由权限拦截
 */
import router from "./router";
import ElementUI from 'element-ui'

// beforeEach 全局前置守卫
router.beforeEach((to, from, next) => {

    if (to.matched.some(record => record.meta.requireAuth)) { //判断该路由是否需要登录权限
        const isLogin = localStorage.getItem("userInfo") !== null && localStorage.getItem("userInfo").toString() !== JSON.stringify('');
        if (isLogin) {
            next()
        } else {
            ElementUI.Message.warning("请先登录!")
            next({name: 'Account'})
        }
    } else {
        next()
    }
})

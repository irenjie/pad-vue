<template>
    <div>
        <Header></Header>
        <div class="pad_menu">
            <PadMenu></PadMenu>
        </div>
        <div class="pad_content">
            <el-main v-show="!isLogin">
                <el-form :model="logInfo" :rules="logRules" ref="logInfo" label-width="100px">
                    <el-form-item label="用户名" prop="username">
                        <el-input v-model="logInfo.username"></el-input>
                    </el-form-item>
                    <el-form-item label="密码" prop="password">
                        <el-input type="password" v-model="logInfo.password"></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="login('logInfo')">登录</el-button>
                        <el-button @click="resetForm('logInfo')">重置</el-button>
                    </el-form-item>
                </el-form>
            </el-main>
            <div v-show="isLogin" align="left">
                <div style="width: 200px; margin-top: 60px; margin-left: 30px">
                    账户名: {{logInfo.username}}
                </div>
                <el-button @click="logout" type="danger" plain style="margin-left: 30px; margin-top: 10px">注销账户
                </el-button>
            </div>
        </div>
    </div>
</template>

<script>
    import PadMenu from "../components/PadMenu";
    import Header from "../components/Header";
    import ElementUI from "element-ui";

    export default {
        name: "Login",
        components: {PadMenu, Header},
        data() {
            return {
                isLogin: false,
                logInfo: {
                    username: '',
                    password: ''
                },
                logRules: {
                    username: [
                        {required: true, message: '请输入用户名', trigger: 'blur'}
                    ],
                    password: [
                        {required: true, message: '请选择密码', trigger: 'change'}
                    ]
                }
            }
        },
        methods: {
            login(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        const _this = this
                        this.$axios.post("/login", this.logInfo).then(res => {
                            const userInfo = res.data.data
                            _this.$store.commit("SET_USERINFO", userInfo)
                            _this.logInfo.username = userInfo.username
                            _this.isLogin = true
                        })
                    }
                })
            },
            logout() {
                this.$store.commit("REMOVE_INFO")
                this.isLogin = false
            },
            resetForm(formName) {
                this.$refs[formName].resetFields();
            }
        },
        created() {
            // localStorage 存的是 JSON 字符串，不是对象也不是一般字符串，不能用 空字符串 ‘’ 判断为空
            this.isLogin = localStorage.getItem("userInfo") !== null && localStorage.getItem("userInfo").toString() !== JSON.stringify('')
            if (this.isLogin){
                this.logInfo.username=JSON.parse(localStorage.getItem("userInfo")).username
            }
        }
    }
</script>

<style scoped>

</style>
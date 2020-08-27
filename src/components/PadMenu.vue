<template>
    <div class="padmenu">
        <el-radio-group v-model="isCollapse" style="margin-bottom: 20px;">
            <el-radio-button :label="false">展开</el-radio-button>
            <el-radio-button :label="true">收起</el-radio-button>
        </el-radio-group>
        <el-menu default-active="1-4-1" class="el-menu-vertical-demo" @open="handleOpen" @close="handleClose"
                 :collapse="isCollapse">
            <el-submenu index="1">
                <template slot="title">
                    <i class="el-icon-user-solid"></i>
                    <span slot="title">人员招聘</span>
                </template>
                <el-menu-item-group>
                    <el-menu-item index="1-1" @click="goPersonOne">全部人员</el-menu-item>
                    <el-menu-item index="1-2" @click="goPersonSearchOne">人员搜索</el-menu-item>
                    <el-menu-item index="1-3" @click="goPersonEditOne">人员录入</el-menu-item>
                    <el-menu-item index="1-4" @click="goKeysOne">关键字集</el-menu-item>
                </el-menu-item-group>
            </el-submenu>
            <el-submenu index="2">
                <template slot="title">
                    <i class="el-icon-location"></i>
                    <span slot="title">公司员工</span>
                </template>
                <el-menu-item-group>
                    <el-menu-item index="2-1" @click="goPersonTwo">全部员工</el-menu-item>
                    <el-menu-item index="2-2" @click="goPersonSearchTwo">员工搜索</el-menu-item>
                    <el-menu-item index="2-3" @click="goPersonEditTwo">员工录入</el-menu-item>
                    <el-menu-item index="2-4" @click="goRankTwo">职级编辑</el-menu-item>
                    <el-menu-item index="2-5" @click="goAccount">账户信息</el-menu-item>
                </el-menu-item-group>
            </el-submenu>
            <el-menu-item index="3" disabled>
                <i class="el-icon-document"></i>
                <span slot="title">开发中</span>
            </el-menu-item>
            <el-menu-item index="4" disabled>
                <i class="el-icon-setting"></i>
                <span slot="title">开发中</span>
            </el-menu-item>
        </el-menu>
    </div>
</template>

<script>
    export default {
        name: "padmenu",
        data() {
            return {
                isCollapse: false
            }
        },
        methods: {
            goPersonOne() {
                this.$router.push("/person")
            },
            goPersonSearchOne() {
                this.$router.push("/PersonSearch")
            },
            goPersonEditOne() {
                this.$router.push("/person/add")
            },
            goKeysOne() {
                this.$router.push("/keys")
            },
            goPersonTwo(){
                this.$router.push("/nowperson").catch(()=>{})
            },
            goPersonSearchTwo(){
                this.$router.push("/nowpersonsearch").catch(()=>{})
            },
            goPersonEditTwo(){
                this.$router.push("/nowperson/add").catch(()=>{})
            },
            goRankTwo(){
                this.$router.push("/rank").catch(()=>{})
            },
            goAccount(){
                this.$router.push("/account")
            },
            handleOpen(key, keyPath) {

            }, handleClose(key, keyPath) {

            }
        }
    }
</script>

<style scoped>
    .el-menu-vertical-demo:not(.el-menu--collapse) {
        width: 200px;
        min-height: 400px;
    }

    .padmenu {
        margin-top: 20px;
    }
</style>
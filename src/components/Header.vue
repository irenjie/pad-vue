<template>
    <div>
        <el-header class="header" height="60px">
            <el-image :src="picUrl" style="width: 10%" />
        </el-header>
    </div>
</template>

<script>
    export default {
        name: "Header",
        data() {
            return{
                avatarSize: 200,
                picUrl: 'http://mm.hydeze.vip/assets/hylink.png'
            }
        }
    }
</script>

<style scoped>
    .header {
        background: #e6e8ec;
        color: aliceblue;
        text-align: center;
    }
</style>
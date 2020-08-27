<template>
    <div>
        <Header></Header>
        <div class="pad_menu">
            <PadMenu></PadMenu>
        </div>

        <div class="pad_content">
            <el-table ref="multipleTable" :data="rankdata" stripe tooltip-effect="dark" style="width: 100%"
                      @selection-change="handleSelectionChange">
                <el-table-column type="selection" width="55"></el-table-column>
                <el-table-column prop="name" label="关键字" width="120"></el-table-column>
                <el-table-column prop="decription" label="描述" show-overflow-tooltip></el-table-column>
            </el-table>

            <div style="margin-top: 20px" align="left">
                <el-button @click="deleteSelect">删除所选职级</el-button>
                <el-button @click="rankDialogVisible = true">添加职级</el-button>

                <el-dialog title="新建职级" :visible.sync="rankDialogVisible">
                    <el-form :model="rankins" :rules="rules" ref="rankins">
                        <el-form-item label="职级名称" prop="name">
                            <el-input v-model="rankins.name" autocomplete="off"></el-input>
                        </el-form-item>
                        <el-form-item label="描述(选填)" prop="decription">
                            <el-input type="textarea" :rows="2" placeholder="职级描述" v-model="rankins.keydes"></el-input>
                        </el-form-item>
                    </el-form>
                    <div slot="footer" class="dialog-footer">
                        <el-button @click="rankDialogVisible = false">取 消</el-button>
                        <el-button type="primary" @click="addRank('rankins')">确 定</el-button>
                    </div>
                </el-dialog>
            </div>
        </div>
    </div>
</template>

<script>
    import Header from "../components/Header"
    import PadMenu from "../components/PadMenu";

    export default {
        name: "Rank",
        components: {PadMenu, Header},
        data() {
            return {
                rankdata: [],
                multipleSelection: [],
                rankDialogVisible: false,
                rankins: {},
                rules: {
                    name: [
                        {required: true, message: '请输入职级名称', trigger: 'blur'}
                    ]
                }
            }
        },
        methods: {
            loadPage() {
                const _this = this
                this.$axios.get("/ranks").then(res => {
                    _this.rankdata = res.data.data
                })
            },
            handleSelectionChange(val) {
                this.multipleSelection = val;
            },
            deleteSelect() {
                var temp = ''
                for (let v of this.multipleSelection) {
                    temp += (v.id + '-')
                }
                temp = temp.substr(0, temp.length - 1)
                const _this = this
                this.$axios.get('/ranks/delete/' + temp).then(res2 => {
                })
                location.reload()
            },
            addRank(rankins) {
                this.$refs[rankins].validate((valid) => {
                    if (valid) {
                        const _this = this
                        this.$axios.post('/rank/edit', this.rankins, {}).then(result => {
                            console.log(result)
                            _this.rankDialogVisible = false
                            location.reload()
                        })
                    } else {
                        console.log('error submit!!!')
                        return false;
                    }
                });
            }
        },
        // 页面渲染时即调用
        created() {
            this.loadPage()
        }
    }
</script>

<style scoped>

</style>
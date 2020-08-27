<template>
    <div>
        <Header></Header>
        <div class="pad_menu">
            <PadMenu></PadMenu>
        </div>

        <div class="pad_content">
            <el-table ref="multipleTable" :data="keysdata" stripe tooltip-effect="dark" style="width: 100%"
                      @selection-change="handleSelectionChange">
                <el-table-column type="selection" width="55"></el-table-column>
                <el-table-column prop="keyname" label="关键字" width="120"></el-table-column>
                <el-table-column prop="keydes" label="关键字描述" show-overflow-tooltip></el-table-column>
            </el-table>
            <div style="margin-top: 20px" align="left">
                <el-button @click="deleteSelect">删除所选关键字</el-button>
                <el-button @click="dialogFormVisible = true">添加关键字</el-button>

                <el-dialog title="新建关键字" :visible.sync="dialogFormVisible">
                    <el-form :model="keysins" :rules="rules" ref="keysins">
                        <el-form-item label="关键字" prop="i_name">
                            <el-input v-model="keysins.keyname" autocomplete="off"></el-input>
                        </el-form-item>
                        <el-form-item label="描述(选填)" prop="i_desc">
                            <el-input type="textarea" :rows="2" placeholder="关键字描述" v-model="keysins.keydes"></el-input>
                        </el-form-item>
                    </el-form>
                    <div slot="footer" class="dialog-footer">
                        <el-button @click="dialogFormVisible = false">取 消</el-button>
                        <el-button type="primary" @click="addKey('keysins')">确 定</el-button>
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
        name: "Keys",
        components: {PadMenu, Header},
        data() {
            return {
                keysdata: [{
                    id: '',
                    keyname: '',
                    keydes: '',
                    is_delete: '',
                    gmt_create: '',
                    gmt_modified: ''
                }],
                multipleSelection: [],
                keysins: {
                    id: '',
                    keyname: '',
                    keydes: '',
                    is_delete: '',
                    gmt_create: '',
                    gmt_modified: ''
                },
                insWid: '120px',
                dialogFormVisible: false,
                rules: {
                    /* name，gender 这些即 prop 属性*/
                    /*keyanme: [
                        {required: true, message: '请输入关键字', trigger: 'blur'}
                    ]*/
                }
            }
        },
        methods: {
            loadPage() {
                const _this = this
                this.$axios.get("/keys").then(res => {
                    _this.keysdata = res.data.data
                })
            },
            handleSelectionChange(val) {
                this.multipleSelection = val;
            },
            addKey(keysins) {
                this.$refs[keysins].validate((valid) => {
                    if (valid && this.keysins.keyname != '') {
                        const _this = this
                        this.$axios.post('/keys/edit', this.keysins, {}).then(result => {
                            console.log(result)
                        })
                        _this.dialogFormVisible = false
                    } else {
                        console.log('error submit!!!')
                        return false;
                    }
                });


            },
            deleteSelect() {
                var temp = ''
                for (let v of this.multipleSelection) {
                    temp += (v.id + '-')
                }
                temp = temp.substr(0, temp.length - 1)
                const _this = this
                this.$axios.get('/keys/delete/' + temp).then(res2 => {
                })
                location.reload()
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
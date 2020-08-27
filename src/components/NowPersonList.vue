<template>
    <div class="pad_content">
        <div class="div_table">
            <el-table :data="nowpersons" stripe style="width: 100%">
                <el-table-column prop="id" label="编号" width="100" show-overflow-tooltip></el-table-column>
                <el-table-column prop="name" label="姓名" width="100"></el-table-column>
                <!--<el-table-column prop="keysname" label="关键字" width="100"></el-table-column>-->
                <el-table-column prop="cstEntry" label="入职时间" width="100"></el-table-column>
                <el-table-column prop="department" label="部门" width="100"></el-table-column>
                <el-table-column prop="post" label="岗位" width="100"></el-table-column>
                <!-- 状态：在职/离职-->
                <el-table-column prop="status" label="状态" width="60"></el-table-column>
                <el-table-column prop="phone" label="电话" width="120"></el-table-column>
                <el-table-column prop="more" label="备注/其他" show-overflow-tooltip min-width="120px"></el-table-column>

                <el-table-column label="操作" width="200">
                    <template slot-scope="scope">
                        <el-dialog title="人员信息" :visible.sync="dialogVisible" width="500px"
                                   :before-close="handleClose">
                            <el-input type="textarea" :rows="10" placeholder="出错了!!"
                                      v-model="sharedInfo"></el-input>
                            <span slot="footer" class="dialog-footer">
                                    <el-button @click="dialogVisible = false">关 闭</el-button>
                                    <el-button type="primary" v-clipboard:copy="sharedInfo"
                                               @click="onCopy()">复 制</el-button>
                                </span>
                        </el-dialog>
                        <el-button type="text" @click="onClickShare(scope.row)" size="small">分享</el-button>
                        <el-button @click="editperson(scope.row,1)" type="text" size="small">查看</el-button>
                        <el-button @click="editperson(scope.row,2)" type="text" size="small">编辑</el-button>
                        <el-button @click="deleteperson(scope.row)" type="text" size="small">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </div>

        <!-- 分页 -->
        <el-pagination background layout="prev, pager, next" :current-page="currentPage"
                       :page-size="pageSize" @current-change=loadPage :total="total" style="margin-bottom: 40px">
        </el-pagination>
    </div>
</template>

<script>
    import ElementUI from "element-ui";

    export default {
        name: "NowPersonList",
        data() {
            return {
                currentPage: 1, // 当前页
                total: 0,        // 文章总数
                pageSize: 10,     // 页面大小，每页文章数
                nowpersons: [],      // 在职人员信息
                dialogVisible: false,    // 分享弹出框显示和隐藏
                sharedInfo: 'null',      // 分享内容
                shareKeysname: [],
                tooltip: true
            }
        },
        methods: {
            loadPage(currentPage) {
                const _this = this
                this.$axios.get("/nowperson?currentPage=" + currentPage).then(res => {
                    var recordss = res.data.data.records
                    for (var v of recordss) {
                        v.cstEntry = v.cstEntry.substr(0, 10)
                        v.gender = v.gender == 1 ? '男' : '女'
                        v.status = v.cstResign == null ? '在职' : '离职'
                    }
                    _this.nowpersons = recordss
                    _this.total = res.data.data.total
                    _this.pageSize = res.data.data.pageSize
                    _this.currentPage = res.data.data.currentPage
                })
            },
            editperson(row, n) {
                // n 区分查看还是编辑，决定创建/编辑按钮是否显示。1：查看。2：编辑
                this.$router.push('/nowperson/' + n + '' + row.id + '/edit')
            },
            deleteperson(row) {
                this.$confirm('此操作将删除该员工信息, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    const _this = this
                    this.$axios.get("/nowperson/delete/" + row.id).then(res => {
                    })
                    this.$message({
                        type: 'success',
                        message: '删除成功!'
                    });
                    location.reload()
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消删除'
                    });
                });
            },
            handleClose(done) {
                this.$confirm('确认关闭？')
                    .then(_ => {
                        done();
                    })
                    .catch(_ => {
                    });
            },
            onClickShare(row) {
                this.dialogVisible = true

                const _this = this

                this.sharedInfo = '姓名：' + row.name + '\n'
                    + '电话：' + row.phone + '\n'
                    + '性别：' + row.gender + '\n'
                    + '入职时间：' + row.cstEntry


                // 获取人员最新职级
                this.$axios.get("/lastRank/" + row.id).then(async function (result) {
                    var lastRank = result.data.data
                    if (lastRank != null) {
                        await _this.$axios.get("/rank/" + lastRank.rankid).then(res => {
                            _this.sharedInfo += '\n' + '职级：' + res.data.data.name
                        })
                    }
                    _this.sharedInfo += '\n'
                        + '部门：' + row.department + '\n'
                        + '岗位：' + row.post + '\n'
                        + '离职时间：' + (row.cstResign == null ? '在职' : row.cstResign) + '\n'
                        + '离职原因：' + (row.cstResign == null ? '在职' : row.resignReason) + '\n'
                        + '毕业学校：' + (row.school == null ? '' : row.school) + '\n'
                        + '专业：' + (row.major == null ? '' : row.major) + '\n'
                        + '学历：' + (row.qualification == null ? '' : row.qualification) + '\n'
                        + '毕业时间：' + row.cstGraduation.substr(0,10) + '\n'
                        + '备注/其它：' + (row.workset == null ? '' : row.workset)
                })
            },
            onCopy() {
                this.dialogVisible = false
                ElementUI.Message.success("成功复制到剪贴板！")
            }
        },
        // 页面渲染时即调用
        created() {
            this.loadPage(1)    // 默认显示第一页
        }
    }
</script>

<style scoped>
    .div_table {
        margin-bottom: 20px;
    }
</style>
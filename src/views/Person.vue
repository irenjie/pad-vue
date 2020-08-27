<template>
    <div>
        <Header></Header>
        <div class="pad_menu">
            <PadMenu></PadMenu>
        </div>

        <div class="pad_content">
            <div class="div_table">
                <el-table :data="persons" stripe style="width: 100%">
                    <el-table-column prop="name" label="姓名" width="100"></el-table-column>
                    <!--<el-table-column prop="keysname" label="关键字" width="100"></el-table-column>-->
                    <el-table-column prop="lightcomp" label="亮点公司和岗位" width="200"
                                     show-overflow-tooltip></el-table-column>
                    <el-table-column prop="phone" label="电话" width="120"></el-table-column>
                    <el-table-column prop="gender" label="性别" width="60"></el-table-column>
                    <el-table-column prop="workexp" label="工作经验(年)" width="100"></el-table-column>
                    <el-table-column prop="induction" label="简历日期" width="100"></el-table-column>
                    <el-table-column prop="workset" label="备注/其他" show-overflow-tooltip></el-table-column>
                    <el-table-column label="操作" width="200">
                        <template slot-scope="scope">
                            <el-dialog title="人员信息" :visible.sync="dialogVisible" width="500px"
                                       :before-close="handleClose">
                                <el-input type="textarea" :rows="10" placeholder="出错了!!"
                                          v-model="sharedInfo"></el-input>
                                <span slot="footer" class="dialog-footer">
                                    <el-button @click="dialogVisible = false">关 闭</el-button>
                                    <el-button type="primary" v-clipboard:copy="sharedInfo" @click="onCopy()">复 制</el-button>
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
    </div>
</template>

<script>
    import Header from "../components/Header"
    import PadMenu from "../components/PadMenu";
    import ElementUI from "element-ui";

    export default {
        name: "Person",
        components: {PadMenu, Header},
        data() {
            return {
                currentPage: 1, // 当前页
                total: 0,        // 文章总数
                pageSize: 10,     // 页面大小，每页文章数
                persons: [],
                keysnamec: '',
                dialogVisible: false,    // 分享弹出框显示和隐藏
                sharedInfo: 'test',      // 分享内容
                shareKeysname: [],
                tooltip: true
            }
        },
        methods: {
            loadPage(currentPage) {
                const _this = this
                this.$axios.get("/person?currentPage=" + currentPage).then(res => {
                    var recordss = res.data.data.records
                    for (var v of recordss) {
                        v.induction = v.induction.substr(0, 10)
                        v.gender = v.gender == 1 ? '男' : '女'
                        _this.$axios.get("/personkey/" + v.id).then(res2 => {
                            _this.keysnamec = res2.data.data.toString()
                        })
                        v.keysname = _this.keysnamec
                    }
                    _this.persons = recordss
                    _this.currentPage = res.data.data.current
                    _this.total = res.data.data.total
                    _this.pageSize = res.data.data.size
                })
            },
            editperson(row, n) {
                // n 区分查看还是编辑，决定创建/编辑按钮是否显示。1：查看。2：编辑
                this.$router.push('/person/' + n + '' + row.id + '/edit')
            },
            deleteperson(row) {
                const _this = this
                this.$axios.get("/person/delete/" + row.id).then(res => {
                    location.reload()
                })
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
                this.$axios.get("/personkey/" + row.id).then(res => {
                    const keysdata = res.data.data
                    _this.shareKeysname.length = 0
                    for (let v in keysdata) {
                        _this.shareKeysname.push(keysdata[v])
                    }
                    _this.sharedInfo = '姓名：' + row.name + '\n' +
                        '电话：' + row.phone + '\n' +
                        '邮箱：' + row.email + '\n' +
                        '性别：' + row.gender + '\n' +
                        '学校：' + (row.school == null ? '' : row.school) + '\n' +
                        '专业：' + (row.major == null ? '' : row.major) + '\n' +
                        '学历：' + (row.qualification == null ? '' : row.qualification) + '\n' +
                        '关键字：' + _this.shareKeysname.toString() + '\n' +
                        '工作年限：' + row.workexp + '\n' +
                        '目前薪资：' + (row.salarynow == null ? '' : row.salarynow) + '\n' +
                        '期望薪资：' + (row.salaryexpect == null ? '' : row.salaryexpect) + '\n' +
                        '简历日期：' + row.induction + '\n' +
                        '招聘渠道：' + (row.employfrom == null ? '' : row.employfrom) + '\n' +
                        '毕业时间：' + (row.gmt_report == null ? '' : row.gmt_report) + '\n' +
                        '是否面试：' + (row.isinterview == 1 ? '已面试' : '未面试') + '\n' +
                        '面试结果：' + (row.interviewres == 1 ? '已通过' : '未通过') + '\n' +
                        '备注/其它：' + (row.workset == null ? '无' : row.workset) + '\n' +
                        '亮点公司/岗位：' + (row.lightcomp == null ? '' : row.lightcomp) + '\n'
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
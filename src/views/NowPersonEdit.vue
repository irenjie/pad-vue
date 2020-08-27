<template>
    <div>
        <Header></Header>
        <div class="pad_menu">
            <PadMenu></PadMenu>
        </div>
        <div class="pad_content">
            <el-form ref="nowform" :model="nowform" :rules="rules" label-width="80px" label-position="left"
                     align="left">
                <el-form-item label="编号" prop="id">
                    <el-input v-model="nowform.id"></el-input>
                </el-form-item>
                <el-form-item label="姓名" prop="name">
                    <el-input v-model="nowform.name"></el-input>
                </el-form-item>
                <el-form-item label="性别" prop="gender">
                    <el-radio-group v-model="nowform.gender">
                        <el-radio label="男"></el-radio>
                        <el-radio label="女"></el-radio>
                    </el-radio-group>
                </el-form-item>
                <el-form-item label="学校" prop="school">
                    <el-input v-model="nowform.school"></el-input>
                </el-form-item>
                <el-form-item label="专业" prop="major">
                    <el-input v-model="nowform.major"></el-input>
                </el-form-item>
                <el-form-item label="学历" prop="qualification">
                    <el-input v-model="nowform.qualification"></el-input>
                </el-form-item>
                <el-form-item label="毕业时间" align="center" prop="cstGraduation">
                    <el-col :span="11">
                        <el-date-picker type="date" placeholder="选择日期" v-model="nowform.cstGraduation"
                                        style="width: 100%;"></el-date-picker>
                    </el-col>
                </el-form-item>
                <el-form-item label="入职时间" align="center" prop="cstEntry">
                    <el-col :span="11">
                        <el-date-picker type="date" placeholder="选择日期" v-model="nowform.cstEntry"
                                        style="width: 100%;"></el-date-picker>
                    </el-col>
                </el-form-item>

                <!-- 职级块 ##############################################-->
                <el-form-item label="职级" align="center" prop="nowPersonRanks" v-show="isEdit">
                    <el-timeline>
                        <el-timeline-item style="text-align: left;"
                                          v-for="(nowPersonRank, index) in nowPersonRanks"
                                          :key="index" :color="nowPersonRank.color"
                                          :timestamp="nowPersonRank.cstChange">
                            {{nowPersonRank.rankname}}--{{nowPersonRank.reason}}
                        </el-timeline-item>
                    </el-timeline>
                    <div style="text-align: left;">
                        <el-tooltip effect="light" content="删除最近一个职级" placement="left">
                            <el-button type="danger" plain @click="deletePersonRank()">删除</el-button>
                        </el-tooltip>
                        <el-button type="primary" plain @click="addPersonRank()">添加</el-button>
                        <!-- 添加职级 dialog -->
                        <el-dialog title="升/降一个职级" :visible.sync="addRankDialogVisible">
                            <el-form :model="addRankForm" label-width="100px" label-position="left" align="left"
                                     style="margin-left: 60px" :rules="rules" ref="nowpersonRankForm">
                                <el-form-item label="职级" style="margin-bottom: 20px">
                                    <el-select v-model="selectRank" placeholder="请选择">
                                        <el-option v-for="rank in ranks" :key="rank.id" :label="rank.name"
                                                   :value="rank.name"></el-option>
                                    </el-select>
                                </el-form-item>
                                <el-form-item label="升/降日期" prop="cstChange" style="margin-bottom: 20px">
                                    <el-col :span="11">
                                        <el-date-picker type="date" placeholder="选择日期"
                                                        v-model="addRankForm.cstChange"></el-date-picker>
                                    </el-col>
                                </el-form-item>
                                <el-form-item label="升/降原因" prop="reason">
                                    <el-input v-model="addRankForm.reason"></el-input>
                                </el-form-item>
                            </el-form>
                            <div slot="footer" class="dialog-footer">
                                <el-button @click="addRankDialogVisible = false">取 消</el-button>
                                <el-button type="primary" @click="submitAddRank('nowpersonRankForm')">确 定</el-button>
                            </div>
                        </el-dialog>
                    </div>
                </el-form-item>
                <!-- 职级块结束 ##############################################-->

                <el-form-item label="部门" prop="department">
                    <el-input v-model="nowform.department"></el-input>
                </el-form-item>
                <el-form-item label="岗位" prop="post">
                    <el-input v-model="nowform.post"></el-input>
                </el-form-item>
                <el-form-item label="离职时间" align="center" prop="cstResign">
                    <el-col :span="11">
                        <el-date-picker type="date" placeholder="选择日期" v-model="nowform.cstResign"
                                        style="width: 100%;"></el-date-picker>
                    </el-col>
                </el-form-item>
                <el-form-item label="离职原因" prop="resignReason">
                    <el-input v-model="nowform.resignReason"></el-input>
                </el-form-item>
                <el-form-item label="电话" prop="phone">
                    <el-input v-model="nowform.phone"></el-input>
                </el-form-item>

                <!-- 文件操作 -->
                <el-form-item label="文件上传" v-show="isEdit">
                    <el-upload ref="upload" :on-preview="handlePreview" :on-remove="handleRemove" :auto-upload="false"
                               :file-list="uploadFileList" :data="nowform"
                                action="http://192.168.90.82:39081/hypad/upload">
                        <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
                        <el-button style="margin-left: 10px;" size="small" type="success" @click="submitUpload"
                                   v-show="isEdit">上传到服务器
                        </el-button>
                        <div slot="tip" class="el-upload__tip">仅在此上传文件，点击 创建/修改 文件不会上传，文件不超过200Mb</div>
                    </el-upload>
                </el-form-item>
                <el-form-item label="文件下载" v-show="isEdit">
                    <el-table :data="files" stripe style="width: 100%">
                        <el-table-column :label="0" label="文件名" min-width="300" prop="name" show-overflow-tooltip></el-table-column>
                        <el-table-column label="操作" width="200">
                            <template slot-scope="scope">
                                <el-button type="text" @click="downloadFile(scope.row)" size="small">下载</el-button>
                                <el-button @click="deletefile(scope.row)" type="text" size="small">删除</el-button>
                            </template>
                        </el-table-column>
                    </el-table>
                </el-form-item>
                <!-- 文件操作结束-->

                <el-form-item label="备注" prop="more">
                    <el-input v-model="nowform.more"></el-input>
                </el-form-item>
                <el-form-item v-show="!isWatch">
                    <el-button type="primary" @click="onSubmit('nowform')">创建 / 修改</el-button>
                    <el-button @click="resetForm('nowform')">清空</el-button>
                </el-form-item>
            </el-form>
        </div>
    </div>
</template>

<script>
    import PadMenu from "../components/PadMenu";
    import Header from "../components/Header";
    import ElementUI from "element-ui";

    export default {
        name: "NowPersonEdit",
        components: {PadMenu, Header},
        data() {
            return {
                nowform: {
                    id: '',
                    name: '',
                    gender: '',
                    cstEntry: '',
                    ranknum: 0,
                    cstResign: '',
                    resignReason: '',
                    department: '',
                    post: '',
                    school: '',
                    major: '',
                    qualification: '',
                    cstGraduation: '',
                    phone: '',
                    more: ''
                },
                selectRankVisible: false,
                rankname: '',
                selectRank: '',
                addRankForm: {
                    personid: '',
                    rankid: '1',
                    shunxu: 0,
                    reason: '',
                    cstChange: ''
                },
                nowPersonRanks: [],
                isWatch: false,
                isEdit: false,
                ranks: [],
                addRankDialogVisible: false,
                uploadFileList: [],
                files: [],
                rules: {
                    id: [
                        {required: true, message: '请输入员工编号', trigger: 'blur'}
                    ],
                    name: [
                        {required: true, message: '请输入员工姓名', trigger: 'blur'}
                    ],
                    cstEntry: [
                        {required: true, message: '请输入员工入职时间', trigger: 'blur'}
                    ],
                    department: [
                        {required: true, message: '请输入员工所属部门', trigger: 'blur'}
                    ],
                    post: [
                        {required: true, message: '请输入员工岗位', trigger: 'blur'}
                    ],
                    cstGraduation: [
                        {required: true, message: '请输入员工毕业时间', trigger: 'blur'}
                    ],
                    cstChange: [
                        {required: true, message: '请选择修改日期', trigger: 'blur'}
                    ]
                }
            }
        },
        methods: {
            onSubmit(formName) {
                /* 设置 :rule 才能使用 validate 方法*/
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        const _this = this
                        this.nowform.gender = this.nowform.gender == '男' ? '1' : '0'
                        console.log("success submit!!!")
                        /* 使用 Jackson 的一个注释，现在传输给前端的数据没有 cstCreate 这种没必要传输的数据 */
                        this.$axios.post('/nowperson/edit', this.nowform, {}).then(result => {
                            // 表单提交后返回员工列表页
                            this.$router.push('/nowperson')
                        })
                    } else {
                        console.log('error submit!!!')
                        return false;
                    }
                });
            },
            resetForm(formName) {
                this.$refs[formName].resetFields();
            },
            /* 删除最近职级 */
            deletePersonRank() {
                if (this.nowPersonRanks.length == 0) {
                    return
                }
                this.$axios.get('/nowpersonrank/delete/' +
                    this.nowPersonRanks[this.nowPersonRanks.length - 1].id).then(result => {
                    location.reload()
                })
            },
            /* 打开添加职级 dialog */
            addPersonRank() {
                // 升降职级默认当前时间，少点几下
                var date = new Date();
                this.addRankForm.cstChange = date.toISOString()

                const _this = this
                this.$axios.get('/ranks').then(result => {
                    _this.addRankDialogVisible = true
                    _this.ranks = result.data.data
                })
            },
            // 提交职级添加请求
            submitAddRank(formName) {
                if (this.selectRank == '') {
                    ElementUI.Message.error("请选择一个职级")
                    return
                }
                // 设置实体类对象数据
                this.addRankForm.personid = this.nowform.id
                this.addRankForm.shunxu = this.nowPersonRanks.length + 1
                // 根据 rankname 查找 rankid
                for (let rank of this.ranks) {
                    if (this.selectRank == rank.name) {
                        this.addRankForm.rankid = rank.id
                        break
                    }
                }
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        this.$axios.post('/nowpersonrank/add', this.addRankForm, {}).then(result => {
                            location.reload()
                            this.addRankDialogVisible = false
                        })
                    } else {
                        console.log('error submit!!!')
                        return false;
                    }
                });
            },
            /* 下面的方法都是文件操作相关 */
            submitUpload() {
                this.$refs.upload.submit();
                this.$message({
                    showClose: true,
                    message: '上传成功！',
                    type: 'success'
                });
            },
            handleRemove(file, fileList) {
                console.log(file, fileList);
            },
            handlePreview(file) {
                console.log(file);
            },
            downloadFile(row) {
                console.log(this.nowform.id+'###########')
                window.location.href = 'http://192.168.90.82:39081/hypad/downloadFile/' + this.nowform.id + '-' + row.name
            },
            deletefile(row) {
                this.$axios.get('/deleteFile/' + this.nowform.id + '-' + row.name).then(res => {

                })
                location.reload()
            }
        },
        created() {
            var nowpersonId = this.$route.params.nowpersonId
            const _this = this

            // 通过地址判断是新建人员还是修改，若是修改进行数据回显
            if (nowpersonId) {
                // 区分查看还是编辑，决定创建/编辑按钮是否显示。1：查看。2：编辑
                if (nowpersonId.charAt(0) == '1')
                    this.isWatch = true
                nowpersonId = nowpersonId.substring(1, nowpersonId.length)

                // 回显人员信息
                this.isEdit = true
                this.$axios.get('/nowperson/' + nowpersonId).then(result => {
                    const nowperson = result.data.data
                    _this.nowform = nowperson
                    _this.nowform.gender = nowperson.gender == 1 ? '男' : '女'
                })

                // 回显职级
                this.$axios.get('/nowpersonrank/' + nowpersonId).then(async function (result) {
                    var nowRanks = result.data.data

                    for (let v in nowRanks) {
                        await _this.$axios.get('/rank/' + nowRanks[v].rankid).then(result2 => {
                            nowRanks[v].color = '#0bbd87'
                            nowRanks[v].cstChange = nowRanks[v].cstChange.substr(0, 10)
                            var rankdetail = result2.data.data
                            nowRanks[v].rankname = rankdetail.name
                            nowRanks[v].decription = rankdetail.decription
                        })
                    }
                    _this.nowPersonRanks = nowRanks
                })

                // 回显人员文件
                this.$axios.get("/filename/" + nowpersonId).then(res => {
                    const keysdata = res.data.data
                    for (let v in keysdata) {
                        var tabledata = {name: 'null'};
                        tabledata.name = keysdata[v];
                        _this.files.push(tabledata)
                    }
                })
            }
        }

    }
</script>

<style scoped>

</style>
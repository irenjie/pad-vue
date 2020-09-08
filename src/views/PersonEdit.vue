<template>
    <div>
        <Header></Header>
        <div class="pad_menu">
            <PadMenu></PadMenu>
        </div>

        <div class="pad_content">
            <el-form ref="form" :model="form" :rules="rules" label-width="80px" label-position="left" align="left">
                <el-form-item label="姓名" prop="name">
                    <el-input v-model="form.name"></el-input>
                </el-form-item>
                <el-form-item label="关键字">
                    <el-checkbox-group v-model="keysname" v-for="key in keysall">
                        <el-checkbox :label="key.keyname" name="type"></el-checkbox>
                    </el-checkbox-group>
                </el-form-item>
                <el-form-item label="性别" prop="gender">
                    <el-radio-group v-model="form.gender">
                        <el-radio label="男"></el-radio>
                        <el-radio label="女"></el-radio>
                    </el-radio-group>
                </el-form-item>
                <!--<el-form-item label="性别" prop="gender">
                    <el-select v-model="form.gender" placeholder="请选择性别">
                        <el-option label="男" value="man"></el-option>
                        <el-option label="女" value="women"></el-option>
                    </el-select>
                </el-form-item>-->
                <el-form-item label="学校" prop="school">
                    <el-input v-model="form.school"></el-input>
                </el-form-item>
                <el-form-item label="专业" prop="major">
                    <el-input v-model="form.major"></el-input>
                </el-form-item>
                <el-form-item label="学历" prop="qualification">
                    <el-input v-model="form.qualification"></el-input>
                </el-form-item>
                <el-form-item label="工作年限" prop="workexp">
                    <el-input type="age" v-model="form.workexp" placeholder="请输入纯整数!"></el-input>
                </el-form-item>
                <el-form-item label="目前薪资" prop="salarynow">
                    <el-input v-model="form.salarynow"></el-input>
                </el-form-item>
                <el-form-item label="期望薪资" prop="salaryexpect">
                    <el-input v-model="form.salaryexpect"></el-input>
                </el-form-item>
                <el-form-item label="简历日期" align="center" prop="induction">
                    <el-col :span="11">
                        <el-date-picker type="date" placeholder="选择日期" v-model="form.induction"
                                        value-format="yyyy-MM-ddT"
                                        style="width: 100%;"></el-date-picker>
                    </el-col>
                    <!--<el-col class="line" :span="2">-</el-col>
                    <el-col :span="11">
                        <el-time-picker placeholder="选择时间" v-model="form.date2" style="width: 100%;"></el-time-picker>
                    </el-col>-->
                </el-form-item>
                <el-form-item label="招聘渠道" prop="employfrom">
                    <el-input v-model="form.employfrom"></el-input>
                </el-form-item>
                <el-form-item label="毕业时间" align="center" prop="gmt_report">
                    <el-col :span="11">
                        <el-date-picker type="date" placeholder="选择日期" v-model="form.gmtReport"
                                        value-format="yyyy-MM-ddT"
                                        style="width: 100%;"></el-date-picker>
                    </el-col>
                </el-form-item>
                <el-form-item label="公司/岗位" prop="lightcomp">
                    <el-input v-model="form.lightcomp"></el-input>
                </el-form-item>
                <el-form-item label="是否面试" prop="isinterview">
                    <el-radio-group v-model="form.isinterview">
                        <el-radio label="已面试"></el-radio>
                        <el-radio label="未面试"></el-radio>
                    </el-radio-group>
                </el-form-item>
                <el-form-item label="面试结果" prop="interviewres">
                    <el-radio-group v-model="form.interviewres">
                        <el-radio label="通过"></el-radio>
                        <el-radio label="未通过"></el-radio>
                    </el-radio-group>
                </el-form-item>
                <el-form-item label="文件上传" v-show="isEdit">
                    <el-upload ref="upload" :on-preview="handlePreview" :on-remove="handleRemove" :auto-upload="false"
                               :file-list="fileList" :data="form"
                               action="http://localhost:39081/hypad/upload">
                        <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
                        <el-button style="margin-left: 10px;" size="small" type="success" @click="submitUpload"
                                   v-show="isEdit">上传到服务器
                        </el-button>
                        <div slot="tip" class="el-upload__tip">仅在此上传文件，点击 创建/修改 文件不会上传，文件不超过200Mb</div>
                    </el-upload>
                </el-form-item>
                <el-form-item label="文件下载" v-show="isEdit">
                    <el-table :data="files" stripe style="width: 100%">
                        <el-table-column :label="0" label="文件名" min-width="300" prop="name"
                                         show-overflow-tooltip></el-table-column>
                        <el-table-column label="操作" width="200">
                            <template slot-scope="scope">
                                <el-button type="text" @click="downloadFile(scope.row)" size="small">下载</el-button>
                                <el-button @click="deletefile(scope.row)" type="text" size="small">删除</el-button>
                            </template>
                        </el-table-column>
                    </el-table>
                </el-form-item>
                <el-form-item label="备注/其他">
                    <el-input type="textarea" v-model="form.workset"></el-input>
                </el-form-item>
                <el-form-item label="电话" prop="phone">
                    <el-input v-model="form.phone"></el-input>
                </el-form-item>
                <el-form-item label="邮箱" prop="email">
                    <el-input v-model="form.email"></el-input>
                </el-form-item>
                <el-form-item v-show="!isWatch">
                    <el-button type="primary" @click="onSubmit('form')">创建 / 修改</el-button>
                    <el-button @click="resetForm('form')">清空</el-button>
                </el-form-item>
            </el-form>
        </div>
    </div>
</template>

<script>
    import PadMenu from "../components/PadMenu";
    import Header from "../components/Header";

    export default {
        name: "PersonEdit",
        components: {PadMenu, Header},
        data() {
            return {
                form: {
                    id: '0',
                    name: '',
                    gender: '女',
                    school: '',
                    major: '',
                    qualification: '',
                    workexp: '',
                    salarynow: '',
                    salaryexpect: '',
                    induction: '',
                    employfrom: '',
                    lightcomp: '',
                    isinterview: '',
                    interviewres: '',
                    workset: '',
                    gmtReport: '',
                    phone: '',
                    email: ''
                },
                index: 0,
                files: [],
                isEdit: false,
                isWatch: false,
                keys: [],
                keysname: [],
                keysall: [], /* key 所有数据，完整的实体类 */
                fileList: [],
                rules: {
                    /* name，gender 这些即 prop 属性*/
                    name: [
                        {required: true, message: '请输入姓名', trigger: 'blur'}
                    ],
                    gender: [
                        {required: true, message: '请选择性别', trigger: 'blur'}
                    ],
                    workexp: [
                        {required: true, message: '请输入工作年限'}
                        /*{type: 'number', message: '工作年限必须为纯整数'}*/
                    ],
                    induction: [
                        {required: true, message: '请选择建简历日期', trigger: 'blur'}
                    ],
                    isinterview: [
                        {required: true, message: '请选择是否已面试', trigger: 'blur'}
                    ]
                }
            };
        },
        methods: {
            onSubmit(formName) {
                /* 设置 :rule 才能使用 validate 方法*/
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        const _this = this

                        this.form.induction = this.form.induction != null && this.form.induction != '' ? this.form.induction.substr(0, 11) + "16:00:00" : ''
                        this.form.gmtReport = this.form.gmtReport != null && this.form.gmtReport != '' ? this.form.gmtReport.substr(0, 11) + "16:00:00" : ''

                        this.form.gender = this.form.gender == '男' ? '1' : '0'
                        this.form.isinterview = this.form.isinterview == '已面试' ? '1' : '0'
                        this.form.interviewres = this.form.interviewres == '通过' ? '1' : '0'
                        console.log("success submit!!!")
                        /* 这里很多属性不应该相互传输，像 gmt_create ,图方便，我觉得应该在后端再封装一个类接管前端数据 */
                        this.$axios.post('/person/edit', this.form, {}).then(result => {
                            // 插入人员关键字,res2 中返回刚插入的人员 Id
                            var temp = result.data.data + '-' + _this.keysname.join('-')
                            _this.$axios.get('/personkey/edit/' + temp).then(res2 => {
                                if (_this.isEdit) {
                                    location.reload()
                                }
                            })
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
            submitUpload() {
                this.$refs.upload.submit();
                this.$message({
                    showClose: true,
                    message: '上传成功！',
                    type: 'success'
                });
                location.reload()
            },
            handleRemove(file, fileList) {
                console.log(file, fileList);
            },
            handlePreview(file) {
                console.log(file);
            },
            downloadFile(row) {
                window.location.href = 'http://localhost:39081/hypad/downloadFile/' + this.form.id + '-' + row.name
            },
            deletefile(row) {
                const _this = this
                this.$axios.get('/deleteFile/' + this.form.id + '-' + row.name).then(res => {
                    _this.$message({
                        showClose: true,
                        message: '删除成功！',
                        type: 'success'
                    });
                    location.reload()
                })
            }
        },
        created() {
            var personId = this.$route.params.personId
            const _this = this

            // 获取关键字
            this.$axios.get("/keys").then(res => {
                const keysdata = res.data.data
                _this.keysall = keysdata
                for (let v in keysdata) {
                    _this.keys.push(keysdata[v].keyname)
                }
            })
            // 通过地址判断是新建人员还是修改，若是修改进行数据回显
            if (personId) {
                // 区分查看还是编辑，决定创建/编辑按钮是否显示。1：查看。2：编辑
                if (personId.charAt(0) == '1')
                    this.isWatch = true
                personId = personId.substring(1, personId.length)
                // 回显人员信息
                this.isEdit = true
                this.$axios.get('/person/' + personId).then(result => {
                    const person = result.data.data
                    _this.form = person
                    _this.form.gender = person.gender == 1 ? '男' : '女'
                    _this.form.isinterview = person.isinterview == 1 ? '已面试' : '未面试'
                    _this.form.interviewres = person.interviewres == 1 ? '通过' : '未通过'
                })

                // 回显人员关键字
                this.$axios.get("/personkey/" + personId).then(res => {
                    const keysdata = res.data.data
                    for (let v in keysdata) {
                        _this.keysname.push(keysdata[v])
                    }
                })
                // 回显人员文件
                this.$axios.get("/filename/" + personId).then(res => {
                    const keysdata = res.data.data
                    for (let v in keysdata) {
                        var tabledata = {name: 'a'};
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
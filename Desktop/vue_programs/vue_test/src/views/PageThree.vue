<template>
  <div>
    <h1>update msg</h1>
    <el-form style="width: 60%" :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
      <el-form-item label="姓名" prop="sname">
        <el-input v-model="ruleForm.sname" :value="ruleForm.sname"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input v-model="ruleForm.password" :value="ruleForm.password"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('ruleForm')">修改</el-button>
        <el-button @click="resetForm('ruleForm')">重置</el-button>
        <el-button @click="test">test</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      ruleForm: {
        sname: '',
        password: ''
      },
      rules: {
        sname: [
          { required: true, message: '请输入名称', trigger: 'blur' },
          { min: 2, max: 5, message: '长度在 2 到 5 个字符', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'change' }
        ],
      }
    };
  },
  created() {
    const that = this
    this.ruleForm.sid = this.$route.query.sid
    console.log("sid" + this.ruleForm.sid)
    axios.get("http://localhost:8181/student/findById/" + this.ruleForm.sid).then(function (resp) {
      console.log(resp)
      that.ruleForm.sname = resp.data.sname
      that.ruleForm.password = resp.data.password
    })
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          // 通过前端校验
          const that = this
          console.log(this.ruleForm)
          axios.post("http://localhost:8181/student/updateStudent", this.ruleForm).then(function (resp) {
            if (resp.data === true) {
              that.$message({
                showClose: true,
                message: '修改成功',
                type: 'success'
              });
              that.$router.push("/PageOne")
            }
            else {
              that.$message.error('插入失败，请检查数据库');
            }
          })
        } else {
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    test() {
      console.log(this.ruleForm)
    }
  }
}
</script>
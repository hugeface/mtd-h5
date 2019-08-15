<template>
  <div class="y_panel">
      <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="90px" class="demo-form-inline" size="mini">
        <el-form-item label="用户名称" prop="userName">
          <el-input v-model="ruleForm.userName"></el-input>
        </el-form-item>
        <el-form-item label="邮箱地址" prop="remark">
          <el-input v-model="ruleForm.remark"></el-input>
        </el-form-item>
        <el-form-item label="角色名称" prop="userStatus">
          <el-select v-model="ruleForm.userStatus">
            <el-option label="有效" value="shanghai"></el-option>
            <el-option label="无效" value="beijing"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="用户状态" prop="userStatus">
          <el-select v-model="ruleForm.userStatus">
            <el-option label="有效" value="shanghai"></el-option>
            <el-option label="无效" value="beijing"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
  </div>
</template>

<script>
export default {
  data () {
    return {
      ruleForm: {
        remark: '',
        userName: '',
        userStatus: '',
        accountId: ''
      },
      rules: {
        userName: [
          { required: true, message: '请输入角色ID', trigger: 'blur' }
        ],
        remark: [
          { required: true, message: '请输入角色名称', trigger: 'blur' }
        ],
        userStatus: [
          { required: true, message: '请选择角色状态', trigger: 'blur' }
        ]
      },
      formList: [],
      authData: [{}]
    }
  },
  methods: {
    addAccountAuth () {
      this.formList.push('1')
    },
    deleteAccountAuth () {
      this.formList.pop()
    }
  }
}
</script>

<style lang="less" scoped>
.y_panel{
  padding: 0;
  h3{ margin: 10px }
  .empty-holder{
    width: 90%;
    height: 40px;
    line-height: 40px;
    text-align: center;
    color: #909399;
    margin: 0 auto;
    border: 1px solid #EBEEF5;
  }
}
</style>

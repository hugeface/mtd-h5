<template>
  <div class="y_panel">
    <h3>基本信息配置</h3>
      <el-form :inline="true" :model="ruleForm" :rules="rules" ref="ruleForm" label-width="90px" class="demo-form-inline" size="mini">
        <el-form-item label="角色名称" prop="userName">
          <el-input v-model="ruleForm.userName" style="width: 150px"></el-input>
        </el-form-item>
        <el-form-item label="备注" prop="remark" label-width="70px">
          <el-input v-model="ruleForm.remark" style="width: 150px"></el-input>
        </el-form-item>
        <el-form-item label="角色状态" prop="userStatus">
          <el-select v-model="ruleForm.userStatus" style="width:120px">
            <el-option label="有效" value="shanghai"></el-option>
            <el-option label="无效" value="beijing"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <h3>账户权限添加</h3>
      <el-form :inline="true" :model="ruleForm" :rules="rules" ref="ruleForm" class="demo-form-inline" size="mini">
        <el-form-item label="账户ID" label-width="90px">
          <el-input v-model="ruleForm.accountId" style="width:150px"></el-input>
          <el-button @click="addAccountAuth" type="primary" style="margin-left:30px">添加</el-button>
        </el-form-item>
      </el-form>
      <h3>账户权限列表</h3>
      <div v-if="formList.length === 0" class="empty-holder">暂无数据</div>
      <el-form v-for="(item, index) in formList" :key="index" :inline="true" :model="ruleForm" :rules="rules" ref="ruleForm" label-width="90px" class="demo-form-inline" size="mini">
        <el-form-item label="账户ID">
          <el-input v-model="item.accountId" style="width:150px"></el-input>
        </el-form-item>
        <el-form-item label="账户名称">
          <el-input v-model="item.accountName" style="width:150px"></el-input>
        </el-form-item>
        <el-form-item label="备注" label-width="6s0px">
          <el-input v-model="item.accountRemark" style="width:150px"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button @click="deleteAccountAuth" type="danger" size="mini" style="margin-left:20px">删除</el-button>
        </el-form-item>
      </el-form>
      <h3>功能权限配置</h3>
      <template>
      <el-table
        :data="authData"
        border
        size="mini"
        style="width:90%;margin:0 auto">
        <el-table-column prop="date" label="序号" width="180" />
        <el-table-column prop="name" label="功能模块名称" width="180" />
        <el-table-column prop="address" label="操作">
          <template slot-scope="scope">
            <el-checkbox v-model="scope.row.checked">查看权限</el-checkbox>
          </template>
        </el-table-column>
      </el-table>
</template>
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

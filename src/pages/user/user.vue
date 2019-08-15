<template>
<div class="x_panel">
  <h3 style="margin:0px 0 20px 0">用户管理列表</h3>
  <div class="search-area">
    <el-form :inline="true" :model="formInline" class="demo-form-inline" size="mini">
      <el-form-item label="用户名称">
        <el-input v-model="formInline.userId"></el-input>
      </el-form-item>
      <el-form-item label="角色名称">
        <el-select v-model="formInline.region" :v-model="1">
          <el-option label="产品经理" value="1"></el-option>
          <el-option label="超级管理员" value="2"></el-option>
          <el-option label="用户运营管理员" value="3"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="更新时间">
        <el-date-picker
          v-model="formInline.range"
          type="daterange"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期">
        </el-date-picker>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit" size="mini">查询</el-button>
        <el-button @click="openUserPopup('add')" type="primary" size="mini">新增用户</el-button>
      </el-form-item>
    </el-form>
  </div>
  <div class="search-result">
    <el-table
      :data="tableData"
      border
      height="550"
      size="mini"
      style="width:100%">
      <el-table-column prop="date" label="序号" width="100" fixed />
      <el-table-column prop="date" label="用户ID" width="180" />
      <el-table-column prop="date" label="用户名称" />
      <el-table-column prop="date" label="邮箱地址" width="180" />
      <el-table-column prop="date" label="角色名称" width="180" />
      <el-table-column prop="date" label="更新时间" width="180" />
      <el-table-column prop="date" label="操作人" width="180" />
      <el-table-column prop="date" label="用户状态" width="180" />
      <el-table-column prop="date" label="操作" width="280" fixed="right">
        <el-button @click="openUserPopup('edit')" type="primary" size="mini">编辑</el-button>
        <el-button @click="openUserPopup('copy-edit')" type="primary" size="mini">复制</el-button>
        <el-button @click="openUserPopup('edit')" type="primary" size="mini">重置密码</el-button>
      </el-table-column>
    </el-table>
  </div>
  <el-dialog
    :title="popupTitle"
    :visible.sync="popupVisible"
    width="500px"
    :before-close="handlePopupClose">
    <popup v-if="popupVisible" />
    <span slot="footer" class="dialog-footer">
      <el-button type="primary" @click="popupVisible = false" size="small">保存配置</el-button>
    </span>
  </el-dialog>
</div>
</template>

<script>
import Popup from './popup'
export default {
  components: { Popup },
  data () {
    return {
      editType: '',
      formInline: {
        userId: '',
        userName: '',
        range: ''
      },
      popupVisible: false,
      tableData: [{}, {}, {}]
    }
  },
  computed: {
    popupTitle: function () {
      let title = ''
      switch (this.editType) {
        case 'add':
          title = '用户新增'
          break
        case 'edit':
          title = '用户编辑'
          break
        case 'copy-edit':
          title = '用户复制新增'
          break
        default:
          break
      }
      return title
    }
  },
  methods: {
    openUserPopup (editType) {
      this.editType = editType
      this.popupVisible = true
    },
    onSubmit () {
      console.log('submit!')
    },
    handlePopupClose () {
      this.popupVisible = false
    }
  }

}
</script>

<style lang="less" scoped>
.x_panel {
  background: #fff;
  padding: 20px;
  /deep/.el-dialog__body{ padding: 10px 10px 30px 20px }
  /deep/.el-dialog__footer{ text-align: center }
}
</style>

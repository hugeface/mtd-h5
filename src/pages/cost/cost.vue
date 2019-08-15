<template>
<div class="x_panel">
  <h3 style="margin:0px 0 20px 0">角色及所属权限管理列表</h3>
  <div class="search-area">
    <el-form :inline="true" :model="formInline" class="demo-form-inline" size="mini">
      <el-form-item label="查询范围">
        <el-date-picker
          style="width:260px"
          v-model="formInline.dateRange"
          type="daterange"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期">
        </el-date-picker>
      </el-form-item>
      <el-form-item label="三级分类">
        <el-select v-model="formInline.class" filterable placeholder="请选择">
          <el-option
            v-for="item in classEnum"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="运营负责人">
        <el-select v-model="formInline.operate" filterable placeholder="请选择">
          <el-option
            v-for="item in operateEnum"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="商务负责人">
        <el-select v-model="formInline.business" filterable placeholder="请选择">
          <el-option
            v-for="item in businessEnum"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="产品类型">
        <el-select v-model="formInline.proType" filterable placeholder="请选择">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit" size="mini">查询</el-button>
        <el-button @click="openAuthPopup('add')" type="primary" size="mini">新增角色及所属权限</el-button>
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
      <el-table-column prop="date" label="序号" width="100" />
      <el-table-column prop="date" label="角色ID" width="180" />
      <el-table-column prop="date" label="角色名称" />
      <el-table-column prop="date" label="角色状态" width="180" />
      <el-table-column prop="date" label="更新时间" width="180" />
      <el-table-column prop="date" label="操作人" width="180" />
      <el-table-column prop="date" label="操作" width="180">
        <el-button @click="openAuthPopup('edit')" type="primary" size="mini">编辑</el-button>
      </el-table-column>
    </el-table>
  </div>
  <el-dialog
    :title="popupTitle"
    :visible.sync="popupVisible"
    width="850px"
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
      classEnum: '', // 从后端取回
      operateEnum: '', // 从后端取回
      businessEnum: '', // 从后端取回
      formInline: {
        dateRange: '',
        business: '',
        operate: '',
        class: '',
        proType: ''
      },
      popupVisible: false,
      tableData: [{}, {}, {}]
    }
  },
  computed: {
    popupTitle: function () {
      return `角色所属权限${this.editType === 'add' ? '新增' : '编辑'}`
    }
  },
  methods: {
    openAuthPopup (editType) {
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

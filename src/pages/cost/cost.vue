<template>
<div class="x_panel">
  <h3 style="margin:0px 0 20px 0">外部/集团渠道的明细列表</h3>
  <div class="search-area">
    <el-form :inline="true" :model="formInline" label-position="left" class="demo-form-inline" size="mini">
      <el-form-item label="查询范围">
        <el-date-picker
          style="width: 260px"
          v-model="formInline.dateRange"
          type="daterange"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期">
        </el-date-picker>
      </el-form-item>
      <el-form-item label="三级分类">
        <el-select v-model="formInline.class" filterable clearable placeholder="请选择">
          <el-option
            v-for="item in classEnum"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="运营负责人">
        <el-select v-model="formInline.operate" filterable clearable placeholder="请选择">
          <el-option
            v-for="item in operateEnum"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="商务负责人">
        <el-select v-model="formInline.business" filterable clearable placeholder="请选择">
          <el-option
            v-for="item in businessEnum"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="产品类型">
        <el-select v-model="formInline.proType" filterable clearable placeholder="请选择">
          <el-option
            v-for="item in proTypeEnum"
            :key="item.value"
            :label="item.name"
            :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="计费类型">
        <el-select v-model="formInline.chargeType" filterable clearable placeholder="请选择">
          <el-option
            v-for="item in chargeTypeEnum"
            :key="item.value"
            :label="item.name"
            :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="扣量后">
        <el-select v-model="formInline.kouliang" filterable clearable placeholder="请选择">
          <el-option
            v-for="item in kouliangEnum"
            :key="item.value"
            :label="item.name"
            :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>
      <div></div>
      <el-form-item>
        <el-checkbox v-model="isShowContract">
          是否展示合同维度
        </el-checkbox>
      </el-form-item>
      <el-form-item>
        <el-select
          v-model="formInline.kouliang"
          :disabled="!isShowContract"
          filterable clearable
          placeholder="合同名称">
          <el-option
            v-for="item in contractEnum"
            :key="item.value"
            :label="item.name"
            :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-checkbox v-model="isShowAccount">
          是否展示账号维度
        </el-checkbox>
      </el-form-item>
      <el-form-item>
        <el-select
          v-model="formInline.kouliang"
          :disabled="!isShowAccount"
          filterable clearable
          placeholder="账户名称">
          <el-option
            v-for="item in contractEnum"
            :key="item.value"
            :label="item.name"
            :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>
      <div></div>
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
      <el-table-column prop="date" label="日期" width="200" />
      <el-table-column prop="date" label="三级分类" width="180" />
      <el-table-column prop="date" label="运营负责人" width="180" />
      <el-table-column prop="date" label="商务负责人" width="180" />
      <el-table-column prop="date" label="合同号" width="180" />
      <el-table-column prop="date" label="合同名称" width="180" />
      <el-table-column prop="date" label="结算方" width="180" />
      <el-table-column prop="date" label="账户号" width="180" />
      <el-table-column prop="date" label="账户名称" width="180" />
      <el-table-column prop="date" label="账面成本" width="180" />
      <el-table-column prop="date" label="现金成本" width="180" />
      <el-table-column prop="date" label="注册" width="180" />
      <el-table-column prop="date" label="完件" width="180" />
      <el-table-column prop="date" label="授信" width="180" />
      <el-table-column prop="date" label="当日注册完件" width="180" />
      <el-table-column prop="date" label="当日注册授信" width="180" />
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
      isShowContract: false,
      isShowAccount: false,
      proTypeEnum: [
        { name: '上海大额', value: '0' },
        { name: '北京小额', value: '1' },
        { name: '上海小额', value: '2' },
        { name: '尊享贷', value: '3' }
      ],
      chargeTypeEnum: [
        { name: '前端', value: '0' },
        { name: '后端', value: '1' },
        { name: '免费', value: '2' }
      ],
      kouliangEnum: [
        { name: '扣量后', value: '0' },
        { name: '扣量前', value: '1' }
      ],
      contractEnum: [], // 从后端取回
      formInline: {
        dateRange: '',
        business: '',
        operate: '',
        class: '',
        proType: '',
        chargeType: '',
        kouliang: ''
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

<template>
<div class="x_panel">
  <h3 style="margin:0px 0 20px 0">数据看板</h3>
  <div class="exhibition">
    <div class="flex-row">
      <el-card class="box-card" shadow="never" style="width:66%"></el-card>
      <el-card class="box-card" shadow="never" style="width:34%">
        <div slot="header" class="clearfix">
          <span>营销触达成本</span>
        </div>
        <table>
          <tr>
            <td></td>
            <td>昨日预计</td>
            <td>本月累计</td>
            <td>上月累计</td>
          </tr>
          <tr>
            <td>短信</td>
            <td>100000.00</td>
            <td>100000.00</td>
            <td>100000.00</td>
          </tr>
          <tr>
            <td>闪信</td>
            <td>900000.00</td>
            <td>900000.00</td>
            <td>900000.00</td>
          </tr>
          <tr>
            <td>IVR</td>
            <td>900000.00</td>
            <td>900000.00</td>
            <td>900000.00</td>
          </tr>
        </table>
      </el-card>
    </div>
    <div class="flex-row">
      <el-card class="box-card" shadow="never" style="width:25%">
        <div slot="header" class="clearfix">
          <span>营销费用</span>
        </div>
        <table>
          <tr>
            <td></td>
            <td>昨日预计</td>
            <td>本月累计</td>
            <td>上月累计</td>
          </tr>
          <tr>
            <td>免息券</td>
            <td>100000.00</td>
            <td>100000.00</td>
            <td>100000.00</td>
          </tr>
          <tr>
            <td>免息金</td>
            <td>900000.00</td>
            <td>900000.00</td>
            <td>900000.00</td>
          </tr>
        </table>
      </el-card>
      <el-card class="box-card" shadow="never" style="width:25%">
        <div slot="header" class="clearfix">
          <span>现金/礼金</span>
        </div>
        <table>
          <tr>
            <td></td>
            <td>昨日预计</td>
            <td>本月累计</td>
            <td>上月累计</td>
          </tr>
          <tr>
            <td>MGM投放</td>
            <td>100000.00</td>
            <td>100000.00</td>
            <td>100000.00</td>
          </tr>
          <tr>
            <td>非投放类</td>
            <td>900000.00</td>
            <td>900000.00</td>
            <td>900000.00</td>
          </tr>
        </table>
      </el-card>
      <el-card class="box-card" shadow="never" style="width:25%">
        <div slot="header" class="clearfix">
          <span>电销成本</span>
        </div>
        <table>
          <tr>
            <td style="font-size:14px">昨日预计</td>
            <td>本月累计</td>
            <td>上月累计</td>
          </tr>
          <tr>
            <td style="font-size:14px">100000.00</td>
            <td>100000.00</td>
            <td>100000.00</td>
          </tr>
          <tr>
            <td style="font-size:14px">900000.00</td>
            <td>900000.00</td>
            <td>900000.00</td>
          </tr>
        </table>
      </el-card>
      <el-card class="box-card" shadow="never" style="width:25%">
        <div slot="header" class="clearfix">
          <span>品牌成本</span>
        </div>
        <table>
          <tr>
            <td style="font-size:14px">昨日预计</td>
            <td>本月累计</td>
            <td>上月累计</td>
          </tr>
          <tr>
            <td style="font-size:14px">100000.00</td>
            <td>100000.00</td>
            <td>100000.00</td>
          </tr>
          <tr>
            <td style="font-size:14px">900000.00</td>
            <td>900000.00</td>
            <td>900000.00</td>
          </tr>
        </table>
      </el-card>
    </div>
  </div>
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
        <el-button type="primary" @click="reset" size="mini">重置</el-button>
        <el-button type="primary" size="mini">导出</el-button>
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
</div>
</template>

<script>
export default {
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
      tableData: [{}, {}, {}]
    }
  },
  methods: {
    reset () {
      this.formInline = {
        dateRange: '',
        business: '',
        operate: '',
        class: '',
        proType: '',
        chargeType: '',
        kouliang: ''
      }
    },
    onSubmit () {
      console.log('submit!')
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
  .exhibition{
    .flex-row{
      height: 200px;
      display: flex;
      margin-bottom: 15px;
      &:last-child{
        margin-bottom: 20px;
      }
      &:first-child{
        height: 230px;
      }
      /deep/.box-card{
        height: 100%;
        margin-right:5px;
        .el-card__header{
          padding: 15px 20px;
        }
        .el-card__body{
          padding: 15px 10px 20px 0px;
        }
        &:last-child{ margin-right: 0 }
      }
      table{
        width: 100%;
        font-size: 14px;
        text-align: center;
        tr{
          height: 35px;
          td{
            width: 20%;
            &:first-child{ font-size: 16px }
          }
        }
      }
    }
  }
}
</style>

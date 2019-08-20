<template>
<div class="x_panel">
  <h3 style="margin:0px 0 20px 0">数据看板</h3>
  <div class="exhibition">
    <div class="flex-row">
      <el-card class="box-card line-panel" shadow="never" style="width:66%">
        <el-card class="box-card left-panel" shadow="never" style="width:40%">
          <div slot="header" class="clearfix">
            <span>投放获客成本</span>
          </div>
          <table>
            <tr>
              <td></td>
              <td>昨日预计</td>
              <td>本月累计</td>
              <td>上月累计</td>
            </tr>
            <tr>
              <td>外部渠道</td>
              <td>100000</td>
              <td>100000</td>
              <td>100000</td>
            </tr>
            <tr>
              <td>集团渠道</td>
              <td>900000</td>
              <td>900000</td>
              <td>900000</td>
            </tr>
            <tr>
              <td>内部短信</td>
              <td>900000</td>
              <td>900000</td>
              <td>900000</td>
            </tr>
          </table>
        </el-card>
        <el-card class="box-card right-panel" shadow="never">
          <div slot="header" class="clearfix">
            <span>渠道成本每日变化趋势（内部+外部渠道）</span>
          </div>
          <ve-line
            resizeable
            :data="chartData"
            height="235px"
            :settings="chartSettings"
            :tooltip-visible="false"
          ></ve-line>
        </el-card>
      </el-card>
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
            <td>100000</td>
            <td>100000</td>
            <td>100000</td>
          </tr>
          <tr>
            <td>闪信</td>
            <td>900000</td>
            <td>900000</td>
            <td>900000</td>
          </tr>
          <tr>
            <td>IVR</td>
            <td>900000</td>
            <td>900000</td>
            <td>900000</td>
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
            <td>100000</td>
            <td>100000</td>
            <td>100000</td>
          </tr>
          <tr>
            <td>免息金</td>
            <td>900000</td>
            <td>900000</td>
            <td>900000</td>
          </tr>
        </table>
      </el-card>
      <el-card class="box-card" shadow="never" style="width:25%">
        <div slot="header" class="clearfix">
          <span>现金/礼金</span>
        </div>
        <table id="overflow-table">
          <tr>
            <td></td>
            <td>昨日预计</td>
            <td>本月累计</td>
            <td>上月累计</td>
          </tr>
          <tr>
            <td>MGM投放</td>
            <td>100000</td>
            <td>100000</td>
            <td>100000</td>
          </tr>
          <tr>
            <td>非投放类</td>
            <td>900000</td>
            <td>900000</td>
            <td>900000</td>
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
            <td style="font-size:14px">100000</td>
            <td>100000</td>
            <td>100000</td>
          </tr>
          <tr>
            <td style="font-size:14px">900000</td>
            <td>900000</td>
            <td>900000</td>
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
            <td style="font-size:14px">100000</td>
            <td>100000</td>
            <td>100000</td>
          </tr>
          <tr>
            <td style="font-size:14px">900000</td>
            <td>900000</td>
            <td>900000</td>
          </tr>
        </table>
      </el-card>
    </div>
    <div style="height:40px;margin-top:25px">
      <el-button type="primary" size="mini" style="float:right">导出看板数据</el-button>
    </div>
  </div>
  <h3 style="margin:0px 0 20px 0">外部/集团渠道的明细列表</h3>
  <div class="search-area">
    <el-form :inline="true" :model="formInline" label-width="90px" :label-position="labelPosition" class="demo-form-inline" size="mini">
      <div class="option-row">
        <el-form-item label="查询范围" class="nomarl-item onehalf-width">
          <el-date-picker
            style="width: 260px"
            v-model="formInline.dateRange"
            align="right"
            unlink-panels
            type="daterange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            :picker-options="pickerOptions">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="三级分类" class="nomarl-item">
          <el-select v-model="formInline.class" filterable clearable placeholder="请选择">
            <el-option
              v-for="item in classEnum"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="运营负责人" class="nomarl-item">
          <el-select v-model="formInline.operate" filterable clearable placeholder="请选择">
            <el-option
              v-for="item in operateEnum"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="商务负责人" class="nomarl-item">
          <el-select v-model="formInline.business" filterable clearable placeholder="请选择">
            <el-option
              v-for="item in businessEnum"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
      </div>
      <div class="option-row">
        <el-form-item label="产品类型" class="nomarl-item onehalf-width">
          <el-select
            v-model="formInline.proType"
            filterable
            clearable
            style="width:260px"
            placeholder="请选择">
            <el-option
              v-for="item in proTypeEnum"
              :key="item.value"
              :label="item.name"
              :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="计费类型" class="nomarl-item">
          <el-select v-model="formInline.chargeType" filterable clearable placeholder="请选择">
            <el-option
              v-for="item in chargeTypeEnum"
              :key="item.value"
              :label="item.name"
              :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="合同类型" class="nomarl-item">
          <el-select v-model="formInline.contractType" filterable clearable placeholder="请选择">
            <el-option
              v-for="item in contractTypeEnum"
              :key="item.value"
              :label="item.name"
              :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="扣量后" class="nomarl-item">
          <el-select v-model="formInline.kouliang" filterable clearable placeholder="请选择">
            <el-option
              v-for="item in kouliangEnum"
              :key="item.value"
              :label="item.name"
              :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
      </div>
      <div style="display:flex;flex-wrap:nowrap;height:40px">
        <div style="width:32%;display:inline-block">
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
        </div>
        <div style="width:75%;display:inline-block">
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
        </div>
      </div>
      <el-form-item style="float:right;margin-bottom:25px">
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
import timer from './utils/time'

export default {
  data () {
    this.chartSettings = {
      labelMap: {
        'thisMonth': '本月',
        'lastMonth': '上月'
      }
    }
    const oneDay = 24 * 60 * 60 * 1000
    return {
      classEnum: '', // 从后端取回
      operateEnum: '', // 从后端取回
      businessEnum: '', // 从后端取回
      isShowContract: false,
      isShowAccount: false,
      labelPosition: 'left',
      pickerOptions: {
        shortcuts: [
          {
            text: '今天',
            onClick (picker) {
              picker.$emit('pick', [new Date(), new Date()])
            }
          }, {
            text: '昨天',
            onClick (picker) {
              picker.$emit('pick', [new Date() - oneDay, new Date() - oneDay])
            }
          },
          {
            text: '过去7天',
            onClick (picker) {
              picker.$emit('pick', [new Date() - 7 * oneDay, new Date()])
            }
          },
          {
            text: '过去30天',
            onClick (picker) {
              picker.$emit('pick', [new Date() - 30 * oneDay, new Date()])
            }
          }, {
            text: '本月',
            onClick (picker) {
              picker.$emit('pick', [new Date().setDate(1), new Date()])
            }
          },
          {
            text: '上月',
            onClick (picker) {
              picker.$emit('pick', [timer.getLastDayOfLastMonth(), timer.getFirstDayOfLastMonth()])
            }
          }
        ]
      },
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
      contractTypeEnum: [
        { name: '待确认', value: '0' },
        { name: '已生效', value: '1' },
        { name: '已失效', value: '2' }
      ],
      contractEnum: [], // 从后端取回
      formInline: {
        dateRange: '',
        business: '',
        operate: '',
        class: '',
        proType: '',
        chargeType: '',
        contractType: '',
        kouliang: ''
      },
      tableData: [{}, {}, {}],
      chartData: {
        columns: ['date', 'thisMonth', 'lastMonth'],
        rows: [
          { 'date': '1日', 'thisMonth': 1393, 'lastMonth': 1093 },
          { 'date': '2日', 'thisMonth': 3530, 'lastMonth': 3230 },
          { 'date': '3日', 'thisMonth': 2923, 'lastMonth': 2623 },
          { 'date': '4日', 'thisMonth': 1723, 'lastMonth': 1423 },
          { 'date': '5日', 'thisMonth': 3792, 'lastMonth': 3492 },
          { 'date': '6日', 'thisMonth': 4593, 'lastMonth': 4293 }
        ]
      }
    }
  },
  mounted: function () {
    if (document.body.offsetWidth < 1250) {
      this.labelPosition = 'top'
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
@import "./css/large-screen.less";
@import "./css/middle-screen.less";
@import "./css/small-screen.less";

</style>

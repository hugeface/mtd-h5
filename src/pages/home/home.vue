<template>
  <div class="x_panel">
    <dash-board></dash-board>
    <proxy-table></proxy-table>
    <master-table></master-table>

    <!-- <el-form size="mini" :inline="true" :model="search" label-width="100px">
      <el-row>
        <el-form-item label="媒体名称">
          <el-select v-model="search.mediaName" placeholder="请选择">
            <el-option v-for="(item,key) in mediaList" :key="key" :label="item.mediaName" :value="item.mediaType"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="人群名称">
          <el-input v-model="search.ruleName" :clearable="true" placeholder="请输入内容"></el-input>
        </el-form-item>
        <el-form-item label="操作人">
          <el-input v-model="search.updateBy" :clearable="true" placeholder="请输入内容"></el-input>
        </el-form-item>
      </el-row>
      <el-row>
        <el-form-item label="人群状态">
          <el-select v-model="search.isValid" placeholder="请选择">
            <el-option label="有效" value="Y"></el-option>
            <el-option label="无效" value="N"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="更新时间">
          <el-date-picker
            v-model="updatedTime"
            type="daterange"
            range-separator="至"
            start-placeholder="开始日期"
            format="yyyy-MM-dd"
            value-format="yyyy-MM-dd"
            end-placeholder="结束日期">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="类型">
          <el-select v-model="search.ruleType" placeholder="请选择">
            <el-option label="站内" value="ZN"></el-option>
            <el-option label="穿山甲" value="CSJ"></el-option>
          </el-select>
        </el-form-item>
      </el-row>
      <el-row>
        <el-form-item label="账户名称">
          <el-select v-model="search.advertiserId" placeholder="请选择">
            <el-option v-for="(item,key) in actList" :key="key" :label="item.advertiserName" :value="item.advertiserId"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="计划名称">
          <el-select v-model="search.adId" placeholder="请选择">
            <el-option v-for="(item,key) in planList" :key="key" :label="item.adName" :value="item.adId"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" icon="el-icon-search" @click="query">查询</el-button>
          <el-button icon="el-icon-plus" @click="addGroup">新增人群</el-button>
          <el-button icon="el-icon-plus" @click="addAccount">添加账户及查询</el-button>
          <el-button icon="el-icon-plus" @click="addPlan">添加计划及查询</el-button>
        </el-form-item>
      </el-row>
    </el-form>
    <el-table
      ref="multipleTable"
      v-loading="loading"
      border
      stripe
      header-row-class-name="theadbg"
      :data="tableData">
      <el-table-column prop="adId" label="ID" width="60"></el-table-column>
      <el-table-column prop="mediaName" label="媒体名称"></el-table-column>
      <el-table-column prop="ruleName" label="人群名称"></el-table-column>
      <el-table-column prop="id" label="人群id"></el-table-column>
       <el-table-column label="类型">
        <template slot-scope="scope">
          {{scope.row.ruleType === 'ZN' ? '站内' : '穿山甲'}}
        </template>
      </el-table-column>
      <el-table-column label="有效时间段">
        <template slot-scope="scope">
          {{JSON.parse(scope.row.ruleContent).validStartDate | date}} ~
          {{JSON.parse(scope.row.ruleContent).validEndDate | date}}
        </template>
      </el-table-column>
      <el-table-column prop="remark" label="规则备注"></el-table-column>
      <el-table-column prop="updatedBy" label="操作人"></el-table-column>
      <el-table-column label="最近一次操作日期">
        <template slot-scope="scope">
          {{scope.row.dateUpdated | date}}
        </template>
      </el-table-column>
      <el-table-column label="人群状态" width="120">
        <template slot-scope="scope">
          <el-switch
            @change="changeTaskStatus(scope.row)"
            v-model="scope.row.isValid"
            active-value="1"
            inactive-value="0"
            active-color="#13ce66">
          </el-switch>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="100">
        <template slot-scope="scope">
          <el-button size="mini" type="text" @click="edit(scope.row,'edit1')">编辑</el-button>
          <el-button size="mini" type="text" @click="edit(scope.row,'readonly')">查看</el-button>
          <br />
          <el-button size="mini" type="text" @click="edit(scope.row,'edit0')">复制并新增</el-button>
        </template>
      </el-table-column>
    </el-table> -->

    <!-- <div class="pager" ref="pager">
      <el-pagination
        background
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="search.start"
        :page-sizes="[50, 100, 200, 300]"
        :page-size="search.length"
        layout="total, sizes, prev, pager, next, jumper"
        :total="totalRows"
      ></el-pagination>
    </div> -->

    <div v-if="editorDialogVisible">
      <el-dialog
        title="编辑人群"
        :visible.sync="editorDialogVisible"
        v-if="editorDialogVisible"
        :center="false"
        width="760px"
        >

      </el-dialog>
    </div>

  </div>
</template>

<script>
import TdServer from '@/servers/td' // 相关server
import { mapGetters, mapActions } from 'vuex'
import DashBoard from '@/components/DashBoard'
import ProxyTable from '@/components/ProxyTable'
import masterTable from '@/components/masterTable'
import filters from '@/components/mixins/filter'

export default {
  mixins: [filters],
  name: 'trading_desk',
  components: {
    DashBoard,
    ProxyTable,
    masterTable
  },
  data () {
    return {
      rules: {
        ruleName: [
          { required: true, message: '请输入人群名称', trigger: 'blur' }
        ],
        advertiserId: [
          { required: true, message: '请选择账户名称', trigger: 'blur' }
        ],
        adId: [
          { required: true, message: '请选择计划名称', trigger: 'blur' }
        ],
        validDate: [
          { required: true, message: '请选择有效时间段', trigger: 'blur' }
        ]
      },
      loading: false,
      editorStatus: '', // readonly, edit0，edit1
      updatedTime: [],
      sendDate: [],
      search: {
        mediaName: '',
        mediaType: '',
        ruleName: '',
        updateBy: '',
        isValid: '',
        updateStartTime: '',
        updateEndTime: '',
        ruleType: '', // ZN:站内 CSJ:穿山甲
        advertiserId: '',
        adId: '',
        start: 0,
        length: 100
      },
      totalRows: 0,
      // 表格数据
      tableData: [],
      editorDialogVisible: false,
      accountDialogVisible: false,
      planDialogVisible: false,
      groupDetail: {
        ruleName: '',
        updateBy: '',
        isValid: '1',
        ruleType: '',
        advertiserId: '',
        adId: '',
        ruleContent: {

        },
        remark: ''
      },
      isSetTd: 0,
      validDate: [],
      operator1: 'scoreLess',
      operator2: 'scoreGreat'
    }
  },
  methods: {
    ...mapActions('td', ['getActList', 'getMediaList', 'getPlanList']),
    handleSizeChange (val) {
      this.search.length = val
      this.renderDatble()
    },
    handleCurrentChange (val) {
      this.search.start = val
      this.renderDatble()
    },
    renderDatble () {
      this.loading = true
      TdServer.queryGroupList({
        ...this.search
      }).then(res => {
        if (res.flag === 'S') {
          this.loading = false
          this.tableData = res.data.rows
          this.totalRows = res.data.total
        }
      })
    },
    query () {
      this.search.start = 0
      this.renderDatble()
    },
    addGroup () {
      this.groupDetail = {
        ruleName: '',
        updateBy: '',
        isValid: '1',
        ruleType: '',
        advertiserId: '',
        adId: '',
        ruleContent: {

        },
        remark: ''
      }
      this.editorStatus = 'edit0'
      this.editorDialogVisible = true
    },
    addAccount () {
      this.accountDialogVisible = true
    },
    addPlan () {
      this.planDialogVisible = true
    },
    edit (row, status) {
      this.loading = true
      TdServer.queryGroupDetail({
        id: row.id
      }).then(res => {
        if (res.flag === 'S') {
          this.editorStatus = status
          this.editorDialogVisible = true
          res.data.ruleContent = JSON.parse(res.data.ruleContent)
          if (res.data.ruleContent.scoreGreatEquals !== '') {
            this.isSetTd = 1
          } else {
            this.isSetTd = 0
          }
          this.validDate = [res.data.ruleContent.validStartDate, res.data.ruleContent.validEndDate]
          this.groupDetail = res.data
        }
        this.loading = false
      })
    },
    closeGroup () {
      this.editorDialogVisible = false
    },
    saveGroup () {
      this.$refs['groupForm'].validate((valid) => {
        if (valid) {
          // 判断是新增 还是 编辑 还是复制并新增
          let groupDetail = Object.assign({}, this.groupDetail)
          if (this.editorStatus === 'edit0') {
            delete groupDetail.id
          }
          TdServer.addGroup({
            ...groupDetail
          }).then(res => {
            if (res.flag === 'S') {
              this.$message({
                message: '保存成功',
                type: 'success'
              })
              this.editorDialogVisible = false
              this.query()
            }
          })
        }
      })
    },
    changeTaskStatus (row) {
      TdServer.updateGroupValid({
        id: row.id,
        isValid: row.isValid
      }).then(res => {
        if (res.flag === 'S') {
          this.$message({
            message: '更新成功',
            type: 'success'
          })
        }
      })
    }
  },
  watch: {
    updatedTime (v) {
      if (v && v.length) {
        this.search.updateStartTime = v[0]
        this.search.updateEndTime = v[1]
      } else {
        this.search.updateStartTime = ''
        this.search.updateEndTime = ''
      }
    },
    validDate (v) {
      if (v && v.length) {
        this.groupDetail.ruleContent.validStartDate = v[0]
        this.groupDetail.ruleContent.validEndDate = v[1]
      } else {
        this.groupDetail.ruleContent.validStartDate = ''
        this.groupDetail.ruleContent.validEndDate = ''
      }
    },
    isSetTd (v) {
      if (parseInt(v) === 0) {
        this.groupDetail.ruleContent.scoreLessEquals = ''
        this.groupDetail.ruleContent.scoreLess = ''
        this.groupDetail.ruleContent.scoreGreatEquals = ''
        this.groupDetail.ruleContent.scoreGreat = ''
      }
    },
    operator1 (v) {
      if (v === 'scoreLess') {
        this.groupDetail.ruleContent.scoreLessEquals = ''
      }
      if (v === 'scoreLessEquals') {
        this.groupDetail.ruleContent.scoreLess = ''
      }
    },
    operator2 (v) {
      if (v === 'scoreGreat') {
        this.groupDetail.ruleContent.scoreGreatEquals = ''
      }
      if (v === 'scoreGreatEquals') {
        this.groupDetail.ruleContent.scoreGreat = ''
      }
    }
  },
  computed: {
    ...mapGetters('td', ['actList', 'mediaList', 'planList'])
  },
  created () {
    this.query()
    this.getActList()
    this.getMediaList()
    this.getPlanList()
  }
}
</script>

<style lang="less" scoped>
.x_panel {
  background: #fff;
  padding: 20px;
  .theadbg {
    th {
      background: #f9f9f9;
    }
  }
  .tools-btn {
    margin-bottom: 10px;
  }
  .pager {
    margin-top: 10px;
  }
  .s1{
    margin-right: 10px;
  }
}
.null .el-message-box__message{
  padding-left: 0;
}
</style>

<template>
  <div>
    <el-row style="margin-bottom:10px">
      <el-col :span="5">
        <h3 style="margin:0">代理商维度</h3>
      </el-col>
      <el-col :span="19" style="text-align:right">
        <el-select size="mini" v-model="search.name" placeholder="请选择">
          <el-option key="1" label="分日" value="1"></el-option>
          <el-option key="2" label="分小时" value="2"></el-option>
        </el-select>
      </el-col>
    </el-row>
    <el-table
      ref="multipleTable"
      v-loading="loading"
      border
      stripe
      header-row-class-name="theadbg"
      :data="tableData">
      <el-table-column label="日期">
        <template slot-scope="scope">
          {{scope.row.dateUpdated | date}}
        </template>
      </el-table-column>
      <el-table-column prop="mediaName" label="代理商"></el-table-column>
      <el-table-column prop="type" label="花费"></el-table-column>
      <el-table-column prop="advertiserName" label="授信人数"></el-table-column>
      <el-table-column prop="adId" label="授信成本"></el-table-column>
      <el-table-column prop="adName" label="当日注册且授信数"></el-table-column>
      <el-table-column prop="adName" label="当日注册且授信成本"></el-table-column>
      <el-table-column prop="adName" label="注册人数"></el-table-column>
      <el-table-column prop="adName" label="注册成本"></el-table-column>
    </el-table>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import TdServer from '@/servers/td' // 相关server
import API from '@/servers/api' // 相关server
import filters from '@/components/mixins/filter'

export default {
  mixins: [filters],
  props: [],
  components: {

  },
  data () {
    return {
      loading: false,
      tableData: [],
      totalRows: 0,
      search: {
        name: '',
        start: 0,
        length: 10
      }
    }
  },
  computed: {
    ...mapGetters('td', ['actList', 'mediaList'])
  },
  methods: {
    ...mapActions('td', ['getActList', 'getMediaList']),
    renderDatble () {
      this.loading = true
      TdServer.queryPlanList({
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
    }
  },
  watch: {

  },
  mounted () {
    this.query()
    this.getMediaList()
    // this.$eventBus.$on('editStyle',this.init);
    // this.$eventBus.$on('resetStyle',this.reset);
  },
  beforeDestroy () {
    // this.$eventBus.$off('editStyle',this.init);
    // this.$eventBus.$off('resetStyle',this.reset);
  }
}

</script>

<style lang="less" scope>
  .dialog-body{
    margin:-30px 0 0 0;
  }
  hr{
    border-top:1px solid #f0f0f0
  }
</style>

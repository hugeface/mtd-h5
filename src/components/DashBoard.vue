<template>
  <div>
    <el-form style="text-align:right" :inline="true" ref="dashBoardSearch" :model="dashBoardSearch"  size="mini">
      <h3 style="float:left;margin:0;">维度筛选 <el-tag size="mini">数据截止时间：2019-09-01 11:11:11</el-tag></h3>
      <el-form-item label=" ">
        <el-select v-model="dashBoardSearch.mediaName" placeholder="代理商筛选">
          <!-- <el-option v-for="(item,key) in mediaList" :key="key" :label="item.mediaName" :value="item.mediaType"></el-option> -->
        </el-select>
      </el-form-item>
      <el-form-item label=" ">
        <el-select v-model="dashBoardSearch.mediaName" placeholder="账户筛选">
          <!-- <el-option v-for="(item,key) in mediaList" :key="key" :label="item.mediaName" :value="item.mediaType"></el-option> -->
        </el-select>
      </el-form-item>
      <el-form-item label=" ">
        <el-select v-model="dashBoardSearch.mediaName" placeholder="请选择">
          <el-option key="1" label="分日" value="1"></el-option>
          <el-option key="2" label="分小时" value="2"></el-option>
        </el-select>
      </el-form-item>
    </el-form>

    <el-row :gutter="20">
      <el-col style="margin-bottom:20px;" :xs="12" :sm="8" :md="6" :lg="4" >
        <el-card :body-style="{ padding: '0px' }">
          <div style="padding: 14px;">
            <div>展示人数</div>
            <div>123123123次</div>
            <div class="bottom clearfix" style="font-size:14px;">
              <div>环比昨日 -10.29%</div>
              <div>同比上周 -10.29%</div>
            </div>
          </div>
        </el-card>
      </el-col>
      <el-col style="margin-bottom:20px;" :xs="12" :sm="8" :md="6" :lg="3">
        <el-card :body-style="{ padding: '0px' }">
          <div style="padding: 14px;">
            <div>点击人数</div>
            <div>123123123次</div>
            <div class="bottom clearfix" style="font-size:14px;">
              <div>环比昨日 -10.29%</div>
              <div>同比上周 -10.29%</div>
            </div>
          </div>
        </el-card>
      </el-col>
      <el-col style="margin-bottom:20px;" :xs="12" :sm="8" :md="6" :lg="3">
        <el-card :body-style="{ padding: '0px' }">
          <div style="padding: 14px;">
            <div>花费</div>
            <div>123123123次</div>
            <div class="bottom clearfix" style="font-size:14px;">
              <div>环比昨日 -10.29%</div>
              <div>同比上周 -10.29%</div>
            </div>
          </div>
        </el-card>
      </el-col>
      <el-col style="margin-bottom:20px;" :xs="12" :sm="8" :md="6" :lg="3">
        <el-card :body-style="{ padding: '0px' }">
          <div style="padding: 14px;">
            <div>授信人数</div>
            <div>123123123次</div>
            <div class="bottom clearfix" style="font-size:14px;">
              <div>环比昨日 -10.29%</div>
              <div>同比上周 -10.29%</div>
            </div>
          </div>
        </el-card>
      </el-col>
      <el-col style="margin-bottom:20px;" :xs="12" :sm="8" :md="6" :lg="3">
        <el-card :body-style="{ padding: '0px' }">
          <div style="padding: 14px;">
            <div>授信成本</div>
            <div>123123123次</div>
            <div class="bottom clearfix" style="font-size:14px;">
              <div>环比昨日 -10.29%</div>
              <div>同比上周 -10.29%</div>
            </div>
          </div>
        </el-card>
      </el-col>
      <el-col style="margin-bottom:20px;" :xs="12" :sm="8" :md="6" :lg="4">
        <el-card :body-style="{ padding: '0px' }">
          <div style="padding: 14px;">
            <div>当日注册且授信数</div>
            <div>123123123次</div>
            <div class="bottom clearfix" style="font-size:14px;">
              <div>环比昨日 -10.29%</div>
              <div>同比上周 -10.29%</div>
            </div>
          </div>
        </el-card>
      </el-col>
      <el-col style="margin-bottom:20px;" :xs="12" :sm="8" :md="6" :lg="4">
        <el-card :body-style="{ padding: '0px' }">
          <div style="padding: 14px;">
            <div>当日注册且授信成本</div>
            <div>123123123次</div>
            <div class="bottom clearfix" style="font-size:14px;">
              <div>环比昨日 -10.29%</div>
              <div>同比上周 -10.29%</div>
            </div>
          </div>
        </el-card>
      </el-col>
    </el-row>

    <data-chart></data-chart>

  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import TdServer from '@/servers/td' // 相关server
import API from '@/servers/api' // 相关server
import DataChart from '@/components/DataChart'
import filters from '@/components/mixins/filter'

export default {
  mixins: [filters],
  props: ['status', 'data'],
  components: {
    DataChart
  },
  data () {
    return {
      dashBoardSearch: {}
    }
  },
  computed: {
    // ...mapGetters('td', ['actList', 'mediaList'])
  },
  methods: {
    // ...mapActions('td', ['getActList', 'getMediaList']),
    search () {

    },
    query () {

    }
  },
  watch: {

  },
  mounted () {
    // this.query()
    // this.getMediaList()
  },
  beforeDestroy () {
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

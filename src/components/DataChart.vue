<template>
  <div>
    <h3>趋势图指标</h3>
    <ve-line :data="chartData" :settings="chartSettings"></ve-line>
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
    this.chartSettings = {
      metrics: ['展示', '点击', '花费', '授信人数', '授信成本', '当日注册且授信人数', '当日注册且授信成本'],
      dimension: ['日期']
    }
    return {
      chartData: {
        columns: ['日期', '展示', '点击', '花费', '授信人数', '授信成本', '当日注册且授信人数', '当日注册且授信成本'],
        rows: [
          { '日期': '1/1', '展示': 1393, '点击': 1093, '花费': 0.32 },
          { '日期': '1/2', '展示': 3530, '点击': 3230, '花费': 0.26 },
          { '日期': '1/3', '展示': 2923, '点击': 2623, '花费': 0.76 },
          { '日期': '1/4', '展示': 1723, '点击': 1423, '花费': 0.49 },
          { '日期': '1/5', '展示': 3792, '点击': 3492, '花费': 0.323 },
          { '日期': '1/6', '展示': 4593, '点击': 4293, '花费': 0.78 }
        ]
      }
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

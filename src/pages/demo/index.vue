<template>
  <div>
    <el-row>
      <el-button type="primary" @click="openTab" >打开新tab</el-button>
    </el-row>
    <el-row type="flex" style="margin-top:50px;" justify="center">
      <strong
        style="font-size: 40px;">{{$t('demo.helloWorld')}} !</strong></el-row>

  </div>
</template>

<script>

export default {
  data () {
    return {
      lang: 'zh'
    }
  },
  components: {

  },
  watch: {

  },

  mounted () {

  },

  methods: {
    openTab () {
      var urlObj = {
        'tabTitle': 'xieyinyi',
        'url': ' http://localhost:8088/demo.html',
        'params': {
          'testParam': '测试参数ABC'
        }
      }
      this.$clio.openTab(urlObj)
    }
  }
}
</script>

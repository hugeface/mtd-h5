<template>
    <div id="app">
      <el-card  style="height:800px;margin-top:20px">
      <router-view/>
      </el-card>
    </div>
</template>
<script>

export default {
  created () {
    this.$clio.getLang(this)
    this.$clio.loaded()
  }

}
</script>

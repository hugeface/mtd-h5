<template>
<div class="cs-dropdown" @click="switchDropMenu">
  <span class="demo-content">1234567890</span>
  <div :class="`drop-menu ${dropMenuStyle}`">
    ABC
  </div>
</div>
</template>
<script>
export default {
  name: 'CsDropdown',
  data () {
    return {
      isDropMenuOpen: false
    }
  },
  mounted: function () {
    // 获取附着组件的相对浏览器坐标
  },
  computed: {
    dropMenuStyle: function () {
      return (this.isDropMenuOpen ? 'drop-menu-open' : 'drop-menu-hide')
    }
  },
  methods: {
    switchDropMenu: function () {
      if (this.isDropMenuOpen) {
        this.isDropMenuOpen = false
      } else {
        this.isDropMenuOpen = true
      }
    }
  }
}
</script>
<style lang="less">
.cs-dropdown{
  cursor: pointer;
  background: lightblue;
  display: inline-block;
  position: relative;
  .drop-menu{
    width: 100%;
    cursor: default;
    height: 500px;
    position: absolute;
  }
  .drop-menu-open{
    display: block;
  }
  .drop-menu-hide{
    display: none;
  }
  .demo-content{
    width: 180px;
    background: lightgoldenrodyellow;
    display: inline-block;
  }
}
</style>

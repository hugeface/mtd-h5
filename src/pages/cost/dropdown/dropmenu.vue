<template>
  <div :class="['drop-menu', dropMenuStyle]">
    ABC
  </div>
</template>
<script>
export default {
  name: 'CsDropMenu',
  props: ['isMenuOpen'],
  data () {
    return {

    }
  },
  computed: {
    dropMenuStyle: function () {
      return (this.isMenuOpen ? 'drop-menu-open' : 'drop-menu-hide')
    }
  },
  mounted () {

  }
}
</script>
<style lang="less" scoped>
.drop-menu{
  width: 100%;
  position: fixed;
  z-index: 9999;
  margin-top: 10px;
  cursor: default;
  max-height: 274px;
  position: absolute;
  background: #ffffff;
  padding: 6px 0;
  border: 1px solid #E4E7ED;
  border-radius: 4px;
  box-shadow: 0 2px 12px 0 rgba(0,0,0,.1);
  // transition-duration: .3s;
  // transform-origin: center top;
}
.drop-menu-open{
  display: block;
}
.drop-menu-hide{
  display: none;
}
</style>

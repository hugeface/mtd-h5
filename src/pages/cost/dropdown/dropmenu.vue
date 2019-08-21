<template>
  <div :class="['drop-menu', 'drop-menu-open']">
    <ul>
      <li
        v-for="item in options"
        :key="item.value"
        :class="getItemStyle(item)"
        @click="onOptionClick(item)">
        <span>{{item.label}}</span>
      </li>
    </ul>
  </div>
</template>
<script>
export default {
  name: 'CsDropMenu',
  props: ['options', 'uuid'],
  data () {
    return {
      selected: []
    }
  },
  methods: {
    onOptionClick (item) {
      const index = this.selected.findIndex(x => x.value === item.value)
      if (index === -1) {
        this.selected.push(item)
      } else {
        this.selected.splice(index, 1)
      }
      console.log(this)
      this.$eventBus.$emit(`updateSelected__${this.uuid}`, this.selected)
    },
    getItemStyle (item) {
      if (this.selected.findIndex(x => x.value === item.value) !== -1) {
        return 'item-selected'
      } else {
        return ''
      }
    }
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
  overflow-y: scroll;
  ul,li{ list-style: none; margin: 0; padding: 0 }
  ul>li{
    height: 34px;
    line-height: 34px;
    font-size: 14px;
    padding: 0 20px;
    color: #606266;
    cursor: pointer;
    &:hover{
      background-color: #F5F7FA;
    }
  }
  .item-selected{
    color: #409EFF;
    font-weight: 700;
    &:after{
      position: absolute;
      right: 20px;
      font-family: element-icons;
      content: "\E6DA";
      font-size: 12px;
      font-weight: 700;
      -webkit-font-smoothing: antialiased;
    }
  }
}
.drop-menu-open{
  display: block;
}
.drop-menu-hide{
  display: none;
}
</style>

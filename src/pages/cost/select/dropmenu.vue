<template>
  <div :class="['drop-menu', 'drop-menu-open']">
    <div class="tools">
      <el-button @click="selectAll" style="width:50%">全选</el-button>
      <el-divider direction="vertical"></el-divider>
      <el-button @click="unselectAll" style="width:50%;margin-left:0">全不选</el-button>
    </div>
    <ul>
      <li
        v-for="item in optionsFiltrated"
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
  props: ['options', 'uuid', 'filterStr'],
  data () {
    return {
      selected: []
    }
  },
  computed: {
    optionsFiltrated: function () {
      debugger
      if (!this.filterStr) {
        return this.options
      }
      return this.options.filter(item => {
        return item.label.includes(this.filterStr)
      })
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
      this.$eventBus.$emit(`updateSelected__${this.uuid}`, this.selected)
    },
    getItemStyle (item) {
      if (this.selected.findIndex(x => x.value === item.value) !== -1) {
        return 'item-selected'
      } else {
        return ''
      }
    },
    selectAll () {
      this.selected = JSON.parse(JSON.stringify(this.options))
      this.$eventBus.$emit(`updateSelected__${this.uuid}`, this.selected)
    },
    unselectAll () {
      this.selected = []
      this.$eventBus.$emit(`updateSelected__${this.uuid}`, this.selected)
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
  padding-bottom: 6px;
  border: 1px solid #E4E7ED;
  border-radius: 4px;
  box-shadow: 0 2px 12px 0 rgba(0,0,0,.1);
  overflow-y: hidden;
  .tools{
    height: 35px;
    border-bottom: 1px solid #E4E7ED;
    white-space: nowrap;
    .el-divider--vertical{
      height: 100%;
      margin: 0;
    }
    button{
      height: 100%;
      border: unset;
      border-radius: 0;
    }
  }
  ul,li{ list-style: none; margin: 0; padding: 0 }
  ul{
    max-height: 239px;
    overflow-y: scroll;
  }
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
      position: relative;
      float: right;
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

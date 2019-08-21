<template>
<div class="cs-dropdown">
    <div
    :class="`cs-input input__${uuid}`"
    @click="switchInputStatus">
    <input
      @blur="onInputBlur"
      :class="`${focusedStyle}`" />
    <span class="cs-input-suffix">
      <i class="el-icon-iconName el-icon-arrow-down" />
    </span>
  </div>
  <cs-drop-menu
    :isMenuOpen="isFocus"
  />
</div>
</template>
<script>
import CsDropMenu from './dropmenu'
import CsInput from '../input/input'
import uuid from '../utils/uuid'

export default {
  name: 'CsDropdown',
  components: { CsDropMenu, CsInput },
  data () {
    return {
      uuid: '',
      isFocus: false
    }
  },
  mounted: function () {
    // 获取附着组件的相对浏览器坐标
    this.uuid = uuid()
  },
  computed: {
    focusedStyle: function () {
      return (this.isFocus ? 'input_focus' : 'input_unfocus')
    }
  },
  methods: {
    switchInputStatus: function () {
      if (!this.isFocus) {
        this.isFocus = true
      } else {
        this.isFocus = false
        document.querySelector(`.input__${this.uuid} input`).blur()
      }
    },
    onInputBlur: function () {
      this.isFocus = false
    }
  }
}
</script>
<style lang="less">
.cs-dropdown{
  cursor: pointer;
  display: inline-block;
  position: relative;
  .demo-content{
    width: 180px;
    background: lightgoldenrodyellow;
    display: inline-block;
  }
}
.cs-input{
  width: 180px;
  position: relative;
  cursor: pointer;
  input{
    width: 100%;
    height: 100%;
    padding: 5px 15px;
    box-sizing: border-box;
    border-radius: 4px;
    border: 1px solid #DCDFE6;
    outline: unset;
    cursor: pointer;
  }
  .input_focus{
    border: 1px solid #409EFF;
    &+span{
      transition: .3s;
      transform: rotate(-180deg);
    }
  }
  .input_unfocus{
    border: 1px solid #DCDFE6;
    &+span{
      transition: .3s;
      transform: rotate(0deg);
    }
  }
  .cs-input-suffix{
    width: 25px;
    text-align: center;
    position: absolute;
    right: 5px;
    font-size: 14px;
    color: #C0C4CC;
    line-height: 28px;
  }
}
</style>

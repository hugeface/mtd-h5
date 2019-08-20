<template>
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
</template>
<script>
import uuid from '../utils/uuid'

export default {
  name: 'CsInput',
  data () {
    return {
      uuid: '',
      isFocus: false
    }
  },
  mounted: function () {
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
<style lang="less" scoped>
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

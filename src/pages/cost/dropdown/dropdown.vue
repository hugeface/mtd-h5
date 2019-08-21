<template>
<div :class="['cs-dropdown', `dropdown__${uuid}`]">
  <div :class="`cs-input input__${uuid}`">
    <input v-model="filterStr" :class="[focusedStyle]" :placeholder="inputText" />
    <el-tag
      size="mini"
      closable
      @close="onCloseClick"
      style="left:0;width:70px"
      v-if="selected.length > 0">
      {{selected[0].label}}
    </el-tag>
    <el-tag
      size="mini"
      style="left:75px"
      v-if="selected.length > 1">
      + {{selected.length - 1}}
    </el-tag>
    <span class="cs-input-suffix">
      <i class="el-icon-iconName el-icon-arrow-down" />
    </span>
  </div>
  <transition name="bounce">
    <cs-drop-menu v-show="isFocus" :options="options" :uuid="uuid" :filterStr="filterStr" />
  </transition>
</div>
</template>
<script>
import CsDropMenu from './dropmenu'
import CsInput from '../input/input'
import uuid from '../utils/uuid'

export default {
  name: 'CsDropdown',
  components: { CsDropMenu, CsInput },
  props: ['options'],
  data () {
    return {
      uuid: '',
      isFocus: false,
      selected: [],
      filterStr: ''
    }
  },
  mounted: function () {
    this.uuid = uuid()
    window.addEventListener('click', (e) => {
      const classArray = e.path.map(item => item.className)
      if (classArray.join('').match(this.uuid)) {
        this.isFocus = true
      } else {
        this.isFocus = false
        const csInput = document.querySelector(`.input__${this.uuid} input`)
        csInput && csInput.blur()
      }
    })
    this.$eventBus.$on(`updateSelected__${this.uuid}`, data => {
      console.log(data)
      this.selected = data
    })
  },
  // destroyed: function () {
  //   window.removeEventListener('click', (e) => {
  //     const classArray = e.path.map(item => item.className)
  //     console.log(e.path)
  //     console.log(this.uuid, classArray.join('').match(this.uuid))
  //     if (classArray.join('').match(this.uuid)) {
  //       this.isFocus = true
  //     } else {
  //       this.isFocus = false
  //       document.querySelector(`.input__${this.uuid} input`).blur()
  //     }
  //   })
  // },
  computed: {
    focusedStyle: function () {
      let style = ''
      style += this.isFocus ? 'input_focus' : 'input_unfocus'
      if (this.selected.length > 0) {
        style += this.selected.length > 1 ? ' wide-left-padding' : ' narrow-left-padding'
      }
      return style
    },
    inputText: function () {
      return this.selected.length === 0 ? '请选择' : ''
    }
  },
  methods: {
    onCloseClick: function () {
      console.log('123')
      this.selected.pop()
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
  .el-tag{
    position: absolute;
    margin: 4px 0 2px 6px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    padding-right: 10px;
    .el-icon-close{
      position: absolute;
      top: 2px;
      right: 0px;
    }
  }
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
    &::-webkit-input-placeholder{
      color: #C3C7CF;
    }
  }
  .input_focus{
    border: 1px solid #409EFF;
    &>.cs-input-suffix{
      transition: .3s;
      transform: rotate(-180deg);
    }
  }
  .input_unfocus{
    border: 1px solid #DCDFE6;
    &>.cs-input-suffix{
      transition: .3s;
      transform: rotate(0deg);
    }
  }
  .wide-left-padding{
    padding-left: 120px;
  }
  .narrow-left-padding{
    padding-left: 80px;
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
.bounce-enter-active {
  animation: bounce-in .3s;
}
.bounce-leave-active {
  animation: bounce-in .3s linear reverse;
}
@keyframes bounce-in {
  0% {
    height: 0px;
  }
  100% {
    height: 100%;
  }
}
</style>

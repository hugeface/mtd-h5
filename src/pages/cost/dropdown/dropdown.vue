<template>
<div :class="['cs-dropdown', `dropdown__${uuid}`]">
  <div :class="`cs-input input__${uuid}`">
    <input :class="[focusedStyle]" />
    <span class="cs-input-suffix">
      <i class="el-icon-iconName el-icon-arrow-down" />
    </span>
  </div>
  <transition name="bounce">
    <cs-drop-menu v-if="isFocus" :options="options" />
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
      isFocus: false
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
      return (this.isFocus ? 'input_focus' : 'input_unfocus')
    }
  },
  methods: {

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

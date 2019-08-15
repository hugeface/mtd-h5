<template>
  <el-container style="height:100%">
    <el-header style="background-color:#409EFF;" class="header">
      <el-row type="flex" justify="space-between">
        <el-col :span="10" class="logo" :class="isCollapse?'logo-collapse-width':'logo-width'" style="font-size: 18px;">
          {{isCollapse?'':sysName}}{{ show()}}
        </el-col>

          <el-select v-model="lang" placeholder="请选择">
            <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
            </el-option>
          </el-select>

      </el-row>

    </el-header>
    <el-container>
      <el-aside width="">
        <el-menu class="el-menu-vertical-demo" :collapse="isCollapse" style="height:100%" router>
          <template v-for='(unit_menu,index) in menu_list'>
            <el-menu-item :key="index" @click="clickMenu(unit_menu.path)">{{unit_menu.name}}</el-menu-item>
          </template>
        </el-menu>
      </el-aside>
      <el-container>
        <el-main style="overflow: visible;padding: 10px;">
          <el-row v-loading="loading">
            <iframe id='iframeId' :src="jupyterUrl" scrolling="no" frameborder="0" style=" width:100%;"
              @load="iframeOnload()"></iframe>
          </el-row>
        </el-main>
      </el-container>
    </el-container>
  </el-container>
</template>

<script>
import axios from 'axios'
import $ from 'jquery'

export default {
  name: 'HelloWorld',
  data () {
    return {
      loading: false,
      jupyterUrl: null,
      menu_list: [],
      breadlist: '',
      isCollapse: false,
      sysName: '360金融',
      sysUserName: '',
      sysUserAvatar: '',
      lang: 'zh',
      options: [
        {
          'label': '中文',
          'value': 'zh'

        },
        {
          'label': '英语',
          'value': 'en'

        }
      ]
    }
  },
  methods: {
    iframeOnload: function () {
      if (this.jupyterUrl != null) {
        this.loading = false
      }
    },
    // 折叠导航栏
    collapse: function () {
      this.isCollapse = !this.isCollapse
    },
    clickMenu: function (url) {
      this.jupyterUrl = url + '?lang=' + this.lang
    },

    openTab (urlObj) {
      var url = urlObj.url + '?'
      for (var key in urlObj.params) {
        url += key + '=' + urlObj.params[key] + '&'
      }
      url += 'lang=' + this.lang
      console.log(url)

      window.open(url, '_blank')
    },
    show(){
      this.$te('route')
      // console.log("xieyinyizui shuai")
    }

  },
  mounted: function () {
    axios.get('/htmls').then(result => {
      for (var p in result.data.data) {
        if (p === 'index') {
          continue
        }
        this.menu_list.push({
          'name': result.data.data[p].filename,
          'path': result.data.data[p].filename
        })
      }
    })

    window.addEventListener('message', (result) => {
      var opt = result.data.data
      if (opt !== undefined) {
        if (opt.event === 'openTab') {
          this.openTab(result.data.data)
        }
      }
    })
    function reinitIframe () {
      var iframe = document.getElementById('iframeId')
      try {
        var bHeight = iframe.contentWindow.document.body.scrollHeight
        var dHeight = iframe.contentWindow.document.documentElement.scrollHeight
        var height = Math.max(bHeight, dHeight)
        iframe.height = height
        // console.log(iframe.contentWindow)
        // console.log(bHeight, dHeight)
      } catch (ex) {}
    };
    setInterval(reinitIframe, 100)
  },
  watch: {
    lang (value) {
      this.jupyterUrl = ''
    }
  }
}
</script>
<style scoped>
.header {
  margin-left: 0px;
  height: 60px;
  line-height: 60px;
  color: #fff;
}
.tools {
  padding: 0px 0px;
  width: 14px;
  height: 60px;
  line-height: 60px;
  cursor: pointer;
}
.logo {
  height: 60px;
  font-size: 22px;
  padding-left: 20px;
  padding-right: 20px;
}
.logo-width {
  width: 180px;
}
.logo-collapse-width {
  width: 44px;
}
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
}
</style>

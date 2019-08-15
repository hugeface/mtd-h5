import axios from 'axios'
import VueCookies from 'vue-cookies'
if (VueCookies.get('jupyterServer') == null) {
  axios.get('/api/getJupyterUrl.do').then(response => {
    VueCookies.set('jupyterServer', response.data)
  })
}
export default{
  data: null,
  currentVue: null,
  openNotebook: function (Vue, data) {
  // 检测notebook 是否存在
    this.data = data
    this.currentVue = Vue
    axios.get(VueCookies.get('jupyterServer') + '/api/contents/').then(response => {
      var contents = []
      response.data.content.forEach(row => {
        contents.push(row['name'])
      })
      if (contents.indexOf(this.data['name']) !== -1) {
        this.goNotebook()
      } else {
        this.createNotebook()
      }
    }).catch(error => {
      console.log(error)
    })
  },
  goNotebook: function () {
    var url = document.location.toString()
    if (url.indexOf('views') !== -1) {
      window.location.href = '/views/jupyter.html#/' + this.data['name']
    } else {
      window.location.href = '/jupyter.html#/' + this.data['name']
    }
  },
  createNotebook: function () {
    axios.post(VueCookies.get('jupyterServer') + '/api/contents/', {'type': 'notebook'}).then(response => {
      this.renameNotebook(response.data)
    })
  },
  renameNotebook: function (responseData) {
    axios.patch(VueCookies.get('jupyterServer') + '/api/contents/' + responseData['path'], {'path': this.data['name']}).then(response => {
      this.fillContent()
    })
  },
  fillContent: function () {
    var code = "import json\nwith open('" + this.data['coursedataPath'] + "') as file:\n\tdata=json.load(file)"
    var contents = {
      'type': 'notebook',
      'content': {
        'cells': [
          {
            'metadata': { 'trusted': true },
            'cell_type': 'code',
            'source': code,
            'execution_count': null,
            'outputs': []
          }
        ],
        'metadata': {
          'kernelspec': {
            'name': 'python3',
            'display_name': 'Python 3',
            'language': 'python'
          }
        },
        'nbformat': 4,
        'nbformat_minor': 2
      }
    }
    axios.put(VueCookies.get('jupyterServer') + '/api/contents/' + this.data['name'], contents).then(response => {
      this.goNotebook()
    })
  }
}

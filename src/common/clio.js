import queryString from 'query-string'
export default {
  getLang: function (vue) {
    if (this.getUrlKey('lang') === undefined) {
      vue.$i18n.locale = 'zh'
    } else {
      vue.$i18n.locale = this.getUrlKey('lang')
    }
  },
  getUrlKey: function (name) {
    return queryString.parse(window.location.search)[name]
  },
  openTab (option) {
    option['event'] = 'openTab'
    option.url += '?loading=true'
    window.parent.postMessage(
      {
        data: option
      },
      '*'
    )
  },
  loaded () {
    window.parent.postMessage(
      {
        data: {
          event: 'loaded',
          clio_tab_no: this.getUrlKey('clio_tab_no')
        }
      },
      '*'
    )
  }
}

import Vue from 'vue'
import VueI18n from 'vue-i18n'
import Cookies from 'js-cookie'
import elementEnLocale from 'element-ui/lib/locale/lang/en' // element-ui lang
import elementZhLocale from 'element-ui/lib/locale/lang/zh-CN'// element-ui lang
import enLocale from './en'
import zhLocale from './zh'
import axios from 'axios'

Vue.use(VueI18n)

const messages = {
  en: {
    ...enLocale,
    ...elementEnLocale
  },
  zh: {
    ...zhLocale,
    ...elementZhLocale
  }
}
export function getLanguage () {
  const chooseLanguage = Cookies.get('language')
  if (chooseLanguage) return chooseLanguage

  // if has not choose language
  const language = (navigator.language || navigator.browserLanguage).toLowerCase()
  const locales = Object.keys(messages)
  for (const locale of locales) {
    if (language.indexOf(locale) > -1) {
      return locale
    }
  }
  return 'zh'
}
const i18n = new VueI18n({
  // set locale
  // options: en | zh | es
  locale: getLanguage(),
  // set locale messages
  messages
})

export function mergeJson (json1, json2) {
  var json3 = {}
  var commonKeys = []

  for (var key in json1) {
    if (json2.hasOwnProperty(key)) {
      commonKeys.push(key)
    } else {
      json3[key] = json1[key]
    }
  }
  for (key in json2) {
    if (commonKeys.indexOf(key) === -1) {
      json3[key] = json2[key]
    }
  }
  for (var index in commonKeys) {
    key = commonKeys[index]
    if (typeof json1[key] === 'string' && typeof json2[key] === 'string') {
      json3[key] = json1[key]
    } else if (typeof json1[key] === 'object' && typeof json2[key] === 'string') {
      json3[key] = json1[key]
    } else if (typeof json1[key] === 'string' && typeof json2[key] === 'object') {
      json3[key] = json2[key]
    } else if (typeof json1[key] === 'object' && typeof json2[key] === 'object') {
      json3[key] = mergeJson(json1[key], json2[key])
    }
  }

  return json3
}
// 获取语言包

export function setLangs () {
  axios.post('/clio/common/getLangs', { language: getLanguage() }).then(res => {
    var localLangs = messages[getLanguage()]
    var clioLangs = res.data.data
    for (var key in clioLangs) {
      if (key.indexOf('.') === -1) {
        localLangs[key] = clioLangs[key]
      } else {
        var keys = key.split('.')
        var unit = {}
        for (var i = keys.length - 1; i >= 0; i--) {
          if (i === keys.length - 1) {
            unit[keys[i]] = clioLangs[key]
          } else {
            unit[keys[i]] = unit
          }
        }
        localLangs = mergeJson(unit, localLangs)
      }
    }

    i18n.setLocaleMessage(getLanguage(), localLangs)
  })
}
setLangs()
export default i18n

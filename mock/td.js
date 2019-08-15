
const mockUpload = require('./data/upload.json')
const mockSuccess = require('./data/success.json')
const mockMediaList = require('./data/media_list.json')

const mockGroupList = require('./data/group_list.json')
const mockPlanList = require('./data/plan_list.json')
const mockAccountList = require('./data/account_list.json')

const mockGroupDetail = require('./data/group_detail.json')
const mockPlanDetail = require('./data/plan_detail.json')
const mockAccountDetail = require('./data/account_detail.json')

module.exports.init = function (app) {
  app.post('/media/queryMediaList', (req, res) => {
    res.json(mockMediaList)
  })

  app.post('/taskGroup/queryTaskPageList.do', (req, res) => {
    res.json(mockGroupList)
  })
  app.post('/taskGroup/addTask.do', (req, res) => {
    res.json(mockSuccess)
  })
  app.post('/taskGroup/queryTask.do', (req, res) => {
    res.json(mockGroupDetail)
  })

  app.post('/taskGroup/updateValid.do', (req, res) => {
    res.json(mockSuccess)
  })

  app.post('/account/queryAccountPageList.do', (req, res) => {
    res.json(mockAccountList)
  })
  app.post('/account/addAccount.do', (req, res) => {
    res.json(mockSuccess)
  })
  app.post('/account/deleteAccount.do', (req, res) => {
    res.json(mockSuccess)
  })

  app.post('/plan/queryPlanPageList.do', (req, res) => {
    res.json(mockPlanList)
  })

  app.post('/plan/addPlan.do', (req, res) => {
    res.json(mockSuccess)
  })
  app.post('/plan/deletePlan.do', (req, res) => {
    res.json(mockSuccess)
  })
  app.post('/plan/excelUpload.do', (req, res) => {
    res.json(mockSuccess)
  })
}

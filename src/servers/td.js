import API from './api'
import { post } from './http'
export default {
  queryGroupList: p => post(API.QUERY_GROUP_LIST, p),
  addGroup: p => post(API.ADD_GROUP, p),
  queryGroupDetail: p => post(API.QUERY_GROUP_DETAIL, p),
  updateGroupValid: p => post(API.UPDATE_GROUP_VALID, p),

  queryAccountList: p => post(API.QUERY_ACCOUNT_LIST, p),
  addAccount: p => post(API.ADD_ACCOUNT, p),
  // queryAccountDetail: p => post(API.QUERY_ACCOUNT_DETAIL, p),
  delAccount: p => post(API.DEL_ACCOUNT, p),

  queryPlanList: p => post(API.QUERY_PLAN_LIST, p),
  addPlan: p => post(API.ADD_PLAN, p),
  // queryPlanDetail: p => post(API.QUERY_PLAN_DETAIL, p),
  delPlan: p => post(API.DEL_PLAN, p),
  uploadPlan: p => post(API.UPLOAD_PLAN, p),

  queryMediaList: p => post(API.QUERY_MEDIA_LIST, p)

}

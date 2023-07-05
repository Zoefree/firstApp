import request from "../axios.js";

//获取全部信息接口
export const getUserInfo = (data) =>
  request.post("/getOverTimes", { params: data });
//查询时间内数据
export const getSomeInfo = (data) =>
  request.post("/getDatasByTimes", { params: data });
//新增用户信息接口
export const addUserInfo = (data) =>
  request.post("/addOverTimes", { params: data });
//编辑信息接口
export const editUserInfo = (data) =>
  request.post("/editOverTimes", { params: data });
//删除用户信息接口
export const delUserInfo = (data) =>
  request.post("/deleteOverTimes", { params: data });

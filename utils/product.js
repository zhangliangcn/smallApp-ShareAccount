
// 用来传递产品
let item={}


// 用来传递用户信息
let userInfo={}


var checkReg=function(){
 return wx.getStorageSync("isReg")
}




module.exports={
  item,
  userInfo,
  checkReg
}
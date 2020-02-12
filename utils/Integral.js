/**
 * @Author zhangliang
 * create:2020/02/12
 * update:2020/02/13
 * 
 * desc:积分系统
 */

const app=getApp()

//获取当前积分
//let getIntegral = app.globalData.userintegral


function getIntegral(){
  return app.globalData.userintegral
  console.log(Date)
}
//添加当前积分,并且更新全局变量
function addIntegral(i=0){  
  app.globalData.userintegral+=i 
}
//减少积分
function reduceIntegral(i=0,a=3){
  var temp = app.globalData.userintegral
  if(a>=0 && temp-i>=0){
    app.globalData.userintegral-=i
    return true
  }else{
    return false
  }
}






module.exports = {
  getuserIntegral: getIntegral,
  addintegral: addIntegral,
  reduceIntegral:reduceIntegral

}

//app.js
const _NEV=require('utils/deviceInfo.js')
//腾讯统计工具
var mta = require('utils/mta_analysis.js')

App({
  onLaunch: function () {

// 初始化腾讯统计组件

    mta.App.init({
      "appID": "500710667",
      "autoReport": true,
      "statParam": true,
      "ignoreParams": [],
    });
    // 展示本地存储能力
    // var logs = wx.getStorageSync('logs') || []
    // var shareLogs = wx.getStorageSync('shareLogs') || []
    // logs.unshift(Date.now())
    
    // wx.setStorageSync('logs', logs)



    

    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
      }
    })
    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.userInfo = res.userInfo

              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        }
      }
    })
  },
  globalData: {
    userInfo: null,
    userintegral:0
  }
})



/**
 * 存储桶的固定前缀：https://temp-1251251237.cos.ap-chengdu.myqcloud.com/【文件名】
 * https://temp-1251251237.cos.ap-chengdu.myqcloud.com/user-zhuan.png
 * https://temp-1251251237.cos.ap-chengdu.myqcloud.com/test-temp-head.jpg
 * 
 * 
 * 
 */
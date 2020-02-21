// pages/user/index.js
const app = getApp()
const sysIntegral = require('../../utils/Integral.js')
const behavior = require('../../utils/behavior.js')
const loginIn = require('../../utils/loginIn.js')
const postInfo = require('../../utils/product.js')

Page({


  behaviors: [behavior,loginIn],

  data: {
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    hasUserInfo: false,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
      
      this.setUserInfo()
    

 


    //判断用户是否已经授权登录过

  

    if (app.globalData.userInfo) {
      
      postInfo.userInfo = app.globalData.userInfo
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse) {
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        postInfo.userInfo = app.globalData.userInfo
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          postInfo.userInfo = res.userInfo
          wx.setStorage({
            key: 'isLogin',
            data: true,
            success:function(){
              console.log("设置isReg缓存成功")
            },
            fail:function(){
              wx.showToast({
                title: '换出出错，请联系管理员WX：azhang_liang',
              })
            }
          })
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
  },


  getUserInfo: function (e) {
    // e.detail.errMsg:"getUserInfo:fail auth deny"
    // errMsg: "getUserInfo:ok"

   
    if (e.detail.errMsg ==="getUserInfo:ok"){

      app.globalData.userInfo = e.detail.userInfo

      
      
      this.setData({
        userInfo: e.detail.userInfo,
        hasUserInfo: true
      })



      var that = this
      // 获取用户唯一标识符
      wx.login({
        success: res => {
          wx.request({
            url: that.data.domian + 'index.php/getSession',
            method:"POST",
            data:{
                code:res.code,
                nickName:that.data.userInfo.nickName,
                gender: that.data.userInfo.gender,
                avatarUrl: that.data.userInfo.avatarUrl,
                province: that.data.userInfo.province,
                country: that.data.userInfo.country,
                city: that.data.userInfo.city
            },
            success: function (res) {
              wx.setStorageSync("isLogin", true)
              wx.setStorageSync("UserData", res.data)
              that.setData({
                userInfo: res.data.userInfo
              })
            
            }
          })
        },
        fail: res => {
          wx.setStorageSync("openid", "0")
        }
      })

    }else{
      wx.showToast({
        title: '感谢您的关注',
      })
    }




  },


  getUserStatus:function(){
    var that = this
    wx.getStorage({
      key: 'isLogin',
      success: function(res) {
        console.log(res)
       if(!res.data){
         that.setData({
           hasUserInfo: false
         })
       }

      },fail(res){
        console.log("fail",res)
        that.setData({
          hasUserInfo: false
        })
      }
    })
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    console.log(this.data.hasUserInfo)
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function (res) {
    
    //判断是否登陆，登陆成功后分享可以获得积分
    
      sysIntegral.addintegral(3)
      console.log(sysIntegral.getuserIntegral())
    

    //分享卡片设置
    return {
      title: "赶快收藏起来，全网VIP账号共享，用到手软",
      path: "/pages/home/home",
      imageUrl: "../../static/sharebg.png"
    }
  }
  
})
// 设备信息
const _NEV = require('utils/deviceInfo.js')
//腾讯统计工具
var mta = require('utils/mta_analysis.js')

//状态管理
import Store from 'utils/store.js';

let store = new Store({

  state: {
    version: '1.2.0',
    desc: '界面修改',
    domian: "https://wecha.wechasamllapp.xyz/",
    userInfo: {
      nickName: null,
      avatarUrl: null,
      integral: 0,
      token: null,
      refresh_token: null, //刷新token
      openid: null, //唯一标识符
    },
    productInfo: {
      p_Id: '', //产品ID
      p_Imgurl: 'https://temp-1251251237.cos.ap-chengdu.myqcloud.com/product-xunlei.png', //产品封面图片，
      p_Name: '产品的标题',
      p_Price: 10.2, //市场价格
      p_Integral: 500, //所需要积分
      p_isshipping: 1, //是否包邮，1为包邮，0 为不包邮
      p_inventory: 49, //当前剩余库存
      p_type: '' //当前类别
    },
    orderInfo: {
      progress_text: "0",//进度显示文字
      per: 0,//进度条指数，最低0 最高100
      btn_status: 0,//按钮当前状态
      title_status: 0,//当前砍价提示的状态 0 为初始状态，1为砍价后的变化提示
      loadingShow: false,//显示遮罩层
      selfPrice: 0,      //自己砍的价格
      alreadyPrice: 0,    //总共砍掉的累积金额
      hasUsers: 0,         //还需要多少人完成全部砍价
      sYJE: 0,   //剩余金额
      isNewOrder: true

    },
    refreshLogs:{
      orderID:0,//传递参数
      randNum:0//随机数存储容器，用来
    }
    

  },
  method: {
   
  }
})




App({

  store: store,

  onLaunch: function() {


    // 初始化腾讯统计组件
    mta.App.init({
      "appID": "500710667",
      "autoReport": true,
      "statParam": true,
      "ignoreParams": [],
    });

    var that = this
    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {

          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // console.log("wx.getUserInfo", res)
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.userInfo = res.userInfo

              // 获取用户唯一标识符
              wx.login({
                success: res => {
                  wx.request({
                    url: that.globalData.domian + 'index.php/getSession',
                    method: "POST",
                    data: {
                      code: res.code,
                      nickName: that.globalData.userInfo.nickName,
                      gender: that.globalData.userInfo.gender,
                      avatarUrl: that.globalData.userInfo.avatarUrl,
                      province: that.globalData.userInfo.province,
                      country: that.globalData.userInfo.country,
                      city: that.globalData.userInfo.city,

                    },
                    success: res => {
                      wx.setStorageSync("isLogin", true)
                      let {
                        userInfo
                      } = this.store.getState()


                      userInfo.nickName = res.data.userInfo.nickName
                      userInfo.avatarUrl = res.data.userInfo.avatarUrl
                      userInfo.integral = res.data.userInfo.integral
                      userInfo.openid = res.data.userInfo.openid

                      this.store.setState({
                        userInfo
                      })


                      if (this.readyUserinfo) {
                        this.readyUserinfo(res.data.userInfo)
                      }
                    }
                  })
                }
              })




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
  onLoad(){
   
  },
  globalData: {
    userInfo: null,
    userintegral: 0,
    domian: "https://wecha.wechasamllapp.xyz/"
  }
})
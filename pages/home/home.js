const behavior = require('../../utils/behavior.js')
const app = getApp()


Page({

  behaviors:[behavior],

  data: {
    isshow:false,//是否显示
  
  },
  
 


  onLoad: function (options) { 

    //回调函数放置网络延时
    app.readyUserinfo=res=>{
      // this.setUserInfo()
    }
    console.log("111")
    this.isLogin()

    var { userInfo } = getApp().store.getState().userInfo
    console.log(userInfo)
  
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    // this.refreshUserInfo()

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})
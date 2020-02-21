// pages/productDesc/productDesc.js
// 页面信息传递管理系统
const postInfo = require('../../utils/product.js')
//积分系统
const integral = require('../../utils/Integral.js')
const behavior =require('../../utils/behavior.js')
Page({
  
  behaviors:[behavior],
  data: {
  },
  // 左上角【返回按钮】执行函数
  goback:function(res){
    wx.navigateBack({ 
    })
  },
  // 左下角【主页按钮】执行函数
  goHome:function(res){
    wx.switchTab({
      url: '../home/home'
    })
  },
  
  // 点击【砍价0元拿按钮】执行操作
  action_kan:function(){
    wx.navigateTo({
      url: '../kanjia/kanjia',
    })

  },
 //点击【立即兑换按钮】执行操作
  goExchang:function(res){
   if(this.data.productInfo.p_price * 500 >this.data.myIntegral){
     wx.showModal({
       title: '积分不足提醒',
       content: '点击确定，邀请朋友帮忙来砍价',
       success:function(res){
         if (res.confirm){
           wx.navigateTo({
             url: '../kanjia/kanjia',
           })
         }
       }
     })
   }else{
     wx.showToast({
       title: 'helo',
     })
   }
    
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      productInfo:postInfo.item
    })
   
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
// pages/home/home.js
const test = require('../../utils/Integral.js')

Page({

  /**
   * 页面的初始数据
   */
  data: {

  },
  goDetail:function(res){
    var tempid = res.currentTarget.id
    wx.navigateTo({
      url: '../accountDetail/accountdetail?urlid=' + tempid,
      fail:function(res){
        console.log(res)
      }
    })
  },
  hello:function(res){
    test.addintegral(3)
   console.log(test.getuserIntegral())
  },
  reduce:function(res){
   
   console.log(test.reduceIntegral(3, 3))
    console.log(test.getuserIntegral())
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
    console.log(test.getuserIntegral())
    
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
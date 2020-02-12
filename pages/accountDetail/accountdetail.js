// pages/accountDetail/accountdetail.js
const source =require("../../utils/source.js")
//引入积分管理模块
const sysIntegral = require('../../utils/Integral.js')
//临时账号信息，后期版本调整为服务端
const accinfo = [
  {
    "a": "test",
    "p": "test"
  },
  {
    "a": "15905450433",
    "p": "Fhooa8693"
  },
  {
    "a": "13823157696",
    "p": "eqe88022"
  },
  {
    "a": "16533934479",
    "p": "pd5009"
  },
  {
    "a": "2446300590@qq.com",
    "p": "abc123!@#"
  },
  {
    "a": "17121928007",
    "p": "a115588"
  },
  {
    "a": "guiyunbi362051@163.com",
    "p": "bsxpeuw0ql"
  },
  {
    "a": "17666026307",
    "p": "yy1224"
  },
  {
    "a": "zangpu927090044@163.com	",
    "p": "grydj5vd34"
  }

]


Page({

  /**
   * 页面的初始数据
   */
  data: {
    fmWidth:0,
    fmHeight:0,
    active:0,
    acc:"",
    pwd:"",
    showpwd:"",
    btnable:false

    

  },
  onChange(event) {
    // event.detail 的值为当前选中项的索引
    this.setData({ active: event.detail });
  },
  //客服反馈
  handleContact:function(res){

  },
  //返回首页
  goHome:function(event){
    wx.switchTab({
      url: '../home/home',
    })
  },
//获取密码按钮被单击
  getpwd:function(){
    var that=this
    if(sysIntegral.reduceIntegral(3, 3)){
      this.setData({
        showpwd:that.data.pwd,
        btnable:true
      })

    }else{
      wx.showModal({
        title:"积分暂时不足",
        content:"点击确认，到客户中心获取积分",
        showCancel:false,
        success:function(res){
          if(res.confirm===true){
            wx.switchTab({
              url:"../user/index"
            })
          }
        }
      })
    }
  },



  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //获取传递参数
    var id = id = options.urlid
    this.setData({
      acc:accinfo[id].a,
      pwd:accinfo[id].p
    })
    
    //获取屏幕宽度
    var that = this
    wx.getSystemInfo({
      success: function (res) {
        that.setData({
          fmWidth: res.screenWidth,
          fmHeight:(res.screenWidth/1.34)
        })

      },
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
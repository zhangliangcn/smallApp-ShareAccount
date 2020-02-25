const behavior = require('../../utils/behavior.js')

// 在页面中定义插屏广告
let interstitialAd = null
// 在页面中定义激励视频广告
let videoAd = null
const app = getApp()
Page({

  behaviors: [behavior],
  data: {
    record: {},

    orderInfos: {
      progress_text: "0%", //进度显示文字
      per: 0, //进度条指数，最低0 最高100
      btn_status: 0, //按钮当前状态
      title_status: 0, //当前砍价提示的状态 0 为初始状态，1为砍价后的变化提示
      loadingShow: false, //显示遮罩层
      selfPrice: 0, //自己砍的价格
      alreadyPrice: 0, //总共砍掉的累积金额
      hasUsers: 0, //还需要多少人完成全部砍价
      sYJE: 0, //剩余金额
      isNewOrder: true
    },

    shareUserID: null, //分享者，或者用户主动创建的用户openid
    shareUserNickName: null, //分享者，或者当前用户昵称
    shareUserAvatarUrl: null, //分享者，或者当前用户昵称


    orderID: null, //订单ID

    imageUrl: null, //商品图片
    title: null, //
    time: null, //倒计时剩余时间
    type: null,
    titile_status: null, //标题状态
    already_amount: null, //已经砍掉的金额
    amount: null, //商品实际价格
    btn_status: null, //按钮的状态
    isNewOrder: true, //是否为新订单

    records: null



  },


  updateRecord: function(option) {
    this.setData({
      record: option.detail
    })
  },






  /**
   * 生命周期函数--监听页面加载
   */

  onLoad: function(options) {
    // wx.showLoading({
    //   title: '加载中....',
    // })
    let { orderInfo } = app.store.getState() 
    if (this.isShare(options)) {
      //-----------------------------------------------------------------分享来源
      console.log("页面来源分享")

      this.shareOrder(options.orderid)

      

      
    } else {
      //非分享来源，接着判断是否登陆用户
      console.log("页面来源内部")
      if (this.isLogin()) {
        console.log("用户已经登录")
        //已登录用户
        let {
          userInfo,
          productInfo
        } = app.store.getState()
        let userid = userInfo.openid
        let p_type = productInfo.p_type
        //判断当前类型订单是否为新订单
        this.chaxun(userid, p_type)
      } else {
        console.log("用户没有登录")
        wx.showModal({
          title: '请先登录',
          content: '请先登录',
        })
      }

    }

    if (options.action==="share"){

      if (wx.createRewardedVideoAd) {
        videoAd = wx.createRewardedVideoAd({
          adUnitId: 'adunit-1b910f48efc98cf5'
        })
        videoAd.onLoad(() => { })
        videoAd.onError((err) => { })
        videoAd.onClose((res) => {


        console.log(res)
         })
      }

    }else{
      if (wx.createInterstitialAd) {
        interstitialAd = wx.createInterstitialAd({
          adUnitId: 'adunit-3e9cd4d2000d5c5f'
        })
        interstitialAd.onLoad(() => { })
        interstitialAd.onError((err) => { })
        interstitialAd.onClose(() => { })
      }
      if (interstitialAd) {
        interstitialAd.show().catch((err) => {
          console.error(err)
        })
      }

    }

   


  },



  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function(res) {
    var that = this
    let {
      userInfo,
      orderInfo,
      productInfo
    } = getApp().store.getState()


    return {
      title: userInfo.nickName + "正在抢这个免费会员，喊你帮Ta砍价免单",
      path: "/pages/kanjia/kanjia?action=share&orderid=" + that.data.orderID + "&shareuser=" + that.data.shareUserID,
      imageUrl: productInfo.p_Imgurl
    }

  },


  seeVideo:function(){
    if (videoAd) {
      videoAd.show().catch(() => {
        // 失败重试
        videoAd.load()
          .then(() => videoAd.show())
          .catch(err => {
            console.log('激励视频 广告显示失败')
          })
      })
    }
  },


  // 判断当前用户砍价类型是否为新订单
  /* +-----------------------------------------------------------------------------
   * | chaxun
   * +-----------------------------------------------------------------------------
   * |  Params:1.openid 用户唯一标识符
   * |         2.当前订单类型
   * +-----------------------------------------------------------------------------
   * |  Return:返回指定ID的订单数据，当前订单为老订单时调用currentorder函数获取订单详细数据
   * +------------------------------------------------------------------------------
   */
  chaxun: function(openid, type) {
    console.log("查询订单中...")
    var that = this
    let {
      domian,
      productInfo,
      userInfo,
      orderInfo
    } = app.store.getState()
    wx.request({
      url: domian + "index.php/isActionByTypeAndUserId",
      method: "POST",
      data: { //我要砍价按钮单击后  提交的数据
        openid,
        type
      },
      success: function(res) {

        var id = res.data.desc.orderID
        console.log(res.data)
        if (id === "0") {
          //调用查询订单，获取订单数据
          console.log("该订单为新订单 \n 新订单数据整理中,准备渲染页面....")
          that.setData({
            shareUserID: userInfo.openid,
            shareUserNickName: userInfo.nickName,
            shareUserAvatarUrl: userInfo.avatarUrl,
            imageUrl: productInfo.p_Imgurl, //商品图片
            title: productInfo.p_Name, //
            time: that.setTimestamp(60 * 60 * 24 * 7), //倒计时剩余时间
            type: productInfo.p_type,
            amount: productInfo.p_Price, //商品实际价格
          })
          that.initOrderStore()
          orderInfo.btn_status = 0
          orderInfo.title_status = 0
          app.store.setState({
            orderInfo
          })
          wx.hideLoading()
        } else {
          console.log("该信息为老订单信息")
          that.currentorder(id)
        }

      }
    })

  },


  // 判断当前是页面是否是通过转发而来
  /* +---------------------------------------------------------------------------
   * | isShare 
   * +---------------------------------------------------------------------------
   * |  Params:1.options onLoad页面传递的参数值
   * +---------------------------------------------------------------------------
   * |  Return: true  定义当前页面为分享而来
   * |          false 定义当前页面为内部页面传值而来
   * +---------------------------------------------------------------------------
   */
  isShare: function(res) {
    if (res.action !== undefined && res.orderid !== undefined && res.shareuser !== undefined) {
      return true
    } else {
      return false
    }
  },

  // 根据订单ID获取订单数据
  /* +---------------------------------------------------------------------------
   * | currentorder 
   * +---------------------------------------------------------------------------
   * |  Params:1.orderID 要获取数据的订单ID号
   * +---------------------------------------------------------------------------
   * |  Return:返回指定ID的订单数据，并将订单详细数据分配给页面data数据 orderInfos
   * +---------------------------------------------------------------------------
   */

  currentorder: function(orderID) {
    console.log(orderID)
    var that = this
    let {
      domian,
      productInfo,
      orderInfo
    } = getApp().store.getState()

    wx.request({
      url: domian + "index.php/currentOrder",
      method: "POST",
      data: { //我要砍价按钮单击后  提交的数据
        orderID: orderID
      },
      success: function(res) {
        console.log("获取老订单信息....")
        console.log(res.data)
        if (res.data.desc !== null) {
          that.getUserInfos(res.data.desc.create_user)
          that.setData({
            shareUserID: res.data.desc.create_user, //分享者，或者用户主动创建的用户openid
            shareUserAvatarUrl: res.data.desc.user_avatarUrl, //分享者，或者当前用户昵称
            orderID: orderID, //订单ID
            imageUrl: res.data.desc.p_imgUrl, //商品图片
            title: res.data.desc.p_name, //
            type: res.data.desc.type,
            time: res.data.desc.endtime, //倒计时剩余时间
          })
        }
        orderInfo.alreadyPrice = (productInfo.p_Price - res.data.desc.p_amount).toFixed(2)
        orderInfo.hasUsers = Math.round(res.data.desc.p_amount)
        orderInfo.title_status = 1
        orderInfo.btn_status = 1
        orderInfo.per = ((1 - (res.data.desc.p_amount / productInfo.p_Price)) * 100)
        orderInfo.progress_text = (productInfo.p_Price - res.data.desc.p_amount).toFixed(2)
        app.store.setState({
          orderInfo
        })
        that.loadLogsRecord(orderID)
        wx.hideLoading()
      }
    })
  },
  
  // Share分享页面根据订单ID获取订单数据
  /* +---------------------------------------------------------------------------
   * | shareOrder
   * +---------------------------------------------------------------------------
   * |  Params:1.orderID 要获取数据的订单ID号
   * +---------------------------------------------------------------------------
   * |  Return:返回指定ID的订单数据，并将订单详细数据分配给页面data数据 orderInfos
   * +---------------------------------------------------------------------------
   */

  shareOrder: function (orderID) {
    console.log(orderID)
    var that = this
    let {
      domian,
      productInfo,
      orderInfo
    } = getApp().store.getState()

    wx.request({
      url: domian + "index.php/currentOrder",
      method: "POST",
      data: { //我要砍价按钮单击后  提交的数据
        orderID: orderID
      },
      success: function (res) {
        console.log("获取老订单信息....")
        console.log(res.data)
        if (res.data.desc !== null) {
          that.getUserInfos(res.data.desc.create_user)
          that.setData({
            shareUserID: res.data.desc.create_user, //分享者，或者用户主动创建的用户openid
            shareUserAvatarUrl: res.data.desc.user_avatarUrl, //分享者，或者当前用户昵称
            orderID: orderID, //订单ID
            imageUrl: res.data.desc.p_imgUrl, //商品图片
            title: res.data.desc.p_name, //
            type: res.data.desc.type,
            time: res.data.desc.endtime, //倒计时剩余时间
          })
        }
        orderInfo.alreadyPrice = (productInfo.p_Price - res.data.desc.p_amount).toFixed(2)
        orderInfo.hasUsers = Math.round(res.data.desc.p_amount)
        orderInfo.title_status = 1
        orderInfo.btn_status = 2
        orderInfo.per = ((1 - (res.data.desc.p_amount / productInfo.p_Price)) * 100)
        orderInfo.progress_text = (productInfo.p_Price - res.data.desc.p_amount).toFixed(2)
        app.store.setState({
          orderInfo
        })
        that.loadLogsRecord(orderID)
        wx.hideLoading()
      }
    })
  },


  // 获取用户信息
  /* +---------------------------------------------------------------------------
   * | getUserInfos 
   * +---------------------------------------------------------------------------
   * |  Params:1.openid
   * +---------------------------------------------------------------------------
   * |  Return: 获取用户信息并将结果存储到全局状态容器中
   * +---------------------------------------------------------------------------
   */

  getUserInfos: function(openid) {
    console.log("读取用户昵称")
    let {
      domian
    } = app.store.getState()
    let that = this
    wx.request({
      url: domian + "index.php/getUserInfo",
      method: "POST",
      data: { //我要砍价按钮单击后  提交的数据
        openid: openid
      },
      success: function(res) {
        that.setData({
          shareUserNickName: res.data.desc.nickName
        })
      }
    })
  },



  // 【我要砍价按钮】被单击触发提交
  submitOrder: function() {
    let {
      userInfo,
      productInfo,
      domian,
      orderInfo
    } = getApp().store.getState()
    var that = this
    wx.request({
      url: domian + "index.php/submitorder",
      method: "POST",
      data: { //我要砍价按钮单击后  提交的数据
        createUser: userInfo.openid,
        userAvatarUrl: userInfo.avatarUrl,
        pName: productInfo.p_Name,
        pType: productInfo.p_type,
        pImgUrl: productInfo.p_Imgurl,
        nickName: userInfo.nickName,
        pPrice: productInfo.p_Price,
        titleStatus: 1,
        btnStatus: 1,
        pEndTime: that.setTimestamp(60 * 60 * 24 * 7)
      },
      success: function(res) { //Reque 成功返回数据
        console.log("正在读取数据......")
        if (res.data.err === "ok") { // 提交砍价订单成功
          console.log(res.data)
          // 返回 1. orderID  2.selfPrice
          that.loadLogsRecord(res.data.desc.orderID)
          orderInfo.alreadyPrice = res.data.desc.selfPrice
          orderInfo.hasUsers = Math.round(productInfo.p_Price - res.data.desc.selfPrice)
          orderInfo.btn_status = 1
          orderInfo.title_status = 1
          orderInfo.per = (res.data.desc.selfPrice / productInfo.p_Price) * 100
          orderInfo.progress_text = res.data.desc.selfPrice
          orderInfo.selfPrice = res.data.desc.selfPrice
          orderInfo.loadingShow = true
          app.store.setState({
            orderInfo
          })
          that.setData({
            orderID: res.data.desc.orderID
          })






          console.log("砍价完成....")
          that.loadLogsRecord(res.data.desc.orderID)
        }
      },
      fail: function(res) {
        console.log(res)
      }

    })



  },
  // 初始化
  initOrderStore: function() {
    let {
      orderInfo
    } = app.store.getState()
    orderInfo.alreadyPrice = 0
    orderInfo.hasUsers = 0
    orderInfo.btn_status = 0
    orderInfo.title_status = 0
    orderInfo.per = 0
    orderInfo.loadingShow = false
    orderInfo.selfPrice = 0
    orderInfo.progress_text = ""
    app.store.setState({
      orderInfo
    })
  },

  //加载砍价记录
  loadLogsRecord: function(orderID) {
    console.log("正在重载砍价记录......")
    var that = this
    let {
      domian
    } = getApp().store.getState()
    wx.request({
      url: domian + "index.php/loadLogsRecord",
      method: "POST",
      data: { //我要砍价按钮单击后  提交的数据
        orderID
      },
      success: function(res) {
        var data = res.data
        that.setData({
          record: data
        })
      }
    })
  },

  self_kan: function() {
    this.submitOrder()
  },




  onUnload: function() {
    this.initOrderStore()
  },


})
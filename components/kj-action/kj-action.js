const behavior = require('../../utils/behavior.js')
const app = getApp()

Component({
  behavuors: [behavior],
  properties:{
    orderInfos:Object,
  },
  data:{
    // 角色类型不一显示的也不一样，1-为发起者砍价，2为新用户砍价，3为老用户砍价
    role:1,
    // progress_text:"0%",//进度显示文字
    // per:0,//进度条指数，最低0 最高100
    // btn_status:0,//按钮当前状态
    // title_status:0,//当前砍价提示的状态 0 为初始状态，1为砍价后的变化提示
    // loadingShow:false,//显示遮罩层
    // selfPrice:0,      //自己砍的价格
    // alreadyPrice:0,    //总共砍掉的累积金额
    // hasUsers:0,         //还需要多少人完成全部砍价
    // sYJE:0,   //剩余金额
    // isNewOrder: true
  },
  externalClasses:["custom-class"],

  observers:{
    
  },

  attached:function(){
   
  },
  methods:{
    closeLoading: function () {
      let { orderInfo } = app.store.getState()
      orderInfo.loadingShow=false
      app.store.setState({
        orderInfo
      })
    },
    // 我要砍价按钮
    self_kan:function(){
      this.triggerEvent('self_kan', "myEventDetail")
    },
    seeVideo_kan:function(){
      this.triggerEvent('seeVideo','noData')
    },





    friend_kan:function(){
      this.setData({
        per: 70,
        btn_status: 1,
     
      })
    },

























    daoju_action:function(){
     wx.showToast({
       title: '暂未开放1',
     })
    }
  },


  

  



})
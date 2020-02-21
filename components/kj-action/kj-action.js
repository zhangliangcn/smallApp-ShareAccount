const postInfo = require('../../utils/product.js')
const behavior = require('../../utils/behavior.js')


Component({
  behavuors:[],
  properties:{
    
  },
  data:{
    // 角色类型不一显示的也不一样，1-为发起者砍价，2为新用户砍价，3为老用户砍价
    role:1,
    progress_text:"0%",//进度显示文字
    per:0,//进度条指数，最低0 最高100
    btn_status:0,//按钮当前状态
    title_status:0,//当前砍价提示的状态 0 为初始状态，1为砍价后的变化提示
  },
  externalClasses:["custom-class"],
  attached:function(){
    
  },
  methods:{
    self_kan:function(){
      // 创建订单
      this.setData({
        per:50,
        btn_status:1,
        title_status: 1
      })
    },
    friend_kan:function(){
      this.setData({
        per: 70,
        btn_status: 2,
     
      })
    },


    daoju_action:function(){
     wx.showToast({
       title: '暂未开放1',
     })
    }
  }
})
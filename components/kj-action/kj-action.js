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
    per:0//进度条指数，最低0 最高100
  },
  externalClasses:["custom-class"],
  attached:function(){
    
  },
  methods:{
    self_kan:function(){
      // 创建订单
      console.log(now())
    },
    daoju_action:function(){
     wx.showToast({
       title: '暂未开放1',
     })
    }
  }
})
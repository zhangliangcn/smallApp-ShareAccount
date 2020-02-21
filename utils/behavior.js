// +------------------------------------
// |     Behavior
// +------------------------------------
// |
// +-------------------------------------


const postInfo = require('product.js')


module.exports = Behavior({

  data:{
    myIntegral:0,//【我的积分】存储容器
    productInfo: {},//单件产品信息存储容器
    domian:"https://wecha.wechasamllapp.xyz/",//API调用配置域名
    userInfo: {
      integral:0
    }
  },
  methods:{
   
    setUserInfo:function(){
      this.setData({
        userInfo: postInfo.userInfo
      })
    }

  }

})
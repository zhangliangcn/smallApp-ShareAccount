

module.exports = Behavior({

  data: {
    isLogin:false   //是否登陆
  },
  methods: {



  },
  attached: function () {
    var userData = wx.getStorageSync("UserData")
    if (userData.token===undefined){
          console.log("未登陆")
          this.setData({
            isLogin: false
          })
    }else{
          console.log("已登陆")
          this.setData({
            isLogin: true
          })
    }
  
    
    
  }





})
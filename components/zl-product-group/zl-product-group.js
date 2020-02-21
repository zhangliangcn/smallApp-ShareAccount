const postInfo = require('../../utils/product.js')
const behavior = require('../../utils/behavior.js')
Component({
  externalClasses: ["custom-class"],
  behaviors: [behavior],

  data:{
    productInfo:[]
  },
  attached:function(){
    






    //组件实例化进入页面节点后，动态加载远程产品信息
    var that = this 
    wx.request({
      url: that.data.domian +"index.php/getHomePorductList/6",
      success:function(res){
        // 调试输出API内容
        // console.log(res.data)
        that.setData({
          productInfo:res.data
        })
      }
    })
  },




  methods:{
    // 用户点击列表中单品时触发进入详情页面
    goProduct:function(res){
      postInfo.item = res.currentTarget.dataset.product

      wx.getStorage({
        key: 'isLogin',
        success: function (res) {
          console.log(res)
          if (res.data) {//登陆状态显示为真

            wx.navigateTo({
              url: "../productDesc/productDesc",
              success: function (res) {
                // 稍后处理
              },
              fail: function (res) {
                // 稍后处理
              }
            })



          } else {   //登陆状态显示为假
            wx.showModal({
              title: '微信未绑定',
              content: '点击确定进入登陆页面',
              success: function (res) {
                if (res.confirm) {
                  wx.switchTab({
                    url: '../../pages/user/index',
                  })
                }
              }, fail: function (res) {
                console.log("输出调试日志", "wx.showModal-API调用失败！")
              }
            })

          }

        }, fail: function (res) {
          wx.showModal({
            title: '微信未绑定',
            content: '点击确定进入登陆页面',
            success: function (res) {
              if (res.confirm) {
                wx.switchTab({
                  url: '../../pages/user/index',
                })
              }
            }, fail: function (res) {
              console.log("输出调试日志", "wx.showModal-API调用失败！")
            }
          })
        }

      })
    }
  }





  

  
})
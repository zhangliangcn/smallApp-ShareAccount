const behavior = require('../../utils/behavior.js')
Component({
  externalClasses: ["custom-class"],
  behaviors: [behavior],

  data:{
    productInfoList:[]
  },
  attached:function(){
    






    //组件实例化进入页面节点后，动态加载远程产品信息
    var that = this 
    wx.request({
      url: that.data.domian +"index.php/getHomePorductList/6",
      success:function(res){
        // 调试输出API内容
       
        that.setData({
          productInfoList:res.data
        })
      }
    })
  },




  methods:{
    // 用户点击列表中单品时触发进入详情页面
    goProduct:function(res){

      let { productInfo } =getApp().store.getState()
     
    /*
      p_Id:'',//产品ID
      p_Imgurl:'',//产品封面图片，
      p_Name:'产品的标题',
      p_Price:10.2,//市场价格
      p_Integral:500,//所需要积分
      p_isshipping:1,//是否包邮，1为包邮，0 为不包邮
      p_inventory:49,//当前剩余库存
      p_type:''//当前类别
      */
      productInfo.p_Id = res.currentTarget.dataset.product.Id
      productInfo.p_Imgurl = res.currentTarget.dataset.product.p_imgurl
      productInfo.p_Name = res.currentTarget.dataset.product.p_name
      productInfo.p_Price = res.currentTarget.dataset.product.p_price
      productInfo.p_Integral = res.currentTarget.dataset.product.p_integral
      productInfo.p_isshipping = res.currentTarget.dataset.product.p_isshipping
      productInfo.p_inventory = res.currentTarget.dataset.product.p_inventory
      productInfo.p_type = res.currentTarget.dataset.product.p_type
      
      getApp().store.setState({
        productInfo
      })

   
   

      wx.getStorage({
        key: 'isLogin',
        success: function (res) {
          
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
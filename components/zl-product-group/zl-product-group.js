const postInfo = require('../../utils/product.js')
Component({
  externalClasses: ["custom-class"],

  data:{
    productInfo:[
      {
        img:"https://temp-1251251237.cos.ap-chengdu.myqcloud.com/product-xunlei.png",
        price:10,
        title:"[砍一砍]0元随便用，一周迅雷白金会员",
        type:"xunlei"
      },
      {
        img: "https://temp-1251251237.cos.ap-chengdu.myqcloud.com/product-aiqiyi.png",
        price: 7,
        title: "[砍一砍]0元随便用，爱奇艺7天会用码",
        type: "aiqiyi"
      },
      {
        img: "https://temp-1251251237.cos.ap-chengdu.myqcloud.com/product-xunlei.png",
        price: 10,
        title: "[砍一砍]0元随便用，一周迅雷白金会员",
        type: "xunlei"
      }
    ]
  },



  methods:{
    goProduct:function(res){
      postInfo.info = res.currentTarget.dataset.product
      wx.navigateTo({
        url: "../productDesc/productDesc",
        success:function(res){
          // console.log(res)
        },
        fail:function(res){
          // console.log(res)
        }
      })
    }
  }

  
})
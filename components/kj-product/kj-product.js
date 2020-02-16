Component({
  properties:{
    headurl:String,//用户头像
    nickname:String,//用户昵称
    message: String,//用户发起砍价的标语
    product_img: String,
    prodcut_title: String,
    desc: String,
    start_time:Number
  },
  externalClasses:["custom-class"],
  data:{
    time: 30*30 * 60 * 60 * 1000,//30天
    timeData: {}
  },
  methods:{
    onChange(e) {
      
      this.setData({
        timeData: e.detail
      });
    }
  } 
})

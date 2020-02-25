const behavior = require('../../utils/behavior.js')

Component({
  properties:{
    headurl:String,//用户头像 
    nickname:String,//用户昵称
    message: String,//用户发起砍价的标语
    product_img: String,
    prodcut_title: String,
    desc: String,
    prop_time:Number
  },
  behaviors: [behavior],
  externalClasses:["custom-class"],
  data:{
    data_time:10000,//30天
    timeData: {}
  },
  observers:{
    "prop_time": function (prop_time){
      var tempTime = (this.properties.prop_time - this.getTimestamp())*1000
      console.log(tempTime)
      this.setData({
        data_time: tempTime
      })
    },
    "headurl,nickname":function(){

    }
  },
  attached:function(){
   
    
  },
  methods:{
    onChange(e) {
      
      this.setData({
        timeData: e.detail
      });
    }
  } 
})

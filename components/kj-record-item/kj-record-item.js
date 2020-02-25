Component({
  properties:{
    headsrc:String,
    nickname:String,
    action: String,//用户的砍价动作信息，1=新手出刀，刀刀入肉；2=抱歉，刀砍歪了，3挥手第一刀，拉风又骚包。
    quota:Number   //砍掉的额度
  },
  extenralClasses:["custom-class"],
  data:{
    actionString:"加载中...",
    headimg:"https://temp-1251251237.cos.ap-chengdu.myqcloud.com/defualt-head.png"
  }
})

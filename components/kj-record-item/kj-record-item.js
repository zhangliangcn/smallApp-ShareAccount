Component({
  properties:{
    headsrc:String,
    nickname:String,
    action: Number,//用户的砍价动作信息，1=新手出刀，刀刀入肉；2=抱歉，刀砍歪了，3挥手第一刀，拉风又骚包。
    quota:Number   //砍掉的额度
  },
  extenralClasses:["custom-class"],
  data:{
    actionString:"加载中...",
    headimg:"https://temp-1251251237.cos.ap-chengdu.myqcloud.com/defualt-head.png"
  },
  observers:{
    
    "action,headsrc":function(action,h){
      if(h!==""){
        this.setData({
          headimg:h
        })
      }
      switch (action){
        case 1:
          this.setData({
            actionString: "新手出刀，刀刀入肉"
          })
          break
        case 2:
          this.setData({
            actionString: "抱歉，刀砍歪"
          })
          break
        case 3:
          this.setData({
            actionString: "挥手第一刀，拉风又骚包"
          })
          break
        default:
          this.setData({
            actionString: "江湖再见"
          })
          break

      }
      
    }
    
  }
})

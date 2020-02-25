Component({
  externalClasses: ["custom-class"],
  properties:{
    record:Object
  },
  data:{
    recordData:[]
  },
  observers:{
    'record,orderInfos': function (record, orderInfos){

      this.setData({
        recordData: record.desc
      })
    }
  }
  

})
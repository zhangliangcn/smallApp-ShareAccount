let deviceInfo={},width,height,model



wx.getSystemInfo({
  success: function(res) {
    deviceInfo=res
    width=res.screenWidth
    height=res.screenHeight
    model=res.model
  },
  fail:function(res){
    deviceInfo = res
  }
})




module.exports={
  _info:deviceInfo,
  width,
  height,
  model
}
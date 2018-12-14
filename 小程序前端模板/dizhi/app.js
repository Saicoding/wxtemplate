//app.js
App({
  onLaunch: function() {
    var that = this;
    if (wx.getExtConfig) {
      // console.log(222);
      wx.getExtConfig({
        success: function (res) {
          that.globalData = res.extConfig;
        }
      })
    }

  },

  
  globalData: {
    userInfo: null
  }
})

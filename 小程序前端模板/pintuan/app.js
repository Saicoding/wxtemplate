//app.js
App({
  onLaunch: function () {
    // console.log(111);
    var that = this;
    if (wx.getExtConfig) {
      // console.log(222);
      wx.getExtConfig({
        success: function (res) {
          that.globalData = res.extConfig;
        }
      })
    }
    wx.getLocation({
      success: function (res) {
        wx.setStorageSync('wxb_lat', res.latitude);
        wx.setStorageSync('wxb_lng', res.longitude);
      }
    });
  },
  globalData: {

  }
})
//app.js
App({
  onLaunch: function () {
    var that = this
    //调用API从本地缓存中获取数据
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)
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

  getUserInfo: function (cb) {
    var that = this
    if (this.globalData.userInfo) {
      typeof cb == "function" && cb(this.globalData.userInfo)
    } else {
      //调用登录接口
      wx.getUserInfo({
        withCredentials: false,
        success: function (res) {
          that.globalData.userInfo = res.userInfo
          typeof cb == "function" && cb(that.globalData.userInfo)
        }
      })
    }
  },



  globalData: {
    userInfo: null
  }
})

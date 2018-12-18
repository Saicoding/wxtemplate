//index.js
//获取应用实例
var app = getApp();
var wxb = require('../../utils/wxb.js');
Page({
  data: {
    cityinfo:[],
    date:[],
    search:[],
  },
  test:function(e){
    
  },
  gohotel:function(e){
      wx.navigateTo({
        url: '/pages/hotel/hotel/index',
      })
  },
  onLoad: function () {
      wxb.globalData = app.globalData; //正确打开巅峰互联的方式
      wxb.that = this;   //正确打开巅峰互联的方式
      wxb.getCityList(function (cityList){
        wxb.dingWei(cityList,function(cityinfo){
            wxb.that.setData({
              cityinfo: cityinfo
            });
        });
      });
  },
  onShow: function () {
      wxb.globalData = app.globalData; //正确打开巅峰互联的方式
      wxb.that = this;   //正确打开巅峰互联的方式
      var cityinfo = wxb.getCity();
      if (cityinfo.city_id != wxb.that.data.cityinfo.city_id) {
        wxb.that.setData({
          cityinfo: cityinfo
        });
      }
      var bgend = wxb.getBgEndDate();
      if(bgend){
          wxb.that.setData({
            date: bgend
          });
      }
      var search = wx.getStorageSync('search');
      if(search){
          wxb.that.setData({
            search:JSON.parse(search)
          });
      }

  },

    onShareAppMessage: function (res) {
    if (res.from === 'button') {
    }
    return {
      title: '我发现一款不错的酒店小程序',
      path: res.target,
      success: function (res) {
        wx.showToast({
          title: '分享成功',
        });
      },
      fail: function (res) {
        // 转发失败
      }
    }
  }
})

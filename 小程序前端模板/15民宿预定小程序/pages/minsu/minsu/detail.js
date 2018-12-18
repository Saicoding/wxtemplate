//index.js
//获取应用实例
var app = getApp();
var wxb = require('../../../utils/wxb.js');

Page({
  data: {
    id: 0,
    photoshow: true,
    detail: [],
    photos: [],
    num: 0,
    rooms: [],
  },

  photoclick: function (e) {
    wx.previewImage({
      urls: wxb.that.data.photos,
    })
    // if (wxb.that.data.num > 0) {
    //   this.setData({
    //     photoshow: false
    //   });
    // }
  },
  photobgclick: function (e) {
    this.setData({
      photoshow: true
    });
  },

  map: function () {
    wx.openLocation({
      latitude: wxb.that.data.detail.lat,
      longitude: wxb.that.data.detail.lng,
      scale: 28
    });
  }, 
  setLike: function (e) {
    var minsu_id = this.data.id;
    wx.showLoading({
      title: '正在加载中..',
    });
    wxb.that = this;   //正确打开巅峰互联的方式
    wxb.globalData = app.globalData; //正确打开巅峰互联的方式
    if (!wxb.checkAuthLogin(true)) {
      wxb.login();
    }
    wxb.Post("/api/minsu.order/setLike", {
      openid: wxb.getOpenId(),
      minsu_id: minsu_id,
    }, function (data) {
      wx.hideLoading();
      setTimeout(function(){
        wx.showToast({
          title: '已加入我的收藏列表',
        })
      }, 500);
      
    });
  },
  onLoad: function (options) {
    wxb.that = this;   //正确打开巅峰互联的方式
    wxb.globalData = app.globalData; //正确打开巅峰互联的方式
    if (!options.id) {
      wx.showToast({
        title: '参数错误',
      })
    } else {
      wxb.that.setData({
        id: options.id,
      });
    }

    wxb.Post('/api/minsu.index/detail', {
      id: wxb.that.data.id,
      photo: 1,
      lat: wx.getStorageSync('wxb_lat'),
      lng: wx.getStorageSync('wxb_lng')
    }, function (data) {
      wxb.that.setData({
        detail: data.detail,
        photos: data.photos,
        num: data.num
      });
    });


    var bgend = wxb.getBgEndDate();
    if (bgend) {
      wxb.that.setData({
        date: bgend
      });
    }
    wx.showLoading({
      title: '加载房源',
    })
    wxb.Post('/api/minsu.index/price', {
      id: wxb.that.data.id,
      bg_date: bgend.bg_date,
      end_date: bgend.end_date
    }, function (data) {
      wx.hideLoading();
      wxb.that.setData({
        rooms: data,
      });
    });

  },
  onShareAppMessage: function (res) {
    if (res.from === 'button') {
    }
    return {
      title: '今晚我就在睡了',
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

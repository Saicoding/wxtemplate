//index.js
var app = getApp();
var wxb = require('../../utils/wxb.js');
Page({
  data: {
    color: '',
    setting: [],
    lat: 0,
    lng: 0,
    page: 1,
    more: 0,
    category_id: 0,
    datas: [],
  },

  onLoad: function (e) {
    wxb.that = this;
    wxb.style();
    wxb.globalData = app.globalData; //正确打开巅峰互联的方式
    if (!wxb.checkAuthLogin(true)) {
      wxb.login();
    }
    wxb.that.setData({
      lat: wx.getStorageSync('wxb_lat'),
      lng: wx.getStorageSync('wxb_lng'),
    });

    if (e.category_id) {
      wxb.that.setData({
        category_id: e.category_id,
      });
      this.getClassifyList();
    }
  },

  getClassifyList: function (e) {
    wx.showLoading({
      title: '加载中..',
    });
    wxb.Post('/api/tongcheng.index/getInfo', {
      openid: wxb.getOpenId(),
      category_id: wxb.that.data.category_id,
      page: wxb.that.data.page,
      lat: wxb.that.data.lat,
      lng: wxb.that.data.lng,
    }, function (data) {
      wx.hideLoading();
      var datas = wxb.that.data.datas;
      for (var val in data.info) {
        datas.push(data.info[val]);
      }
      wxb.that.setData({
        datas: datas,
        more: data.more,
        page: wxb.that.data.page + 1,
      });
    });
  },

  loadMore: function (e) {
    this.getClassifyList();
  },

})

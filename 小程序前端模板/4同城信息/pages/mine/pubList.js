//index.js
var app = getApp();
var wxb = require('../../utils/wxb.js');
Page({
  data: {
    color: '',
    type: 0,

    page: 1,
    more: 0,

    datas: [],
  },

  onLoad: function () {
    wxb.that = this;
    wxb.style();

    wxb.globalData = app.globalData; //正确打开巅峰互联的方式
    if (!wxb.checkAuthLogin(true)) {
      wxb.login();
    }

    this.getPubList();
  },

  getPubList: function(e){
    wx.showLoading({
      title: '加载中..',
    });
    wxb.Post('/api/tongcheng.member/getInfo', {
      openid: wxb.getOpenId(),
      page: wxb.that.data.page,
    }, function (data) {
      wx.hideLoading();
      var datas = wxb.that.data.datas;
      for (var val in data.list) {
        datas.push(data.list[val]);
      }

      wxb.that.setData({
        datas: datas, 
        more: data.more,
        page: wxb.that.data.page + 1,
      });
    });
  },

  loadMore: function(e){
    this.getPubList();
  }
})

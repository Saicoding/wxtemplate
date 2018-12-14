//index.js
//获取应用实例
var app = getApp();
var wxb = require('../../../../utils/wxb.js');
Page({
  data: {
    bg_date: '0000-00-00',
    date: '0000-00-00',
    datas: [],
  },
  onLoad: function () {
    this.getDatas();
  },
  formBindsubmit:function(e){
    wxb.globalData = app.globalData; //正确打开巅峰互联的方式
    wxb.that = this;   //正确打开巅峰互联的方式
    wx.showLoading({
      title: '正在加载中..',
    });
    var data = e.detail.value;
    var date = this.data.date;
    wxb.Post('/api/minsu.manage/setPrice', {
      code: wxb.getStoreCode(),
      openid: wxb.getOpenId(),
      data: data,
      date:date,
    }, function (data) {
      wx.hideLoading();
    });
  },
  selectdate: function (e) {
    wxb.that.setData({
      date: e.detail.value,
      datas: [],
    });
    this.getDatas(e.detail.value);
  },
  getDatas: function (date) {
    wxb.globalData = app.globalData; //正确打开巅峰互联的方式
    wxb.that = this;   //正确打开巅峰互联的方式
    wx.showLoading({
      title: '正在加载中..',
    });
    wxb.Post('/api/minsu.manage/getRooms', {
      code: wxb.getStoreCode(),
      openid: wxb.getOpenId(),
      date: date,
      page: wxb.that.data.page,
    }, function (data) {
      wx.hideLoading();
      var datas = wxb.that.data.datas;
      var val = '';
      for (val in data.list) {
        datas.push(data.list[val]);
      }
      wxb.that.setData({
        datas: datas,
        bg_date: data.bg_date,
        date: data.date,
        more: data.more,
        page: wxb.that.data.page + 1,
      });
    });
  }
})

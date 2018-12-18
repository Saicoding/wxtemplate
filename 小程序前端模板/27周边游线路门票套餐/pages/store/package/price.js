//index.js
//获取应用实例
var app = getApp();
var wxb = require('../../../utils/wxb.js');
Page({
  data: {
    bg_date: '0000-00-00',
    date: '0000-00-00',
    datas: [],
    taocans: [],
    taocans_array: [],
    taocan_id: 0,
    taocan_name: '',
  },
  onLoad: function () {
    wxb.globalData = app.globalData; //正确打开巅峰互联的方式
    wxb.that = this;   //正确打开巅峰互联的方式
    wx.showLoading({
      title: '正在加载中..',
    });
    wxb.Post('/api/taocan.manage/getTaocan', {
      code: wxb.getStoreCode(),
    }, function (data) {
      wx.hideLoading();
      var taocans_array = wxb.that.data.taocans_array;
      var taocans = wxb.that.data.taocans;
      var a = '';
      for (a in data.list) {
        taocans_array.push(data.list[a].taocan_name)
        taocans.push(data.list[a]);
      }
      wxb.that.setData({
        taocans: taocans,
        taocans_array: taocans_array,
        taocan_id: data.taocan_id,
        taocan_name: data.taocan_name,
      });
      wxb.that.getDatas();
    });

  },
  seletaocan: function (e) {
    wxb.that.setData({
      datas: [],
      taocan_name: this.data.taocans[e.detail.value].taocan_name,
      taocan_id: this.data.taocans[e.detail.value].taocan_id,
    });
    this.getDatas();
  },
  formBindsubmit: function (e) {
    wxb.globalData = app.globalData; //正确打开巅峰互联的方式
    wxb.that = this;   //正确打开巅峰互联的方式
    wx.showLoading({
      title: '正在加载中..',
    });
    var data = e.detail.value;
    var date = this.data.date;
    wxb.Post('/api/taocan.manage/setPrice', {
      code: wxb.getStoreCode(),
      openid: wxb.getOpenId(),
      data: data,
      date: date,
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
  getDatas: function () {
    wxb.globalData = app.globalData; //正确打开巅峰互联的方式
    wxb.that = this;   //正确打开巅峰互联的方式
    wx.showLoading({
      title: '正在加载中..',
    });
    wxb.Post('/api/taocan.manage/getPackage', {
      code: wxb.getStoreCode(),
      date: wxb.that.data.date,
      taocan_id: wxb.that.data.taocan_id,
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

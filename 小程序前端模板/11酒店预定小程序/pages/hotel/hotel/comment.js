//index.js
//获取应用实例
var app = getApp();
var wxb = require('../../../utils/wxb.js');
Page({
  data: {
    datas: [],
    page: 1,
    type: 0,
    more: 1,
    hotel_id : 0,
    photoshow:true,


  },

  photoclick:function(e){
    this.setData({
      photoshow:false
    });
  },
  photobgclick: function (e) {
    this.setData({
      photoshow: true
    });
  },

  onLoad: function (options) {
    this.setData({
      hotel_id: options.hotel_id,
    });
    console.log(options.hotel_id);
    this.getDatas();
  },

  tab: function (e) {
    var type = e.currentTarget.dataset.type;
    this.setData({
      type: type,
      datas: [],
      page: 1
    });
    this.getDatas(type);
  },
  more: function (e) {
    var type = e.currentTarget.dataset.type;
    this.getDatas(type);
  },
  // type
  getDatas: function (type) {
    wxb.globalData = app.globalData; //正确打开巅峰互联的方式
    wxb.that = this;   //正确打开巅峰互联的方式
    wx.showLoading({
      title: '正在加载中..',
    });
    wxb.Post('/api/hotel.index/getComment', {
      hotel_id: wxb.that.data.hotel_id,
      type: type,
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
        more: data.more,
        page: wxb.that.data.page + 1,
      });
    });
  }
})

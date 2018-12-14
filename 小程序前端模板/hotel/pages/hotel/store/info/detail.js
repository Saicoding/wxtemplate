//index.js
//获取应用实例
var app = getApp();
var wxb = require('../../../../utils/wxb.js');
Page({
  data: {
    detail: [],
    photo : '',
    photo_url : '',
    banner : '',
    banner_url : '',
  },
  formBindsubmit:function(e){
    wxb.globalData = app.globalData; //正确打开巅峰互联的方式
    wxb.that = this;   //正确打开巅峰互联的方式
    var param_ = this.data;
    var param = e.detail.value;
    wx.showLoading({
      title: '正在加载中..',
    });
    wxb.Post('/api/hotel.manage/setHotel', {
      code: wxb.getStoreCode(),
      openid: wxb.getOpenId(),
      hotel_name: param.hotel_name,
      hotel_tel: param.hotel_tel,
      decoration_time: param.decoration_time,
      opening_time: param.opening_time,
      address: param.address,
      describe: param.describe,
      unsubscribe: param.unsubscribe,
      check_otice: param.check_otice,
      photo: param_.photo,
      banner: param_.banner,
      

    }, function (data) {
      wx.hideLoading();
      wx.showToast({
        title: '发布成功',
      });
    });
  },
  uploadphoto: function (e) {
    wxb.globalData = app.globalData; //正确打开巅峰互联的方式
    wxb.that = this;   //正确打开巅峰互联的方式
    wxb.fileupload('', function (data) {
      wxb.that.setData({
        photo_url: data.img_url,
        photo: data.img
      });
    });
  },
  uploadbanner: function (e) {
    wxb.globalData = app.globalData; //正确打开巅峰互联的方式
    wxb.that = this;   //正确打开巅峰互联的方式
    wxb.fileupload('', function (data) {
      wxb.that.setData({
        banner_url: data.img_url,
        banner: data.img
      });
    });
  },
  onLoad: function () {
    wxb.globalData = app.globalData; //正确打开巅峰互联的方式
    wxb.that = this;   //正确打开巅峰互联的方式
    wx.showLoading({
      title: '正在加载中..',
    });
    wxb.Post('/api/hotel.manage/getHotelDetail', {
      code: wxb.getStoreCode(),
      openid: wxb.getOpenId(),
    }, function (data) {
      wx.hideLoading();
      wxb.that.setData({
        detail: data,
        photo : data.photo,
        photo_url: data.photo_url,
        banner: data.banner,
        banner_url: data.banner_url,
      });
    });
  }
})

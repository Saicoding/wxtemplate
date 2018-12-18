// pages/index/join.js
var app = getApp();
var wxb = require('../../utils/wxb.js');
Page({
  data: {
    color: '',
    works_id: 0,
    datas: [],
    setting: [],
    lat: '',
    lng: '',
  },

  toTel: function () {
    wxb.that = this;   //正确打开巅峰互联的方式
    wx.makePhoneCall({
      phoneNumber: wxb.that.data.setting.service_tel,
    })
  },

  map: function () {
    wx.openLocation({
      latitude: Number.parseFloat(wxb.that.data.lat),
      longitude: Number.parseFloat(wxb.that.data.lng),
      scale: 28
    });
  },

  onLoad: function (e) {
    wxb.that = this;
    wxb.style();

    if (e.works_id){
      wxb.that.setData({
        works_id: e.works_id,
      });
      this.worksDetail();
    } 


    this.getAboutIndex();
  },


  getAboutIndex: function (e) {
    wxb.Post('/api/sheying.index/about', {
      openid: wxb.getOpenId(),
    }, function (data) {
      wxb.that.setData({
        lat: data.lat,
        lng: data.lng,
      });
      // wxb.that.getIndex();
    });
  },

  worksDetail: function(e){
    wx.showLoading({
      title: '加载中..',
    });
    wxb.Post('/api/sheying.index/worksDetail', {
      openid: wxb.getOpenId(),
      works_id: wxb.that.data.works_id,
    }, function (data) {
      wx.hideLoading();
      wxb.that.setData({
        datas: data.list,
      });
    });
  },
})
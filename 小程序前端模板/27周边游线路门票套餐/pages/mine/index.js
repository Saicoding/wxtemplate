//获取应用实例
var app = getApp();
var wxb = require('../../utils/wxb.js');
Page({
  data: {
    userinfo:[],
    tel:0,
    color: '',
  },
  tel: function () {
    wxb.that = this;   //正确打开巅峰互联的方式
    wx.makePhoneCall({
      phoneNumber: wxb.that.data.tel,
    })
  },

  onShow: function () {
    wxb.that = this;   //正确打开巅峰互联的方式
    wxb.style();
    wxb.globalData = app.globalData; //正确打开巅峰互联的方式
    if (!wxb.checkAuthLogin(true)){
        wxb.login();
    }
    wxb.Post("/api/data/getSetting",{},function(data){
       wxb.that.setData({
         tel: data.service_tel
       })
    });
  }
})
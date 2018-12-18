//获取应用实例
var app = getApp();
var wxb = require('../../utils/wxb.js');
Page({
  data: {
    userinfo: [],
    tel: 0,
    page :1,
    more  :1,
    datas :[],
      },
  tel: function () {
    wxb.that = this;   //正确打开巅峰互联的方式
    wx.makePhoneCall({
      phoneNumber: wxb.that.data.tel,
    })
  },
  more: function (e) {
    this.getOrder();
  },
  setLike:function(e){
    var minsu_id = e.currentTarget.dataset.minsu_id;
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
      var datas = wxb.that.data.datas;
      var datas_ = [];
      var val = '';
      for (val in data.list) {
        console.log(data.list[val].minsu_id);
        if (data.list[val].minsu_id != minsu_id){
          datas_.push(data.list[val]);
        }
      }
      console.log(datas);
      wxb.that.setData({
        datas: datas_,
      });
    });
  },
  tolist:function(){
    wx.redirectTo({
      url: '/pages/minsu/minsu/index'
    })
  },
  getDatas:function(){
    wx.showLoading({
      title: '正在加载中..',
    });
    wxb.that = this;   //正确打开巅峰互联的方式
    wxb.globalData = app.globalData; //正确打开巅峰互联的方式
    if (!wxb.checkAuthLogin(true)) {
      wxb.login();
    }
    wxb.Post("/api/minsu.order/getLike", {
      openid: wxb.getOpenId(),
      lat: wx.getStorageSync('wxb_lat'),
      lng: wx.getStorageSync('wxb_lng'),
      page: wxb.that.data.page,
    }, function (data) {
      wx.hideLoading();
      var datas = wxb.that.data.datas;
      var val = '';
      for (val in data.list) {
        datas.push(data.list[val]);
      }
      console.log(data.list);
      wxb.that.setData({
        datas: datas,
        more: data.more,
        page: wxb.that.data.page + 1,
      });
    });
  },

  onLoad: function () {
    wxb.that = this;   //正确打开巅峰互联的方式
    wxb.globalData = app.globalData; //正确打开巅峰互联的方式
    if (!wxb.checkAuthLogin(true)) {
      wxb.login();
    }
    this.getDatas();
  }
})
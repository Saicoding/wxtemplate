//destination.js
var app = getApp();
var wxb = require('../../utils/wxb.js');
var app = getApp()
Page({
  data: {
    cssActive: 0,
    dataId: 1,
    page: 0,
    tjlist: [],

    citys: [],
    datas: [],
    this_province_name: '',
    city_id: 0,
    color: '',

  },

  onShow: function (e) {
    wxb.that = this;
    wxb.style();
  },

  onLoad: function () {
    wxb.that = this;
    wxb.style();
    wxb.globalData = app.globalData; //正确打开巅峰互联的方式

    // wxb.getCityList(function (cityList) {
    //   wxb.dingWei(cityList, function (cityinfo) {
    //     wxb.that.setData({
    //       cityinfo: cityinfo
    //     });
    //   });
    // });
    // var cityinfo = wxb.getCity();
    // if (cityinfo.city_id != wxb.that.data.cityinfo.city_id) {
    //   wxb.that.setData({
    //     cityinfo: cityinfo
    //   });
    // }

    this.getData();
  },

  getData: function () {
    wxb.globalData = app.globalData; //正确打开巅峰互联的方式
    wxb.that = this;   //正确打开巅峰互联的方式
    wx.showLoading({
      title: '正在加载中..',
    });
    wxb.Post('/api/taocan.index/destination', {
      city_id: wxb.that.data.city_id,
    }, function (data) {
      wx.hideLoading();
      wxb.that.setData({
        city_id: data.this_city_id,
        citys: data.city,
        datas: data.list,
        tjlist: data.tjcity,
      });
    });
  },

  

  submit: function (e) {
    this.setData({
      keywords: e.detail.value,
      datas: [],
    });
    this.getData();
  },

  onclick_menu: function (e) {
    this.setData({
      dataId: e.target.dataset.id,
      city_id: e.target.dataset.id,
      datas: [],
      citys: [],
      tjlist: [],
    });
    this.getData();
  },

  toIndex: function (e) {
    wxb.globalData = app.globalData; //正确打开巅峰互联的方式
    wxb.that = this;   //正确打开巅峰互联的方式
    wxb.setCity(e.target.dataset.city_id, e.target.dataset.city_name);
    wx.navigateTo({
      url: '/pages/tuan/index'
    })
  }
})
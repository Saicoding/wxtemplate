var app = getApp();
var wxb = require('../../utils/wxb.js');
Page({
  data: {

    paixu: 1,
    qianggou: 1,
    order: 1,
    navon: 1,
    type: 0,
    cityinfo: [],
    keywords: '',
    nav_id: 0,
    page: 1,
    more: 1,
    datas: [],
    navs: [],
    destination_id: 0,

    color: '',

  },

  paixu: function (e) {

    this.setData({
      paixu: this.data.paixu == 1 ? 0 : 1,
      qianggou: 1,
      navon: 1

    });

  },
  qianggou: function (e) {

    this.setData({
      qianggou: this.data.qianggou == 1 ? 0 : 1,
      paixu: 1,
      navon: 1
    });

  },
  nav: function (e) {
    this.setData({
      navon: this.data.navon == 1 ? 0 : 1,
      paixu: 1,
      qianggou: 1
    });
  },
  navclick: function (e) {
    console.log(e.target.dataset.nav_id);
    this.setData({
      navon: 1,
      nav_id: e.target.dataset.nav_id,
      page: 1,
      datas: [],
    });
    this.getDatas();

  },
  orderclick: function (e) {

    this.setData({
      paixu: 1,
      order: e.target.dataset.order,
      page: 1,
      datas: [],
    });
    this.getDatas();
  },
  typeclick: function (e) {
    this.setData({
      qianggou: 1,
      type: e.target.dataset.type,
      datas: [],
      page: 1,
    });
    this.getDatas();
  },
  onLoad: function (e) {
    wxb.globalData = app.globalData; //正确打开巅峰互联的方式
    wxb.that = this;   //正确打开巅峰互联的方式
    wxb.style();
    wxb.that.setData({
      nav_id: e.nav_id,
      destination_id: e.destination_id,
    })
    var cityinfo = wxb.getCity();
    console.log(cityinfo);
    if (cityinfo.city_id != wxb.that.data.cityinfo) {
      wxb.that.setData({
        cityinfo: cityinfo
      });
    }
    wxb.Post('/api/taocan.data/getIndex', {
      city_id: wxb.that.data.cityinfo.city_id,
      type: 2,
    }, function (data) {
      wxb.that.setData({
        navs: data.nav,
      })
    });
  },
  submit: function (e) {
    this.setData({
      page: 1,
      keywords: e.detail.value,
      datas: [],
    });
    this.getDatas();
  },
  onShow: function () {
    wxb.globalData = app.globalData; //正确打开巅峰互联的方式
    wxb.that = this;   //正确打开巅峰互联的方式
    wxb.style();
    var cityinfo = wxb.getCity();
    if (cityinfo.city_id != wxb.that.data.cityinfo) {
      wxb.that.setData({
        cityinfo: cityinfo
      });
    }
    wxb.that.setData({
      datas: [],
      page: 1,
    });
    this.getDatas();
  },
  getDatas: function (type, page) {
    wxb.globalData = app.globalData; //正确打开巅峰互联的方式
    wxb.that = this;   //正确打开巅峰互联的方式
    wx.showLoading({
      title: '正在加载中..',
    });
    wxb.Post('/api/taocan.index/getList', {
      page: wxb.that.data.page,
      city_id: wxb.that.data.cityinfo.city_id,
      order: wxb.that.data.order,
      nav_id: wxb.that.data.nav_id,
      type: wxb.that.data.type,
      destination_id: wxb.that.data.destination_id,
      keywords: wxb.that.data.keywords,
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

//index.js
//获取应用实例
var app = getApp();
var wxb = require('../../utils/wxb.js');
Page({
  data: {
    color: '',
    type: 0,
    setting:[],
    page: 1,
    more: 0,
    datas: [],

  },

  onclick_menu: function (e) {
    wxb.that.setData({
      type: e.target.dataset.id,
      datas: [],
      page: 1,
    });
    this.getOrderList();
  },

  onShow: function (e) {
    wxb.that = this;

    wxb.that.setData({
      datas: [],
      page: 1,
    });

    this.getOrderList();
  },

  onLoad: function () {
    wxb.that = this;
    wxb.style();
    wxb.globalData = app.globalData; //正确打开巅峰互联的方式
    if (!wxb.checkAuthLogin(true)) {
      wxb.login();
    }
  },

  /**
   * 加载更多
   */
  loadMore: function (e) {
    this.getOrderList();
  },
  callPhone: function (e) {
    wx.makePhoneCall({
      phoneNumber: wxb.that.data.setting.service_tel,
    })
  },
  /**
   * 获取订单列表
   */
  getOrderList: function (e) {
    wx.showLoading({
      title: '加载中...',
    })
    wxb.Post('/api/shop.order/orderList', {
      openid: wxb.getOpenId(),
      page: wxb.that.data.page,
      type: wxb.that.data.type,
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
      })
    });
  }
})

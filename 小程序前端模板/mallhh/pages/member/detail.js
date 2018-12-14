//index.js
//获取应用实例
var app = getApp();
var wxb = require('../../utils/wxb.js');
Page({
  data: {
    color: '',

    order_id: 0,

    datas: [],
  },

  onShow: function (e) {
    wxb.that = this;
  },

  onLoad: function (e) {
    wxb.that = this;
    wxb.style();


    wxb.globalData = app.globalData; //正确打开巅峰互联的方式
    if (!wxb.checkAuthLogin(true)) {
      wxb.login();
    }

    if (e.order_id) {
      wxb.that.setData({
        order_id: e.order_id,
      });
    }

    this.getOrderDetail();
  },

  /**
   * 获取订单详情
   */
  getOrderDetail: function (e) {
    wx.showLoading({
      title: '加载中...',
    })
    wxb.Post('/api/shop.order/orderDetail', {
      order_id: wxb.that.data.order_id,
      openid: wxb.getOpenId(),
    }, function (data) {
      wx.hideLoading();
      wxb.that.setData({
        datas: data,
      });
    });

  },


  by: function () {
    wxb.Post('/api/shop.order/getPayment', {
      order_id: wxb.that.data.order_id,
      openid: wxb.getOpenId()
    }, function (res) {
      wx.requestPayment({
        timeStamp: res.order.timeStamp,
        nonceStr: res.order.nonceStr,
        package: res.order.package,
        signType: res.order.signType,
        paySign: res.order.paySign,
        complete: function () {
          wxb.that.getOrderDetail();
        },
      })

    });
  },
})

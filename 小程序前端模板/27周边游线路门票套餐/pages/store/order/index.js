//获取应用实例
var app = getApp();
var wxb = require('../../../utils/wxb.js');
Page({

  data: {
    order: [],
    type: 0,
    page: 1,
    more: 1,
  },

  onLoad: function (options) {
    this.getOrder(0);
  },

  formBindsubmit: function (e) {
    var mobile = e.detail.value.mobile;
    if (mobile.length != 0) {
      this.setData({
        order: [],
        page: 1
      });
      this.getOrder(this.data.type, mobile);
    }
  },

  tab: function (e) {
    var type = e.currentTarget.dataset.type;
    this.setData({
      type: type,
      order: [],
      page: 1
    });
    this.getOrder(type);
  },
  more: function (e) {
    var type = e.currentTarget.dataset.type;
    this.getOrder(type);
  },
  // type
  getOrder: function (type, page, mobile = 0) {
    wxb.globalData = app.globalData; //正确打开巅峰互联的方式
    wxb.that = this;   //正确打开巅峰互联的方式
    wx.showLoading({
      title: '正在加载中..',
    });
    wxb.Post('/api/taocan.manage/order', {
      //openid: wxb.getOpenId(),
      code: wxb.getStoreCode(),
      keywords: mobile,
      type: type,
      page: wxb.that.data.page,
    }, function (data) {
      wx.hideLoading();
      var order = wxb.that.data.order;
      var val = '';
      for (val in data.list) {
        order.push(data.list[val]);
      }
      console.log(data.list);
      wxb.that.setData({
        order: order,
        more: data.more,
        page: wxb.that.data.page + 1,
      });
    });
  }

})
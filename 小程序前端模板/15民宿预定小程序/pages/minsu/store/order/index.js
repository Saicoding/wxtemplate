//index.js
//获取应用实例
var app = getApp();
var wxb = require('../../../../utils/wxb.js');
Page({
  data: {
    order: [],
    type: 1,
    page: 1,
    more: 1,
  },
  onLoad: function (options) {
    if (options.type){
      this.setData({
        type: options.type,
      });
    }
    this.getOrder(this.data.type);

  },
  formBindsubmit: function (e) {
      var mobile =   e.detail.value.mobile;
      if(mobile.length != 0){
        this.setData({
          order: [],
          page: 1
        });
        this.getOrder(this.data.type,mobile);
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
  getOrder: function (type, mobile = 0) {
    wxb.globalData = app.globalData; //正确打开巅峰互联的方式
    wxb.that = this;   //正确打开巅峰互联的方式
    wx.showLoading({
      title: '正在加载中..',
    });
    wxb.Post('/api/minsu.manage/order', {
      code:  wxb.getStoreCode(),
      openid: wxb.getOpenId(),
      type: type,
      page: wxb.that.data.page,
      mobile:mobile,
    }, function (data) {
      wx.hideLoading();
      var order = wxb.that.data.order;
      var val = '';
      for (val in data.list) {
        order.push(data.list[val]);
      }
      wxb.that.setData({
        order: order,
        more: data.more,
        page: wxb.that.data.page + 1,
      });
    });
  }
})

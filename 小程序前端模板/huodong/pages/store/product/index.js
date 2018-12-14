//获取应用实例
var app = getApp();
var wxb = require('../../../utils/wxb.js');
Page({

  data: {
    datas: [],
    type: 0,
    page: 1,
    more: 1,
  },

  onLoad: function (options) {
    this.getOrder(0);
  },

  online: function (e) {
    //  var online = e.currentTarget.dataset.online;
    var taocan_id = e.currentTarget.dataset.taocan_id;
    var online = e.detail.value ? 1 : 0;
    wxb.globalData = app.globalData; //正确打开巅峰互联的方式
    wxb.that = this;   //正确打开巅峰互联的方式
    wx.showLoading({
      title: '正在设置',
    });
    wxb.Post('/api/taocan.manage/taocanOnline', {
      code: wxb.getStoreCode(),
      taocan_id: taocan_id,
      is_online: online,
    }, function (data) {
      wx.hideLoading();

    });
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
    wxb.Post('/api/taocan.manage/getTaocan', {
      //openid: wxb.getOpenId(),
      code: wxb.getStoreCode(),
      keywords: mobile,
      type: type,
      page: wxb.that.data.page,
    }, function (data) {
      wx.hideLoading();
      wxb.that.setData({
        datas: data.list,
      });
    });
  }

})
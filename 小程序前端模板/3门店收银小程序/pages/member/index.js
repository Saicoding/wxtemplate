// pages/arond/fragment/find.js
var app = getApp();
var wxb = require('../../utils/wxb.js');
Page({
  /**
   * 页面的初始数据
   */
  data: {
    datas: [],
  },
  
  yesuse: function (e) {
    wx.setStorageSync('wxb_use_hongbao_id', e.target.dataset.id);
    wx.setStorageSync('wxb_use_hongbao_money', e.target.dataset.money);
    wx.setStorageSync('wxb_use_hongbao_need_money', e.target.dataset.need);
    wx.redirectTo({
      url: '/pages/pay/index',
    })
  },
  
  onShow: function () {
    wxb.that = this;   //正确打开巅峰互联的方式

  },
  onLoad: function (options) {
    wxb.that = this;   //正确打开巅峰互联的方式

    if (!wxb.checkAuthLogin(true)) {
      wxb.login(function () {
        wxb.that.getDatas();
      });
    } else {
      wxb.that.getDatas();
    }

  },

  more: function () {
    wxb.that.getDatas();
  },
  // type
  getDatas: function () {
   
    wx.showLoading({
      title: '正在加载中..',
    });
    wxb.Post('/api/user/getCoupon', {
      openid: wxb.getOpenId(),
      type:1,
      page: wxb.that.data.page,
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
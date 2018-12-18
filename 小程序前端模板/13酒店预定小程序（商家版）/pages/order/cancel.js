var app = getApp();
var wxb = require('../../utils/wxb.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    color: '',
    id: 0,
    detail: [],
    textarea: '',
  },
  textarea: function (e) {
    wxb.that.setData({
      textarea: e.detail.value,
    });
  },
  cancel: function (e) {
    if (!wxb.that.data.textarea) {
      wx.showToast({
        title: '请输入取消原因',
      })
    } else {
      wxb.Post('/api/hotelgw.member/cancel', {
        id: wxb.that.data.id,
        openid: wxb.getOpenId(),
        cancel_info: wxb.that.data.textarea,
        formId: e.detail.formId
      }, function (data) {
        wx.showToast({
          title: '取消成功',
        })
        setTimeout(function () {
          wx.redirectTo({
            url: '/pages/order/detail?id=' + wxb.that.data.id,
          })
        }, 1000);

      });
    }
  },
  onLoad: function (options) {
    wxb.that = this;   //正确打开巅峰互联的方式
    wxb.style();
    wxb.globalData = app.globalData; //正确打开巅峰互联的方式
    wxb.that.setData({
      id: options.id
    });
    if (!wxb.checkAuthLogin(true)) {
      wxb.login();
    }
    wxb.Post('/api/hotelgw.member/orderDetail', {
      order_id: wxb.that.data.id,
      openid: wxb.getOpenId()
    }, function (data) {
      wxb.that.setData({
        detail: data
      });
    });
  }
})
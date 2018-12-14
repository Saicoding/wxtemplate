//index.js
//获取应用实例
var app = getApp();
var wxb = require('../../../utils/wxb.js');
Page({
  data: {
    data: [],
    job_id: 0,
    user_id: 0,
  },

  onShow: function () {
    wxb.that = this;
  },

  onLoad: function (e) {
    wxb.that = this;
    wxb.style();
    this.setData({
      job_id: e.job_id ? e.job_id : 0,
      user_id: e.user_id ? e.user_id : 0,
    }),
      wxb.Post('/api/job.data/getBuy', {
        openid: wxb.getOpenId(),
      }, function (data) {
        wx.hideLoading();
        wxb.that.setData({
          data: data,
        });
      });
  },

  formSubmit: function (e) {
    wxb.Post('/api/job.manage/byVip', {
      openid: wxb.getOpenId(),
      price_id: e.detail.value.price_id,
    }, function (data) {
      wx.requestPayment({
        timeStamp: data.order.timeStamp,
        nonceStr: data.order.nonceStr,
        package: data.order.package,
        signType: data.order.signType,
        paySign: data.order.paySign,
        success: function (res) {
          wx.showToast({
            title: '支付成功',
          })
          if (wxb.that.data.user_id != 0 && wxb.that.data.id == 0) {
            wx.redirectTo({
              url: '/pages/member/yulan?job_id=' + wxb.that.data.job_id
            })
          } else if (wxb.that.data.user_id == 0 && wxb.that.data.id != 0) {
            wx.redirectTo({
              url: '/pages/member/yulan?user_id=' + wxb.that.data.user_id,
            })
          } else {
            wx.redirectTo({
              url: '/pages/store/index',
            })
          }
        },
      });
    });
  }
})

//index.js
//获取应用实例
var app = getApp();
var wxb = require('../../utils/wxb.js');
Page({
  data: {
    color: '',

    activity_id: '',
  },

  onShow: function (e) {
    wxb.that = this;
  },

  onLoad: function (e) {
    wxb.that = this;
    wxb.style();

    wxb.that.setData({
      activity_id: e.activity_id,
    });

    wxb.globalData = app.globalData; //正确打开巅峰互联的方式
    if (!wxb.checkAuthLogin(true)) {
      wxb.login();
    }
  },

  /**
   * 提交报名信息
   */
  fromSubmitPartake: function(e){
    var params = e.detail.value;
    wx.showLoading({
      title: '提交中...',
    });

    wxb.Post('/api/school.member/activity', {
      openid: wxb.getOpenId(),
      name: params.name,
      mobile: params.mobile,
      message: params.message,
      activity_id: wxb.that.data.activity_id,
    }, function(data){
      wx.hideLoading();
      wx.showToast({
        title: '成功',
      })
      wx.navigateBack({});
    });
  }
})

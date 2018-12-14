//index.js
//获取应用实例
var app = getApp();
var wxb = require('../../utils/wxb.js');
Page({
  data: {
    color: '',

    class_id: '',
  },

  onShow: function (e) {
    wxb.that = this;
  },

  onLoad: function (e) {
    wxb.that = this;
    wxb.style();

    wxb.that.setData({
      class_id: e.class_id,
    });

    wxb.globalData = app.globalData; //正确打开巅峰互联的方式
    if (!wxb.checkAuthLogin(true)) {
      wxb.login();
    }
  },
  //class_id name mobile message  class_id 可选

  /**
   * 提交在线咨询
   */
  fromSubmitConsult: function(e){
    var params = e.detail.value;
    wx.showLoading({
      title: '提交中...',
    })
    wxb.Post('/api/school.member/consult', {
      openid: wxb.getOpenId(),
      class_id: wxb.that.data.class_id,
      name: params.name,
      mobile: params.mobile,
      message: params.message,
    }, function(data){
      wx.hideLoading();
      wx.navigateBack({});
      wx.showToast({
        title: '成功',
      })
    });
  }
})

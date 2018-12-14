//index.js
//获取应用实例
var app = getApp();
var wxb = require('../../../../utils/wxb.js');
Page({
  data: {
    comment_id: 0,
  },
  onLoad: function (e) {
    this.setData({
      comment_id: e.comment_id,
    })
  },
  formBindsubmit: function (e) {
    wxb.globalData = app.globalData; //正确打开巅峰互联的方式
    wxb.that = this;   //正确打开巅峰互联的方式
    var comment_id = this.data.comment_id;
    var comment = e.detail.value.comment;
    console.log(comment);
    wx.showLoading({
      title: '正在加载中..',
    });
    wxb.Post('/api/hotel.manage/replay', {
      code: wxb.getStoreCode(),
      openid: wxb.getOpenId(),
      comment_id: comment_id,
      comment: comment,
    }, function (data) {
      wx.hideLoading();
      wx.showToast({
        title: '发布成功',
      });
      wx.redirectTo({
        url: '/pages/hotel/store/comment/index',
      })
    });
  },
})

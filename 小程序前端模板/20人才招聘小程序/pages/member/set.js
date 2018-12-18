// pages/member/index.js
var app = getApp();
var wxb = require('../../utils/wxb.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    color: '',
    status:0,
  },

  onShow: function () {
    wxb.that = this;
  },  

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wxb.that = this;
    wxb.style();
    wxb.Post('/api/job.me/getOpenStatus', {
      openid: wxb.getOpenId(),
    }, function (data) {
      wxb.that.setData({
        status: data.open_status,
      })

    });
  },
  tab:function(e){
    wx.showLoading({
      title: '加载中',
    })
    console.log(e);
    wxb.Post('/api/job.me/setOpenStatus', {
      openid: wxb.getOpenId(),
    }, function () {
      wx.hideLoading();
      wxb.that.setData({
        status: wxb.that.data.status == 1 ? 0 : 1,
      })

    });
  }
})
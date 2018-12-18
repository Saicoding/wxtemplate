// pages/index/join.js
var app = getApp();
var wxb = require('../../utils/wxb.js');
Page({

  /**
   *页面的初始数据
   */
  data: {
    color: '',
    setting:[],
    datas:[],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wxb.that = this;
    wxb.style();
    if (!wxb.checkAuthLogin(true)) {
      wxb.login();
    }
    this.getIndex();
  },

  getIndex: function (e) {
    wx.showLoading({
      title: '加载中..',
    });
    wxb.Post('/api/ktv.index/getIndex', {
      openid: wxb.getOpenId(),
    }, function (data) {
      wx.hideLoading();
      wxb.that.setData({
        datas: data,
      });
    });
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    wxb.that = this;
    wxb.style();
  },
  receive: function (e) {
    var activity_id = e.target.dataset.id;
    wx.showLoading({
      title: '正在加载中',
    })
    wxb.Post('/api/user/Receive/', {
      activity_id: activity_id,
      openid: wxb.getOpenId(),
    }, function (data) {
      wx.showToast({
        title: '领取成功！！！',
        duration: 5000,
      })
    });
  },
  onShareAppMessage: function (res) {
    if (res.from === 'button') {
    }
    return {
      title: '来K歌',
      path: '/pages/index/index',
      success: function (res) {
        // 转发成功
      },
      fail: function (res) {
        // 转发失败
      }
    }
  }
})
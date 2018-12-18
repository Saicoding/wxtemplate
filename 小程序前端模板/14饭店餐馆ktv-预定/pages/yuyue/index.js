// pages/index/join.js
var app = getApp();
var wxb = require('../../utils/wxb.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    color: '',
    datas:[],
    page:1,
    more:0,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wxb.that = this;
    wxb.style();
    this.getList();
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },
  loadMore: function (e) {
    this.getOrderList();
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    wxb.that = this;
    wxb.style();
  },

  getList: function (e) {
    wx.showLoading({
      title: '加载中...',
    })
    wxb.Post('/api/ktv.index/getRooms', {
      openid: wxb.getOpenId(),
      page: wxb.that.data.page,
    }, function (data) {
      wx.hideLoading();
      var datas = wxb.that.data.datas;
      for (var val in data.list) {
        datas.push(data.list[val]);
      }
      wxb.that.setData({
        datas: datas,
        more: data.more,
        page: wxb.that.data.page + 1,
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
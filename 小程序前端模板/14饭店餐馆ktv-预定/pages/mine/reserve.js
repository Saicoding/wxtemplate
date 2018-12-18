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
  loadMore:function(){
    this.getList();
  },
  getList: function (e) {
    wx.showLoading({
      title: '加载中...',
    })
    wxb.Post('/api/ktv.manage/getEnroll', {
      openid: wxb.getOpenId(),
      page: wxb.that.data.page,
      type: wxb.that.data.type,
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
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    wxb.that = this;
    wxb.style();
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})
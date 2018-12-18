// pages/menu/consult.js
var app = getApp();
var wxb = require('../../utils/wxb.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    color: '',
    sexs: ['请选择性别', '男', '女'],
    sex: '',
    sIndex: 0,

    name: '',
    mobile: '',
    demand: '',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wxb.that = this;
    wxb.style();
  },

  bindSexChange: function (e) {
    wxb.that.setData({
      sex: wxb.that.data.sexs[e.detail.value],
      sIndex: e.detail.value,
    });
  },

  /**
   * 清除信息
   */
  clearInfo: function (e) {
    wxb.that.setData({
      name: '',
      mobile: '',
      sex: '',
      sIndex: 0,
      demand: '',
    });
  },

  /**
   * 预约信息
   */
  yuyue: function (e) {
    var params = e.detail.value;
    wxb.that.setData({
      name: params.name,
      mobile: params.mobile,
      demand: params.demand,
    });
    wx.showLoading({
      title: '提交中..',
    });
    wxb.Post('/api/yiliao.manage/enroll', {
      openid: wxb.getOpenId(),
      type: 1,
      name: params.name,
      mobile: params.mobile,
      sex: wxb.that.data.sIndex,
      demand: params.demand,
    }, function (data) {
      wx.hideLoading();
      wx.showToast({
        title: '预约成功！',
      })
      wxb.that.setData({
        name: '',
        mobile: '',
        sex: '',
        sIndex: 0,
        demand: '',
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
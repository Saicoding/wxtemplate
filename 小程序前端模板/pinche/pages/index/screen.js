// pages/index/screen.js
var app = getApp();
var wxb = require('../../utils/wxb.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    color: '',
    array: ['全部', '人找车', "车找人"],
    index: 0,
    type: '',
    begin: '',
    time: '',

    nums: ['请选择空位/人数', '1', '2', '3', '4', '5', '5座以上'],
    num: '',
    nIndex: 0,
  },

  bindTypeChange: function (e) {
    console.log(e);
    wxb.that.setData({
      index: e.detail.value,
      type: wxb.that.data.array[e.detail.value],
    });
    console.log(wxb.that.data.index);
  },

  bindBeginDateChange: function (e) {
    console.log(e);
    wxb.that.setData({
      begin: e.detail.value,
    });
  },

  bindTimeDateChange: function (e) {
    wxb.that.setData({
      time: e.detail.value,
    });
  },

  bindNumChange: function (e) {
    console.log(e);
    wxb.that.setData({
      num: wxb.that.data.nums[e.detail.value],
      nIndex: e.detail.value,
    });
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wxb.that = this;
    wxb.style();

  },

  screen: function (e) {
    console.log(e);
    var params = e.detail.value;
    // params.type = wxb.that.data.index;

    var index = wxb.that.data.index;
    var chufa = params.chufa;
    var mudidi = params.mudidi;
    var tujing = params.tujing;
    var begin = wxb.that.data.begin;
    var time = wxb.that.data.time;
    var num = wxb.that.data.nIndex;

    wx.reLaunch({
      url: '/pages/index/index?type=' + index + '&chufa=' + chufa + '&mudidi=' + mudidi + '&tujing=' + tujing + '&begin=' + begin + '&time=' + time + '&num=' + num,
    })
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
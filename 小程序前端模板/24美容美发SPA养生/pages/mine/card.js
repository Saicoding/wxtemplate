// pages/index/join.js
var app = getApp();
var wxb = require('../../utils/wxb.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    color: '',
    datas: [],
    cat: 0,
    page: 1,
    more: 0,
  },

  onclick_menu: function (e) {
    wxb.that.setData({
      cat: e.target.dataset.id,
      page: 1,
      datas: [],
    });
    this.getUserCouponList();
    // wx.showLoading({
    //   title: '加载数据中',
    // })
    // wxb.Post('/api/waimai.manage/orderList', {
    //   openid: wxb.getOpenId(),
    //   page: wxb.that.data.page,
    //   type: wxb.that.data.cat
    // }, function (data) {
    //   wx.hideLoading();
    //   wxb.that.setData({
    //     data: data.list,
    //     more: data.more
    //   });

    // });

  },

  /**
   * 获取用户优惠券列表
   */
  getUserCouponList: function(e){
    wx.showLoading({
      title: '加载中..',
    });
    wxb.Post('/api/user/getCoupon', {
      openid: wxb.getOpenId(),
      type: wxb.that.data.cat,
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
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wxb.that = this;
    wxb.style();
    wxb.globalData = app.globalData; //正确打开巅峰互联的方式
    if (!wxb.checkAuthLogin(true)) {
      wxb.login();
    }

    this.getUserCouponList();
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
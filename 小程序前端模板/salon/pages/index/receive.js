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

    bgdate: '',
    bgtime: '',
    peoplenum: 0,
    category_id: 0,
    designer_id: 0,
  },

  bindUserYuyue: function(e){
    var params = e.detail.value;
    wx.showLoading({
      title: '提交中..',
    });   
    wxb.Post('/api/hair.member/enroll', {
      openid: wxb.getOpenId(),
      num: wxb.that.data.peoplenum,
      category_id: wxb.that.data.category_id,
      designer_id: wxb.that.data.designer_id,
      time: wxb.that.data.bgdate + ' ' + wxb.that.data.bgtime,
      name:params.name,
      mobile: params.mobile,
    }, function (data) {
      wx.hideLoading();
      wx.showToast({
        title: '预约成功！',
      })
      wx.navigateBack({});
    });
  },

  onClickMenu: function(e){
    wxb.that.setData({
      peoplenum: e.target.dataset.id
    });
  },

  onClickProject: function (e) {
    wxb.that.setData({
      category_id: e.target.dataset.id
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

    if (options.designer_id){
      wxb.that.setData({
        designer_id: options.designer_id
      });
    }

    this.getCateList();
  },

  getCateList: function(e){
    wx.showLoading({
      title: '加载中..',
    });
    wxb.Post('/api/hair.index/getCate', {
      openid: wxb.getOpenId(),
      designer_id: wxb.that.data.designer_id,
    }, function (data) {
      wx.hideLoading();
      wxb.that.setData({
        datas: data,
      });
    });
  },

  /**
  * 开始时间
  */
  bindStartDateChange: function (e) {
    wxb.that.setData({
      bgdate: e.detail.value,
    });
  },

  bindStartTimeChange: function(e){
    wxb.that.setData({
      bgtime: e.detail.value,
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
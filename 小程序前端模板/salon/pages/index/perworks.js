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

    photosList: [],
    photos: [],
    id:0,
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
    this.setData({
      id: options.id,
    });
    this.getWorksList();
  },

  getWorksList: function (e) {
    wx.showLoading({
      title: '加载中..',
    });
    wxb.Post('/api/hair.index/sjsal', {
      openid: wxb.getOpenId(),
      id:wxb.that.data.id,
    }, function (data) {
      wx.hideLoading();
      wxb.that.setData({
        datas: data.list,
      });
    });
  },

  /**
   * 查看照片
   */
  lookPhoto: function (e) {
    console.log(e);
    wx.showLoading({
      title: '加载中..',
    });
    wxb.Post('/api/hair.index/sjsalDetail', {
      openid: wxb.getOpenId(),
      works_id: e.target.dataset.id,
    }, function (data) {
      wx.hideLoading();
      // var photos = [],
      // for(var index in data){
      //   photos.push(data[index]);
      wxb.that.setData({
        photosList: data.list,
      });
      // }
      wxb.that.userPreviewImage();
    });
  },

  userPreviewImage: function (e) {
    var photos = [];
    for (var index in wxb.that.data.photosList) {
      photos.push(wxb.that.data.photosList[index].photo);
    }

    wxb.that.setData({
      photos: photos,
    });

    wx.previewImage({
      urls: wxb.that.data.photos,
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
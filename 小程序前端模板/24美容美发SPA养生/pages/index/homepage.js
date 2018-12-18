// pages/index/join.js
var app = getApp();
var wxb = require('../../utils/wxb.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    color: '',
    designer_id: 0,
    datas: [],
    content: '',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (e) {
    wxb.that = this;
    wxb.style();
    wxb.globalData = app.globalData; //正确打开巅峰互联的方式
    if (!wxb.checkAuthLogin(true)) {
      wxb.login();
    }

    if (e.designer_id){
      wxb.that.setData({
        designer_id: e.designer_id,
      });
      this.getCommentList();
    }
  },

  formSendReply: function(e){
    var params = e.detail.value;
    wxb.that.setData({
      content: params.content,
    });
    wx.showLoading({
      title: '提交中..',
    });
    wxb.Post('/api/hair.member/comment', {
      openid: wxb.getOpenId(),
      designer_id: wxb.that.data.designer_id,
      content: wxb.that.data.content,
    }, function (data) {
      wx.hideLoading();
      wxb.that.setData({
        content: '',
        page: 1,
        datas: [],
      });

      wxb.that.getCommentList();
    });
  },

  /**
   * 获取评论列表
   */
  getCommentList: function(e){
    wx.showLoading({
      title: '加载中..',
    });
    wxb.Post('/api/hair.index/comment', {
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
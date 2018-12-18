// pages/resume/education/slist.js
var app = getApp();
var wxb = require('../../../utils/wxb.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    color: '',
    datas: [],
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
    wxb.globalData = app.globalData; //正确打开巅峰互联的方式
    if (!wxb.checkAuthLogin(true)) {
      wxb.login();
    };

    this.getHonorList();
  },

  /**
   * 获取荣誉奖励列表数据
   */
  getHonorList: function (e) {
    wx.showLoading({
      title: '加载中',
    })

    wxb.Post('/api/job.member/honorList', {
      openid: wxb.getOpenId(),
    }, function (data) {
      wx.hideLoading();
      console.log(data);
      if (data == '') {
        wx.redirectTo({
          url: '/pages/resume/schoolsa/honor',
        })
      } else {
        wxb.that.setData({
          datas: data,
        });
      }
    });
  },

  /**
   * 删除荣誉奖励
   */
  delteHonor: function (e) {
    wx.showLoading({
      title: '删除中',
    })

    wxb.Post('/api/job.member/delteHonor', {
      openid: wxb.getOpenId(),
      honor_id: e.target.dataset.id,
    }, function (data) {
      wx.hideLoading();
      wxb.that.getHonorList();
    });
  },

})
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

    this.getPositionList();
  },

  /**
   * 获取在校职务列表数据
   */
  getPositionList: function (e) {
    wx.showLoading({
      title: '加载中',
    })

    wxb.Post('/api/job.member/positionList', {
      openid: wxb.getOpenId(),
    }, function (data) {
      wx.hideLoading();
      console.log(data);
      if (data == '') {
        wx.redirectTo({
          url: '/pages/resume/schoolsa/position',
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
  deltePosition: function (e) {
    wx.showLoading({
      title: '删除中',
    })

    wxb.Post('/api/job.member/deltePosition', {
      openid: wxb.getOpenId(),
      position_id: e.target.dataset.id,
    }, function (data) {
      wx.hideLoading();
      wxb.that.getPositionList();
    });
  },

})
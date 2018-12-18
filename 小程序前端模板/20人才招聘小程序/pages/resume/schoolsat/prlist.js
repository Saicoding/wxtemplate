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

    this.getPracticeList();
  },

  /**
   * 获取社会实践列表数据
   */
  getPracticeList: function (e) {
    wx.showLoading({
      title: '加载中',
    })

    wxb.Post('/api/job.member/practiceList', {
      openid: wxb.getOpenId(),
    }, function (data) {
      wx.hideLoading();
      console.log(data);
      if (data == '') {
        wx.redirectTo({
          url: '/pages/resume/schoolsat/practice',
        })
      } else {
        wxb.that.setData({
          datas: data,
        });
      }
    });
  },

  /**
   * 删除社会实践
   */
  deltePractice: function (e) {
    wx.showLoading({
      title: '删除中',
    })

    wxb.Post('/api/job.member/deltepractice', {
      openid: wxb.getOpenId(),
      practice_id: e.target.dataset.id,
    }, function (data) {
      wx.hideLoading();
      wxb.that.getPracticeList();
    });
  },

})
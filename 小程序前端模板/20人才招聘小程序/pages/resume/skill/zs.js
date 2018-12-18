var app = getApp();
var wxb = require('../../../utils/wxb.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    color: '',

    certificate_id: 0,
    date: '',
    certificate_name: '',
    score: '',

  },

  onShow: function () {
    wxb.that = this;
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
    };

    wxb.that.setData({
      certificate_id: e.certificate_id,
    });

    if (e.certificate_id > 0) {
      this.certificateDetail();
    }

  },

  setCertificate: function (e) {
    var param = e.detail.value;
    wx.showLoading({
      title: '提交中',
    })

    wxb.Post('/api/job.member/setCertificate', {
      openid: wxb.getOpenId(),
      certificate_id: wxb.that.data.certificate_id,
      date: wxb.that.data.date,
      certificate_name: param.certificate_name,
      score: param.score,
    }, function (data) {
      wx.hideLoading();
      wx.redirectTo({
        url: '/pages/resume/skill/zlist',
      })
    });
  },

  certificateDetail: function (e) {
    wx.showLoading({
      title: '加载中',
    })

    wxb.Post('/api/job.member/certificateDetail', {
      openid: wxb.getOpenId(),
      certificate_id: wxb.that.data.certificate_id,
    }, function (data) {
      wx.hideLoading();
      wxb.that.setData({
        date: data.date,
        certificate_name: data.certificate_name,
        score: data.score,
      });
    });
  },

  /**
   * 获得时间
   */
  bindDatePickerChange: function (e) {
    wxb.that.setData({
      date: e.detail.value,
    });
  },
})
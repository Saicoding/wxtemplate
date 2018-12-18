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

    this.getLanguageList();
  },

  /**
   * 获取项目经验列表数据
   */
  getLanguageList: function (e) {
    wx.showLoading({
      title: '加载中',
    })

    wxb.Post('/api/job.member/languageList', {
      openid: wxb.getOpenId(),
    }, function (data) {
      wx.hideLoading();
      console.log(data);
      if (data == '') {
        wx.redirectTo({
          url: '/pages/resume/skill/yy',
        })
      } else {
        wxb.that.setData({
          datas: data,
        });
      }
    });
  },

  /**
   * 删除语言能力
   */
  deleteLanguage: function (e) {
    wx.showLoading({
      title: '删除中',
    })

    wxb.Post('/api/job.member/delteLanguage', {
      openid: wxb.getOpenId(),
      language_id: e.target.dataset.id,
    }, function (data) {
      wx.hideLoading();
      wxb.that.getLanguageList();
    });
  },

})
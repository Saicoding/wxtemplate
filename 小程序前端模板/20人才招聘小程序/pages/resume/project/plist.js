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

    this.getProjectList();
  },

  /**
   * 获取项目经验列表数据
   */
  getProjectList: function (e) {
    wx.showLoading({
      title: '加载中',
    })

    wxb.Post('/api/job.member/projectList', {
      openid: wxb.getOpenId(),
    }, function (data) {
      wx.hideLoading();
      console.log(data);
      if (data == '') {
        wx.redirectTo({
          url: '/pages/resume/project/index',
        })
      } else {
        wxb.that.setData({
          datas: data,
        });
      }
    });
  },

  /**
   * 删除教育记录
   */
  deleteProject: function (e) {
    wx.showLoading({
      title: '删除中',
    })

    wxb.Post('/api/job.member/delteProject', {
      openid: wxb.getOpenId(),
      project_id: e.target.dataset.id,
    }, function (data) {
      wx.hideLoading();
      wxb.that.getProjectList();
    });
  },

})
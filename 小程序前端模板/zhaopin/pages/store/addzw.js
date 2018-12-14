var app = getApp();
var wxb = require('../../utils/wxb.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    color: '',

    page: 1,

    datas: [],
    job_id: '',
  },

  onShow: function(){
    wxb.that = this;
    // wxb.globalData = app.globalData; //正确打开巅峰互联的方式
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

    this.getJobList();
  },

  /**
   * 企业端获取职位列表
   */
  getJobList: function (e) {
    wx.showLoading({
      title: '加载中..',
    });
    wxb.Post('/api/job.manage/getjob', {
      openid: wxb.getOpenId(),
      page: wxb.that.data.page,
    }, function (data) {
      wx.hideLoading();
      wxb.that.setData({
        datas: data.list,
      });

    });
  },


  /**
   * 设置是否上线
   */
  setOnline: function (e) {
    wx.showLoading({
      title: '提交中..',
    });
    wxb.Post('/api/job.manage/setOnline', {
      openid: wxb.getOpenId(),
      job_id: wxb.that.data.job_id,
    }, function (data) {
      wx.hideLoading();
      wxb.that.getJobList();
    });
  },

  /**
   * 修改状态
   */
  changeOnLine: function(e){
    wxb.that.setData({
      job_id: e.target.dataset.id,
    });

    this.setOnline();
  },

  /**
   * 删除职位
   */
  deleteJob: function(e){

    wxb.that.setData({
      job_id: e.target.dataset.id,
    });

    wx.showLoading({
      title: '提交中..',
    });
    wxb.Post('/api/job.manage/deleteJob', {
      openid: wxb.getOpenId(),
      job_id: wxb.that.data.job_id,
    }, function (data) {
      wx.hideLoading();
      wxb.that.getJobList();
    });
  }

})
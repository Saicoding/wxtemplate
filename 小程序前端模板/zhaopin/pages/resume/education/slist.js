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

    this.getSchoolList();
  },

  /**
   * 获取教育列表数据
   */
  getSchoolList: function (e) {
    wx.showLoading({
      title: '加载中',
    })

    wxb.Post('/api/job.member/schoolList', {
      openid: wxb.getOpenId(),
    }, function (data) {
      wx.hideLoading();
      console.log(data);
      if(data==''){
        wx.redirectTo({
          url: '/pages/resume/education/index',
        })
      }else{
        wxb.that.setData({
          datas: data,
        });
      }
    });
  },

  /**
   * 删除教育记录
   */
  deleteSchool: function(e){
    wx.showLoading({
      title: '删除中',
    })

    wxb.Post('/api/job.member/delteSchool', {
      openid: wxb.getOpenId(),
      school_id: e.target.dataset.id,
    }, function (data) {
      wx.hideLoading();
      wxb.that.getSchoolList();
    });
  },

})
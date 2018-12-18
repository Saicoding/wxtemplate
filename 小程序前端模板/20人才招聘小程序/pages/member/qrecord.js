// pages/member/index.js
var app = getApp();
var wxb = require('../../utils/wxb.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    color: '',

    more: 0,
    page: 1,
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
    }

    this.getLookRecord();
  },


  /**
   * 获取企业查看记录
   */
  getLookRecord: function(e){
    wx.showLoading({
      title: '加载中...',
    })

    wxb.Post('/api/job.me/getLook', {
      openid: wxb.getOpenId(),
    }, function (data) {
      wx.hideLoading();

      var datas = wxb.that.data.datas;
      var val = '';
      for (val in data.list) {
        datas.push(data.list[val]);
      }

      wxb.that.setData({
        datas: datas,
        more: data.more,
        page: wxb.that.data.page + 1
      })

    });
  }
})
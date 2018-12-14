// index.js
var app = getApp();
var wxb = require('../../utils/wxb.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    datas: [],
    more: 1,
    page: 1,
  },

  more: function (e) {
    this.getList();
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wxb.globalData = app.globalData; //正确打开巅峰互联的方式
    wxb.that = this;   //正确打开巅峰互联的方式
    if (!wxb.checkAuthLogin(true)) {
      wxb.login();
    };

    this.getList();
  },
  delete: function (e) {
    var id = e.target.dataset.id;
    wxb.globalData = app.globalData; //正确打开巅峰互联的方式
    wxb.that = this;   //正确打开巅峰互联的方式
    wx.showLoading({
      title: '正在加载中..',
    });
    wxb.Post('/api/company.index/deletebespeak', {
      openid: wxb.getOpenId(),
      id: id,
    }, function (data) {
      wx.hideLoading();
      var datas = wxb.that.data.datas;
      var new_datas = [];
      var val = '';
      for (val in datas) {
        if (datas[val].yuyue_id != id) {
          new_datas.push(datas[val]);
        }
      }
      wxb.that.setData({
        datas: new_datas,
      });
    });
  },
  getList: function () {
    wxb.globalData = app.globalData; //正确打开巅峰互联的方式
    wxb.that = this;   //正确打开巅峰互联的方式
    wx.showLoading({
      title: '正在加载中..',
    });
    wxb.Post('/api/company.index/yuyueShaop', {
      openid: wxb.getOpenId(),
      page: wxb.that.data.page,
    }, function (data) {
      var datas = wxb.that.data.datas;
      var val = '';
      for (val in data.list) {
        datas.push(data.list[val]);
      }
      wxb.that.setData({
        datas: datas,
        more: data.more,
        page: wxb.that.data.page + 1,
      });
      wx.hideLoading();
    });
  },

})
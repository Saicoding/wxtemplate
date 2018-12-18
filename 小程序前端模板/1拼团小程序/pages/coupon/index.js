var app = getApp();
var wxb = require('../../utils/wxb.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    color: '',

    datas: [],
    page: 1,
    type: 0,
    more: 1,
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wxb.that = this;
    wxb.style();
    if (!wxb.checkAuthLogin(true)) {
      wxb.login();
    }

    this.getDatas();
  },

  tab: function (e) {
    var type = e.currentTarget.dataset.type;
    this.setData({
      type: type,
      datas: [],
      page: 1
    });
    this.getDatas(type);
  },
  more: function (e) {
    var type = e.currentTarget.dataset.type;
    this.getDatas(type);
  },
  // type
  getDatas: function (type) {
    wxb.globalData = app.globalData; //正确打开巅峰互联的方式
    wxb.that = this;   //正确打开巅峰互联的方式
    wx.showLoading({
      title: '正在加载中..',
    });
    wxb.Post('/api/user/getCoupon', {
      openid: wxb.getOpenId(),
      type: type,
      page: wxb.that.data.page,
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
        page: wxb.that.data.page + 1,
      });
    });
  }

})
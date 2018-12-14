//index.js
//获取应用实例
var app = getApp();
var wxb = require('../../utils/wxb.js');
Page({
  data: {
    color: '',

    activity_id: '',

    datas: [],
  },

  onShow: function (e) {
    wxb.that = this;
  },

  onLoad: function (e) {
    wxb.that = this;
    wxb.style();

    wxb.that.setData({
      activity_id: e.activity_id,
    });

    wxb.globalData = app.globalData; //正确打开巅峰互联的方式
    if (!wxb.checkAuthLogin(true)) {
      wxb.login();
    }

    this.getActivityDetail();
  },
  /**
   * 获取活动详情
   */
  onShareAppMessage: function (res) {
    wxb.globalData = app.globalData; //正确打开巅峰互联的方式
    wxb.that = this;   //正确打开巅峰互联的方式
    if (res.from === 'button') {
    }
    return {
      title: '快来参加',
      path: '/pages/index/index',
    }
  },
  getActivityDetail: function(e){
    wx.showLoading({
      title: '加载中...',
    })
    wxb.Post('/api/school.member/ActivityDetail', {
      openid: wxb.getOpenId(),
      activity_id: wxb.that.data.activity_id,
    }, function(data){
      wx.hideLoading();
      wxb.that.setData({
        datas: data,
      });
    });
  }
})

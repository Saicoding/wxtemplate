//index.js
//获取应用实例
var app = getApp();
var wxb = require('../../utils/wxb.js');
Page({
  data: {
    color: '',

    vote_id: '',
  },

  onShow: function (e) {
    wxb.that = this;
  },

  onLoad: function (e) {
    wxb.that = this;
    wxb.style();

    wxb.globalData = app.globalData; //正确打开巅峰互联的方式
    if (!wxb.checkAuthLogin(true)) {
      wxb.login();
    }    

    wxb.that.setData({
      vote_id: e.vote_id,
    });

    this.getVoteDetail();
  },

  /**
   * 加载营销详情
   */
  getVoteDetail: function(e){
    wx.showLoading({
      title: '加载中...',
    })

    wxb.Post('/api/school.index/voteDetail', {
      openid: wxb.getOpenId(),
      vote_id: wxb.that.data.vote_id,
    }, function(data){
      wx.hideLoading();
    });
  }, 
})

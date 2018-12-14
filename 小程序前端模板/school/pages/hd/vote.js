//index.js
//获取应用实例
var app = getApp();
var wxb = require('../../utils/wxb.js');
Page({
  data: {
    color: '',

    vote_id: '',

    datas: [],
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
  getVoteDetail: function (e) {
    wx.showLoading({
      title: '加载中...',
    })

    wxb.Post('/api/school.index/voteDetail', {
      openid: wxb.getOpenId(),
      vote_id: wxb.that.data.vote_id,
    }, function (data) {
      wx.hideLoading();
      wxb.that.setData({
        datas: data,
      });
    });
  },

  onShareAppMessage: function (res){
    wxb.globalData = app.globalData; //正确打开巅峰互联的方式
    wxb.that = this;   //正确打开巅峰互联的方式
    if (res.from === 'button') {
    }
    return {
      title: '大家一起来玩呀',
      path: '/pages/hd/vote?vote_id' + wxb.that.data.vote_id,
    }
  }
})

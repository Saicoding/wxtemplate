//index.js
//获取应用实例
var app = getApp();
var wxb = require('../../utils/wxb.js');
Page({
  data: {
    color: '',

    player_id: '',

    datas: [],
  },

  onShow: function (e) {
    wxb.that = this;

    this.getPlayerDetail();
  },

  onLoad: function (e) {
    wxb.that = this;
    wxb.style();

    wxb.that.setData({
      player_id: e.player_id,
    });

    wxb.globalData = app.globalData; //正确打开巅峰互联的方式
    if (!wxb.checkAuthLogin(true)) {
      wxb.login();
    }

  },

  
  /**
   * 获取投票详情
   */
  getPlayerDetail: function(e){
    wx.showLoading({
      title: '加载中...',
    })
    wxb.Post('/api/school.index/playerDetail', {
      openid: wxb.getOpenId(),
      player_id: wxb.that.data.player_id,
    }, function(data){
      wx.hideLoading();
      wxb.that.setData({
        datas: data,
      });
    });
  },

  /**
   * 用户投票
   */
  userVote: function(e){
    wx.showLoading({
      title: '提交中...',
    })
    wxb.Post('/api/school.member/vote', {
      openid: wxb.getOpenId(),
      player_id: wxb.that.data.player_id,
    }, function(data){
      wx.hideLoading();
      wx.showToast({
        title: '投票成功',
      })

      wx.navigateBack({});
    });
  },

  /**
   * 分享
   */
  onShareAppMessage: function (res){
    wxb.globalData = app.globalData; //正确打开巅峰互联的方式
    wxb.that = this;   //正确打开巅峰互联的方式
    return {
      title: '帮忙拉票啦',
      path: '/pages/hd/detail?player_id' + wxb.that.data.player_id,
      success: function (res) {
        // 转发成功
        wx.showToast({
          title: '已转发',
        })
      },
      fail: function (res) {
        // 转发失败
        wx.showToast({
          title: '转发失败',
        })
      }
    }
  }
})

//index.js
//获取应用实例
var app = getApp();
var wxb = require('../../utils/wxb.js');
Page({
  data: {
    info_id: 0,
    comment_id: 0,
    color: '',
  },

  onShow: function(){
    wxb.that = this;
  },

  onLoad: function (e) {
    wxb.that = this;
    wxb.style();

    if (e.info_id) {
      this.setData({
        info_id: e.info_id,
      })
    } else if (e.comment_id) {
      this.setData({
        comment_id: e.comment_id,
      })
    }

    
  },

  formBindsubmit: function (e) {
    wxb.globalData = app.globalData; //正确打开巅峰互联的方式
    wxb.that = this;   //正确打开巅峰互联的方式
    // var info_id = this.data.info_id;
    // var comment_id = this.data.comment_id,
    var comment = e.detail.value.comment;
    console.log(comment);
    wx.showLoading({
      title: '正在加载中..',
    });
    if (wxb.that.data.info_id) {
      wxb.Post('/api/tongcheng.member/comment', {
        openid: wxb.getOpenId(),
        info_id: wxb.that.data.info_id,
        content: comment,
      }, function (data) {
        wx.hideLoading();
        wx.showToast({
          title: '发布成功',
        });
        wx.navigateBack({})
      });
    } else if (wxb.that.data.comment_id) {
      wxb.Post('/api/tongcheng.member/reply', {
        openid: wxb.getOpenId(),
        comment_id: wxb.that.data.comment_id,
        reply: comment,
      }, function (data) {
        wx.hideLoading();
        wx.showToast({
          title: '发布成功',
        });
        wx.navigateBack({})
      });
    }
  },
})

//index.js
//获取应用实例
var app = getApp();
var wxb = require('../../../../../utils/wxb.js');
Page({
  data: {
    id: 0,
    detail: [],
    datas: [],
    comments: [],
    page: 1,
    more: 0,
  },

  onShareAppMessage: function (res) {
    if (res.from === 'button') {
      // 来自页面内转发按钮
      console.log(res.target)
    }
    console.log(wxb.that.data.id);
    return {
      path: '/page/homepage/home/video/index?id='+wxb.that.data.id,
      success: function (res) {
        wxb.Post("/api/nongjialegw.index/share", {
          id: wxb.that.data.id,
          openid: wxb.getOpenId(),
        }, function (data) {
        });
      },
      fail: function (res) {
        // 转发失败
      }
    }
  },

  zan: function (e) {
    var id = e.target.dataset.id;
    var cache = wx.getStorageSync('wxb_zan') ? wx.getStorageSync('wxb_zan') : '{}';
    var cachearr = JSON.parse(cache);
    var newArr = [];
    var is_zan = false;
    for (var a in cachearr) {
      if (cachearr[a] == id) {
        is_zan = true;
      }
      newArr.push(cachearr[a]);
    }
    if (newArr.length > 100) {
      newArr = [];
    }
    newArr.push(id);
    wx.setStorageSync('wxb_zan', JSON.stringify(newArr));

    if (!is_zan) {
      wxb.Post("/api/nongjialegw.index/zan", {
        id: id,
        openid: wxb.getOpenId(),
      }, function (data) {
        var comments = wxb.that.data.comments;
        for (var a in comments) {
          if (comments[a].id == id) {
            comments[a].zan_num = comments[a].zan_num + 1;
            break;
          }
        }
        wxb.that.setData({
          comments: comments,
        });
      });
    } else {
      wx.showToast({
        title: '已经赞过了',
      })
    }


  },
  more: function (e) {
    var page = wxb.that.data.page + 1;
    wxb.Post("/api/nongjialegw.index/getCommentList", {
      id: wxb.that.data.id,
      page: page,
      openid: wxb.getOpenId(),
    }, function (data2) {
      var comments = wxb.that.data.comments;
      for (var a in data2.datas) {

        comments.push(data2.datas[a]);
      }

      wxb.that.setData({
        comments: comments,
        more: data2.more,
        page: page,
      });
    });
  },

  comment: function (e) {
    var content = e.detail.value.content;
    if (!content) {
      wx.showToast({
        title: '评论内容不能为空！',
      })
    } else {
      wxb.Post("/api/nongjialegw.index/comment", {
        id: wxb.that.data.id,
        openid: wxb.getOpenId(),
        content: content,
      }, function (data2) {
        wx.showToast({
          title: '评论成功',
        });

      });
    }
  },

  onLoad: function (options) {
    var id = options.id;
    wxb.that = this;   //正确打开巅峰互联的方式
    wxb.globalData = app.globalData; //正确打开巅峰互联的方式
    if (!wxb.checkAuthLogin(true)) {
      wxb.login();
    }
    wxb.that.setData({
      id: id,
    });
    wx.showLoading({
      title: '加载数据中',
    })
    wxb.Post("/api/nongjialegw.index/detail2", {
      openid: wxb.getOpenId(),
      id: id,
    }, function (data) {
      wx.hideLoading();
      wxb.that.setData({
        detail: data
      });
      wxb.Post("/api/nongjialegw.index/datas", {
        id: data.nav_id,
        page: 1,
        limit_num: 4,
      }, function (data2) {
        wxb.that.setData({
          datas: data2.toutiao
        });
      });
    });

    wxb.Post("/api/nongjialegw.index/getCommentList", {
      id: id,
      page: 1,
      openid: wxb.getOpenId()
    }, function (data2) {
      wxb.that.setData({
        comments: data2.datas,
        more: data2.more
      });
    });

  }
})

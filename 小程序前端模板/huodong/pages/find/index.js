// pages/arond/fragment/find.js
var app = getApp();
var wxb = require('../../utils/wxb.js');
Page({
    /**../../utils/wxb.js');
Page({
  /**
   * 页面的初始数据
   */
  data: {
    dataId: 0,
    page: 1,
    more:0,
    nav:[],
    toutiao:[],
    color:'',
  },

  more:function(e){
    var page = wxb.that.data.page+1;
    wx.showLoading({
      title: '加载数据中',
    })
    wxb.Post("/api/toutiao.toutiao/datas", {
      openid: wxb.getOpenId(),
      id: wxb.that.data.dataId,
      page: page,
    }, function (data) {
      var toutiao = wxb.that.data.toutiao;
      for (var a in data.toutiao){
        toutiao.push(data.toutiao[a]);
      }
      wx.hideLoading();
      wxb.that.setData({
        page :page,
        more: data.more,
        toutiao: toutiao
      });
    });
  },

  onclick_menu: function (e) {
    wxb.that.setData({
      dataId: e.target.dataset.id,
      toutiao:[],
      more:0,
      page:1,
    })
    wx.showLoading({
      title: '正在加载中',
    })
    wxb.Post("/api/toutiao.toutiao/datas", {
      openid: wxb.getOpenId(),
      id:wxb.that.data.dataId,
      page:1,
    }, function (data) {
      wx.hideLoading();
      wxb.that.setData({
        more: data.more,
        toutiao: data.toutiao
      });

    });
  },
  onShareAppMessage: function (res) {
    if (res.from === 'button') {
      // 来自页面内转发按钮
      console.log(res.target)
    }
    return {
      path: '/pages/find/index',
      success: function (res) {
        // 转发成功
      },
      fail: function (res) {
        // 转发失败
      }
    }
  },
  onShow:function(){
    wxb.that = this;   //正确打开巅峰互联的方式
    wxb.style();
    wxb.globalData = app.globalData; //正确打开巅峰互联的方式
  },
  onLoad: function (options) {
    wxb.that = this;   //正确打开巅峰互联的方式
    wxb.style();
    wxb.globalData = app.globalData; //正确打开巅峰互联的方式
    if (!wxb.checkAuthLogin(true)) {
      wxb.login();
    }
    wx.showLoading({
      title: '加载数据中',
    })
    wxb.Post("/api/toutiao.toutiao/index", {
      openid : wxb.getOpenId(),
    }, function (data) {
      wx.hideLoading();
      wxb.that.setData({
        more:data.more,
        nav:data.nav,
        toutiao:data.toutiao

      });
    });
  }

  
})
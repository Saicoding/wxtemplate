// pages/classify/index.js
var app = getApp();
var wxb = require('../../utils/wxb.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    color: '',
    cat: 0,
    toview: '',

    catlist: [],

    datas: [],
  },

  cat: function(e){
    wxb.that.setData({
      cat: e.target.dataset.cat,
      toview: 'cat' + e.target.dataset.cat,
    });

    console.log("11111111："+wxb.that.data.cat);
    console.log("22222222：" +wxb.that.data.toview);
  },

  scroll: function (e) {
    console.log("``````````````");
    console.log(e);
    var bt = e.target.offsetTop + e.detail.scrollTop;
    var catlist = wxb.that.data.datas.category;
    for (var a in catlist) {
      if (bt < catlist[a].bottom - 10) {
        wxb.that.setData({
          cat: catlist[a].id
        });
        break;
      }
    }

    console.log("3333:"+wxb.that.data.cat);
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

    this.getIndex();
  },

  getIndex: function (e) {
    wx.showLoading({
      title: '加载中..',
    });
    wxb.Post('/api/shop2.index/getData', {
      openid: wxb.getOpenId(),
    }, function (data) {
      wx.hideLoading();
      wxb.that.setData({
        datas: data,
      });
    });
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    wxb.that = this;
    wxb.style();
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
  
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
  
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
  
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  
  },

  onShareAppMessage: function (res) {
    if (res.from === 'button') {
      // 来自页面内转发按钮
      console.log(res.target)
    }
    return {
      title: '一个不错的商城',
      path: '/pages/classify/index',
      success: function (res) {
        // 转发成功
      },
      fail: function (res) {
        // 转发失败
      }
    }
  }
 
})
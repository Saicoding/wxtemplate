// pages/album/index.js
var app = getApp();
var wxb = require('../../utils/wxb.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    color: '',
    datas:[],
    note: [
      {
        title: "中式装修效果图-东华园",
        heart_num: "10",
        url: "/img/pics/001.jpg",
      },
      {
        title: "中式装修效果图-东华园",
        heart_num: "123",
        url: "/img/pics/002.jpg",
      },
      {
        title: "中式装修效果图-东华园",
        heart_num: "155",
        url: "/img/pics/003.jpg",
      },
      {
        title: "中式装修效果图-东华园",
        heart_num: "169",
        url: "/img/pics/004.jpg",
      },
      {
        title: "中式装修效果图-东华园",
        heart_num: "99",
        url: "/img/pics/005.jpg",
      },
      {
        title: "中式装修效果图-东华园",
        heart_num: "999",
        url: "/img/pics/006.jpg",
      },
      {
        title: "中式装修效果图-东华园",
        heart_num: "12",
        url: "/img/pics/007.jpg",
      },
      {
        title: "中式装修效果图-东华园",
        heart_num: "1",
        url: "/img/pics/008.jpg",
      },
      {
        title: "中式装修效果图-东华园中式装修效果图-东华园",
        heart_num: "2",
        url: "/img/pics/009.jpg",
      },
    ],
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



  getDatas: function () {
    wxb.Post('/api/zhuangxiugw.index/getPhotos', {
    }, function (data) {
      wx.hideLoading();
      wxb.that.setData({
        datas: data.list,
      });
    })
  },
  /**
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

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})
// pages/tuan/index.js
var app = getApp();
var wxb = require('../../utils/wxb.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    color: '',
    keyword: '',
    datas: [],
    more: 0,
    page: 1,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function () {
    wxb.that = this;
    wxb.style();
    if (!wxb.checkAuthLogin(true)) {
      wxb.login();
    }
  },

  /**
   * 搜索列表
   */
  searchList: function (e) {
    this.setData({
      page: 1,
      datas: [],
      keyword: e.detail.value.keyword
    });
    this.getIndex();
  },

  /**
   * 清除搜索内容
   */
  clearSearchContent: function (e) {
    wxb.that.setData({
      keyword: '',
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

  onLoad: function () {
    this.getIndex();
  },
  loadMore: function (e) {
    this.getIndex();
  },
  getIndex: function () {
    wxb.Post('/api/zhuangxiugw.index/getDesigner', {
      page: wxb.that.data.page,
      keyword: wxb.that.data.keyword,
    }, function (data) {
      wx.hideLoading();
      var datas = wxb.that.data.datas;
      for (var val in data.list) {
        datas.push(data.list[val]);
      }
      wxb.that.setData({
        datas: datas,
        more: data.more,
        page: wxb.that.data.page + 1,
      });
    })
  },
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function (res) {
    if (res.from === 'button') {
      // 来自页面内转发按钮
      console.log(res.target)
    }
    return {
      title: '装修官网',
      path: '/pages/designer/index',
      success: function (res) {
        // 转发成功
      },
      fail: function (res) {
        // 转发失败
      }
    }
  }
})
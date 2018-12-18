// pages/index/me.js
var app = getApp();
var wxb = require('../../utils/wxb.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    color: '',
    page: 1,
    datas: [],
    more: 0,
    pinche_id: 0,
    type: 0,
  },

  editPinche: function (e) {
    wxb.that.setData({
      pinche_id: e.target.dataset.id,
      type: e.target.dataset.type,
    });

    var type = wxb.that.data.type;
    wx.navigateTo({
      url: type == 2 ? '/pages/index/publish02?pinche_id=' + wxb.that.data.pinche_id : '/pages/index/publish01?pinche_id=' + wxb.that.data.pinche_id,
    })
  },

  closePinche: function (e) {
    wxb.that.setData({
      pinche_id: e.target.dataset.id,
    });
    wx.showModal({
      title: '确实是否关闭该条信息？',
      content: '',
      success: function (res) {
        if (res.confirm) {
          wx.showLoading({
            title: '加载中..',
          });
          wxb.Post('/api/pinche.manage/ok', {
            openid: wxb.getOpenId(),
            pinche_id: wxb.that.data.pinche_id,
          }, function (data) {
            wx.hideLoading();
            wxb.that.setData({
              page: 1,
              datas: [],
            });
            wxb.that.getPinche();
          });
        }
      }
    })
  },

  deletePinche: function (e) {
    console.log(e);
    wxb.that.setData({
      pinche_id: e.target.dataset.id,
    });
    wx.showModal({
      title: '确实是否删除该条信息？',
      content: '',
      success: function (res) {
        if (res.confirm) {
          wx.showLoading({
            title: '加载中..',
          });
          wxb.Post('/api/pinche.manage/delPinche', {
            openid: wxb.getOpenId(),
            pinche_id: wxb.that.data.pinche_id,
          }, function (data) {
            wx.hideLoading();
            wxb.that.setData({
              page: 1,
              datas: [],
            });

            wxb.that.getPinche();
          });
        }
      }
    })
  },

  getPinche: function (e) {
    wx.showLoading({
      title: '加载中..',
    });
    wxb.Post('/api/pinche.manage/getPinche', {
      openid: wxb.getOpenId(),
      page: wxb.that.data.page,
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
      })
    });
  },

  loadMore: function (e) {
    this.getPinche();
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

    wxb.that.setData({
      page: 1,
      datas: [],
      more: 0,
    });

    this.getPinche();
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
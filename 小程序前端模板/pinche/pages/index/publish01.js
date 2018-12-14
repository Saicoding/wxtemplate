// pages/index/publish01.js
var app = getApp();
var wxb = require('../../utils/wxb.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    color: '',

    begin: '',
    time: '',

    sexs: ['请选择性别', '男', '女'],
    sex: '',
    sIndex: 0,

    nums: ['请选择乘车人数', '1', '2', '3', '4', '5', '5人以上'],
    num: '',
    nIndex: 0,

    pinche_id: 0,

    name: '',
    mobile: '',
    start: '',
    end: '',
    demand: '',
  },

  //api/pinche.manage/addPinche
  publish: function (e) {
    var params = e.detail.value;
    wx.showLoading({
      title: '提交中..',
    });
    wxb.Post(wxb.that.data.pinche_id != 0 ? '/api/pinche.manage/edit' : '/api/pinche.manage/addPinche', {
      pinche_id: wxb.that.data.pinche_id,
      type: 1,
      openid: wxb.getOpenId(),
      name: params.name,
      sex: wxb.that.data.sIndex,
      mobile: params.phone,
      begin: params.chufa,
      end: params.mudidi,
      bg_time: wxb.that.data.begin + " " + wxb.that.data.time,
      vacancy: wxb.that.data.nIndex,
      demand: params.demand,
    }, function (data) {
      wx.hideLoading();
      wx.showToast({
        title: '发布成功！',
      })
      wx.navigateBack({});
    });
  },

  bindBeginDateChange: function (e) {
    console.log(e);
    wxb.that.setData({
      begin: e.detail.value,
    });
  },

  bindTimeDateChange: function (e) {
    wxb.that.setData({
      time: e.detail.value,
    });
  },

  bindNumChange: function (e) {
    console.log(e);
    wxb.that.setData({
      num: wxb.that.data.nums[e.detail.value],
      nIndex: e.detail.value,
    });
  },

  bindSexChange: function (e) {
    console.log(e);
    wxb.that.setData({
      sex: wxb.that.data.sexs[e.detail.value],
      sIndex: e.detail.value,
    });
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (e) {
    wxb.that = this;
    wxb.style();
    wxb.globalData = app.globalData; //正确打开巅峰互联的方式
    if (!wxb.checkAuthLogin(true)) {
      wxb.login();
    }
    if (e != null && e.pinche_id != null) {
      wxb.that.setData({
        pinche_id: e.pinche_id,
      });
    }

    if (wxb.that.data.pinche_id != 0) {
      this.getEditInfo();
    }
  },

  /**
   * 加载编辑信息
   */
  getEditInfo: function (e) {
    wx.showLoading({
      title: '加载中..',
    });
    wxb.Post('/api/pinche.manage/detail', {
      openid: wxb.getOpenId(),
      pinche_id: wxb.that.data.pinche_id,
    }, function (data) {
      wx.hideLoading();

      wxb.that.setData({
        name: data.name,
        mobile: data.mobile,
        start: data.begin,
        end: data.end,
        nIndex: data.vacancy,
        num: wxb.that.data.nums[data.vacancy],
        sex: wxb.that.data.sexs[data.sex],
        sIndex: data.sex,
        begin: data.date,
        time: data.time,
        demand: data.demand,
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

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})
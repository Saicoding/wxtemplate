// pages/index/join.js
var app = getApp();
var wxb = require('../../utils/wxb.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    color: '',

    datas: [],

    bgdate: '',
    category_id: 0,
    name: '',
    mobile: '',
    remarks: '',

    setting: [],
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

    this.getCateIndex();

    console.log(wxb.that.data.setting);
  },

  /**
   * 加载预约页面数据
   */
  getCateIndex: function (e) {
    //api sheying.index getCate 
    wx.showLoading({
      title: '加载中..',
    });
    wxb.Post('/api/sheying.index/getCate', {
      openid: wxb.getOpenId(),
    }, function (data) {
      wx.hideLoading();
      wxb.that.setData({
        datas: data.list,
      });
    });
  },

  /**
* 开始时间
*/
  bindStartDateChange: function (e) {
    wxb.that.setData({
      bgdate: e.detail.value,
    });
  },

  radioChange: function (e) {
    wxb.that.setData({
      category_id: e.detail.value,
    });
  },

  /**
   * 用户预约
   */
  bindUserYuyue: function (e) {
    var params = e.detail.value;
    wx.showLoading({
      title: '提交中..',
    });

    wxb.that.setData({
      name: params.name,
      mobile: params.phone,
      remarks: params.remarks,
    });
    wxb.Post('/api/sheying.member/enorll', {
      openid: wxb.getOpenId(),
      name: wxb.that.data.name,
      mobile: wxb.that.data.mobile,
      date: wxb.that.data.bgdate,
      category_id: wxb.that.data.category_id,
      remarks: wxb.that.data.remarks,
    }, function (data) {
      wx.hideLoading();
      wx.showToast({
        title: '预约成功!',
      })
      wxb.that.setData({
        name: '',
        mobile: '',
        remarks: '',
        category_id: 0,
        bgdate: '',
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
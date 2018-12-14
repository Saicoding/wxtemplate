var app = getApp();
var wxb = require('../../../utils/wxb.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    photo: '',
    photo_url: '',
    taocan_id:0,
  },

  uploadphoto: function (e) {
    wxb.globalData = app.globalData; //正确打开巅峰互联的方式
    wxb.that = this;   //正确打开巅峰互联的方式
    wxb.fileupload('', function (data) {
      wxb.that.setData({
        photo_url: data.img_url,
        photo: data.img
      });
    });
  },


  formSubmit: function (e) {
    var params = e.detail.value;
    wxb.that = this;   //正确打开巅峰互联的方式
    wxb.globalData = app.globalData; //正确打开巅峰互联的方式
    wx.showLoading({
      title: '正在加载中..',
    });
    console.log(params);
    wxb.Post('/api/taocan.manage/addPackage', {
      code: wxb.getStoreCode(),
      taocan_id:wxb.that.data.taocan_id,
      is_cancel: params.is_cancel,
      title: params.title,
      price: params.price,
      is_changes: params.is_changes,
      details: params.details,
      especially: params.especially,
      cancel: params.cancel,
      changes: params.changes,
      day_num: params.day_num,
      photo: wxb.that.data.photo,

    }, function (data) {
      wx.hideLoading();
      wx.showToast({
        title: '发布成功',
      });
      wx.redirectTo({
        url: '/pages/store/package/index',
      })
    });
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      taocan_id: options.taocan_id,
    })
  },
})
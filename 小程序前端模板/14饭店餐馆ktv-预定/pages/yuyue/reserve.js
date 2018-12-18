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
    room_id: 0,
    date: '',
    sc: ['1小时', '2小时', '3小时', '4小时', '5小时', '包夜'],
    index: 0,
    price: 0,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wxb.that = this;
    wxb.style();
    wx.showLoading({
      title: '加载中...',
    })
    wxb.Post('/api/ktv.index/roomdetail', {
      openid: wxb.getOpenId(),
      room_id: options.room_id,
    }, function (data) {
      wx.hideLoading();
      wxb.that.setData({
        datas: data,
        date: data.date,
        price: data.price,
        room_id: options.room_id,
      })
    });

  },
  formSubmit: function (e) {
    var param = e.detail.value;
    wx.showLoading({
      title: '加载中...',
    });

    wxb.Post('/api/ktv.manage/enroll', {
      openid: wxb.getOpenId(),
      room_id: wxb.that.data.room_id,
      name: param.name,
      mobile: param.mobile,
      enroll_date: wxb.that.data.date,
      enroll_time: wxb.that.data.index - 0 + 1,
    }, function () {
      wx.hideLoading();
      wx.showToast({
        title: '操作成功',
      })

      setTimeout(function () {
        wx.navigateBack({})
        // wx.reLaunch({
        //   url: '/pages/yuyue/index'
        // });
      }, 1000);

    });
  },
  selDate: function (e) {
    wxb.that.setData({
      date: e.detail.value,
    })
  },
  selsc: function (e) {
    wxb.that.setData({
      index: e.detail.value,
    })
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    wxb.that = this;
    wxb.style();
  },


})
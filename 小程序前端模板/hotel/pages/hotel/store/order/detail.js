var app = getApp();
var wxb = require('../../../../utils/wxb.js');
Page({
  /**
   * 页面的初始数据
   */
  data: {
      id:0,
      detail:[],
  },
  orderyes: function (e) {
    wx.showLoading({
      title: '正在加载中',
    })
    wxb.Post('/api/hotel.manage/orderYes', {
      order_id: wxb.that.data.id,
      code: wxb.getStoreCode(),
      formId: e.detail.formId
    }, function (data) {
      wx.hideLoading();

      wxb.Post('/api/hotel.manage/orderDetail', {
        order_id: wxb.that.data.id,
        code: wxb.getStoreCode(),
      }, function (data2) {
        wxb.that.setData({
          detail: data2
        });
      });

    });
  },

  audit:function(e){
    wx.showLoading({
      title: '正在加载中',
    })
    wxb.Post('/api/hotel.manage/orderAudit', {
        order_id: wxb.that.data.id,
        code: wxb.getStoreCode(),
        formId: e.detail.formId
      }, function (data) {
        console.log(data);
        wx.hideLoading();
        
        wxb.Post('/api/hotel.manage/orderDetail', {
          order_id: wxb.that.data.id,
          code: wxb.getStoreCode(),
        }, function (data2) {
          wxb.that.setData({
            detail: data2
          });
        });

      });
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wxb.globalData = app.globalData; //正确打开巅峰互联的方式
    wxb.that = this;   //正确打开巅峰互联的方式
    wxb.that.setData({
      id:options.id
    });
    wxb.Post('/api/hotel.manage/orderDetail', {
      order_id: wxb.that.data.id,
      code: wxb.getStoreCode(),
    }, function (data) {
      wxb.that.setData({
        detail: data
      });
    });


  },
})
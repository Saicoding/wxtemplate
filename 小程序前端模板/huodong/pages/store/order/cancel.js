var app = getApp();
var wxb = require('../../../utils/wxb.js');
Page({
  /**
   * 页面的初始数据
   */
  data: {
    id: 0,
    detail: [],
    textarea: '',
  },
  textarea: function (e) {
    wxb.that.setData({
      textarea: e.detail.value,
    });
  },
  cancel: function (e) {
    if (!wxb.that.data.textarea) {
      wx.showToast({
        title: '请输入取消原因',
      })
    } else {
      wxb.Post('/api/taocan.manage/cancel', {
        id: wxb.that.data.id,
        code: wxb.getStoreCode(),
        cancel_info: wxb.that.data.textarea,
        formId: e.detail.formId

      }, function (data) {
        wx.showToast({
          title: '取消成功',
        })
        setTimeout(function () {
          wx.redirectTo({
            url: '/pages/store/order/detail?id=' + wxb.that.data.id,
          })
        }, 1000);

      });
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wxb.globalData = app.globalData; //正确打开巅峰互联的方式
    wxb.that = this;   //正确打开巅峰互联的方式
    wxb.that.setData({
      id: options.id
    });
    wxb.Post('/api/taocan.manage/orderDetail', {
      order_id: wxb.that.data.id,
      code: wxb.getStoreCode(),
    }, function (data) {
      wxb.that.setData({
        detail: data
      });
    });


  },
})
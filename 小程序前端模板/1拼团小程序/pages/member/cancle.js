//index.js
//获取应用实例
var app = getApp();
var wxb = require('../../utils/wxb.js');
Page({
  data: {
    color: '',
    
    order_id: 0,
  },
 
  onLoad: function (e) {
    wxb.that = this;
    wxb.style();

    if (e.order_id){
      wxb.that.setData({
        order_id: e.order_id,
      });
    }

  },

  /**
   * 取消订单
   */
  cancelOrder: function(e){

    var params = e.detail.value;

    if (params.cancel_info==''){
      wx.showToast({
        title: '取消理由不能为空',
      })
      return;
    }

    wx.showLoading({
      title: '提交中...',
    })
    wxb.Post('/api/group.order/cancelOrder', {
      openid: wxb.getOpenId(),
      order_id: wxb.that.data.order_id,
      cancel_info: params.cancel_info,
    }, function(data){
      wx.hideLoading();
      wx.showToast({
        title: '取消成功',
      })
      wx.navigateBack({});
    });
  }
})

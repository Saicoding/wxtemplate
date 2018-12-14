//index.js
//获取应用实例
var app = getApp();
var wxb = require('../../utils/wxb.js');
Page({
  data: {
    color: '',
    address_id: 0,
    goods_id: 0,
    datas: [],

    total: 0,
    
    setting: [],
  },


  callPhone: function (e) {
    var phoneNumber = wxb.that.data.setting.service_tel;
    wx.makePhoneCall({
      phoneNumber: phoneNumber,
    })
  },

  onLoad: function (e) {
    console.log("onLoad");
    console.log(e);
    wxb.that = this;
    wxb.style();
    wxb.that.setData({
      type: e.type ? e.type : 0 ,
      goods_id: e.goods_id ? e.goods_id:0,
      group_id : e.group_id ? e.group_id : 0,
    });
  },

  onShow: function (e) {
    wxb.that = this;
    console.log("onShow");
    if (wxb.that.data.goods_id > 0 && wxb.that.data.group_id > 0) {
      this.checkGroup();
    } else if (wxb.that.data.goods_id > 0) {
      this.checkAlone();
    }

    console.log("goods_id:" + wxb.that.data.goods_id);
  },

  /**
   * 加载参团详情
   */
  checkGroup: function (e) {
    wx.showLoading({
      title: '加载中...',
    })
    wxb.Post('/api/group.order/checkGroup', {
      openid: wxb.getOpenId(),
      goods_id: wxb.that.data.goods_id,
    }, function (data) {
      wx.hideLoading();
      wxb.that.setData({
        datas: data,
        total: parseFloat(data.mail_price) + parseFloat(data.alone_price),
        address_id: data.address.address_id,
      });
    });
  },

  /**
   * 获取单独购买详情
   */
  checkAlone: function (e) {
    wx.showLoading({
      title: '加载中...',
    })
    wxb.Post('/api/group.order/checkAlone', {
      openid: wxb.getOpenId(),
      goods_id: wxb.that.data.goods_id,
    }, function (data) {
      wx.hideLoading();
      wxb.that.setData({
        datas: data,
        total: parseFloat(data.mail_price) + parseFloat(data.alone_price),
        address_id: data.address.address_id,
      });

    });
  },
  /**
   * 微信支付
   */
  getPayment: function () {
    if(wxb.that.data.group_id || wxb.that.data.type != 0){
      //一键参团
      wxb.Post('/api/group.order/groupBy', {
        openid: wxb.getOpenId(),
        group_id: wxb.that.data.group_id,
        address_id: wxb.that.data.address_id,
        goods_id:wxb.that.data.goods_id,
        hongbaoId: '',
      }, function (data) {
        wx.requestPayment({
          timeStamp: data.order.timeStamp,
          nonceStr: data.order.nonceStr,
          package: data.order.package,
          signType: data.order.signType,
          paySign: data.order.paySign,
          complete: function (res) {
            wx.redirectTo({
              url: '/pages/member/detail?order_id=' + data.order_id,
            })
          },
        });
      });
    }else{
      //单独购买
      wxb.Post('/api/group.order/aloneBy', {
        openid: wxb.getOpenId(),
        goods_id: wxb.that.data.goods_id,
        address_id: wxb.that.data.address_id,
        hongbaoId: '',
      }, function (data) {
        wx.requestPayment({
          timeStamp: data.order.timeStamp,
          nonceStr: data.order.nonceStr,
          package: data.order.package,
          signType: data.order.signType,
          paySign: data.order.paySign,
          complete: function (res) {
            wx.redirectTo({
              url: '/pages/member/detail?order_id=' + data.order_id,
            })
          },
        });

      });
    }
  },

  

})





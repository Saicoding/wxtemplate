//index.js
//获取应用实例
var app = getApp();
var wxb = require('../../utils/wxb.js');
Page({
  data: {
    color: '',

    address: [],

    goods_list: [],

    mail_price: 0, //邮费
    total_price: 0,//总价

    goods_num: 0,

    coupon_id: 0,
    coupon_money: 0,

    type: 1,

  },

  coupon: function () {
    wx.redirectTo({
      url: '/pages/coupon/index?money=' + wxb.that.data.totalprice,
    })
  },


  onShow: function (e) {
    wxb.that = this;
    this.getDefaultAddress();
  },

  onLoad: function (e) {
    console.log(e);
    wxb.that = this;
    wxb.style();
  

    wxb.globalData = app.globalData; //正确打开巅峰互联的方式
    if (!wxb.checkAuthLogin(true)) {
      wxb.login();
    }

    wxb.that.setData({
      type: e.type,
    });

    /**
     * 获取默认地址
     */
    this.getDefaultAddress();

    //加载缓存数据
    this.loadCacheData();

    this.totalGoodsPrice();

  },

  //加载缓存数据
  loadCacheData: function (e) {
    var list = [];

    if (wxb.that.data.type == 1) {
      var item = wx.getStorageSync('wxb_cart_item');
      if (item != "") {
        list.push(JSON.parse(item))
      }
    } else {
      var cartCache = wx.getStorageSync('wxb_cart');
      if (cartCache != "") {
        var data = JSON.parse(cartCache);
        if (data) {
          for (var index in data) {
            if (data[index].is_select == 1) {
              list.push(data[index]);
            }
          }
        }
      }
    }
    wxb.that.setData({
      goods_list: list,
    });
  },

  onUnload: function (e) {
    wx.removeStorageSync('wxb_cart_item');
  },

  /**
   * 统计商品总价格
   */
  totalGoodsPrice: function (e) {
    var total_price = 0;
    var goods_list = wxb.that.data.goods_list;
    var goods_num = 0;
    var mail_price = 0;

    console.log(wxb.that.data.goods_list);

    for (var index in goods_list) {
      total_price += goods_list[index].show_num * goods_list[index].shop_price;
      total_price += goods_list[index].mail_price;
      goods_num += goods_list[index].show_num;
      mail_price += goods_list[index].mail_price;
    }

    wxb.that.setData({
      total_price: total_price,
      goods_num: goods_num,
      mail_price: mail_price,
    });
  },

  /**
   * 获取默认地址
   */
  getDefaultAddress: function (e) {
    wx.showLoading({
      title: '加载中..',
    });
    wxb.Post('/api/user/getDefault', {
      openid: wxb.getOpenId(),
    }, function (data) {
      wx.hideLoading();
      wxb.that.setData({
        address: data,
      });
    });
  },


  buy: function () {
    var address_id = wxb.that.data.address.address_id ? wxb.that.data.address.address_id : 0;
    var coupon_id = wxb.that.data.coupon_id;
    var goods_list = wxb.that.data.goods_list;
    if (!address_id) {
      wx.showToast({
        image: '/img/kulian.png',
        title: '请选择联系地址',
      })
    } else if (!goods_list) {
      wx.showToast({
        image: '/img/kulian.png',
        title: '购买商品不能为空',
      })
    } else {
      var data = {
        coupon_id: wxb.that.data.coupon_id,
        address_id: address_id,
        goods: JSON.stringify(goods_list),
        openid: wxb.getOpenId(),
      };
      wxb.Post('/api/shop.order/create', data, function (res) {
        wx.requestPayment({
          timeStamp: res.order.timeStamp,
          nonceStr: res.order.nonceStr,
          package: res.order.package,
          signType: res.order.signType,
          paySign: res.order.paySign,
          complete: function () {
            wx.removeStorageSync('buyproduct');
            wx.removeStorageSync('wxb_use_hongbao_id');
            wx.removeStorageSync('wxb_use_hongbao_money');
            wx.removeStorageSync('wxbaddr');
            wx.setStorageSync('indexClear', 1);
            wx.redirectTo({
              url: '/pages/member/detail?order_id=' + res.order_id,
            })
          },
        })
      });
    }
  },
})

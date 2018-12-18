//index.js
//获取应用实例
var app = getApp();
var wxb = require('../../utils/wxb.js');
Page({
  data: {
    color: '',

    cartList: [],

    select_all: false,

    total_price: 0,

    goods_id: 0,

    goodsList: [],

  },

  //去购买
  goPayGoods: function (e) {
    var goods = wxb.that.data.cartList;
    var is_select = false;
    for (var index in goods) {
      if (goods[index].is_select == 1) {
        is_select = true;
      }
    }

    if (!is_select) {
      wx.showToast({
        title: '请选择购买的商品',
      })
      return;
    }

    wx.redirectTo({
      url: '/pages/mall/buy?type=2',
    })
  },

  /**
   * 删除商品
   */
  deleteShop: function (e) {
    wx.showModal({
      title: '是否立即删除该购物信息？',
      content: '',
      success: function (res) {
        console.log(res);
        if (res.confirm) {
          console.log(e);
          wxb.that.setData({
            goods_id: e.target.dataset.id,
          });

          var goodsList = wxb.that.data.goodsList;
          for (var val in wxb.that.data.cartList) {
            if (wxb.that.data.cartList[val].goods_id != wxb.that.data.goods_id) {
              goodsList.push(wxb.that.data.cartList[val]);
            }
          }
          wxb.that.setData({
            cartList: goodsList,
          });
          wx.setStorageSync('wxb_cart', JSON.stringify(wxb.that.data.cartList));
        }
      }
    });
  },

  /**
   * 是否全选
   */
  selectAllGoods: function (e) {
    var selectAll = wxb.that.data.select_all;
    wxb.that.setData({
      select_all: selectAll ? false : true,
    });
    var goods = wxb.that.data.cartList;
    var total_price = 0;
    for (var index in goods) {
      if (wxb.that.data.select_all) {
        goods[index].is_select = 1;
        total_price += (goods[index].shop_price) * goods[index].show_num;
        total_price += goods[index].mail_price;
      } else {
        goods[index].is_select = 0;
        total_price = 0;
      }
    }
    wxb.that.setData({
      cartList: goods,
      total_price: total_price,
    });
    wx.setStorageSync('wxb_cart', JSON.stringify(goods));
  },

  /**
   * 单选某个商品
   */
  onSelectGoods: function (e) {
    var goods_id = e.target.dataset.id;
    var type_id = e.target.dataset.type;
    var total_price = 0;
    var goods = wxb.that.data.cartList;
    var total_price = wxb.that.data.total_price - 0;

    var selectAll = wxb.that.data.select_all;
    for (var index in goods) {
      if (goods[index].goods_id == goods_id && goods[index].type_id == type_id) {
        if (goods[index].is_select == 1) {
          goods[index].is_select = 0;
          selectAll = false;
          total_price -= (goods[index].shop_price) * goods[index].show_num;
          total_price -= goods[index].mail_price;
        } else {
          goods[index].is_select = 1;
          total_price += (goods[index].shop_price) * goods[index].show_num;
          total_price += goods[index].mail_price;
        }
      }
    }

    for (var index in goods) {
      if (goods[index].is_select == 1) {
        selectAll = true;
      } else {
        selectAll = false;
      }
    }

    wxb.that.setData({
      cartList: goods,
      total_price: total_price,
      select_all: selectAll,
    });

    wx.setStorageSync('wxb_cart', JSON.stringify(goods));
  },

  onShow: function (e) {
    wxb.that = this;
    wxb.globalData = app.globalData; //正确打开巅峰互联的方式
  },

  onLoad: function () {
    wxb.that = this;
    wxb.style();

    wxb.globalData = app.globalData; //正确打开巅峰互联的方式
    if (!wxb.checkAuthLogin(true)) {
      wxb.login();
    }

    var data = wx.getStorageSync('wxb_cart');
    console.log(data);
    if (data) {
      wxb.that.setData({
        cartList: JSON.parse(data),
      });
    }

    var goods = wxb.that.data.cartList;
    for (var index in goods) {
      goods[index].is_select = 0;
    }
    wxb.that.setData({
      cartList: goods,
    });

    console.log(wxb.that.data.cartList);
  },

  /**
   * 新增商品数量
   */
  plusGoodsNum: function (e) {
    var goods_id = e.target.dataset.id;
    var type_id = e.target.dataset.type;
    var total_price = 0;
    var goods = wxb.that.data.cartList;

    for (var index in goods) {
      if (goods[index].goods_id == goods_id && goods[index].type_id == type_id) {
        if (goods[index].show_num < 99) {
          goods[index].show_num += 1;
        } else {
          wx.showToast({
            title: '最多购买99件',
          })
        }
      }
    }

    for (var index in goods) {
      if (goods[index].is_select == 1) {
        total_price += (goods[index].shop_price) * goods[index].show_num;
        total_price += goods[index].mail_price;
      }
    }

    wxb.that.setData({
      cartList: goods,
      total_price: total_price,
    });
    wx.setStorageSync('wxb_cart', JSON.stringify(goods));
  },

  /**
   * 减少商品数量
   */
  minusGoodsNum: function (e) {
    var goods_id = e.target.dataset.id;
    var type_id = e.target.dataset.type;
    var total_price = 0;
    var goods = wxb.that.data.cartList;

    for (var index in goods) {
      if (goods[index].goods_id == goods_id && goods[index].type_id == type_id) {
        if (goods[index].show_num > 1) {
          goods[index].show_num -= 1;
        } else {
          wx.showToast({
            title: '至少购买1件',
          })
        }
      }
    }

    for (var index in goods) {
      if (goods[index].is_select == 1) {
        total_price += (goods[index].shop_price) * goods[index].show_num;
        total_price += goods[index].mail_price;
      }
    }

    wxb.that.setData({
      cartList: goods,
      total_price: total_price,
    });
    wx.setStorageSync('wxb_cart', JSON.stringify(goods));
  }
})

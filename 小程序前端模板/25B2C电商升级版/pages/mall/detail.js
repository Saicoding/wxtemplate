//index.js
//获取应用实例
var app = getApp();
var wxb = require('../../utils/wxb.js');
Page({
  data: {
    color: '',
    tab: 1,

    goods_id: 0,

    datas: [],

    type_id: -1,

    show_num: 1,

    goods_price: 0,

    page: 1,
    more: 0,

    comments: [],

    showbg: true,
    show_service: true,

  },

  /**
   * 查看服务
   */
  look_service: function (e) {
    wxb.that.setData({
      showbg: false,
      show_service: false,
    });
  },

  close_service: function (e) {
    wxb.that.setData({
      showbg: true,
      show_service: true,
    });
  },

  /**
   * 添加购物车
   */
  addcart: function (e) {
    var goods_id = Number(wxb.that.data.goods_id);
    var show_num = Number(wxb.that.data.show_num);
    var goods_name = wxb.that.data.datas.goods.goods_name;
    var photo = wxb.that.data.datas.goods.photo;
    var price = Number(wxb.that.data.datas.goods.price);
    var shop_price = Number(wxb.that.data.datas.goods.shop_price);
    var mail_price = Number(wxb.that.data.datas.goods.mail_price);
    var type_id = Number(wxb.that.data.type_id);
    var is_select = 0;

    if (type_id == -1) {
      wx.showToast({
        title: '请选择商品类型',
      })
      return;
    }

    var mycart = wx.getStorageSync('wxb_cart');
    if (!mycart) {
      var cart = [];
    } else {
      var cart = JSON.parse(mycart);
    }
    var iscart = false;
    for (var a in cart) {
      if (cart[a].goods_id == goods_id && cart[a].type_id == type_id) {
        cart[a].show_num += show_num;
        iscart = true;
      }
    }

    if (!iscart) {
      var myGoods = {
        goods_id: goods_id, show_num: show_num, goods_name: goods_name, photo: photo,
        price: price, shop_price: shop_price, mail_price: mail_price, type_id: type_id, is_select: is_select
      };
      cart.push(myGoods);
    }

    console.log(cart);
    wx.setStorageSync('wxb_cart', JSON.stringify(cart));

    wx.showToast({
      title: '已加入购物车',
    })

  },
  /**
   * 商品数量减少
   */
  minusGoodsNum: function (e) {
    var num = wxb.that.data.show_num;
    if (num > 1) {
      num--;
    } else {
      wx.showToast({
        title: '至少购买1件',
      })
    }
    wxb.that.setData({
      show_num: num,
    });
  },

  /**
   * 商品数量增加
   */
  plusGoodsNum: function (e) {
    var num = wxb.that.data.show_num;
    if (num < 99) {
      num++;
    } else {
      wx.showToast({
        title: '最多购买99件',
      })
    }
    wxb.that.setData({
      show_num: num,
    });
  },

  /**
   * 选择类型
   */
  onTabTypeClick: function (e) {
    wxb.that.setData({
      type_id: e.target.dataset.id,
      goods_price: e.target.dataset.price
    });
  },

  tuwen: function (e) {
    wxb.that.setData({
      tab: 1,
    });
  },
  guige: function (e) {
    wxb.that.setData({
      tab: 2,
    });
  },
  baozhuang: function (e) {
    wxb.that.setData({
      tab: 3,
    });
  },
  pingjia: function (e) {
    wxb.that.setData({
      tab: 4,
    });
  },

  /**
   * 立即购买
   */
  buy: function () {
    if (wxb.that.data.type_id == -1) {
      wx.showToast({
        title: '请选择商品类型',
      })
      return;
    }

    var goods_id = Number(wxb.that.data.goods_id);
    var show_num = Number(wxb.that.data.show_num);
    var goods_name = wxb.that.data.datas.goods.goods_name;
    var photo = wxb.that.data.datas.goods.photo;
    var price = Number(wxb.that.data.datas.goods.price);
    var shop_price = Number(wxb.that.data.goods_price);
    var mail_price = Number(wxb.that.data.datas.goods.mail_price);
    var is_mail = Number(wxb.that.data.datas.goods.is_mail);
    var type_id = Number(wxb.that.data.type_id);

    var myGoods = {
      goods_id: goods_id, show_num: show_num, goods_name: goods_name, photo: photo,
      price: price, shop_price: shop_price, mail_price: mail_price, type_id: type_id,
      is_mail: is_mail
    };
    wx.setStorageSync('wxb_cart_item', JSON.stringify(myGoods));
    wx.redirectTo({
      url: '/pages/mall/buy?type=1',
    })
  },

  onShow: function (e) {
    wxb.that = this;
  },

  onLoad: function (e) {
    wxb.that = this;
    wxb.style();

    wxb.globalData = app.globalData; //正确打开巅峰互联的方式
    if (!wxb.checkAuthLogin(true)) {
      wxb.login();
    }

    if (e.goods_id) {
      wxb.that.setData({
        goods_id: e.goods_id,
      });
    }

    /**
     * 获取商品详情
     */
    this.getGoodsDetail();
  },

  /**
   * 获取商品详情
   */
  getGoodsDetail: function (e) {
    wx.showLoading({
      title: '加载中..',
    });
    wxb.Post('/api/shop.data/goodsDetail', {
      openid: wxb.getOpenId(),
      goods_id: wxb.that.data.goods_id,
      page: wxb.that.data.page,
    }, function (data) {
      wx.hideLoading();
      var datas = wxb.that.data.comments;

      for (var val in data.comment) {
        datas.push(data.comment[val]);
      }

      wxb.that.setData({
        goods_price: data.goods.shop_price,
        datas: data,
        comments: datas,
        more: data.more,
        page: wxb.that.data.page + 1,
      })
    });
  },

  /**
  * 转发
  */
  onShareAppMessage: function (res) {
    if (res.from === 'button') {
      // 来自页面内转发按钮
      console.log(res.target)
    }
    return {
      title: wxb.that.data.datas.goods.goods_name,
      path: '/pages/mall/detail?goods_id=' + wxb.that.data.goods_id,
      success: function (res) {
        // 转发成功
      },
      fail: function (res) {
        // 转发失败
      }
    }
  }
})

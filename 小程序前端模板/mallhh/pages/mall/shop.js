var app = getApp();
var wxb = require('../../utils/wxb.js');
Page({
  data: {
    color: '',
    pid: 1,
    cat: 1,
    showcatelist: true,
    orderby: 0,//1 销量 2价格高到低 3价格低到高 0推荐排序
    page: 1,
    more: 0,
    keyword: '',
    category_id: 0,

    datas: [],//商城列表数据

    id: 0,//父类Index
    cat: -1,//子类Index

    show_classify: '分类筛选',

    setting: [],
  },

  onclick_menu: function (e) {
    var order = e.target.dataset.id;
    if (order == 2){
         if(wxb.that.data.orderby == 2){
           order =3;
         } else if (wxb.that.data.orderby == 3){
           order = 2;
         }
     }
     console.log(order);
    wxb.that.setData({
      orderby: order,
      datas: [],
      page: 1,
    });
    this.getIndexList();
  },

  callPhone: function (e) {
    wx.makePhoneCall({
      phoneNumber: wxb.that.data.setting.service_tel,
    })
  },

  /**
   * 搜索商品列表
   */
  searchShopList: function (e) {
    var params = e.detail.value;
    wxb.that.setData({
      keyword: params.keyword,
      page: 1,
      datas: [],
    });

    this.getIndexList();
  },


  orderby: function (e) {
    wxb.that.setData({
      orderby: e.target.dataset.orderby,
      order_msg: e.target.dataset.msg,
      orderlist: true,
      page: 1,
      datas: [],
    });
    this.getIndexList();
  },
  /**
   * 清除搜索内容
   */
  clearSearchContent: function (e) {
    this.setData({
      keyword: ''//将data的inputValue清空
    });
  },

  /**
   * 分类筛选
   */
  onTabClick: function (e) {
    console.log(e);
    var temps = wxb.that.data.configs.category;
    wxb.that.setData({
      id: e.target.dataset.id,
      cat: -1,
      tempClassify: temps[e.target.dataset.id].children,
    });


    console.log(wxb.that.data.tempClassify);
  },

  onTabChildrenClick: function (e) {
    var temp = wxb.that.data.tempClassify[e.target.dataset.id];
    wxb.that.setData({
      cat: e.target.dataset.id,
      show_classify: temp.category_name,
      category_id: temp.category_id,

      showcatelist: wxb.that.data.showcatelist == true ? false : true,
      orderlist: true,

      page: 1,
      datas: [],
    });

    this.getIndexList();
  },

  showcatelist: function () {
    wxb.that.setData({
      showcatelist: wxb.that.data.showcatelist == true ? false : true,
      orderlist: true
    });
  },

  orderlist: function () {
    wxb.that.setData({
      orderlist: wxb.that.data.orderlist == true ? false : true,
      showcatelist: true,
    });
  },

  onShow: function () {
    wxb.that = this;
    wxb.style();
  },

  onLoad: function (e) {
    console.log(e);


    wxb.that = this;
    wxb.style();

    wxb.globalData = app.globalData; //正确打开巅峰互联的方式
    if (!wxb.checkAuthLogin(true)) {
      wxb.login();
    }

    if (e != null && e.category_id != 0) {
      wxb.that.setData({
        category_id: e.category_id,
      });
    }

    // this.getBaseConfig();
    this.getIndexList();
  },

  /**
   * 加载基本配置信息
   */
  // getBaseConfig: function (e) {
  //   wxb.Post('/api/shop.data/getData', {
  //     openid: wxb.getOpenId(),
  //     page: wxb.that.data.page,
  //   }, function (data) {
  //     var temp = data.category;
  //     wxb.that.setData({
  //       configs: data,
  //       tempClassify: temp[0].children,
  //     });
  //   });
  // },

  /**
   * 加载商城列表数据
   */
  getIndexList: function (e) {
    wx.showLoading({
      title: '加载中...',
    })
    wxb.Post('/api/shop.data/getindex', {
      openid: wxb.getOpenId(),
      page: wxb.that.data.page,
      keyword: wxb.that.data.keyword,
      orderby: wxb.that.data.orderby,
      category_id: wxb.that.data.category_id,
    }, function (data) {
      wx.hideLoading();
      var datas = wxb.that.data.datas;
      for (var val in data.list) {
        datas.push(data.list[val]);
      }
      wxb.that.setData({
        datas: datas,
        more: data.more,
        page: wxb.that.data.page + 1,
      })
    });
  },

  /**
   * 加载更多
   */
  loadMore: function (e) {
    this.getIndexList();
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
      title: '宝兔兔团购',
      path: '/pages/mall/index',
      success: function (res) {
        // 转发成功
      },
      fail: function (res) {
        // 转发失败
      }
    }
  }
})
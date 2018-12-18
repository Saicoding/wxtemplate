var app = getApp();
var wxb = require('../../utils/wxb.js');
Page({
  data: {
    color: '',
    pid: 1,
    cat: 1,
    showcatelist: true,
    orderlist: true,
    orderby:0,
    order_msg:'推荐排序',
    page: 1,
    more: 0,
    keyword: '',
    category_id: 0,

    datas: [],//商城列表数据    

    id: 0,//父类Index
    cat: -1,//子类Index

    setting: [],

    categorys: [],

    length: 0,

    hotlist: [],
    banner: [],
  },

  /**
   * 加载商城列表数据
   */
  getIndexList: function (e) {
    wx.showLoading({
      title: '加载中...',
    })
    wxb.Post('/api/shop2.index/getIndex', {
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
      // var num = Math.ceil(data.category.length / 8);
      if (data.category) {
        var num = Math.ceil(data.category.length / 8);
        wxb.that.setData({
          length: num,
        });
      }
      wxb.that.setData({
        banner: data.banner,
        hotlist: data.hotlist,
        datas: datas,
        more: data.more,
        page: wxb.that.data.page + 1,
        categorys: data.category,
        // length: num,
      })
    });
  },

  callPhone: function(e){
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


  orderby:function(e){
    wxb.that.setData({
      orderby: e.target.dataset.orderby,
      order_msg: e.target.dataset.msg,
      orderlist:true,
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

  onLoad: function () {
    wxb.that = this;
    wxb.style();

    wxb.globalData = app.globalData; //正确打开巅峰互联的方式
    if (!wxb.checkAuthLogin(true)) {
      wxb.login();
    }

    // this.getBaseConfig();
    this.getIndexList();
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
      title: '一个不错的商城',
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
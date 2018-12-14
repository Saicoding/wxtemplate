//index.js
//获取应用实例
var app = getApp();
var wxb = require('../../utils/wxb.js');
Page({
  data: {
    color: '',
    cat: 0,

    datas: [],

    categorys: [],

    more: 0,
    page: 1,

    keyword: '',

    setting: [],

  },

  // onPullDownRefresh: function () {
  //   wx.showNavigationBarLoading() //在标题栏中显示加载

  //   //模拟加载
  //   setTimeout(function () {
  //     // complete
  //     wx.hideNavigationBarLoading() //完成停止加载
  //     wx.stopPullDownRefresh() //停止下拉刷新
  //   }, 1500);
  // },

  callPhone: function(e){
    var phoneNumber = wxb.that.data.setting.service_tel;
    wx.makePhoneCall({
      phoneNumber: phoneNumber,
    })
  },

  onShow: function (e) {
    wxb.that = this;
  },

  onclick_menu: function (e) {
    wxb.that.setData({
      cat: e.target.dataset.id,
      datas: [],
      page: 1,
    });

    this.getIndex();
  },

  onLoad: function () {
    console.log(2222);
    wxb.that = this;
    wxb.style();
    wxb.globalData = app.globalData; //正确打开巅峰互联的方式
    if (!wxb.checkAuthLogin(true)) {
      wxb.login();
    }
    this.getIndex();

  },
  onUnload: function () {

  },

  loadMore: function(e){
    this.getIndex();
  },

  searchTuanList: function(e){
    var params = e.detail.value;
    wxb.that.setData({
      keyword: params.product_name,
      page: 1,
      datas: [],
    });

    this.getIndex();
  },

  /**
   * 清除输入内容
   */
  clearInputContent: function(e){
    this.setData({
      keyword: ''//将data的inputValue清空
    });
  },

  /**
   * 获取首页数据
   */
  getIndex: function (e) {
    wx.showLoading({
      title: '加载中..',
    });

    wxb.Post('/api/group.index/getIndex', {
      openid: wxb.getOpenId(),
      page: wxb.that.data.page,
      category_id: wxb.that.data.cat,
      keyword: wxb.that.data.keyword,
    }, function (data) {
      wx.hideLoading();
      var datas = wxb.that.data.datas;

      for (var val in data.list) {
        datas.push(data.list[val]);
      }

      wxb.that.setData({
        categorys: data.category,
        datas: datas,
        cat: data.this_category_id,
        more: data.more,
        page: wxb.that.data.page + 1,
      });

      console.log(wxb.that.data.cat);
    })
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
      title: '大家一起来拼团吧',
      path: '/pages/tuan/index',
      success: function (res) {
        // 转发成功
      },
      fail: function (res) {
        // 转发失败
      }
    }
  }
})

//index.js
var app = getApp();
var wxb = require('../../utils/wxb.js');
Page({
  data: {
    color: '',
    datas: [],
    // more: 0,
    // page: 1,

    keyword: '',
    page: 1,
    more: 0,

  },

  onLoad: function () {
    wxb.that = this;
    wxb.style();
    wxb.globalData = app.globalData; //正确打开巅峰互联的方式
    if (!wxb.checkAuthLogin(true)) {
      wxb.login();
    }
  },
  
  loadMore: function () {
    this.getIndexList();
  },
  searchList: function(e){
    console.log(e);
    wxb.that.setData({
      keyword: e.detail.value,
      datas:[],
      page:1,
      
    });

    wx.showLoading({
      title: '提交中..',
    });
    wxb.Post('/api/tongcheng.index/getIndex', {
      openid: wxb.getOpenId(),
      page: wxb.that.data.page,
      keyword: wxb.that.data.keyword,
    }, function (data) {
      wx.hideLoading();
      var datas = wxb.that.data.datas;
      for (var val in data.info) {
        datas.push(data.info[val]);
      }
      wxb.that.setData({
        datas: datas,
        categorys: data.category,
        more: data.more,
        page: wxb.that.data.page + 1,
      });
    });
  },
  

})

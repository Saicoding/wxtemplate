//index.js
var app = getApp();
var wxb = require('../../utils/wxb.js');
Page({
  data: {
    color: '',

    datas: [],

    categorys: [],

    length: 0,
    page: 1,
    more: 0,
    type: 0, 
    advert:[],
  },
  
  onLoad: function () {
    wxb.that = this;
    wxb.style();
    wxb.globalData = app.globalData; //正确打开巅峰互联的方式
    if (!wxb.checkAuthLogin(true)) {
      wxb.login();
    }

    this.getIndexList();
  },
  
  onShow:function(){
    wxb.that = this;
  },

  /**
   * 获取首页的信息
   */
  getIndexList: function(e){
    wx.showLoading({
      title: '加载中..',
    });
    wxb.Post('/api/tongcheng.index/getIndex', {
      openid: wxb.getOpenId(),
      page: wxb.that.data.page,
      type: wxb.that.data.type,
    }, function (data) {
      wx.hideLoading();
      // console.log(data.category.length);
      if(data.category){
        var num = Math.ceil(data.category.length / 8);
        wxb.that.setData({
          length: num,
        });
      }
      // console.log("解析：" + num);
      var datas = wxb.that.data.datas;
      for (var val in data.info) {
        datas.push(data.info[val]);
      }
      console.log(data.more);
      wxb.that.setData({
        datas: datas,
        advert: data.advert,
        categorys: data.category,
        more: data.more,
        page: wxb.that.data.page + 1,
      });
    });
  },

  /**
   * onTabClick Menu
   */
  onTabClick: function(e){
    var type = e.target.dataset.type;

    this.setData({
      type: type,
      page: 1,
      datas:[],
    });
    this.getIndexList();
  },
  loadMore:function(){
    this.getIndexList();
  },
  

    onShareAppMessage: function (res) {
    return {
      success: function (res) {
      },
      fail: function (res) {
      }
    }
  }


})

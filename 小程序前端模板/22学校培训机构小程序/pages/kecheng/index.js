//index.js
//获取应用实例
var app = getApp();
var wxb = require('../../utils/wxb.js');
Page({
  data: {
    color: '',

    page: 1,
    more: 0,

    datas: [],

    keyword: '',
    
  },

  onShow: function (e) {
    wxb.that = this;
  },

  onLoad: function () {
    wxb.that = this;
    wxb.style();

    wxb.globalData = app.globalData; //正确打开巅峰互联的方式
    if (!wxb.checkAuthLogin(true)) {
      wxb.login();
    }

    this.getCourseList();
  },

  /**
   * 课程更多
   */
  loadMore: function(e){
    this.getCourseList();
  },

  /**
   * 搜索课程
   */
  searchCourse: function(e){
    var params = e.detail.value;
    wxb.that.setData({
      keyword: params.keyword,
      page: 1,
      datas: [],
    });

    this.getCourseList();
  },

  /**
   * 加载课程列表
   */
  getCourseList: function (e) {
    wx.showLoading({
      title: '加载中...',
    })
    wxb.Post('/api/school.index/getClass', {
      openid: wxb.getOpenId(),
      page: wxb.that.data.page,
      keyword: wxb.that.data.keyword,
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

  onShareAppMessage: function (res) {
    wxb.globalData = app.globalData; //正确打开巅峰互联的方式
    wxb.that = this;   //正确打开巅峰互联的方式
    if (res.from === 'button') {
    }
    return {
      title: "一起来学习吧",
      path: '/pages/kecheng/index',
    }
  }
})

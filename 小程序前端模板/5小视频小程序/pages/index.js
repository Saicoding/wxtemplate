// index.js
var app = getApp();
var wxb = require('../utils/wxb.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
   datas:[],
   more:1,
   page:1,
   type:{
     photo:'/img/types.png',
     name:'全部分类',
   },
   type_id:0,
   tags:[],
  },

  more: function (e) {
    this.getList();
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (e) {
    wxb.globalData = app.globalData; //正确打开巅峰互联的方式
    wxb.that = this;   //正确打开巅峰互联的方式
    if (!wxb.checkAuthLogin(true)) {
      wxb.login();
    };
    var type = {
      photo: e.p ? e.p : '/img/types.png',
      name : e.n ? e.n : '全部分类',
    };
    wxb.that.setData({
      type_id:e.id?e.id : 0,
      type:type,
    })
    this.getList();
  },

  getList: function () {
    wxb.globalData = app.globalData; //正确打开巅峰互联的方式
    wxb.that = this;   //正确打开巅峰互联的方式
    wx.showLoading({
      title: '正在加载中..',
    });
    wxb.Post('/api/video.index/index', {
        page: wxb.that.data.page,
        type_id: wxb.that.data.type_id,
    }, function (data) {
      var datas = wxb.that.data.datas;
      var val = '';
      for (val in data.list) {
        datas.push(data.list[val]);
      }
      wxb.that.setData({
        datas: datas,
        tags: data.tags,
        more: data.more,
        page: wxb.that.data.page + 1,
      });
      wx.hideLoading();

    });
  },


  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    var that = this;
    var animation = wx.createAnimation({
      duration: 5000,
      timingFunction: 'ease-in-out',
    })
    animation.translateY(-20).step()
    that.setData({
      animationData: animation.export()
    });
    var an = 0;
    setInterval(function () {
      an = an == 1 ? 0 : 1;
      if (an == 1) {
        animation.translateY(0).step()
      } else {
        animation.translateY(-20).step();
      }
      // 更新数据
      that.setData({
        animationData: animation.export()
      })
    }, 5000);

  },

})
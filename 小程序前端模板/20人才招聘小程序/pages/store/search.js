// index.js
var app = getApp();
var wxb = require('../../utils/wxb.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    color: '',
    animationData: {},
    catelist: true,
    arealist: true,
    orderlist: true,

    datas: [],
  },

  searchJob: function(e){
    var params = e.detail.value;

    wx.showLoading({
      title: '搜索中...',
    })

    wxb.Post('/api/job.manage/getSearch', {
      openid: wxb.getOpenId(),
      keyword: params.keyword,
    }, function(data){
        wx.hideLoading();
        wxb.that.setData({
          datas: data.list,
        });
    });
  },

  orderlist: function (e) {
    this.setData({
      orderlist: this.data.orderlist == true ? false : true,
      arealist: true,
      catelist: true,

    });

  },
  catelist: function (e) {
    this.setData({
      catelist: this.data.catelist == true ? false : true,
      arealist: true,
      orderlist: true
    });

  },
  arealist: function (e) {
    this.setData({
      catelist: true,
      arealist: this.data.arealist == true ? false : true,
      orderlist: true,
    });
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wxb.that = this;
    wxb.style();
  },


  anima: function () {

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
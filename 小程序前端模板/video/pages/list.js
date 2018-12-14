// index.js
var app = getApp();
var wxb = require('../utils/wxb.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    datas: [],
    more: 1,
    page: 1,
    tag_id: 0,
    tags: [],
    type_id:0,
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
    this.setData({
       tag_id : e.tag_id,
       type_id : e.type_id,
    });
     this.getList();
  },
  onclick_menu:function(e){
    console.log(e);
    wxb.that.setData({
      datas: [],
      tag_id: e.target.dataset.id,
      page: 1,
    });
    this.getList();
  },
  getList: function () {
    wxb.globalData = app.globalData; //正确打开巅峰互联的方式
    wxb.that = this;   //正确打开巅峰互联的方式
    wx.showLoading({
      title: '正在加载中..',
    });
    wxb.Post('/api/video.index/getTag', {
      page: wxb.that.data.page,
      tag_id: wxb.that.data.tag_id,
      type_id: wxb.that.data.type_id,
    }, function (data) {
      var datas = wxb.that.data.datas;
      var val = '';
      for (val in data.list) {
        datas.push(data.list[val]);
      }
      wxb.that.setData({
        datas: datas,
        tags : data.tags,
        more: data.more,
        page: wxb.that.data.page + 1,
      });
      wx.hideLoading();

    });
  },



})
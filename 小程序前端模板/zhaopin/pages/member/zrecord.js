// pages/member/index.js
var app = getApp();
var wxb = require('../../utils/wxb.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    color: '',
    type:0,
    more: 0,
    page: 1,
    datas:[],
  },

  onShow: function () {
    wxb.that = this;
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wxb.that = this;
    wxb.style();

    wxb.globalData = app.globalData; //正确打开巅峰互联的方式
    if (!wxb.checkAuthLogin(true)) {
      wxb.login();
    }
    
    this.getList();
  },


  tab: function (e) {
    var type = e.currentTarget.dataset.type;
    this.setData({
      type: type,
      datas: [],
      page: 1
    });
    this.getList(type);
  },

// 获取列表数据
  getList: function (e) {
    console.log(e);
    wx.showLoading({
      title: '加载中...',
    })

    wxb.Post('/api/job.me/getApply', {
      openid: wxb.getOpenId(),
      type: e,
    }, function (data) {
      wx.hideLoading();

      var datas = wxb.that.data.datas;
      var val = '';
      for (val in data.list) {
        datas.push(data.list[val]);
      }

      wxb.that.setData({
        datas: datas,
        more: data.more,
        page:wxb.that.data.page+1
      })
      
    });
  },

  /**
   * 加载更多
   */
  more: function(e){
    this.getList();
  },

  deleteRecord: function(e){
    console.log()
    wx.showLoading({
      title: '提交中...',
    })

    wxb.Post('/api/job.me/deleteApply', {
      openid: wxb.getOpenId(),
      apply_id: e.target.dataset.id,
    }, function (data) {
      wx.hideLoading();
      var datas = wxb.that.data.datas;
      var datas_ = [];
      var val = '';
      for (val in datas) {
        if (datas[val].apply_id != e.target.dataset.id) {
          datas_.push(datas[val]);
        }
      }
      wxb.that.setData({
        datas: datas_,
      });
    });
  }

})
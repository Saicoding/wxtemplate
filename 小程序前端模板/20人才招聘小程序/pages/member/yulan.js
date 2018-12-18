// pages/member/yulan.js
var app = getApp();
var wxb = require('../../utils/wxb.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    color: '',
    show: 1,
    user_id: 0,
    datas: [],
    apply_id:0,
  },

  onShow: function () {
    wxb.that = this;
  },

  open_view: function (e) {
    this.setData({
      show: this.data.show == 1 ? 0 : 1,
    });
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (e) {
    wxb.that = this;
    wxb.style();
    wxb.globalData = app.globalData; //正确打开巅峰互联的方式
    if (!wxb.checkAuthLogin(true)) {
      wxb.login();
    }
    var user_id = e.user_id ? e.user_id: 0  ;
    var apply_id = e.apply_id ? e.apply_id : 0  ;

    wxb.that.setData({
      user_id: user_id ,
      apply_id: apply_id,
    });
    console.log(apply_id);
    if (user_id > 0 && apply_id == 0) {
      this.searchDetail();
    } else if (user_id == 0 && apply_id > 0) {
      this.resumeDetail();
    }else{
      this.getResume();
    }
  },

/** 
 * 
 * 会员查看自己的简历；
 * 
 */
  getResume:function(){
    wx.showLoading({
      title: '加载中..',
    });
    wxb.Post('/api/job.me/getResume', {
      openid: wxb.getOpenId(),
    }, function (data) {
      wx.hideLoading();
        //正常查看
        wxb.that.setData({
          datas: data,
        });
    });
  },  
  /**
   * 查看简历详情
   */
  resumeDetail: function (e) {
    wx.showLoading({
      title: '加载中..',
    });
    wxb.Post('/api/job.manage/resumeDetail', {
      openid: wxb.getOpenId(),
      apply_id: wxb.that.data.apply_id,
    }, function (data) {
      wx.hideLoading();
      if (data.status==0){
        //需要开通VIP
        wx.redirectTo({
          url: '/pages/member/vip/buy',
        })
      }else{
        //正常查看
        wxb.that.setData({
          datas: data,
        });
      }
    });
  },

    searchDetail: function (e) {
    wx.showLoading({
      title: '加载中..',
    });
    wxb.Post('/api/job.manage/searchDetail', {
      openid: wxb.getOpenId(),
      user_id: wxb.that.data.user_id,
    }, function (data) {
      wx.hideLoading();
      if (data.status == 0) {
        //需要开通VIP
        wx.redirectTo({
          url: '/pages/member/vip/buy',
        })
      } else {
        //正常查看
        wxb.that.setData({
          datas: data,
        });
      }
    });
  },

})
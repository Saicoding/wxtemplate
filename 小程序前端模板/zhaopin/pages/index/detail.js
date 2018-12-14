// pages/index/detail.js
var app = getApp();
var wxb = require('../../utils/wxb.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    color: '',
    job_id: '',
    datas: [],
  },

  onShow: function () {
    wxb.that = this;
  },



  map: function () {
    wx.openLocation({
      latitude: wxb.that.data.datas.lat,
      longitude: wxb.that.data.datas.lng,
      scale: 18
    });                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (e) {
    wxb.that = this;
    wxb.style();
    wxb.that.setData({
      job_id: e.job_id,
    });

    this.getPostDetail();
  },

  /**
   * 获取职位详情
   */
  getPostDetail: function (e) {

    wx.showLoading({
      title: '加载中',
    })

    wxb.Post('/api/job.data/detail', {
      job_id: wxb.that.data.job_id,
    }, function (data) {
      wx.hideLoading();
      wxb.that.setData({
        datas: data,
      });

    });
  },

  /**
   * 申请职位
   */
  applyPost: function (e) {
    wx.showLoading({
      title: '申请中',
    })

    wxb.Post('/api/job.member/apply', {
      job_id: wxb.that.data.job_id,
      openid: wxb.getOpenId(),
    }, function (data) {
      wx.hideLoading();
      if (data.status == 0) {
        wx.showToast({
          title: '先创建您的简历吧',
        });

        wx.navigateTo({
          url: '/pages/resume/index',
        })
      } else {
        wx.showToast({
          title: '申请成功',
        });
      }
    });
  },
  onShareAppMessage: function (res) {
    wxb.that = this;   //正确打开巅峰互联的方式
    wxb.globalData = app.globalData; //正确打开巅峰互联的方式
    return {
      title: '巅峰互联人才网',
      path: '/pages/index/index',
      success: function (res) {
        // 转发成功
        wx.showToast({
          title: '已转发',
        })
      },
      fail: function (res) {
        // 转发失败
        wx.showToast({
          title: '转发失败',
        })
      }
    }
  }
})
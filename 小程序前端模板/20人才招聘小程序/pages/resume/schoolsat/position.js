var app = getApp();
var wxb = require('../../../utils/wxb.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    color: '',

    position_id: '',
    bg_date: '',
    end_date: '',
    position_name: '',
    position_describe: '',
  },
  
  onShow: function () {
    wxb.that = this;
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
    };

    wxb.that.setData({
      position_id: e.position_id,
    });

    if (e.position_id > 0) {
      this.getPositionDetail();
    }
  },

  /**
   * 选择开始时间
   */
  bindBgDatePickerChange: function (e) {
    wxb.that.setData({
      bg_date: e.detail.value,
    });
  },

  /**
   * 选择结束时间
   */
  bindEndDatePickerChange: function (e) {
    wxb.that.setData({
      end_date: e.detail.value,
    });
  },

  /**
   * 添加校内职务
   */
  setPosition: function (e) {
    var param = e.detail.value;

    wx.showLoading({
      title: '提交中',
    })

    wxb.Post('/api/job.member/setPosition', {
      openid: wxb.getOpenId(),
      position_id: wxb.that.data.position_id,
      bg_date: wxb.that.data.bg_date,
      end_date: wxb.that.data.end_date,
      position_name: param.position_name,
      position_describe: param.position_describe,
    }, function (data) {
      wx.hideLoading();
      wx.redirectTo({
        url: '/pages/resume/schoolsat/plist',
      })
    });
  },

  /**
   * 获取校内职务详情
   */
  getPositionDetail: function (e) {
    wx.showLoading({
      title: '提交中',
    })

    wxb.Post('/api/job.member/positionDetail', {
      openid: wxb.getOpenId(),
      position_id: wxb.that.data.position_id,
    }, function (data) {
      wx.hideLoading();
      wxb.that.setData({
        bg_date: data.bg_date,
        end_date: data.end_date,
        position_name: data.position_name,
        position_describe: data.position_describe,
      });
    });
  }


})
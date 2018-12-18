var app = getApp();
var wxb = require('../../../utils/wxb.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    color: '',

    practice_id: '',
    bg_date: '',
    end_date: '',
    practice_name: '',
    practice_describe: '',
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
      practice_id: e.practice_id,
    });

    if (e.practice_id > 0) {
      this.getPracticeDetail();
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
   * 添加社会实践
   */
  setpractice : function (e) {
    var param = e.detail.value;

    wx.showLoading({
      title: '提交中',
    })

    wxb.Post('/api/job.member/setpractice', {
      openid: wxb.getOpenId(),
      practice_id: wxb.that.data.practice_id,
      bg_date: wxb.that.data.bg_date,
      end_date: wxb.that.data.end_date,
      practice_name: param.practice_name,
      practice_describe: param.practice_describe,
    }, function (data) {
      wx.hideLoading();
      wx.redirectTo({
        url: '/pages/resume/schoolsat/prlist',
      })
    });
  },

  /**
   * 获取社会实践详情
   */
  getPracticeDetail: function (e) {
    wx.showLoading({
      title: '提交中',
    })

    wxb.Post('/api/job.member/practiceDetail', {
      openid: wxb.getOpenId(),
      practice_id: wxb.that.data.practice_id,
    }, function (data) {
      wx.hideLoading();
      wxb.that.setData({
        bg_date: data.bg_date,
        end_date: data.end_date,
        practice_name: data.practice_name,
        practice_describe: data.practice_describe,
      });
    });
  }


})
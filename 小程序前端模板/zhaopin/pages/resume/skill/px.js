var app = getApp();
var wxb = require('../../../utils/wxb.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    color: '',

    train_id: 0,
    bg_date: '',
    end_date: '',
    train_name: '',
    train_calss: '',
    train_describe: '',
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



    console.log(e);

    wxb.that.setData({
      train_id: e.train_id,
    });

    if (e.train_id > 0) {
      this.getTrainDetail();
    }
  },

  /**
   * 获取培训经历详情
   */
  getTrainDetail: function(e){
    wx.showLoading({
      title: '加载中',
    })

    wxb.Post('/api/job.member/trainDetail', {
      openid: wxb.getOpenId(),
      train_id: wxb.that.data.train_id,
    }, function (data){
      wx.hideLoading();
      wxb.that.setData({
        bg_date: data.bg_date,
        end_date: data.end_date,
        train_name: data.train_name,
        train_calss: data.train_calss,
        train_describe: data.train_describe,
      });
    });
  },

  /**
   * 添加培训经历
   */
  addTrainItem: function(e){
    var param = e.detail.value;

    wx.showLoading({
      title: '提交中',
    })

    wxb.Post('/api/job.member/setTrain', {
      openid: wxb.getOpenId(),
      train_id: wxb.that.data.train_id,
      bg_date: wxb.that.data.bg_date,
      end_date: wxb.that.data.end_date,
      train_name: param.train_name,
      train_calss: param.train_calss,
      train_describe: param.train_describe,
    }, function (date) {
      wx.hideLoading();
      wx.redirectTo({
        url: '/pages/resume/skill/plist',
      })
    });
  },

  /**
   * 开始时间
   */
  bindBgDatePickerChange: function (e) {
    wxb.that.setData({
      bg_date: e.detail.value,
    });
  },

  /**
   * 结束时间
   */
  bindEndDatePickerChange: function (e) {
    wxb.that.setData({
      end_date: e.detail.value,
    });
  },

})
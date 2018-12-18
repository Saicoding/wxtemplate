// pages/member/index.js
var app = getApp();
var wxb = require('../../../utils/wxb.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    color: '',
    project_id: 0,
    
    bg_date: '',
    end_date: '',
    project_name: '',
    company_name: '',
    project_describe: '',
    duty_describe: '',
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
    };

    wxb.that.setData({
      project_id: e.project_id,
    });

    if (e.project_id > 0) {
      this.getProjectDetail();
    }

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

  /**
   * 获取项目经验详情
   */
  getProjectDetail: function(e){
    wx.showLoading({
      title: '加载中',
    })
    wxb.Post('/api/job.member/projectDetail', {
      openid: wxb.getOpenId(),
      company_id: wxb.that.data.company_id,
    }, function (data) {
      wx.hideLoading();
      wxb.that.setData({
        bgdate: data.bgdate,
        enddate: data.enddate,
      });
    })
  },  

  /**
   * 新增、更新项目经验
   */
  addProjectJY: function(e){
    var param = e.detail.value;

    wx.showLoading({
      title: '提交中',
    })
    wxb.Post('/api/job.member/setProject', {
      openid: wxb.getOpenId(),
      project_id: wxb.that.data.project_id,
      bg_date: wxb.that.data.bg_date,
      end_date: wxb.that.data.end_date,
      project_name: param.project_name,
      company_name: param.company_name,
      project_describe: param.project_describe,
      duty_describe: param.duty_describe,
    }, function (data) {
      wx.hideLoading();
      wx.redirectTo({
        url: '/pages/resume/project/plist',
      })
    })
  }

})
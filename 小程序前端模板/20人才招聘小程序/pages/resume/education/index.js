// pages/member/index.js
var app = getApp();
var wxb = require('../../../utils/wxb.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    color: '',

    datas: [],

    bgdate: '', //开始时间
    enddate: '',   //结束时间
    school_name: '',//学校名称
    education_id: '',//学历学位
    is_tz: false,//是否统招
    major: '',//自填专业


    education: [],
    eArray: [],

    school_id: 0,
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

    wxb.that.setData({
      school_id: e.school_id,
    }),

    wxb.globalData = app.globalData; //正确打开巅峰互联的方式
    if (!wxb.checkAuthLogin(true)) {
      wxb.login();
    };

    this.getConfigInfo();

    if (e.school_id > 0) {
      this.getSchoolDetail();
    }
  },

  getSchoolDetail: function (e) {
    wx.showLoading({
      title: '加载中',
    })
    wxb.Post('/api/job.member/schoolDetail', {
      openid: wxb.getOpenId(),
      school_id: wxb.that.data.school_id,
    }, function (data) {
      wx.hideLoading();
      wxb.that.setData({
        bgdate: data.bgdate,
        enddate: data.enddate,
        school_name: data.school_name,//学校名称
        education_id: data.education_id,//学历学位
        is_tz: data.is_tz,//是否统招
        major: data.major,//自填专业
      });

      for (var index in wxb.that.data.education) {
        if (wxb.that.data.education[index].scale_id == data.education_id) {
          wxb.that.setData({
            eIndex: index,
          });
        }
      }
    })
  },

  /**
   * 获取基础配置信息
   */
  getConfigInfo: function (e) {
    wxb.Post('/api/job.data/getdatas', {

    }, function (data) {

      var index = 0;
      var array = wxb.that.data.eArray;
      for (index in data.education) {
        array.push(data.education[index].scale_name);
      }

      wxb.that.setData({
        eArray: array,
        education: data.education,
      });
    });
  },

  /**
   * 新增或者更新教育经历
   */
  setSchool: function (e) {
    var param = e.detail.value;
    wx.showLoading({
      title: '提交中',
    })

    wxb.Post('/api/job.member/setSchool', {
      openid: wxb.getOpenId(),
      school_id: wxb.that.data.school_id,
      bgdate: wxb.that.data.bgdate,
      enddate: wxb.that.data.enddate,
      school_name: param.school_name,
      education_id: wxb.that.data.education_id,
      is_tz: wxb.that.data.is_tz,
      major: param.major,
    }, function (data) {
      wx.hideLoading();
      wx.redirectTo({
        url: '/pages/resume/education/slist',
      })
    });
  },


  /**
   * 开始时间
   */
  bindStartDateChange: function (e) {
    wxb.that.setData({
      bgdate: e.detail.value,
    });
  },

  /**
   * 结束时间
   */
  bindEndDateChange: function (e) {
    wxb.that.setData({
      enddate: e.detail.value,
    });
  },

  /**
   * 统招监控
   */
  bindTzChange: function (e) {
    wxb.that.setData({
      is_tz: e.detail.value,
    })
  },

  /**
   * 学历学位
   */
  bindEducationPickerChange: function (e) {
    console.assert
    wxb.that.setData({
      eIndex: e.detail.value,
      education_id: wxb.that.data.education[e.detail.value].scale_id,
    });
  },

})
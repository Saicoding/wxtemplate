// pages/resume/workexp.js
var app = getApp();
var wxb = require('../../../utils/wxb.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    color: '',
    show: 0,

    datas: [],

    bgdate: '', //开始时间
    enddate: '',  //结束时间
    company_name: '',//公司名称
    company_industry: '',//所属行业
    company_type: '',//性质
    company_division: '',//部门
    company_position: '',//职位
    company_salary: '',//月薪
    company_detail: '',//描述

    type: [],
    tArray: [],

    industry: [],
    iArray: [],

    company_id: 0,
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
    };

    wxb.that.setData({
      company_id: e.company_id,
    });

    this.getConfigInfo();

    /**
     * 获取行业要求列表
     */
    this.getIndustry();

    if (e.company_id > 0) {
      this.getCompanyDetail();
    }
  },

  /**
   * 获取基础配置信息
   */
  getConfigInfo: function (e) {
    wxb.Post('/api/job.data/getdatas', {

    }, function (data) {

      var index = 0;
      var array = wxb.that.data.tArray;
      for (index in data.type) {
        array.push(data.type[index].scale_name);
      }

      wxb.that.setData({
        tArray: array,
        type: data.type,
      });
    });
  },

  /**
   * 获取工作经验详情
   */
  getCompanyDetail: function (e) {
    wx.showLoading({
      title: '加载中',
    })
    wxb.Post('/api/job.member/companyDetail', {
      openid: wxb.getOpenId(),
      company_id: wxb.that.data.company_id,
    }, function (data) {
      wx.hideLoading();
      wxb.that.setData({
        bgdate: data.bgdate,
        enddate: data.enddate,
        company_name: data.company_name,//公司名称
        company_division: data.company_division,//部门
        company_position: data.company_position,//职位
        company_salary: data.company_salary,//月薪
        company_detail: data.company_detail,//描述
        company_industry: data.company_industry,//所属行业
        company_type: data.company_type,//性质

      });

      for (var index in wxb.that.data.type) {
        if (wxb.that.data.type[index].scale_id == data.company_type) {
          wxb.that.setData({
            tIndex: index,
          });
        }
      }

      for (var index in wxb.that.data.industry) {
        if (wxb.that.data.industry[index].industry_id == data.company_industry) {
          wxb.that.setData({
            iIndex: index,
          });
        }
      }
    })
  },


  /**
   * 获取行业要求列表
   */
  getIndustry: function (e) {
    wx.showLoading({
      title: '加载中',
    })

    wxb.Post('/api/job.data/getIndustry', {
      openid: wxb.getOpenId(),
    }, function (data) {
      wx.hideLoading();

      var index = 0;
      var array = wxb.that.data.iArray;
      for (index in data) {
        array.push(data[index].industry_name);
      }

      wxb.that.setData({
        iArray: array,
        industry: data,
      });

    });
  },

  /**
   * 添加工作经历
   */
  addCompanyItem: function (e) {
    var param = e.detail.value;

    wx.showLoading({
      title: '提交中',
    })

    wxb.Post('/api/job.member/setCompany', {
      openid: wxb.getOpenId(),
      company_id: wxb.that.data.company_id,//工作经历Id
      bgdate: wxb.that.data.bgdate, //开始时间
      enddate: wxb.that.data.enddate,  //结束时间
      company_name: param.company_name,//公司名称
      company_industry: wxb.that.data.company_industry,//所属行业
      company_type: wxb.that.data.company_type,//性质
      company_division: param.company_division,//部门
      company_position: param.company_position,//职位
      company_salary: param.company_salary,//月薪
      company_detail: param.company_detail,//描述
    }, function (data) {
      wx.hideLoading();
      wx.redirectTo({
        url: '/pages/resume/company/clist',
      })
    });
  },

  /**
   * 开始时间
   */
  bindBgDatePickerChange: function (e) {
    wxb.that.setData({
      bgdate: e.detail.value,
    });
  },

  /**
   * 结束时间
   */
  bindEndDatePickerChange: function (e) {
    wxb.that.setData({
      enddate: e.detail.value,
    });
  },

  /**
   * 公司性质
   */
  bindTypePickerChange: function (e) {
    wxb.that.setData({
      tIndex: e.detail.value,
      company_type: wxb.that.data.type[e.detail.value].scale_id,
    });
  },

  // company_industry: '',//所属行业
  // company_type: '',//性质
  /**
   * 所属行业
   */
  bindIndustryPickerChange: function (e) {
    console.log(wxb.that.data.industry[e.detail.value]);
    wxb.that.setData({
      iIndex: e.detail.value,
      company_industry: wxb.that.data.industry[e.detail.value].industry_id,
    });
  },
})
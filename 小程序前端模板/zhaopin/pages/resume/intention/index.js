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

    nature: [], //求职性质
    salary: [], //月薪要求
    status: [], //求职状态

    nArray: [],
    sArray: [],
    stArray: [],

    nature_id: '', //求职性质
    salary_id: '', //月薪要求
    status_id: '', //求职状态


    inIds: '',
    skIds: '',
    
    work_address: '',
  },

  onShow: function (e) {
    wxb.that = this;
    
    var industryids = wx.getStorageSync('industryids');
    var skillids = wx.getStorageSync('skillids');
    this.setData({
      inIds: industryids,
      skIds: skillids,
    });
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

    /**
     * 获取基本信息
     */
    this.getConfigInfo();

    /**
     * 获取求职意向信息
     */
    this.getIntention();

  },  

  /**
   * 获取求职意向
   */
  getIntention: function (e) {

    wxb.Post('/api/job.member/getIntention', {
      openid: wxb.getOpenId(),
    }, function (data) {
      console.log(data);
      wxb.that.setData({
        nature_id: data.nature_id,//求职性质
        salary_id: data.salary_id,//月薪要求
        status_id: data.status_id, //求职状态
        work_address: data.work_address,
        inIds: data.industry_ids,
        skIds: data.skill_ids,
      });

      for (var index in wxb.that.data.nature) {
        if (wxb.that.data.nature[index].id == data.nature_id) {
          wxb.that.setData({
            nIndex: index,
          });
        }
      }

      for (var index in wxb.that.data.salary) {
        if (wxb.that.data.salary[index].id == data.salary_id) {
          wxb.that.setData({
            sIndex: index,
          });
        }
      }

      for (var index in wxb.that.data.status) {
        if (wxb.that.data.status[index].id == data.status_id) {
          wxb.that.setData({
            stIndex: index,
          });
        }
      }
    })
  },
  /**
   * 新增、更新求职意向
   */
  setIntention: function (e) {
    var param = e.detail.value;
    
    wx.showLoading({
      title: '提交中',
    })

    wxb.Post('/api/job.member/setIntention', {
      openid: wxb.getOpenId(), 
      nature_id: wxb.that.data.nature_id,//求职性质
      salary: wxb.that.data.salary_id,//月薪要求
      status: wxb.that.data.status_id, //求职状态
      industryids: wxb.that.data.inIds,
      skillids: wxb.that.data.skIds,
      work_address: param.address,
    }, function (data) {
      console.log(data);
      wx.hideLoading();
      wx.navigateBack({});
    })
  },

  /**
   * 获取基础配置信息
   */
  getConfigInfo: function (e) {
    wxb.Post('/api/job.data/getdatas', {

    }, function (data) {
      var index = 0;
      var array = wxb.that.data.nArray;
      for (index in data.nature) {
        array.push(data.nature[index].name);
      }

      var index2 = 0;
      var array2 = wxb.that.data.sArray;
      for (index2 in data.salary) {
        array2.push(data.salary[index2].name);
      }

      var index3 = 0;
      var array3 = wxb.that.data.stArray;
      for (index3 in data.status) {
        array3.push(data.status[index3].name);
      }


      wxb.that.setData({
        nArray: array,
        sArray: array2,
        stArray: array3,

        nature: data.nature,
        salary: data.salary,
        status: data.status,
      });
    });
  },


  /**
   * 求职性质
   */
  bindNaturePickerChange: function (e) {
    wxb.that.setData({
      nIndex: e.detail.value,
      nature_id: wxb.that.data.nature[e.detail.value].id,
    });
  },

  /**
   * 月薪要求
   */
  bindSalaryPickerChange: function (e) {
    wxb.that.setData({
      sIndex: e.detail.value,
      salary_id: wxb.that.data.salary[e.detail.value].id,
    });
  },

  /**
   * 求职状态
   */
  bindStatePickerChange: function(e){
    wxb.that.setData({
      stIndex: e.detail.value,
      status_id: wxb.that.data.status[e.detail.value].id,
    });

    // console.log(e.detail.value);
  }
})
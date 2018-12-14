// index.js
var app = getApp();
var wxb = require('../../utils/wxb.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    color: '',

    animationData: {},
    catelist: true,
    arealist: true,
    orderlist: true,

    datas: [],

    screen: [],

    experience_id: 0,//工作经验
    education_id: 0,//学历要求
    type_id: 0,//公司性质
    scale_id: 0,//公司规模

    area_id: 0,//区域范围

    salary_id: 0, //薪资范围

    more: 0,
    page: 1,

    keyword: '',

  },

  formSearchsubmit: function (e) {
    this.setData({
      keyword: e.detail.value.keyword,
      page: 1,
      datas: [],
    })
    this.getHomeIndex();
  },

  //区域范围
  click_area: function(e){
    wxb.that.setData({
      area_id: e.target.dataset.id,
      catelist: true,
      datas: [],
      page: 1,
    })

    console.log("区域Id:" + wxb.that.data.area_id);
    this.getHomeIndex();
  },


  //薪资范围
  click_salary: function (e) {
    this.setData({
      salary_id: e.target.dataset.id,
      arealist: true,
      datas: [],
      page: 1,
    });

    console.log("薪资范围Id:" + wxb.that.data.salary_id); 
    this.getHomeIndex();
  },

  //工作经验筛选
  click_experience: function (e) {
    wxb.that.setData({
      experience_id: e.target.dataset.id,
      datas: [],
      // more: 0,
      page: 1,
      orderlist: true,
    })

    this.getHomeIndex();
  },

  //学历要求筛选
  click_education: function (e) {
    wxb.that.setData({
      education_id: e.target.dataset.id,
      orderlist: true,
      datas: [],
      page: 1,
    })

    this.getHomeIndex();
  },

  //公司性质
  click_type: function (e) {
    wxb.that.setData({
      type_id: e.target.dataset.id,
      datas: [],
      orderlist: true,
      page: 1,
    })

    this.getHomeIndex();
  },

  //公司规模
  click_scale: function (e) {
    wxb.that.setData({
      scale_id: e.target.dataset.id,
      datas: [],
      orderlist: true,
      page: 1,
    })

    this.getHomeIndex();
  },

  orderlist: function (e) {
    this.setData({
      orderlist: this.data.orderlist == true ? false : true,
      arealist: true,
      catelist: true,

    });
  },

  catelist: function (e) {
    this.setData({
      catelist: this.data.catelist == true ? false : true,
      arealist: true,
      orderlist: true
    });
  },

  arealist: function (e) {
    this.setData({
      catelist: true,
      arealist: this.data.arealist == true ? false : true,
      orderlist: true,
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

    this.getHomeScreen();
    this.getHomeIndex();
  },

  /**
   * 获取筛选条件
   */
  getHomeScreen: function () {
    wxb.Post('/api/job.data/getSearch', {}, function (data) {
      wxb.that.setData({
        screen: data,
      });
    });
  },


  /**
   * 获取招聘列表数据
   */
  getHomeIndex: function () {
    wx.showLoading({
      title: '加载中',
    })
    wxb.Post('/api/job.data/getIndex', {
      keyword: wxb.that.data.keyword,
      page: wxb.that.data.page,
      salary_id: wxb.that.data.salary_id,//薪资
      area_id: wxb.that.data.area_id,//区域
      experience_id: wxb.that.data.experience_id,//工作经验
      education_id: wxb.that.data.education_id,//学历要求
      type_id: wxb.that.data.type_id,//公司性质
      scale_id: wxb.that.data.scale_id,//公司规模
    }, function (data) {
      wx.hideLoading();
      wxb.that.setData({
        datas: data.list,
        more: data.more,
      });
    });
  },

  anima: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    var that = this;
    var animation = wx.createAnimation({
      duration: 5000,
      timingFunction: 'ease-in-out',
    })
    animation.translateY(-20).step()
    that.setData({
      animationData: animation.export()
    });
    var an = 0;
    setInterval(function () {
      an = an == 1 ? 0 : 1;
      if (an == 1) {
        animation.translateY(0).step()
      } else {
        animation.translateY(-20).step();
      }
      // 更新数据
      that.setData({
        animationData: animation.export()
      })
    }, 5000);
  },

  //转发
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
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

    sort: ['默认排序', '查看数排序', '打电话排序', '分享数排序', '赞排序', '距离排序'],
    sortIndexs: [1, 2, 3, 5, 6, 7],

    //获取筛选数据
    screen: [],
    //获取公司列表数据
    datas: [],

    page: 1,
    more: 0,

    industry_id: 0,
    area_id: 0,
    sort_id: 0,

    keyword: '',
    lat: '',
    lng: '',
  },

  formSearchsubmit: function (e) {
    this.setData({
      keyword: e.detail.value.keyword,
      page: 1,
      datas: [],
    })
    this.getCompanyList();
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
   * 招聘分类
   */
  click_industry: function (e) {
    wxb.that.setData({
      industry_id: e.target.dataset.id,
      catelist: true,
      datas: [],
      page: 1,
    })

    this.getCompanyList();
  },

  /**
   * 区域筛选
   */
  click_area: function (e) {
    wxb.that.setData({
      area_id: e.target.dataset.id,
      arealist: true,
      datas: [],
      page: 1,
    })

    this.getCompanyList();
  }, 

  /**
   * 排序筛选
   */
  click_sort: function(e){
    wxb.that.setData({
      sort_id: wxb.that.data.sortIndexs[e.target.dataset.id],
      orderlist: true,
      datas: [],
      page: 1,
    })

    this.getCompanyList();
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

    this.getCompanyData();
    this.getCompanyList();
  },

  /**
   * 获取筛选基本信息
   */
  getCompanyData: function (e) {

    wxb.Post('/api/job.data/getCompanyData', {}, function (data) {
      wxb.that.setData({
        screen: data,
      });
    });
  },

  /**
   * 获取公司列表
   */
  getCompanyList: function (e) {
    wx.showLoading({
      title: '加载中',
    })

    wxb.Post('/api/job.data/company', {
      industry_id: wxb.that.data.industry_id,
      area_id: wxb.that.data.area_id,
      orderby: wxb.that.data.sort_id,
      lat: wx.getStorageSync('wxb_lat'),
      lng: wx.getStorageSync('wxb_lng')
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

})
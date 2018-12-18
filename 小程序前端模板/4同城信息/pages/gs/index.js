// index.js
var app = getApp();
var wxb = require('../../utils/wxb.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    animationData: {},
    catelist: true,
    arealist: true,
    orderlist: true,
    status: 0,// 0 不是商家 1 审核通过的商家 2 审核中的商家 3 是审核失败
    search: [],
    more: 1,
    page: 1,
    datas: [],
    order: ['推荐排序', '阅读优先', '电话优先', '预约优先', '分享优先', '攒优先', '距离优先'],
    orderby: -1,
    area_id: 0,
    area_name:'',
    cat_id: 0,
    keyword: '',
    cat_name:'',
    pid1:true,
    pid2:false,
    color: '',
  },
  orderlist: function (e) {
    this.setData({
      orderlist: this.data.orderlist == true ? false : true,
      arealist: true,
      catelist: true,
    
    });
  },
  selectcat:function(e){
     var cat_id =  e.target.dataset.cat_id;
     var cat_name = e.target.dataset.cat_name;
     this.setData({
       cat_id: cat_id,
       cat_name: cat_name,
       catelist: true,
       page: 1,
       datas: [],
     })
     this.getList();
  },
  tab:function(e){
    console.log(e.target.dataset.pid);
    var pid =  e.target.dataset.pid;
    if(pid == 1 ){
      this.setData({
        pid1: false,
        pid2: true,
      })
    }else if(pid == 2){
      this.setData({
        pid1: true,
        pid2: false,
      })
    }
  },
  tab2: function (e) {
      this.setData({
        catelist: true,
        cat_id:0,
        cat_name : '',
        page: 1,
        datas: [],
      })
      this.getList();
  },
  orderby: function (e) {
    this.setData({
      orderby: e.target.dataset.index,
      orderlist: true,
      page: 1,
      datas: [],
    })
    this.getList();
  },
  area: function (e) {
    console.log(e);
    this.setData({
      area_id: e.target.dataset.area_id,
      area_name: e.target.dataset.area_name,
      arealist: true,
      page: 1,
      datas: [],
    })
    this.getList();
  },
  cat: function (e) {
 
    this.setData({
      cat_id: e.target.dataset.index,
      catelist: true,
      page: 1,
      datas: [],
    })
    this.getList();
  },
  catelist: function (e) {
    this.setData({
      catelist: this.data.catelist == true ? false : true,
      arealist: true,
      orderlist: true
    });
  },

  formBindsubmit: function (e) {
    this.setData({
      keyword: e.detail.value.keyword,
      page: 1,
      datas: [],
    })
    this.getList();
  },
  arealist: function (e) {
    this.setData({
      catelist: true,
      arealist: this.data.arealist == true ? false : true,
      orderlist: true,
    });
  },
  more: function (e) {
    this.getList();
  },

  
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wxb.that = this;
    wxb.style();
    
    wxb.globalData = app.globalData; //正确打开巅峰互联的方式
    wxb.that = this;   //正确打开巅峰互联的方式
    if (!wxb.checkAuthLogin(true)) {
      wxb.login();
    };
    wxb.Post('/api/zhuangxiu.data/getData', {
    }, function (data) {
      wxb.that.setData({
        search: data,
      })
    });
    this.getStatus();
    this.getList();
  },

  getList: function () {
    wxb.globalData = app.globalData; //正确打开巅峰互联的方式
    wxb.that = this;   //正确打开巅峰互联的方式
    wx.showLoading({
      title: '正在加载中..',
    });
    wxb.Post('/api/company.data/getIndex', {
      openid: wxb.getOpenId(),
      lat: wx.getStorageSync('wxb_lat'),
      lng: wx.getStorageSync('wxb_lng'),
      orderby: wxb.that.data.orderby - 0 + 1,
      area_id: wxb.that.data.area_id ,
      cat_id: wxb.that.data.cat_id ,
      keywords: wxb.that.data.keyword,
      page: wxb.that.data.page,
    }, function (data) {
      var datas = wxb.that.data.datas;
      var val = '';
      for (val in data.list) {
        datas.push(data.list[val]);
      }
      wxb.that.setData({
        datas: datas,
        more: data.more,
        page: wxb.that.data.page + 1,
      });
      wx.hideLoading();

    });
  },
  getStatus: function () {
    wxb.globalData = app.globalData; //正确打开巅峰互联的方式
    wxb.that = this;   //正确打开巅峰互联的方式
    if (!wxb.checkAuthLogin(true)) {
      wxb.login();
    }
    wxb.Post('/api/company.store/getStatus', {
      openid: wxb.getOpenId(),
    }, function (data) {
      wxb.that.setData({
        status: data.status,
      })
    });
  },

  toTel: function (e) {

    wxb.globalData = app.globalData; //正确打开巅峰互联的方式
    wxb.that = this;   //正确打开巅峰互联的方式
    wx.makePhoneCall({
      phoneNumber: e.target.dataset.tel, //仅为示例，并非真实的电话号码
      success: function () {
        wxb.Post('/api/company.index/call', {
          openid: wxb.getOpenId(),
          company_id: e.target.dataset.id,
        }, function (data) {
        });
      }
    })
  },
  anima: function () {

  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    wxb.that = this;
    wxb.globalData = app.globalData; //正确打开巅峰互联的方式

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
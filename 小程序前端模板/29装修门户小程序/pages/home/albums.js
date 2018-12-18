var app = getApp();
var wxb = require('../../utils/wxb.js');

Page({

  data: {
    lists: [],
    classify: [],

    animationData: {},
    catelist: true,
    arealist: true,
    orderlist: true,
    color_id: 0 ,
    space_id: 0,
    cat_id: 0,

    color_name :'',
    space_name : '',
    cat_name : '',

    more: 1,
    page: 1,
  },

  onShow: function (e) {
    wxb.globalData = app.globalData; //正确打开巅峰互联的方式
    wxb.that = this;   //正确打开巅峰互联的方式
  },

  onLoad: function (e) {
    this.getClassify();
    this.getList();
  },

 //获取相册列表
  getList:function(e){ 
    wxb.globalData = app.globalData; //正确打开巅峰互联的方式
    wxb.that = this;   //正确打开巅峰互联的方式
    if (!wxb.checkAuthLogin(true)) {
      wxb.login();
    };
    wx.showLoading({
      title: '正在加载中..',
    });
    wxb.Post('/api/zhuangxiu.cases/getList', {
      space_id: wxb.that.data.space_id,
      color_id: wxb.that.data.color_id,
      cat_id: wxb.that.data.cat_id ,
    }, function (data) {
      console.log(data);
      wx.hideLoading();
      wxb.that.setData({
        lists: data.list,
        more: data.more,
        page: wxb.that.data.page + 1,
      })
    });
  },

  //获取分类
  getClassify: function(e){
    wxb.Post('/api/zhuangxiu.cases/getCats', {

    }, function (data) {
      console.log(data);
      wxb.that.setData({
        classify: data,
      })
    });
    
  },

  orderby: function (e) {
    this.setData({
      color_id: e.target.dataset.id,
      color_name: e.target.dataset.color_name,
      orderlist: true,
      page: 1,
      datas: [],
    })
    this.getList();
  },

  area: function (e) {
    console.log(e);
    this.setData({
      cat_name: e.target.dataset.name,
      cat_id: e.target.dataset.id,
      arealist: true,
      page: 1,
      datas: [],
    })
    this.getList();
  },

  cat: function (e) {
    console.log(e);
    this.setData({
      space_name: e.target.dataset.name,
      space_id: e.target.dataset.id,
      catelist: true,
      page: 1,
      datas: [],
    })
    this.getList();
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

  


  showimg:function(e){
    console.log(e.target.dataset.val);
    wxb.Post('/api/zhuangxiu.cases/photos', {
      case_id: e.target.dataset.val,
    }, function (data) {
      console.log(data);
      wx.previewImage({
        urls: data,
      });
    });
    

  },
})
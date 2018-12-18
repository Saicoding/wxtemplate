//index.js
//获取应用实例
var app = getApp();
var wxb = require('../utils/wxb.js');
Page({
  data: {
    bg_date: '0000-00-00',
    date: '0000-00-00',
    datas: [],
    status:0, // 0 不是商家 1 审核通过的商家 2 审核中的商家 3 是审核失败
    cats_array:[],
    cats:[],
    areas_array:[],
    areas:[],
    cat_index:-1,
    area_index:-1,

    area_id: '',
    cat_id: '',

    type: '0',

    lat:0,
    lng:0,
    addr: '', 
    ces: '',
    ces_url: '',
    logo: '',
    photos: [],
    photos_url: [],    
  },

  onShow: function(){
    wxb.globalData = app.globalData; //正确打开巅峰互联的方式
    wxb.that = this;   //正确打开巅峰互联的方式
  },

  onLoad: function () {
    wxb.globalData = app.globalData; //正确打开巅峰互联的方式
    wxb.that = this;   //正确打开巅峰互联的方式
    if (!wxb.checkAuthLogin(true)) {
      wxb.login();
    }
    wx.showLoading({
      title: '正在加载中..',
    });
    wxb.Post('/api/company.store/getStatus', {
      openid: wxb.getOpenId(),
    }, function (data) {
     
      if(data.status != 0){
        wx.navigateTo({
          url: '/pages/store/index'
        })
      };
    });
    wxb.Post('/api/company.data/getData', {
      openid: wxb.getOpenId(),
    }, function (data) {
      var cats_array = [];
      var areas_array = [];
      var a,b =0; 
      for(a in data.cats){
        cats_array.push(data.cats[a].cat_name);
      }
      for (b in data.areas) {
        areas_array.push(data.areas[b].area_name);
      }
      wx.hideLoading();
      wxb.that.setData({
        cats_array: cats_array,
        areas_array: areas_array,
        areas: data.areas,
        cats: data.cats,
      })
    
    });

  
  },
  map: function () {
    wxb.that = this;
    wx.chooseLocation({
      success: function (data) {
        wxb.that.setData({
          lat: data.latitude,
          lng: data.longitude,
          addr: data.address,
        })
    

      }
    });
  },

  formBindsubmit : function (e) {
    wx.showLoading({
      title: '正在加载中..',
    });
    var data = e.detail.value;
    var date = this.data.date;
    wxb.Post('/api/hotel.manage/setPrice', {
      code: wxb.getStoreCode(),
      openid: wxb.getOpenId(),
      data: data,
      date: date,
    }, function (data) {
      wx.hideLoading();
    });
  },

  selectcat: function (e) {
    wxb.that.setData({
      cat_index: e.detail.value,
      cat_id: wxb.that.data.cats[e.detail.value].cat_id,

    });
  },
  
  selecareas: function (e) {
    wxb.that.setData({
      area_index: e.detail.value,
      area_id: wxb.that.data.areas[e.detail.value].area_id,
    });
  },

  uploadlogo: function(e) {
    wxb.fileupload('', function (data) {
      wxb.that.setData({
        photo_url: data.img_url,
        logo: data.img
      });
    });
  },

  uploadces: function (e) {
    wxb.fileupload('', function (data) {
      wxb.that.setData({
        ces_url: data.img_url,
        ces: data.img
      });
    });
  },


  photos: function (e) {
    wxb.fileupload('', function (data) {
      var photos = wxb.that.data.photos;
      var photos_url = wxb.that.data.photos_url;
      console.log(data);
      photos.push(data.img);
      photos_url.push(data.img_url);
      wx.hideLoading();
      wxb.that.setData({
        photos: photos,
        photos_url: photos_url,
      })
    });
  },


  radioChange: function(e){
    console.log(e);
    wxb.that.setData({
      type: e.detail.value,
    })
  },

  fromSubmit: function(e){
    console.log(e);
    var params = e.detail.value;
    console.log(e);
    wx.showLoading({
      title: '正在加载中..',
    });

    wxb.Post('/api/company.store/storeAdd', {
      openid: wxb.getOpenId(),
      code: wxb.getStoreCode(),
      title: params.title,
      company_name: params.company_name,
      sort_name: params.sort_name,
      main_business: params.business,
      logo: wxb.that.data.logo,
      audit_photo: wxb.that.data.ces,
      name: params.contacts,
      tel: params.phone,
      zhiwu: params.zhiwu,
      photos: wxb.that.data.photos,
      detail: params.introduce,
      area_id: wxb.that.data.area_id,
      cat_id: wxb.that.data.cat_id,
      lat: wxb.that.data.lat,
      lng: wxb.that.data.lng,
      addr: wxb.that.data.addr,
      type: wxb.that.data.type,
      bg_year: params.bg_year,
      
    }, function (data) {
      wx.hideLoading();
      wx.showToast({
        title: '发布成功',
      });
      wx.redirectTo({
        url: '/pages/store/index',
      })
    });
  }
})

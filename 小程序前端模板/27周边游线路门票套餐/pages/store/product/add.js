var app = getApp();
var wxb = require('../../../utils/wxb.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    cityinfo:[],
    taocan_type:['套餐','酒店','门票','餐饮','其他'],
    taocan_type_name:'',
    taocan_type_id:0,
    photo: '',
    photo_url: '',
    banner: '',
    banner_url: '',
    photos: [],
    photos_url: [],
    
  },

  taocanType:function(e){
    var type = this.data.taocan_type[e.detail.value];
    this.setData({
      taocan_type_name: type,
      taocan_type_id: parseInt(e.detail.value, '10') + 1,
    });
  },
  uploadphoto: function (e) {
    wxb.globalData = app.globalData; //正确打开巅峰互联的方式
    wxb.that = this;   //正确打开巅峰互联的方式
    wxb.fileupload('', function (data) {
      wxb.that.setData({
        photo_url: data.img_url,
        photo: data.img
      });
    });
  },
  uploadbanner: function (e) {
    wxb.globalData = app.globalData; //正确打开巅峰互联的方式
    wxb.that = this;   //正确打开巅峰互联的方式
    wxb.fileupload('', function (data) {
      wxb.that.setData({
        banner_url: data.img_url,
        banner: data.img
      });
    });
  },
  delele: function (e) {
    var that = this;
    var index = e.target.dataset.index;
    var photos = that.data.photos;
    var newphotos = [];
    for (var a in photos) {
      if (a != index) {
        newphotos.push(photos[a]);
      }
    }
    var photos_url = that.data.photos_url;
    var newphotos_url = [];
    for (var a in photos_url) {
      if (a != index) {
        newphotos_url.push(photos_url[a]);
      }
    }
    that.setData({
      photos: newphotos,
      photos_url: newphotos_url,
    });
  },
  photos: function () {
    wxb.globalData = app.globalData; //正确打开巅峰互联的方式
    wxb.that = this;   //正确打开巅峰互联的方式
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
  formSubmit: function (e) {
    var params = e.detail.value;
    wxb.that = this;   //正确打开巅峰互联的方式
    wxb.globalData = app.globalData; //正确打开巅峰互联的方式
    wx.showLoading({
      title: '正在加载中..',
    });
    wxb.Post('/api/taocan.manage/addTaocan', {
      openid: wxb.getOpenId(),
      code: wxb.getStoreCode(),
      city_id:wxb.that.data.cityinfo.city_id,
      type:wxb.that.data.taocan_type_id,
      taocan_name: params.taocan_name,
      taocan_tel: params.taocan_tel,
      address: params.address,
      usetime: params.usetime,
      service: params.service,
      restrict: params.restrict,
      method: params.method,
      other: params.other,
      plus: params.plus,
      banner: wxb.that.data.banner,
      photo: wxb.that.data.photo,
      photos: wxb.that.data.photos,
    }, function (data) {
      wx.hideLoading();
      wx.showToast({
        title: '发布成功',
      });
      wx.redirectTo({
        url: '/pages/store/product/index',
      })
    });
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  },
  onShow:function(){
    wxb.globalData = app.globalData; //正确打开巅峰互联的方式
    wxb.that = this;   //正确打开巅峰互联的方式
    var cityinfo = wxb.getCity();
    if (cityinfo.city_id != wxb.that.data.cityinfo.city_id) {
      wxb.that.setData({
        cityinfo: cityinfo
      });
    }
  }
})
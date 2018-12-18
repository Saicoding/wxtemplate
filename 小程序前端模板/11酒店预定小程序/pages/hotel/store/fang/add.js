//index.js
//获取应用实例
var app = getApp();
var wxb = require('../../../../utils/wxb.js');
Page({
  data: {
    photos : '',
    bed_type:[],
    bedtypes:[],
    bedtypename:'',
    bedtype_id : 0,
    photo : '',
    is_wifi : 0,
    is_breakfast : 0,

  },
  onLoad: function () {
    this.getBedType();
  },
  getBedType:function(){
    wxb.globalData = app.globalData; //正确打开巅峰互联的方式
    wxb.that = this;   //正确打开巅峰互联的方式
    wxb.Post('/api/hotel.data/getBedType', {
          data:1,
    }, function (data) {
      var bed_type = wxb.that.data.bed_type;
      var bedtypes = wxb.that.data.bedtypes;
      var a = '';
      for( a in data){
        bed_type.push(data[a].type_name)
        bedtypes.push(data[a]);
      }
      wxb.that.setData({
        bed_type: bed_type,
        bedtypes: bedtypes,
      });
    });
  },
  bedType:function(e){
      var type =   this.data.bedtypes[e.detail.value];
      this.setData({
        bedtypename:type.type_name,
        bedtype_id : type.id,
      });
  },
  formBindsubmit:function(e){
   
    wxb.globalData = app.globalData; //正确打开巅峰互联的方式
    wxb.that = this;   //正确打开巅峰互联的方式
    var param_ = this.data;
   var param = e.detail.value;
    wx.showLoading({
      title: '正在加载中..',
    });
    wxb.Post('/api/hotel.manage/setRoom', {
      code: wxb.getStoreCode(),
      openid: wxb.getOpenId(),
      title: param.title,
      area: param.area,
      photo:param_.photo,
      price: param.price,
      appropriate_num: param.appropriate_num,
      bed_type: param_.bedtype_id,
      bed_width: param.bed_width,
      bed_logn: param.bed_logn,
      bed_num: param.bed_num,
      is_wifi: param_.is_wifi,
      is_breakfast: param_.is_breakfast,
      day_num: param.day_num,
       
    }, function (data) {
      wx.hideLoading();
      wx.showToast({
        title: '发布成功',
      });
    });
  },
  upload: function (e) {
    wxb.globalData = app.globalData; //正确打开巅峰互联的方式
    wxb.that = this;   //正确打开巅峰互联的方式
    wxb.fileupload('',function(data){
      wxb.that.setData({
        photos: data.img_url,
        photo : data.img
      });
    });
  },
  wifi:function(e){
     var value =  e.detail.value ? 1 : 0 ;
     this.setData({
       is_wifi : value,
     });
  },
  zaocan:function(e){
    var value = e.detail.value ? 1 : 0;
    this.setData({
      is_breakfast: value,
    });
  },
  delete:function(){
    wxb.that.setData({
      photos: '',
    });
  }

})

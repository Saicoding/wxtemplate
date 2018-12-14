//index.js
//获取应用实例
var app = getApp();
var wxb = require('../../../utils/wxb.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    //价格区间配置
    prices:[
        {id:1,  bgprice:0, endprice:100,  show:'0-100'},
        {id: 2, bgprice: 100, endprice: 200,show: '100-200'},
        { id: 3, bgprice: 200, endprice: 300, show: '200-300'},
        { id: 4, bgprice: 300, endprice: 400, show: '300-400'},
        { id: 5, bgprice: 400, endprice: 600, show: '400-600'},
        { id: 6, bgprice: 600, endprice: 800, show: '600-800'},
        { id:7, bgprice: 800, endprice: 150, show: '800-1500'},
        { id: 8, bgprice: 1500, endprice: 10000, show: '1500以上'},
    ],
    stars:[
      { id: 1, name: '1人'},
      { id: 2, name: '2人' },
      { id: 3, name: '3人' },
      { id: 4, name: '4人' },
      { id: 5, name: '5人' },
      { id: 6, name: '6人' },
      { id: 7, name: '7人' },
      { id: 8, name: '8人' },
      { id: 9, name: '9人' },
      { id: 10, name: '10人' },
      { id: 11, name: '10人以上' },
    ],

    more: 1,
    date: [],
    cityinfo: [],
    //列表数据
    datas:[],
    page:1,//当前显示的页码

    //setting配置项
    settings:[],
    search:[],//这个只是为了显示
    
    wzselect:1, //菜单的切换效果
    service:[
      {id:'is_wifi',name:'免费wifi',select:0},
      { id: 'is_water', name: '全天热水', select: 0 },
      { id: 'is_hairdrier', name: '吹风机', select: 0 },
      { id: 'is_airconditioner', name: '空调', select: 0 },
      { id: 'is_elevator', name: '电梯', select: 0 },
      { id: 'is_fitnessroom', name: '健身房', select: 0 },
      { id: 'is_swimmingpool', name: '游泳池', select: 0 },
      { id: 'is_sauna', name: '桑拿', select: 0 },
      { id: 'is_westernfood', name: '西餐厅', select: 0 },
      { id: 'is_chinesefood', name: '中餐厅', select: 0 },
      { id: 'is_stop', name: '免费停车', select: 0 },
    ],
    //搜索的条件上面的CITYID也为搜索的条件 search作为JSON传递到服务器判断
    price_id:0,
    
    juli:0, //默认距离
    bg_price:0,//开始价格
    end_price:0,//结束价格

    appropriate:0,
    city_id:0,
    scenic_spot_id:0,
    area_id:0,
    administration_id:0,
    station_id:0,
    colleges_id:0,
    hospital_id:0,

    special_id:0,
    brand_id: 0,
    lat:0,
    lng:0,
    order: 1, //排序

    //弹出层的控制
    paixu: 1,
    price: 1,
    weizhi: 1,
    qita: 1,
    dwbg:true,

  },
  more:function(){
    wxb.that.ajax();
  },
  ajax: function () {
    var  serviceSelect = [];
    var  service = wxb.that.data.service;
    for(var a in service){
        if(service[a].select==1){
          serviceSelect.push(service[a].id);
        }
    }

    var servicestr = JSON.stringify(serviceSelect);
    wx.showLoading({
      title: '正在加载中..',
    });
    wxb.Post('/api/minsu.index/index',{
      service: servicestr,
      search: JSON.stringify(wxb.that.data.search),
      juli: wxb.that.data.juli, //默认距离
      bg_price: wxb.that.data.bg_price,//开始价格
      end_price: wxb.that.data.end_price,//结束价格
      appropriate: wxb.that.data.appropriate,
      city_id: wxb.that.data.city_id,
      scenic_spot_id: wxb.that.data.scenic_spot_id,
      area_id: wxb.that.data.area_id,
      administration_id: wxb.that.data.administration_id,
      station_id: wxb.that.data.station_id,
      colleges_id: wxb.that.data.colleges_id,
      hospital_id: wxb.that.data.hospital_id,
      special_id: wxb.that.data.special_id,
      brand_id: wxb.that.data.brand_id,
      order: wxb.that.data.order, //排序
      page:wxb.that.data.page,
      lat:wx.getStorageSync('wxb_lat'),
      lng: wx.getStorageSync('wxb_lng')
    },function(data){
        wx.hideLoading();
        var datas = wxb.that.data.datas;
        if(data.num >0 ){
          for (var a in data.datas){
              datas.push(data.datas[a]);
          }
          wxb.that.setData({
            datas: datas,
            more: data.more,
            page:wxb.that.data.page+1,
          });

        }else{
          if(data.more){
            wxb.that.setData({
              more:data.more,
              page: wxb.that.data.page + 1,
            });
          }
        }
    });
  },
  serviceclick:function(e){
      var id = e.target.dataset.id;
      var service = wxb.that.data.service;
      for (var a in service){
        if (service[a].id==id){
          service[a].select = service[a].select==1?0:1;
          break;
        }
      }
      wxb.that.setData({
        service: service
      });
  },
  specialclick: function (e) {
    wxb.that.setData({
      special_id: e.target.dataset.id
    });
  },
  brandclick: function (e) {
    wxb.that.setData({
      brand_id: e.target.dataset.id
    });
  },
  administrationclick:function(e){
    wxb.that.setData({
      administration_id: e.target.dataset.id
    });
  },
  areaclick: function (e) {
    wxb.that.setData({
       area_id: e.target.dataset.id
    });
  },
  stationclick: function (e) {
    wxb.that.setData({
      station_id: e.target.dataset.id
    });
  },
  scenicclick: function (e) {
    wxb.that.setData({
      scenic_spot_id: e.target.dataset.id
    });
  },
  collegesclick: function (e) {
    wxb.that.setData({
      colleges_id: e.target.dataset.id
    });
  },
  hospitalclick: function (e) {
    wxb.that.setData({
      hospital_id: e.target.dataset.id
    });
  },

  qitaclear:function(){
    var service = wxb.that.data.service;
    for (var a in service) {
        service[a].select = 0;
    }
    wxb.that.setData({
      brand_id:0,
      special_id:0,
      service: service
    });
  },
  qitayes:function(){
    wxb.that.setData({
      qita: 1,
      dwbg: true,
      page: 1,
      datas:[],
      more:0,
    });
    wxb.that.ajax();
  },
  wzclear: function () {
    wxb.that.setData({
      station_id: 0,
      area_id: 0,
      colleges_id: 0,
      hospital_id: 0,
      administration_id: 0,
      scenic_spot_id: 0,
      juli: 0,

    });
  },
  wzyes: function () {
    wxb.that.setData({
      weizhi: 1,
      dwbg: true,
      page: 1,
      datas: [],
      more: 0,
    });
    wxb.that.ajax();
  },


  juliclick:function(e){
    wxb.that.setData({
      juli: e.target.dataset.num
    });
  },
  star:function(e){
      wxb.that.setData({
        appropriate:e.target.dataset.id
      });
  },
  setprice:function(e){
    if(e.target.dataset.id==0){
        wxb.that.setData({
           price_id:0,
           bg_price:0,
           end_price:0,
        });
    }else{
      var prices = wxb.that.data.prices;
      for (var a in prices){
        if (prices[a].id == e.target.dataset.id){
          wxb.that.setData({
            price_id: prices[a].id,
            bg_price: prices[a].bgprice,
            end_price: prices[a].endprice,
          });
          break;
        }
      }
    }
  },
  priceclear:function(){
    wxb.that.setData({
        price_id: 0,
        bg_price: 0,
        end_price:0,
        star_id:0,
    });
  },
  priceyes:function(){
    wxb.that.setData({
      price: 1,
      dwbg: true,
      page:1,
      datas: [],
      more: 0,
    });
    wxb.that.ajax();
  },

  wzselect: function(e){
    wxb.that.setData({
      wzselect:e.target.dataset.select,
    });
  },
  
  dwbg:function(e){
    this.setData({
      paixu: 1,
      price: 1,
      weizhi: 1,
      qita: 1,
      dwbg: true,
    });
  },
  paixu:function(e){
    this.setData({
      paixu:0,
      price: 1,
      weizhi: 1,
      qita: 1,
      dwbg:false,
    });
  },
  price: function (e) {
    this.setData({
      price: 0,
      paixu: 1,
      weizhi: 1,
      qita: 1,
      dwbg: false,
    });
  },
  weizhi: function (e) {
    this.setData({
      weizhi: 0,
      paixu: 1,
      price: 1,
      qita: 1,
      dwbg: false,
    });
  },
  qita: function (e) {
    this.setData({
      qita: 0,
      paixu: 1,
      price: 1,
      weizhi: 1,
      dwbg: false,
    });
  },

  orderclick:function(e){
    wxb.that.setData({
      paixu:1,
      dwbg:true,
      order:e.target.dataset.order,
      page:1,
      datas: [],
      more: 0,
    });
    wxb.that.ajax();
  },

  clearsearch:function(){
    try {
      wx.removeStorageSync('search');
      wxb.that.setData({
        search:[],
        page:1,
        datas: [],
        more: 0,
      });
      wxb.that.ajax();
    } catch (e) {
      wx.showToast({
        image:'/img/kulian.png',
        title: '清楚失败',
      })
    }
  },

  more:function(){
      var page = wxb.that.data.page+1;
      wxb.that.setData({
        page:page
      });
      wxb.that.ajax();
  },

  onLoad:function(options){
      wxb.that = this;   //正确打开巅峰互联的方式
      wxb.globalData = app.globalData; //正确打开巅峰互联的方式 
      wxb.that.setData({
        appropriate: options.appropriate
      });
      var city = wxb.getCity();
      wxb.Post('/api/minsu.data/getSearch', {
        city_id: city.city_id,
      }, function (data) {
        wxb.that.setData({
          settings: data,
        });
      });
  },
  
  onShow:function(options){

    wxb.that = this;   //正确打开巅峰互联的方式
    wxb.globalData = app.globalData; //正确打开巅峰互联的方式

    var bgend = wxb.getBgEndDate();
    if (bgend) {
      wxb.that.setData({
        date: bgend
      });
    }
    var cityinfo = wxb.getCity();
    if (cityinfo.city_id != wxb.that.data.cityinfo.city_id) {
      wxb.that.setData({
        cityinfo: cityinfo,
        city_id: cityinfo.city_id ,
        search:[],
        datas:[],
        more: 0,
        page:1,
      });
      wx.removeStorageSync('search');
      wxb.that.ajax();
    }else{
      var search = wx.getStorageSync('search');
      if (search) {
        var searchobj = JSON.parse(search);
        if (searchobj != wxb.that.data.search) {
          wxb.that.setData({
            search: searchobj,
            page: 1,
            datas: [],
            more: 0,
          
          });
          wxb.that.ajax();
        }

      }
    }
    
  },
  onShareAppMessage: function (res) {
    if (res.from === 'button') {
    }
    return {
      title: '我发现一款不错的预订酒店的小程序',
      path: res.target,
      success: function (res) {
        wx.showToast({
          title: '分享成功',
        });
      },
      fail: function (res) {
        // 转发失败
      }
    }
  }
})
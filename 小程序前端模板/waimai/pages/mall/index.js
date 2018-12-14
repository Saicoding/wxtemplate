var app = getApp();
var wxb = require('../../utils/wxb.js');
Page({
  data: {
    setting:[],
    color: '',
    cat: 0,
    toview: '',
    qijia:0,
    cha:0,
    totalnum:0, //总数量
    total:0,//总价 （商品价格加打包价格）
    totalprice:0,//含配送费用一起的价格
    dabaototal:0,
    peisong:0,
    showcart:true,
    is_online:1,
    coupon:[],
    catlist: [
     

    ],
    
    product:[
      
    ],
  },
  receive: function (e) {
    var activity_id = e.target.dataset.id;
    wx.showLoading({
      title: '正在加载中',
    })
    wxb.Post('/api/user/Receive/', {
      activity_id: activity_id,
      openid: wxb.getOpenId(),
    }, function (data) {
      wx.showToast({
        title: '领取成功！！！',
        duration: 5000,
      })
    });
  },
  jia:function(e){
      var product = wxb.that.data.product;
      var catlist = wxb.that.data.catlist;
      var qijia = wxb.that.data.qijia;
      var peisong = wxb.that.data.peisong;
      var dabaototal = wxb.that.data.dabaototal;
      var total= wxb.that.data.total;
      var totalnum = wxb.that.data.totalnum;
      var id = e.target.dataset.id;
      var cat = e.target.dataset.cat;
      var totalprice = wxb.that.data.totalprice;
      var cha = wxb.that.data.cha;
      var ty = false;
      for(var  a in  product){
        if(product[a].id == id){
          product[a].buynum = product[a].buynum+1;
          product[a].totalprice = Number (Number(product[a].buynum * product[a].price).toFixed(2));
          ty = true;
          dabaototal += product[a].dabao;
          totalnum  += 1;
          total = Number(Number(total + product[a].dabao + product[a].price).toFixed(2));
          console.log(total);
          cha = (qijia - total).toFixed(2);
          if(total > 0){
            totalprice = Number(Number(total + peisong).toFixed(2));
            console.log(totalprice, total, peisong, dabaototal);
          }else{
            totalprice = 0;  
          }
          break;
        }
      }
      if(ty){
          for(var b in catlist){
            if(catlist[b].id == cat){
              catlist[b].num+=1;
              break;
            }
          }
          wxb.that.setData({
            cha: cha,
            total: total,
            totalnum: totalnum,
            dabaototal: dabaototal,
            product: product,
            catlist: catlist,
            totalprice: totalprice,

          });
      }
      

  },
  jian:function(e){
    var product = wxb.that.data.product;
    var catlist = wxb.that.data.catlist;
    var qijia = wxb.that.data.qijia;
    var peisong = wxb.that.data.peisong;
    var dabaototal = wxb.that.data.dabaototal;
    var total = wxb.that.data.total;
    var totalnum = wxb.that.data.totalnum;
    var id = e.target.dataset.id;
    var cat = e.target.dataset.cat;
    var totalprice = wxb.that.data.totalprice;
    var cha = wxb.that.data.cha;
    var ty = false;
    for (var a in product) {
      if (product[a].id == id && product[a].buynum > 0) {
        product[a].buynum = product[a].buynum - 1;
        product[a].totalprice = Number(Number(product[a].buynum * product[a].price).toFixed(2));
        ty = true;
        dabaototal -= product[a].dabao;
        totalnum -= 1;
        total = Number(Number(total -product[a].dabao - product[a].price).toFixed(2));
        cha = (qijia - total).toFixed(2);
        if (total > 0) {
          totalprice = Number(Number(total + peisong).toFixed(2));
        } else {
          totalprice = 0;
        }
        break;
      }
    }
    if (ty) {
      for (var b in catlist) {
        if (catlist[b].id == cat) {
          catlist[b].num -= 1;
          break;
        }
      }
      wxb.that.setData({
        cha: cha,
        total: total,
        totalnum: totalnum,
        dabaototal: dabaototal,
        product: product,
        catlist: catlist,
        totalprice: totalprice,
      });
    }

  },
  showcart:function(e){
    wxb.that.setData({
      showcart: wxb.that.data.showcart ==true?false:true
    });
  },
  cat: function (e) {
    wxb.that.setData({
      cat: e.target.dataset.cat,
      toview: 'cat' + e.target.dataset.cat,
    });
  },
  scroll: function (e) {
    var bt = e.target.offsetTop + e.detail.scrollTop;
    var catlist = wxb.that.data.catlist;
    for(var  a in  catlist){
      if (bt < catlist[a].bottom-10){
        wxb.that.setData({
          cat: catlist[a].id
        });
        break;
      }
    }
  },
  clear:function(){
    var product = wxb.that.data.product;
    var catlist = wxb.that.data.catlist;
    var dabaototal = 0;
    var total = 0;
    var totalnum = 0;
    var totalprice = 0;
    var cha = wxb.that.data.qijia;

    for(var a in  product){
      product[a].buynum = 0;
      product[a].totalprice =0;
    }
    for(var b in catlist){
      catlist[b].num =0;
    }
    wxb.that.setData({
      cha: cha,
      total: total,
      totalnum: totalnum,
      dabaototal: dabaototal,
      product: product,
      catlist: catlist,
      totalprice: totalprice,
      showcart:true
    });
  },

  buy:function(){
      var cha = wxb.that.data.cha;
      if(cha > 0) return false;

      var product = wxb.that.data.product;
     
      var product2 = [];
      for(var a in product){
        if(product[a].buynum > 0){
          product2.push(product[a]);
        }
      }
      var data = {
        product2: product2,
        peisong: wxb.that.data.peisong,
        totalprice: wxb.that.data.totalprice,
        totalnum: wxb.that.data.totalnum,
        dabaototal:wxb.that.data.dabaototal
      };
      var json = JSON.stringify(data);
      wx.setStorageSync('buyproduct',json);
      wx.navigateTo({
        url: '/pages/mall/buy',
      })
  },

  getTop:function(){
      
      var query = wx.createSelectorQuery();
      query.selectAll('.goods_item').boundingClientRect().exec(function (data) {
        var catlist = wxb.that.data.catlist;
        for(var a in data[0]){
            for(var b in catlist){
               if('cat'+catlist[b].id == data[0][a].id){
                 //console.log(data[0][a]);
                 catlist[b].bottom = data[0][a].bottom;
                 break;
               }   
            }
        }
        wxb.that.setData({
          catlist: catlist
        });
      })
  },
  tel:function(){
    if (wxb.that.data.setting.service_tel){
      wx.makePhoneCall({
        phoneNumber: wxb.that.data.setting.service_tel,
      })
    }
  },
  onShow: function () {
    
    wxb.that = this;
    wxb.style();

    var indexClear = wx.getStorageSync('indexClear');
    wx.removeStorageSync('indexClear');
    if (indexClear) {
      wxb.that.clear();
    }

  },
  onLoad: function () {
    wxb.that = this;
    wxb.style();
    if (!wxb.checkAuthLogin(true)) {
      wxb.login();
    }
    wx.showLoading({
      title: '数据加载中',
    })
    wxb.Post('/api/waimai.index/index', {}, function (data) {
      wx.hideLoading();
      console.log(data.setting);
      wxb.that.setData({
        qijia: data.setting.qijia,
        cha: data.setting.qijia,
        peisong: data.setting.peisong,
        is_online: data.setting.is_online,
        catlist: data.cats,
        product: data.products,
        coupon: data.activity
      });
      setTimeout(function () {
        wxb.that.getTop();
      }, 2000);

    });

  },
  onShareAppMessage: function (res) {
    if (res.from === 'button') {
      // 来自页面内转发按钮
  
    }
    return {
      title: '开饭啦',
      path: '/page/mall/index',
      success: function (res) {
        // 转发成功
      },
      fail: function (res) {
        // 转发失败
      }
    }
  }



})
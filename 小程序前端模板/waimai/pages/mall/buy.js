//index.js
//获取应用实例
var app = getApp();
var wxb = require('../../utils/wxb.js');
Page({
  data: {
    color: '',
    peisong:0,
    product:[],
    addr:[],
    totalprice:0,
    totalnum:0,
    dabaototal:0,
    needpay:0,
    coupon_id:0,
    coupon_money:0,
  },
  coupon:function(){
      wx.redirectTo({
        url: '/pages/coupon/index?money='+wxb.that.data.totalprice,
      })
  },

  order:function(){
    var address_id = wxb.that.data.addr.address_id ? wxb.that.data.addr.address_id:0;
    var coupon_id = wxb.that.data.coupon_id; 
    var product = wxb.that.data.product;
    if(!address_id){
      wx.showToast({
        image: '/img/kulian.png',
        title: '请选择联系地址',
      })
    }else if(!product){
      wx.showToast({
        image: '/img/kulian.png',
        title: '购买商品不能为空',
      })
    }else{
      var data = {
        coupon_id: wxb.that.data.coupon_id,
        address_id: address_id,
        product: JSON.stringify(product),
        openid:wxb.getOpenId(),
      };
      wxb.Post('/api/waimai.order/create',data,function(res){

            wx.requestPayment({
              timeStamp: res.order.timeStamp,
              nonceStr: res.order.nonceStr,
              package: res.order.package,
              signType: res.order.signType,
              paySign: res.order.paySign,
              complete:function(){
                wx.removeStorageSync('buyproduct');
                wx.removeStorageSync('wxb_use_hongbao_id');
                wx.removeStorageSync('wxb_use_hongbao_money');
                wx.removeStorageSync('wxbaddr');
                wx.setStorageSync('indexClear',1);
                  wx.redirectTo({
                    url: '/pages/member/detail?id='+res.order_id,
                  })
              },
            })

      });
    } 
  },

  onShow:function(){
    wxb.that = this;
    wxb.style();
    var data = wx.getStorageSync('buyproduct');
    if(!data){
      wx.showToast({
        image:'/img/kulian.png',
        title: '请选择商品再操作',
        success:function(){
          setTimeout(function(){
            var page = getCurrentPages();
            wx.navigateBack({
              delta: page.length - 1,
            })
          },100);
        }
      })
    }else{
        var data = JSON.parse(data);
        console.log(data);
        wxb.that.setData({
          totalprice: data.totalprice,
          totalnum: data.totalnum,
          peisong: data.peisong,
          dabaototal: data.dabaototal,
          product: data.product2,
          needpay: data.totalprice,
        });
        var coupon_id = wx.getStorageSync('wxb_use_hongbao_id');
        var coupon_money = wx.getStorageSync('wxb_use_hongbao_money');
        if (coupon_id && coupon_money){
        
          wxb.that.setData({
            coupon_id: coupon_id,
            coupon_money: coupon_money,
            needpay: Number(Number(data.totalprice - Number(coupon_money)).toFixed(2))
          });
        }
    }

    var addrjson = wx.getStorageSync('wxbaddr');
    if(addrjson){
        var addr = JSON.parse(addrjson);
        wxb.that.setData({
          addr:addr
        });
    } else{
      wxb.Post('/api/user/getDefault',{
        openid: wxb.getOpenId()
      },function(data){
          if(data!=''){
            wxb.that.setData({
              addr: data
            });
          }
      });
    } 
  }, 


  
  onLoad: function () {
    wxb.that = this;
    wxb.style();
    if (!wxb.checkAuthLogin(true)) {
      wxb.login();
    }
    
  }
})

// pages/member/index.js
var app = getApp();
var wxb = require('../../../utils/wxb.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    color: '',

    name: '',//姓名
    sex: '',//性别
    birthday: '',//出生日期
    census_register: '',//户口
    residence: '',//现居住地
    workingyears: '',//开始工作年份
    salary: '',//月薪
    mobile: '', //手机号码
    emal: '',//邮箱
    qq: '',//QQ
    relative_tel: '',//亲友电话
    id_card: '',//身份证
    marriage_id: '', //婚姻状况
    politicalstatus_id: '',//政治面貌
    height: '',//身高

    politicalstatus: [],//政治面貌
    pArray: [],

    marriage: [], //婚姻状况
    mArray: [],

    sexs: ['男', '女'],
    sArrays: [{ id: 1, name: '男' }, { id: 2, name: '女' }],
    datas: [],
  },

  onShow: function () {
    wxb.that = this;
  },

  /**
   * 获取基础配置信息
   */
  getConfigInfo: function (e) {
    wxb.Post('/api/job.data/getdatas', {

    }, function (data) {

      var index = 0;
      var array = wxb.that.data.pArray;
      for (index in data.politicalstatus) {
        array.push(data.politicalstatus[index].name);
      }

      var index2 = 0;
      var array2 = wxb.that.data.mArray;
      for (index2 in data.marriage) {
        array2.push(data.marriage[index2].name);
      }


      wxb.that.setData({
        pArray: array,
        mArray: array2,

        politicalstatus: data.politicalstatus,
        marriage: data.marriage,
      });
    });
  },

  /**
   * 性别选择
   */
  bindSexChange: function (e) {
    wxb.that.setData({
      index: e.detail.value,
      sex: wxb.that.data.sArrays[e.detail.value].id,
    });
  },

  /**
   * 出生日期选择
   */
  bindDateChange: function (e) {
    wxb.that.setData({
      birthday: e.detail.value,
    });
  },

  /**
   * 开始工作日期
   */
  bindWDateChange: function (e) {
    wxb.that.setData({
      workingyears: e.detail.value,
    });
  },

  /**
   * 政治面貌
   */
  bindPolPickerChange: function (e) {
    wxb.that.setData({
      pIndex: e.detail.value,
      politicalstatus_id: wxb.that.data.politicalstatus[e.detail.value].id,
    });

    console.log("政治面貌Id：" + wxb.that.data.politicalstatus_id);
  },

  /**
   * 婚姻状况
   */
  bindMarrPickerChange: function (e) {
    wxb.that.setData({
      mIndex: e.detail.value,
      marriage_id: wxb.that.data.marriage[e.detail.value].id,
    });

    console.log("婚姻状况Id：" + wxb.that.data.marriage_id);
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



    this.getConfigInfo();

    this.getBaseInfo();
  },


  /**
   * 获取基本信息
   */
  getBaseInfo: function (e) {
    wxb.Post('/api/job.member/getBasic', {
      openid: wxb.getOpenId(),
    }, function (data) {

      wxb.that.setData({
        datas: data,
        workingyears: data.workingyears,//开始工作年份
        birthday: data.birthday,//出生日期

        marriage_id: data.marriage_id, //婚姻状况
        politicalstatus_id: data.politicalstatus_id,

        index: data.sex - 1,
        sex: wxb.that.data.sArrays[data.sex - 1].id,

        // name: data.name,//姓名
        // sex: data.sex,//性别
        // birthday: data.birthday,//出生日期
        // census_register: data.census_register,//户口
        // residence: data.residence,//现居住地
        // workingyears: data.workingyears,//开始工作年份
        // salary: data.salary,//月薪
        // mobile: data.mobile, //手机号码
        // emal: data.emal,//邮箱
        // qq: data.qq,//QQ
        // relative_tel: data.relative_tel,//亲友电话
        // id_card: data.id_card,//身份证
        // marriage_id: data.marriage_id, //婚姻状况
        // politicalstatus_id: data.politicalstatus_id,//政治面貌
        // height: data.height,//身高
      });


      for (var index in wxb.that.data.marriage) {
        if (wxb.that.data.marriage[index].id == data.marriage_id) {
          wxb.that.setData({
            mIndex: index,
          });
        }
      }

      for (var index in wxb.that.data.politicalstatus) {
        if (wxb.that.data.politicalstatus[index].id == data.politicalstatus_id) {
          wxb.that.setData({
            pIndex: index,
          });
        }
      }
    });
  },


  creatBaseInfo: function (e) {

    var param = e.detail.value;
    wx.showLoading({
      title: '提交中',
    })

    wxb.Post('/api/job.member/setBasic', {
      openid: wxb.getOpenId(),
      name: param.name,//姓名
      sex: wxb.that.data.sex,//性别
      birthday: wxb.that.data.birthday,//出生日期
      census_register: param.census_register,//户口
      residence: param.residence,//现居住地
      workingyears: wxb.that.data.workingyears,//开始工作年份
      salary: param.salary,//月薪
      mobile: param.mobile, //手机号码
      emal: param.emal,//邮箱
      qq: param.qq,//QQ
      relative_tel: param.relative_tel,//亲友电话
      id_card: param.id_card,//身份证
      marriage_id: wxb.that.data.marriage_id, //婚姻状况
      politicalstatus_id: wxb.that.data.politicalstatus_id,//政治面貌
      height: param.height,//身高
    }, function (data) {
      wx.hideLoading();
      wx.navigateBack({

      })
    })

  }
})
var app = getApp();
var wxb = require('../../utils/wxb.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    color: '',

    title: '',//职位名称
    name: '',//联系人
    tel: '',//联系电话
    people_num: '',

    experience_id: '',//经验Id
    education_id: '',//学历Id
    salary_id: '', //月薪Id

    is_eat: 0,//是否包吃
    is_live: 0, //是否包住
    is_weekend: 0, //是否双休
    is_overtime: 0, //是否有加班补助
    is_vehicle: 0, //是否有班车接送
    is_bus: 0, //是否交通补助
    is_meal: 0, //是否饭补
    is_phone: 0, //是否话补
    is_room: 0, //是否房补
    is_festival: 0,//是否节日福利
    is_wuxian: 0, //是否五险
    is_mpf: 0, //是否公积金
    is_bonus: 0, //是否年终奖
    is_newyear: 0, //是否带薪年假
    is_healthy: 0, //是否健康体检
    is_tourism: 0, //是否旅游奖励
    is_train: 0, //是否培训学习
    is_shares: 0, //是否股权

    is_ji: 0, //是否急招

    sArray: [],//待遇
    jArray: [],//经验
    xArray: [],//学历

    salarys: [],
    experience: [],
    education: [],

    job_id: 0,

    datas: [],

  },

  onShow: function () {
    wxb.that = this;
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (e) {
    wxb.that = this;
    wxb.style();

    wxb.globalData = app.globalData; //正确打开巅峰互联的方式
    if (!wxb.checkAuthLogin(true)) {
      wxb.login();
    }

    this.getConfigInfo();

    wxb.that.setData({
      job_id: e.job_id,
    });

    if (e.job_id>0){
      this.getJobDetial();
    }
  },

  /**
   * 获取Job详情
   */
  getJobDetial: function(e){
    wx.showLoading({
      title: '加载中',
    })

    wxb.Post('/api/job.manage/jobDetail', {
      openid: wxb.getOpenId(),
      job_id: wxb.that.data.job_id,
    }, function (data) {
      wx.hideLoading();

      for (var index in wxb.that.data.salarys){
        if (wxb.that.data.salarys[index].id == data.salary_id){
          wxb.that.setData({
            sIndex: index,
          });
        }
      }
      
      for (var index in wxb.that.data.experience) {
        if (wxb.that.data.experience[index].id == data.experience_id) {
          wxb.that.setData({
            jIndex: index,
          });
        }
      }

      for (var index in wxb.that.data.education) {
        if (wxb.that.data.education[index].scale_id == data.education_id) {
          wxb.that.setData({
            xIndex: index,
          });
        }
      }

      wxb.that.setData({
        datas: data,
        title: data.title,
        people_num: data.people_num,
        name: data.name,
        tel: data.tel,
        describe: data.describe,
        is_eat: data.is_eat,//是否包吃
        is_live: data.is_live, //是否包住
        is_weekend: data.is_weekend, //是否双休
        is_overtime: data.is_overtime, //是否有加班补助
        is_vehicle: data.is_vehicle, //是否有班车接送
        is_bus: data.is_bus, //是否交通补助
        is_meal: data.is_meal, //是否饭补
        is_phone: data.is_phone, //是否话补
        is_room: data.is_room, //是否房补
        is_festival: data.is_festival,//是否节日福利
        is_wuxian: data.is_wuxian, //是否五险
        is_mpf: data.is_mpf, //是否公积金
        is_bonus: data.is_bonus, //是否年终奖
        is_newyear: data.is_newyear, //是否带薪年假
        is_healthy: data.is_healthy, //是否健康体检
        is_tourism: data.is_tourism, //是否旅游奖励
        is_train: data.is_train, //是否培训学习
        is_shares: data.is_shares, //是否股权
        is_ji: data.is_ji, //是否急招

        experience_id: data.experience_id,//经验Id
        education_id: data.education_id,//学历Id
        salary_id: data.salary_id, //月薪Id
      });
    });
  },

  /**
   * 获取基础配置信息
   */
  getConfigInfo: function (e) {
    wxb.Post('/api/job.data/getdatas', {

    }, function (data) {
      //待遇
      var index = 0;
      var array = wxb.that.data.sArray;
      for (index in data.salary) {
        array.push(data.salary[index].name);
      }

      //经验
      var index2 = 0;
      var array2 = wxb.that.data.jArray;
      for (index2 in data.experience) {
        array2.push(data.experience[index2].name);
      }

      //学历
      var index3 = 0;
      var array3 = wxb.that.data.xArray;
      for (index3 in data.education) {
        array3.push(data.education[index3].scale_name);
      }


      wxb.that.setData({
        sArray: array,
        jArray: array2,
        xArray: array3,

        salarys: data.salary,
        experience: data.experience,
        education: data.education,
      });
    });
  },

  /**
   * 添加工作职位
   */
  addJobTitle: function (e) {
    var params = e.detail.value;
    wx.showLoading({
      title: '提交中..',
    });
    wxb.Post('/api/job.manage/addJob', {
      openid: wxb.getOpenId(),
      job_id: wxb.that.data.job_id,
      title: params.title,
      people_num: params.people_num,
      name: params.name,
      tel: params.tel,
      describe: params.describe,
      is_eat: wxb.that.data.is_eat,//是否包吃
      is_live: wxb.that.data.is_live, //是否包住
      is_weekend: wxb.that.data.is_weekend, //是否双休
      is_overtime: wxb.that.data.is_overtime, //是否有加班补助
      is_vehicle: wxb.that.data.is_vehicle, //是否有班车接送
      is_bus: wxb.that.data.is_bus, //是否交通补助
      is_meal: wxb.that.data.is_meal, //是否饭补
      is_phone: wxb.that.data.is_phone, //是否话补
      is_room: wxb.that.data.is_room, //是否房补
      is_festival: wxb.that.data.is_festival,//是否节日福利
      is_wuxian: wxb.that.data.is_wuxian, //是否五险
      is_mpf: wxb.that.data.is_mpf, //是否公积金
      is_bonus: wxb.that.data.is_bonus, //是否年终奖
      is_newyear: wxb.that.data.is_newyear, //是否带薪年假
      is_healthy: wxb.that.data.is_healthy, //是否健康体检
      is_tourism: wxb.that.data.is_tourism, //是否旅游奖励
      is_train: wxb.that.data.is_train, //是否培训学习
      is_shares: wxb.that.data.is_shares, //是否股权
      is_ji: wxb.that.data.is_ji, //是否急招
      experience_id: wxb.that.data.experience_id,//经验Id
      education_id: wxb.that.data.education_id,//学历Id
      salary_id: wxb.that.data.salary_id, //月薪Id
    }, function (data) {
      wx.hideLoading();
      wx.redirectTo({
        url: '/pages/store/addzw',
      })
    });
  },

  /**
   * 待遇(月薪)
   */
  bindSalPickerChange: function(e){
    wxb.that.setData({
      sIndex: e.detail.value,
      salary_id: wxb.that.data.salarys[e.detail.value].id,
    });
  },


  /**
   * 学历
   */
  bindEduPickerChange: function (e) {
    wxb.that.setData({
      xIndex: e.detail.value,
      education_id: wxb.that.data.education[e.detail.value].scale_id,
    });
  },

  /**
   * 经验
   */
  bindExpPickerChange: function (e) {
    wxb.that.setData({
      jIndex: e.detail.value,
      experience_id: wxb.that.data.experience[e.detail.value].id,
    });
  },


  //是否包吃
  switchChange_01: function(e){
    wxb.that.setData({
      is_eat: e.detail.value,
    });
  },

  //是否包住
  switchChange_02: function (e) {
    wxb.that.setData({
      is_live: e.detail.value,
    });
  },

  //是否双休
  switchChange_03: function (e) {
    wxb.that.setData({
      is_weekend: e.detail.value,
    });
  },

  //是否有加班补助
  switchChange_04: function (e) {
    wxb.that.setData({
      is_overtime: e.detail.value,
    });
  },

  //是否有班车接送
  switchChange_05: function (e) {
    wxb.that.setData({
      is_vehicle: e.detail.value,
    });
  },

  //是否交通补助
  switchChange_06: function (e) {
    wxb.that.setData({
      is_bus: e.detail.value,
    });
  },

  //是否饭补
  switchChange_07: function (e) {
    wxb.that.setData({
      is_meal: e.detail.value,
    });
  },

  //是否话补
  switchChange_08: function (e) {
    wxb.that.setData({
      is_phone: e.detail.value,
    });
  },

  //是否房补
  switchChange_09: function (e) {
    wxb.that.setData({
      is_room: e.detail.value,
    });
  },

  //是否节日福利
  switchChange_10: function (e) {
    wxb.that.setData({
      is_festival: e.detail.value,
    });
  },

  //是否五险
  switchChange_11: function (e) {
    wxb.that.setData({
      is_wuxian: e.detail.value,
    });
  },

  //是否公积金
  switchChange_12: function (e) {
    wxb.that.setData({
      is_mpf: e.detail.value,
    });
  },

  //是否年终奖
  switchChange_13: function (e) {
    wxb.that.setData({
      is_bonus: e.detail.value,
    });
  },

  //是否带薪年假
  switchChange_14: function (e) {
    wxb.that.setData({
      is_newyear: e.detail.value,
    });
  },

  //是否健康体检
  switchChange_15: function (e) {
    wxb.that.setData({
      is_healthy: e.detail.value,
    });
  },

  //是否旅游奖励
  switchChange_16: function (e) {
    wxb.that.setData({
      is_tourism: e.detail.value,
    });
  },

  //是否培训学习
  switchChange_17: function (e) {
    wxb.that.setData({
      is_train: e.detail.value,
    });
  },

 //是否股权
  switchChange_18: function (e) {
    wxb.that.setData({
      is_shares: e.detail.value,
    });
  },

  //是否急招
  switchChange_19: function (e) {
    wxb.that.setData({
      is_ji: e.detail.value,
    });
  },
})
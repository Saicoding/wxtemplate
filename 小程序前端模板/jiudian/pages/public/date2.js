var app = getApp();

var n_time;
var r_year;
var r_month;
var r_date;
var n_time_riqi;
var r_fount_month = 6;
var dayIndex = 0;
function getDay(time, x) {
  var t_time = new Date(time);
  var t_year = t_time.getFullYear();
  var t_month = t_time.getMonth() + 1;
  t_month = t_month.toString();
  if (t_month.length == 1) {
    t_month = "0" + t_month;
  }
  var t_date = t_time.getDate();
  var t_date1 = t_date;
  t_date1 = t_date1.toString();
  if (t_date1.length == 1) {
    t_date1 = "0" + t_date;
  }
  var t_day = t_time.getDay();
  if (x == 1) {
    return t_date;
  } else if (x == 2) {
    return t_day;
  } else if (x == 3) {
    return t_month + "月" + t_date1 + "日";
  } else {
    return t_year + "-" + t_month + "-" + t_date1;
  }
}

function getDate(num, day, time, today) {
  var date = [];
  for (var i = 0; i < day; i++) {
    date.push({
      type: 0,
      day1: 0,
      day2: 0,
      select: 0,
      today: 0,
      dayIndex: dayIndex
    });
    dayIndex++;
  }
  if (today) {
    for (var j = 0; j <= ((parseInt(num / 7) + 1) * 7); j++) {
      if (j < today - 1) {
        date.push({
          type: 0,
          day1: getDay(time + 86400000 * j),
          day2: getDay(time + 86400000 * j, 1),
          day3: getDay(time + 86400000 * j, 3),
          select: 0,
          today: 0,
          dayIndex: dayIndex
        });
      } else if (j == today - 1) {
        date.push({
          type: 1,
          day1: getDay(time + 86400000 * j),
          day2: getDay(time + 86400000 * j, 1),
          day3: getDay(time + 86400000 * j, 3),
          select: 0,
          today: 1, //今天
          dayIndex: dayIndex
        });
      } else if (j > today - 1 && j < num) {
        date.push({
          type: 1,
          day1: getDay(time + 86400000 * j),
          day2: getDay(time + 86400000 * j, 1),
          day3: getDay(time + 86400000 * j, 3),
          select: 0,
          today: 0,
          dayIndex: dayIndex
        });
      } else {
        date.push({
          type: 0,
          day1: 0,
          day2: 0,
          day3: 0,
          select: 0,
          today: 0,
          dayIndex: dayIndex
        });
      }
      dayIndex++;
    }
  } else {
    for (var j = 0; j <= ((parseInt(num / 7) + 1) * 7); j++) {
      var local = [];
      if (j < num) {
        date.push({
          type: 1,
          day1: getDay(time + 86400000 * j),
          day2: getDay(time + 86400000 * j, 1),
          day3: getDay(time + 86400000 * j, 3),
          select: 0,
          today: 0,
          dayIndex: dayIndex
        });
      } else {
        date.push({
          type: 0,
          day1: 0,
          day2: 0,
          day3: 0,
          select: 0,
          today: 0,
          dayIndex: dayIndex
        });
      }
      dayIndex++;
    }
  }
  return date;
}

function getMonthDate() {
  var datelist = [];
  var day, month;

  //初始化数据
  n_time = new Date();
  r_year = n_time.getFullYear();
  r_month = n_time.getMonth() + 1;
  r_date = n_time.getDate();
  n_time_riqi = r_year + "-" + r_month + "-" + r_date;
  dayIndex = 0;
  for (var z = 0; z < r_fount_month; z++) {
    var r_day = new Date(r_year + "/" + r_month + "/" + "1").getDay();  //获得本月一号的星期
    var n_time_s = new Date(r_year + "/" + r_month + "/" + "1").getTime();  //获得本月一号的毫秒数
    if (r_month == 12) {
      var n_time_date = new Date(new Date(r_year + 1 + "/1/1").getTime() - 86400000).getDate();  //获得本月的天数
    } else {
      var n_time_date = new Date(new Date(r_year + "/" + parseInt(r_month + 1) + "/" + "1").getTime() - 86400000).getDate();  //获得本月的天数
    }

    month = r_year + '/' + r_month;
    if (z == 0) {
      day = getDate(n_time_date, r_day, n_time_s, r_date);
    } else {
      day = getDate(n_time_date, r_day, n_time_s);
    }
    datelist.push({
      month: month,
      day: day,
    });
    if (r_month == 12) {
      r_month = 1;
      r_year++;
    } else {
      r_month++;
    }
  }
  return datelist;
}

var app = getApp();
var wxb = require('../../utils/wxb.js');

Page({


  data: {
    date: [],
    totalmonth: 5,//总共多少个月
    bgindex: 0,
    endindex: 0,
    bg_date: '',
    end_date: '',
    bg_date1: '',
    end_date1: '',
    day: 0, //一共几天
    day2: 0, //一共几晚
    id :0,
    type:'',
  },

  onLoad: function (options) {
    var that = this;
    wxb.style();
    r_fount_month = that.data.totalmonth;
    var monthdate = getMonthDate();
    console.log(monthdate);
    that.setData({
      date: monthdate,
      bgindex: 0,
      endindex: 0,
      id: options.id,
      type: options.type ? options.type : ''
    });
  },
  DateDiff: function (sDate1, sDate2) {
    var aDate, oDate1, oDate2, iDays;
    aDate = sDate1.split("-");
    oDate1 = new Date(aDate[0] + '-' + aDate[1] + '-' + aDate[2]);
    aDate = sDate2.split("-");
    oDate2 = new Date(aDate[0] + '-' + aDate[1] + '-' + aDate[2]);

    iDays = parseInt(Math.abs(oDate1 - oDate2) / 1000 / 60 / 60 / 24);
    console.log(oDate1);
    console.log(oDate2);
    console.log(oDate1 - oDate2);
    console.log(Math.abs(oDate1 - oDate2));

    return iDays;
  }
  ,
  dayClick: function (e) {
    var that = this;
    //console.log(e);
    //console.log(this.data.date);
    var index = e.target.dataset.in;
    var type = e.target.dataset.type;
    if (type == 0) return;
    var bgindex = that.data.bgindex;
    var endindex = that.data.endindex;
    var bgdate = that.data.bg_date;
    var enddate = that.data.end_date;
    var bgdate1 = that.data.bg_date1;
    var enddate1 = that.data.end_date1;
    var date = that.data.date;
    if (endindex == index || bgindex == index) return; //这时候不用处理
    //重新选择时间
    if (bgindex == 0 && endindex == 0) {
      bgindex = index;
      for (var a in date) {
        for (var j in date[a].day) {
          if (date[a].day[j].dayIndex == index) {
            date[a].day[j].select = 1;
            bgdate = date[a].day[j].day1;
            bgdate1 = date[a].day[j].day3;
          } else {
            date[a].day[j].select = 0;
          }
        }
      }

    } else if (endindex == 0) {
      if (bgindex > index) {
        bgindex = index;
        for (var a in date) {
          for (var j in date[a].day) {
            if (date[a].day[j].dayIndex == index) {
              date[a].day[j].select = 1;
              bgdate = date[a].day[j].day1;
              bgdate1 = date[a].day[j].day3;
            } else {
              date[a].day[j].select = 0;
            }
          }
        }
        endindex = 0;
        enddate = '';
      } else {
        endindex = index;
        for (var a in date) {
          for (var j in date[a].day) {

            if (date[a].day[j].dayIndex == index) {
              date[a].day[j].select = 2;
              enddate = date[a].day[j].day1;
              enddate1 = date[a].day[j].day3;
            } else if (bgindex == date[a].day[j].dayIndex) {
              date[a].day[j].select = 1;
            } else if ((date[a].day[j].dayIndex < endindex) && (date[a].day[j].dayIndex > bgindex)) {
              date[a].day[j].select = 3;
            } else {
              date[a].day[j].select = 0;
            }
          }
        }
      }
    } else {
      if (index < bgindex || index > endindex) { //重新选择
        bgindex = index;
        console.log(index);
        for (var a in date) {
          for (var j in date[a].day) {
            if (date[a].day[j].dayIndex == index) {
              console.log(date[a].day[j]);
              date[a].day[j].select = 1;
              bgdate = date[a].day[j].day1;
              bgdate1 = date[a].day[j].day3;
            } else {
              date[a].day[j].select = 0;
            }
          }
        }
        enddate = '';
        endindex = 0;
      } else if (index > bgindex && index < endindex) { //endindex重新选择了
        endindex = index;
        for (var a in date) {
          for (var j in date[a].day) {
            if (date[a].day[j].dayIndex == index) {
              date[a].day[j].select = 2;
              enddate = date[a].day[j].day1;
              enddate1 = date[a].day[j].day3;
            } else if (bgindex == date[a].day[j].dayIndex) {
              date[a].day[j].select = 1;
            } else if ((date[a].day[j].dayIndex < endindex) && (date[a].day[j].dayIndex > bgindex)) {
              date[a].day[j].select = 3;
            } else {
              date[a].day[j].select = 0;
            }
          }
        }
      }
    }



    var day = 0;
    if (enddate && bgdate) {
      day = this.DateDiff(enddate, bgdate);
    }
    that.setData({
      bgindex: bgindex,
      endindex: endindex,
      date: date,
      day: day + 1,
      day2: day,
      end_date: enddate,
      bg_date: bgdate,
      end_date1: enddate1,
      bg_date1: bgdate1,
    });

    //console.log(e);
  },
  submit: function () {
    var dateinfo = {
      day: this.data.day,
      day2: this.data.day2,
      end_date: this.data.end_date,
      bg_date: this.data.bg_date,
      end_date1: this.data.end_date1,
      bg_date1: this.data.bg_date1,
    };
    var dateinfo2 = JSON.stringify(dateinfo);
    wx.setStorageSync('wxb_bg_end_date', dateinfo2);
    if(this.data.type == ''){
        wx.redirectTo({
          url: '/pages/hotel/hotel/detail?id=' + this.data.id,
        })
    }
    if(this.data.type == 'buy'){
      wx.redirectTo({
        url: '/pages/hotel/hotel/buy?id=' + this.data.id,
      })
    }
   
  }
})


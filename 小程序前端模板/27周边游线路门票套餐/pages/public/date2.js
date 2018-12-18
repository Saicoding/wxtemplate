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
  var t_week = t_time.getDay();
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
  } else if( x == 3) {
    return   t_month + "-" + t_date1;
  } else if (x == 4) {
    return t_week ;
  }else {
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
          day4: getDay(time + 86400000 * j, 4),
          select: 0,
          today: 0,
          dayIndex: dayIndex
        });
      } else if (j == today - 1) {
        date.push({
          type: 1,
          day1: getDay(time + 86400000 * j),
          day2: getDay(time + 86400000 * j, 1),
          day3: getDay(time + 86400000 * j,3),
          day4: getDay(time + 86400000 * j, 4),
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
          day4: getDay(time + 86400000 * j, 4),
          select: 0,
          today: 0,
          dayIndex: dayIndex
        });
      } else {
        date.push({
          type: 0,
          day1: 0,
          day2: 0,
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
          day4: getDay(time + 86400000 * j, 4),
          select: 0,
          today: 0,
          dayIndex: dayIndex
        });
      } else {
        date.push({
          type: 0,
          day1: 0,
          day2: 0,
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

Page({


  data: {


    date: [],
    totalmonth: 5,//总共多少个月
    select:[],
    type:'',
    id:0,
  },

  onLoad: function (options) {
    var that = this;
    r_fount_month = that.data.totalmonth;
    var monthdate = getMonthDate();
    that.setData({
      date: monthdate,
      bgindex: 0,
      endindex: 0,
      type:options.type,
      id: options.id,
    });
  },

  dayClick: function (e) {
    var that = this;
    var date = that.data.date;
    var type = e.target.dataset.type;
    if (type == 0) return;
    var index = e.target.dataset.in;
    var select = [];

    for (var a in date) {
      for (var j in date[a].day) {
        if (date[a].day[j].dayIndex == index) {
          date[a].day[j].select = 1;
          select = date[a].day[j];
        } else {
          date[a].day[j].select = 0;
        }
      }
    }
    that.setData({
      date: date,
      select: select
    });
    console.log(select);
    //然后这里处理返回的逻辑  
    var dateinfo = {
       day1: select.day1,
       day2: select.day2,
       day3: select.day3,
       day4:select.day4,
    };
    var dateinfo2 = JSON.stringify(dateinfo);
    wx.setStorageSync('wxb_day', dateinfo2);
    var typse = this.data.type;
    if (typse == 1) {
      wx.redirectTo({
        url: "/pages/tuan/detail?taocan_id=" + this.data.id  ,
      })
    }
  }
})


const weatherMap = {
  '多云': { name: 'cloudy', color: '#deeef6'},
  '阴': {
    name: 'overcast', color: '#c6ced2'},
  '小雨': {
    name: 'lightrain', color: '#bdd5e1'},
  '阵雨': {
    name: 'lightrain', color: '#bdd5e1'},
  '中雨': {
    name: 'lightrain', color: '#bdd5e1'},
  '大雨': {
    name: 'lightrain', color: '#bdd5e1'},
  '雨': {
    name: 'lightrain', color: '#bdd5e1'},
  '雷阵雨': {
    name: 'heavyrain', color: '#c5ccd0'},
  '晴': {
    name: 'sunny', color: '#cbeefd'}
};

var app = getApp();
//get app.dailyForecast;

var hourlyForecast = [];
var location = '';

Page({
  data: {
    nowWeather: {
      temp: '',
      weather: '',
      weather_bg: ''
    },
    todayWeather: {
      date: '',
      temp_day: '',
      temp_night: '',
      weather: ''
    },
    hourlyForecast: [],
    dailyForecast: []
  },

  onLoad() {
    this.getWeather();
  },

  onPullDownRefresh() {
    this.getWeather(() => { wx.stopPullDownRefresh(); });
  },

  onTapDayWeather() {
    wx.showToast({
      title: 'hello!',
    })
  },

  // 根据地区请求并设置天气信息
  getWeather(callback) {
    wx.request({
      // 发起天气查询请求
      // 请求参数：地区、Key、n7(是否需要七天天气预报：1为需要)
      // 接口来自数据智汇
      url: 'http://api.shujuzhihui.cn/api/weather/area',
      data: { 
        area: '深圳',
        appKey: '1763537ee6164e4a96086f2cfc18e459',
        n7: 1
      },
      method: 'GET',

      // 请求成功后，设置当前天气、今日天气、24小时天气预报及7天天气预报
      // 返回参数：
      // real -> 当前天气；
      // h3 -> 24小说天气预报；
      // today -> 今日天气；
      // n7 -> 七日天气预报；
      success: res => {
        let result = res.data.RESULT.weatherInfo;
        console.log(result);
        this.setNowWeather(result.real);
        this.setHourlyForecast(result.h3);
        this.setTodayWeather(result.today);
        this.setDailyForecast(result.n7);
      },

      // 请求完成后，停止下拉刷新
      complete: () => {
        callback && callback();
      }
    });
  },

  setNowWeather(real) {
    let weather_bg = '/images/' + weatherMap[real.weather].name + '-bg.png';
    this.setData({
      'nowWeather.temp': real.tem,
      'nowWeather.weather': real.weather,
      'nowWeather.weather_bg': weather_bg
    });

    // 根据当前天气设置顶栏颜色
    wx.setNavigationBarColor({
      frontColor: '#000000',
      backgroundColor: weatherMap[real.weather].color,
    });
  },

  setHourlyForecast(h3) {
    hourlyForecast = [];
    for (const hours of h3) {
      let weather_icon = '/images/' + weatherMap[hours.weather].name + '-icon.png';
      hourlyForecast.push({
        time: hours.time,
        icon: weather_icon,
        temp: hours.tem
      });
    }
    console.log(hourlyForecast);
    this.setData({
      hourlyForecast: hourlyForecast
    });
  },

  setTodayWeather(today) {
    this.setData({
      'todayWeather.date': today.date,
      'todayWeather.temp_day': today.tem_day,
      'todayWeather.temp_night': today.tem_night
    });
  },

  setDailyForecast(n7) {
    app.dailyForecast = n7;
  }
});

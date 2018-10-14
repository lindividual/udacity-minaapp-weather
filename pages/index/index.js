const weatherMap = {
  '多云': { name: 'cloudy', color: '#deeef6'},
  '阴': {
    name: 'overcast', color: '#c6ced2'},
  '小雨': {
    name: 'lightrain', color: '#bdd5e1'},
  '阵雨': {
    name: 'lightrain', color: '#bdd5e1'},
  '雷阵雨': {
    name: 'heavyrain', color: '#c5ccd0'},
  '晴': {
    name: 'sunny', color: '#cbeefd'}
}

var dailyForecast = []

Page({
  data: {
    temp: "",
    weather: "",
    weather_bg: "",
    dailyForecast: []
  },

  onLoad() {
    this.getWeather()
  },

  onPullDownRefresh() {
    this.getWeather(() => { wx.stopPullDownRefresh() })
  },

  getWeather(callback) {
    wx.request({
      url: 'https://wthrcdn.etouch.cn/weather_mini',
      // 请求数据写在data中
      data: { city: '哈尔滨' },
      method: 'GET',

      success: res => {
        console.log(res)
        let result = res.data.data
        let temp = result.wendu
        let weather = result.forecast[0].type
        let forecast = result.forecast
        // 请求成功后清空dailyForecast数组，防止重复push
        dailyForecast = []
        // 将forecast的数据push到dailyForecast中
        for(let daily of forecast) {
          dailyForecast.push({
            date: daily.date.substr(0,3),
            icon: '/images/'+ weatherMap[daily.type].name +'-icon.png',
            temp: daily.high.substr(3,4)
          })
        }

        this.setData({
          temp: temp,
          weather: weather,
          weather_bg: '/images/' + weatherMap[weather].name + '-bg.png',
          dailyForecast: dailyForecast
        })

        wx.setNavigationBarColor({
          frontColor: '#000000',
          backgroundColor: weatherMap[weather].color,
        })
      },

      complete: () => {
        callback && callback()
      }

    })
  }
})

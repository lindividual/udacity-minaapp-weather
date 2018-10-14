Page({
  data: {
    temp: "20",
    weather: "晴",
    weather_bg: "",
  },

  onLoad() {
    console.log('hello world!')

    wx.request({
      url: 'https://wthrcdn.etouch.cn/weather_mini',
      data: {city: '深圳'},
      method: 'GET',
      success: res => {
        console.log(res)
      }
    })
  }
})

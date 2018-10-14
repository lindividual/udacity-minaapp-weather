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

Page({
  data: {
    temp: "",
    weather: "",
    weather_bg: "",
  },

  onLoad() {
    console.log('hello world!')

    wx.request({
      url: 'https://wthrcdn.etouch.cn/weather_mini',
      // 请求数据写在data中
      data: {city: '南京'},
      method: 'GET',
      success: res => {
        console.log(res)
        let result = res.data.data
        let temp = result.wendu
        let weather = result.forecast[0].type
        console.log(temp, weather)
        this.setData({
          temp: temp,
          weather: weather,
          weather_bg: '/images/'+ weatherMap[weather].name +'-bg.png'
        })
        wx.setNavigationBarColor({
          frontColor: '#000000',
          backgroundColor: weatherMap[weather].color,
        })
      }
    })
  }
})

var app = getApp();
var weatherMap = app.weatherMap;

Page({
    data: {
        dailyForecast: []
    },

    onLoad() {
        let data = app.dailyForecast;
        let dateSorted = Object.keys(data).sort();

        let dailyForecastSorted = []; 
        let dailyForecast = [];

        dateSorted.forEach(element => {
            let value = Object.getOwnPropertyDescriptor(data, element).value;
            dailyForecastSorted.push(value);
        });
        
        for (const day of dailyForecastSorted) {
            let weather_icon = '/images/' + weatherMap[day.weather_night].name + '-icon.png';
            dailyForecast.push({
              date: day.date,
              week_chi: day.week_chi,
              tem_day: day.tem_day,
              tem_night: day.tem_night,
              icon: weather_icon
            });
        }
        
        this.setData({
          dailyForecast: dailyForecast
        });
    }
});


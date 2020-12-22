const fs = require("fs");
const request = require("request")


function readCityCode(codepath,cityName,callback){
	fs.readFile(codepath, function(err,data){
		var obj = JSON.parse(data);
		console.log(obj[cityName]);
		callback(obj[cityName]);
	});
	
}
//发送编码获取天气信息
function requestWeatherCom(cityCode,callback){
	weatherSRC = "http://www.weather.com.cn/data/cityinfo/"+cityCode+".html"
	request(weatherSRC,(err,data,callback)=>{
		if (err) throw err;
		console.log(data.body);
		SaveCUrrentWeather(data.body)

		callback;
	})
}

//存入当前查询的天气信息
function SaveCurrentWeather(body){
	fs.writeFile("city_new.json",body,"utf-8",(err)=>{
			console.log("保存成功");
	});
}




//测试
var codepath = "./city.json";
var cityName = "北京";

readCityCode(codepath,cityName,requestWeatherCom);


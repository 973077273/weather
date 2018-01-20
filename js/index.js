/*
* @Author: Administrator
* @Date:   2018-01-19 11:18:37
* @Last Modified by:   Administrator
* @Last Modified time: 2018-01-20 15:44:17
*/
var wether;
var city;
// 引入太原天气信息
$.ajax({
	url:"https://www.toutiao.com/stream/widget/local_weather/data/?city=太原",
	dataType:"jsonp",
	type:"get",
	success:function(obj){
		weather=obj.data.weather;
		// 在控制台显示获取的天气信息
		 console.log(weather);
	}
})
//请求城市
$.ajax({
	url:"https://www.toutiao.com/stream/widget/local_weather/city/",
	dataType:"jsonp",
	type:"get",
	success:function(obj){
		// 在控制台显示获取的天气信息
		 city=obj.data;
		console.log(city);
	}
})

// 渲染数据
function updata(){
	//渲染城市；
 	var city_Name=document.getElementsByClassName("header")[0];//因为classname返回的是数组，所以加[]	
 	city_Name.innerHTML=weather.city_name;
 	//渲染当前气温；
	var Wendu=document.getElementsByClassName("title1")[0];
 	Wendu.innerHTML=weather.current_temperature+"°C";
	//渲染当前天气；
 	var tianqi=document.getElementsByClassName("title2")[0];
 	tianqi.innerHTML=weather.current_condition;
	//渲染今天的最高温；
 	var data_high_temperature=document.getElementById("dat_high_temperature");
    data_high_temperature.innerHTML=weather.dat_high_temperature;
    //渲染今天的最低温
	var data_low_temperature=document.getElementById("dat_low_temperature");
	data_low_temperature.innerHTML=weather.dat_low_temperature;
	//今天的天气情况
	var dat_condition=document.getElementById("dat_condition");
	dat_condition.innerHTML=weather.dat_condition;
	//渲染今天图片
	var dat_weather_icon_id=document.getElementById("dat_weather_icon_id");
	dat_weather_icon_id.style=`background-image:url(img/${weather.dat_weather_icon_id}.png);`;
    
    //渲染明天的最高温；
 	var tomorrow_high_temperature=document.getElementById("tomorrow_high_temperature");
    tomorrow_high_temperature.innerHTML=weather.tomorrow_high_temperature;
    //渲染明天的最低温
	var tomorrow_low_temperature=document.getElementById("tomorrow_low_temperature");
	tomorrow_low_temperature.innerHTML=weather.tomorrow_low_temperature;
	//明天的天气情况
	var tomorrow_condition=document.getElementById("tomorrow_condition");
	tomorrow_condition.innerHTML=weather.tomorrow_condition;
	//渲染明天图片
	var tomorrow_weather_icon_id=document.getElementById("tomorrow_weather_icon_id");
	tomorrow_weather_icon_id.style=`background-image:url(img/${weather.tomorrow_weather_icon_id}.png);`;
   //实时天气的获取
    for(var i in weather.hourly_forecast){
    	//创建父元素div
       var now=document.createElement("div");
       //给父元素样式
       now.className="now";
       //获取now的父元素
       var nowp=document.getElementById("now");
       //把now插入到父元素中
       nowp.appendChild(now);
       //h获取的时间
       var now_time=document.createElement("h2");
       now_time.className="now_time";
       now_time.innerHTML=weather.hourly_forecast[i].hour+":00";
       now.appendChild(now_time);
       //设置图片
       var now_inco=document.createElement("div");
       now_inco.className="now_inco";
       now_inco.style=`background-image:url(img/${weather.hourly_forecast[i].weather_icon_id}.png);`;
       now.appendChild(now_inco);
       //设置温度
       var now_temperature=document.createElement("h3");
       now_temperature.className="now_temperature";
       now_temperature.innerHTML=weather.hourly_forecast[i].temperature+"°C";
       now.appendChild(now_temperature);
    }
    for(var j in weather.forecast_list){
       var forecast=document.createElement("div");
       //给父元素样式
       forecast.className="forecast";
       //获取forecast的父元素
       var forecastp=document.getElementById("forecast");
       //把forecast插入到父元素中
       forecastp.appendChild(forecast);
       //获取天气情况
       var rencent_wea=document.createElement("h2");
       rencent_wea.className="rencent_wea";
       rencent_wea.innerHTML=weather.forecast_list[j].condition;
       forecast.appendChild(rencent_wea);
       //获取日期
       var rencent_time=document.createElement("div");
       rencent_time.className="rencent_time";
       rencent_time.innerHTML=weather.forecast_list[j].date.substring(5,7)+"/"+weather.forecast_list[j].date.substring(8);
       forecast.appendChild(rencent_time);
       
       //获取图片
       var renent_pic=document.createElement("div");
       renent_pic.className="renent_pic";
       renent_pic.style=`background-image:url(img/${weather.forecast_list[j].weather_icon_id}.png);`;
       forecast.appendChild(renent_pic);
       //获取recent_high
       var recent_high=document.createElement("h3");
       recent_high.className="recent_high";
       recent_high.innerHTML=weather.forecast_list[j].high_temperature+"°C";
       forecast.appendChild(recent_high);
       //获取recent_lo
       var recent_low=document.createElement("h4");
       recent_low.className="recent_low";
       recent_low.innerHTML=weather.forecast_list[j].low_temperature+"°C";
       forecast.appendChild(recent_low);
       //获取rencent_wind
       var rencent_wind=document.createElement("h5");
       rencent_wind.className="rencent_wind";
       rencent_wind.innerHTML=weather.forecast_list[j].wind_direction;
       forecast.appendChild(rencent_wind);
       //获取recent_level
       var recent_level=document.createElement("h6");
       recent_level.className="recent_level";
       recent_level.innerHTML=weather.forecast_list[j].wind_level+"级";
       forecast.appendChild(recent_level);
    }

    //2018.1.20上午
	   var header=document.getElementsByClassName("header")[0];
	   var city_box=document.getElementsByClassName("city_box")[0];
	   //设置城市点击事件。点击城市就会出现城市选中页面
	   header.onclick=function(){
	   	//重新返回页面时还是取消
	   	   $(".shuru").val("");
	   	   $(".button").html("取消")
		   city_box.style="display:block";
	   }
    //城市循环
    for(var k in city){
    	// console.log(k);
    	var cityp=document.getElementById("city")
    	var city_select =document.createElement("h1");
    	city_select.className="city_select";
    	city_select.innerHTML=k;
    	cityp.appendChild(city_select);

        var city_cont=document.createElement("div");
        city_cont.className="city_cont";
    	for(var y in city[k]){
    		// console.log(y);
    		var erji=document.createElement("div");
    		erji.className="son";
    		erji.innerHTML=y;
    		city_cont.appendChild(erji);
    	}
    	//执行完后再执行这个
    	cityp.appendChild(city_cont);
    }
}
//查找各城市天气信息
function AJAX(str){
	$.ajax({
		//引用各城市的天气
		url:`https://www.toutiao.com/stream/widget/local_weather/data/?city=${str}`,
		dataType:"jsonp",
		type:"get",
		success:function(obj){
			weather=obj.data.weather;
			updata();
			$(".city_box").css({"display":"none"});
			// 在控制台显示获取的天气信息
			
		}
})
}
// 当前页面加载完成后才用
window.onload=function(){
	updata();
	$(".son").on("click",function(){
	var cityh=this.innerHTML;
	AJAX(cityh);
    })
    //当input获取焦点，button变确认
    $(".shuru").on("focus",function(){//focus是获取焦点
    	$(".button").html("确认"); //html 是改变元素的内容
    	
    })
    //操作按钮
    var button=document.getElementsByClassName("button")[0];
    // console.log(button);

    button.onclick=function(){
    	//获取button中间的内容
    	var btn=this.innerHTML;
    	if(btn=="取消"){
    		var city_box1=document.getElementsByClassName("city_box")[0];
    		// console.log(city_box1);
    		city_box1.style="display:none";
    	}
    	else{
    		var str=document.getElementsByClassName("shuru")[0].value;
    		// console.log(str);
    		for(var i in city){
    			for(var j in city[i]){
    					if(str==j){
    						AJAX(str);
    						return;
    					}
    			}
    		}
    	alert("没有该城市气象信息");
        }
    }

}
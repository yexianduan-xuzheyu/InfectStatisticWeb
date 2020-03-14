
// 基于准备好的dom，初始化echarts实例
var myChart = echarts.init(document.getElementById('main'));

myChart.showLoading()

// 指定图表的配置项和数据
var option = {
  title: {
      text: '全国新冠肺炎实时疫情',
      subtext: '数据来源于网络，仅供测试使用',
      //sublink: 'https://lab.isaaclin.cn/nCoV/zh',
      left: "center",
      textStyle: {
          color: "teal",
          fontSize: 40,
      }
  },
    tooltip : {
        trigger: 'item'
    },

    //小导航显示
    visualMap : {
        show : true,
        x : "left",
        y : "center",
        //数据分段范围
        splitList: [
            {start: 10000, end: 100000, label: "10000人及以上"},
            {start: 1000, end: 9999, label: "1000-9999人"},
            {start: 500, end: 999, label: "500-999人"},
            {start: 100, end: 499, label: "100-499人"},
            {start: 10, end: 99, label: "10-99人"},
            {start: 1, end: 9, label: "1-9人"},
			{start: 0, end: 0, label: "0人"},
        ],
        //分段颜色
        color: [
            '#C82C00',
            '#E23D1C',
            '#e27427',
            '#efb124',
            '#eaba6c',
            '#ffe49b',
			'#ffffff'
        ]
    },

    //地图参数及数据
    series: [{
        name: "省份",
        type: 'map',
        map: 'china',
        label: {
            normal: {
                show: true  //省份名称
            },
            emphasis: {
                show: false
            }
        },
        data: []  //各省地图颜色数据依赖value
    }]

};
myChart.setOption(option)



$.get("https://lab.isaaclin.cn/nCoV/api/area?latest=1", function (res) {
    //console.log(res.results);
    //console.log(res.results[0].currentConfirmedCount + res.results[0].provinceShortName)

    var province = []
    for (let i=0; i<res.results.length; i++){
        province.push({
            name : res.results[i].provinceShortName,
            value: res.results[i].confirmedCount,
	
        })
    }
    //console.log(province)
    //console.log(666)
	 var count=0;
for (let i=0; i<res.results.length; i++){
	if(res.results[i].countryName=="中国")
	   count=count+res.results[i].currentConfirmedCount;
	}
   document.getElementById("currentConfirmedCount").innerHTML=count;
   var count1=0;
for (let i=0; i<res.results.length; i++){
	if(res.results[i].countryName=="中国")
   	   count1=count1+res.results[i].suspectedCount;
   	}
      document.getElementById("suspectedCount").innerHTML=count1;
	var count2=0;
for (let i=0; i<res.results.length; i++){
	if(res.results[i].countryName=="中国")
	  	   count2=count2+res.results[i].seriousCount;
	  	}
	     document.getElementById("seriousCount").innerHTML=count2;
	var count3=0;
for (let i=0; i<res.results.length; i++){
	if(res.results[i].countryName=="中国")
		 	   count3=count3+res.results[i].curedCount;
		 	}
		    document.getElementById("curedCount").innerHTML=count3;
	var count4=0;
for (let i=0; i<res.results.length; i++){
	if(res.results[i].countryName=="中国")
				   count4=count4+res.results[i].confirmedCount;
				}
			   document.getElementById("confirmedCount").innerHTML=count4;
	var count5=0;
for (let i=0; i<res.results.length; i++){
	if(res.results[i].countryName=="中国")
				   count5=count5+res.results[i].deadCount
				}
			   document.getElementById("deadCount").innerHTML=count5;
    myChart.hideLoading()
    myChart.setOption({
        series: [{
            name: "省份",
            data: province
        }]
    })

});





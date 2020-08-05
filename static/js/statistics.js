//echart图表设置
// 基于准备好的dom，初始化echarts实例
var myChart1 = echarts.init(document.getElementById('chart1'),'light');
var myChart2 = echarts.init(document.getElementById('chart2'),'light');
var myChart3 = echarts.init(document.getElementById('chart3'),'light');
var myChart4 = echarts.init(document.getElementById('chart4'),'light');
var myChart5 = echarts.init(document.getElementById('chart5'),'light');
var myChart6 = echarts.init(document.getElementById('chart6'),'light');
var datasets;

function getStat1() {
    var day = new Date();
    day.setTime(day.getTime());
    var today = day.getFullYear()+"-0" + (day.getMonth()+1) + "-" + day.getDate();
    console.log(today)
    $.ajax({
        url: '/statistic',
        type: 'post',
        dataType:"text",
        async:false,
        data: {
            date:today
        },
        success:function(data){
            datasets = JSON.parse(data)
            console.log(datasets)
            // 指定图表的配置项和数据
            var option1 = {
                title: {
                    text: '瑕疵种类识别次数统计'
                },
                tooltip: {},
                legend: {
                    data:['数量'],
                    right:'20px'
                },
                xAxis: {
                    data: ["卷边皱印","停车痕松","油污","线头","断经","折返","花纹","浆斑","折痕","错花","糙纬","污染","紧经","毛边","皱印","停车痕","字","断纬","色差"]
                },
                yAxis: {},
                series: [{
                    name: '数量',
                    type: 'bar',
                    data: [datasets["卷边皱印"], datasets["停车痕松"], datasets["油污"], datasets["线头"], datasets["断经"], datasets["折返"], datasets["花纹"],datasets["浆斑"], datasets["折痕"], datasets["错花"], datasets["糙纬"], datasets["污染"],datasets["紧经"],datasets['毛边'],datasets['皱印'],datasets['停车痕'],datasets['字'],datasets["断纬"],datasets["色差"]]
                }]
            };
            var option2 = {
             title : {
                text: '瑕疵种类识别次数占比',
            },
            tooltip : {
                trigger: 'item',
                formatter: "{a} <br/>{b} : {c} ({d}%)"
            },
            series : [
            {
                name: '布匹种类',
                type: 'pie',
                radius : '55%',
                center: ['50%', '55%'],
                data:[
                {
                    value:datasets["卷边皱印"],name:"卷边皱印"
                },{
                    value:datasets["停车痕松"],name:"停车痕松"
                },{
                    value:datasets["油污"],name:"油污"
                },{
                    value:datasets["线头"],name:"线头"
                },{
                    value:datasets["断经"],name:"断经"
                },{
                    value:datasets["折返"],name:"折返"
                },{
                    value:datasets["花纹"],name:"花纹"
                },{
                    value:datasets["浆斑"],name:"浆斑"
                },{
                    value:datasets["折痕"],name:"折痕"
                },{
                    value:datasets["错花"],name:"错花"
                },{
                    value:datasets["糙纬"],name:"糙纬"
                },{
                    value:datasets["污染"],name:"污染"
                },{
                    value:datasets["紧经"],name:"紧经"
                },{
                    value:datasets['毛边'],name:'毛边'
                },{
                    value:datasets['皱印'],name:'皱印'
                },{
                    value:datasets['停车痕'],name:'停车痕'
                },{
                    value:datasets['字'],name:'字'
                },{
                    value:datasets['断纬'],name:'断纬'
                },{
                    value:datasets['色差'],name:'色差'
                }],
                itemStyle: {
                    emphasis: {
                        shadowBlur: 10,
                        shadowOffsetX: 0,
                        shadowColor: 'rgba(0, 0, 0, 0.5)'
                    }
                }
            }
            ]
        };
        myChart1.setOption(option1);
        myChart2.setOption(option2);
    },
    error:function(){
        alert("服务器端响应错误!")
    }
})
}
function getStat2() {
    var day = new Date();
    day.setTime(day.getTime()-24*60*60*1000);
    var yesterday = day.getFullYear()+"-0" + (day.getMonth()+1) + "-" + day.getDate();
    console.log(yesterday)
    $.ajax({
        url: '/statistic',
        type: 'post',
        dataType:"text",
        data: {
            date:yesterday
        },
        async:false,
        success:function(data){
            datasets = JSON.parse(data)
            console.log(datasets)
            var option3 = {
                title: {
                    text: '瑕疵种类识别次数统计'
                },
                tooltip: {},
                legend: {
                    data:['数量'],
                    right:'20px'
                },
                xAxis: {
                    data: ["卷边皱印","停车痕松","油污","线头","断经","折返","花纹","浆斑","折痕","错花","糙纬","污染","紧经","毛边","皱印","停车痕","字","断纬","色差"]

                },
                yAxis: {},
                series: [{
                    name: '数量',
                    type: 'bar',
                    data:  [datasets["卷边皱印"], datasets["停车痕松"], datasets["线头"], datasets["断经"], datasets["折返"], datasets["花纹"],datasets["浆斑"], datasets["折痕"], datasets["错花"], datasets["糙纬"], datasets["污染"],datasets["紧经"],datasets['毛边'],datasets['皱印'],datasets['停车痕'],datasets['字'],datasets["断纬"],datasets["色差"]]
                }]
            };
            var option4 = {
                title : {
                    text: '瑕疵种类识别次数占比',
                },
                tooltip : {
                    trigger: 'item',
                    formatter: "{a} <br/>{b} : {c} ({d}%)"
                },
                series : [
                {
                    name: '布匹种类',
                    type: 'pie',
                    radius : '55%',
                    center: ['50%', '55%'],
                    data:[
                    {
                        value:datasets["卷边皱印"],name:"卷边皱印"
                    },{
                        value:datasets["停车痕松"],name:"停车痕松"
                    },{
                        value:datasets["油污"],name:"油污"
                    },{
                        value:datasets["线头"],name:"线头"
                    },{
                        value:datasets["断经"],name:"断经"
                    },{
                        value:datasets["折返"],name:"折返"
                    },{
                        value:datasets["花纹"],name:"花纹"
                    },{
                        value:datasets["浆斑"],name:"浆斑"
                    },{
                        value:datasets["折痕"],name:"折痕"
                    },{
                        value:datasets["错花"],name:"错花"
                    },{
                        value:datasets["糙纬"],name:"糙纬"
                    },{
                        value:datasets["污染"],name:"污染"
                    },{
                        value:datasets["紧经"],name:"紧经"
                    },{
                        value:datasets['毛边'],name:'毛边'
                    },{
                        value:datasets['皱印'],name:'皱印'
                    },{
                        value:datasets['停车痕'],name:'停车痕'
                    },{
                        value:datasets['字'],name:'字'
                    },{
                        value:datasets['断纬'],name:'断纬'
                    },{
                        value:datasets['色差'],name:'色差'
                    }],
                    itemStyle: {
                        emphasis: {
                            shadowBlur: 10,
                            shadowOffsetX: 0,
                            shadowColor: 'rgba(0, 0, 0, 0.5)'
                        }
                    }
                }
                ]
            };
            myChart3.setOption(option3);
            myChart4.setOption(option4);
        },
        error:function(){
            alert("服务器端响应错误!")
        }
    })
}



var option5 = {
    title: {
        text: '瑕疵种类识别次数统计'
    },
    tooltip: {},
    legend: {
        data:['数量'],
        right:'20px'
    },
    xAxis: {
        data: ["卷边皱印","停车痕松","油污","线头","断经","折返","花纹","浆斑","折痕","错花","糙纬","污染","紧经","毛边","皱印","停车痕","字","断纬","色差"]

    },
    yAxis: {},
    series: [{
        name: '数量',
        type: 'bar',
        data: [0, 0, 0, 0, 0, 0,0, 0, 0, 0, 0, 0,0,0,0,0,0,0,0]
    }]
};
var option6 = {
    title : {
        text: '瑕疵种类识别次数占比',
    },
    tooltip : {
        trigger: 'item',
        formatter: "{a} <br/>{b} : {c} ({d}%)"
    },
    series : [
    {
        name: '布匹种类',
        type: 'pie',
        radius : '55%',
        center: ['50%', '55%'],
        data:[
        {value:0,name:"停车痕紧"},
        {value:0,name:"停车痕松"},
        {value:0,name:"卷边皱印"},
        {value:0,name:"油污"},
        {value:0,name:"浆斑"},
        {value:0,name:"污染"},
        {value:0,name:"折痕"},
        {value:0,name:"皱印"},
        {value:0,name:"并纬"},
        {value:0,name:"错花"},
        {value:0,name:"毛边"},
        {value:0,name:"线头"},
        {value:0,name:'字'},
        {value:0,name:'断纬'},
        {value:0,name:'折返'},
        {value:0,name:'紧纬'},
        {value:0,name:'紧经'},
        {value:0,name:'色差'},
        {value:0,name:'花纹'}
        ],
        itemStyle: {
            emphasis: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: 'rgba(0, 0, 0, 0.5)'
            }
        }
    }
    ]
};
// 使用刚指定的配置项和数据显示图表。


myChart5.setOption(option5);
myChart6.setOption(option6);



//日历设置
laydate.render({
  elem: '#data'
  ,theme: '#337ab7'
  ,trigger: 'click'
  ,done: function(value, date){
   //console.log('你选择的日期是：' + value + '\n获得的对象是' + JSON.stringify(date));
}
});
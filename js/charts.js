$(function () {
    /**
     * 获取学生数据
     */
    var student = parent.studentData;
    //男生和女生的人数
    var male = 0,female = 0;
    $.each(student,function (index,value) {
        if (student[index].sex =='男'){
            male++;
        } else{
            female++;
        }
    });

    /**
     * 获取部门数据
     */
    var depart = parent.departData;

    /**
     * 动态获取班级信息
     * @type {classArr.data.records|{instructor, num, rank, className, id}}
     */
    var classes = parent.classData;

    //获取出勤情况




    /**
 * school
 */
//综合实力分析
var schoolchart1 = echarts.init(document.getElementsByClassName('school-left')[0]);
var powerOption = {
    title : {
        text: '综合实力分析',
        subtext: '战争学院 vs 平均水平',
        textStyle:{
            color:'#272727',
            fontWeight:400
        }
    },
    tooltip : {
        trigger: 'axis'
    },
    legend: {
        x : 'right',
        data:['战争学院','平均水平']
    },
    calculable : true,
    polar : [
        {
            indicator : [
                {text : '教学水平', max  : 100},
                {text : '师资力量', max  : 100},
                {text : '科研支出', max  : 100},
                {text : '就业率', max  : 100},
                {text : '政府扶持', max  : 100},
                {text : '国际排名', max  : 100}
            ],
            radius : 130
        }
    ],
    series : [
        {
            name: '综合实力分析',
            type: 'radar',
            itemStyle: {
                normal: {
                    areaStyle: {
                        type: 'default'

                    }
                }
            },
            data : [
                {
                    value : [95, 90, 80, 90, 95, 82],
                    name : '战争学院',
                    itemStyle:{
                        normal:{
                            color:'#b31a16'
                        }
                    }
                },
                {
                    value : [85, 80, 60, 85, 75, 80],
                    name : '平均水平',
                    itemStyle:{
                        normal:{
                            color:'#326353'
                        }
                    }
                }
            ]
        }
    ],
    animationType: 'scale',
    animationEasing: 'elasticOut',
    animationDelay: function (idx) {
        return Math.random() * 1000;
    }
};
schoolchart1.setOption(powerOption);
//近年就业率分析
var schoolcharts2 = echarts.init(document.getElementsByClassName('school-right')[0]);
var schoolOption2 = {
    title : {
        text: '近年就业率',
        subtext: '战争学院 vs 平均就业',
        textStyle:{
            color:'#272727',
            fontWeight:400
        },
        x:'right'
    },
    tooltip : {
        trigger: 'axis'
    },
    legend: {
        data:['战争学院','平均就业'],
        x:'left'
    },
    calculable : true,
    xAxis : [
        {
            type : 'category',
            data : ['2012','2013','2014','2015','2016','2017','2018'],
            axisLabel: {
                formatter: '{value} 年'
            }
        }
    ],
    yAxis : [
        {
            type : 'value',
            axisLabel: {
                formatter: '{value} %'
            }
        }
    ],
    series : [
        {
            name:'战争学院',
            type:'bar',
            data:[82.1, 84.9, 84.2, 86.5, 85.1, 86.4, 88.5],
            markLine : {
                data : [
                    {type : 'average', name: '平均值'}
                ]
            },
            itemStyle:{
                normal:{
                    color:'#62a2f6'
                }
            }
        },
        {
            name:'平均就业',
            type:'bar',
            data:[80.2, 81.5, 79.0, 82.5, 83.8, 87.5, 86.5],
            markLine : {
                data : [
                    {type : 'average', name : '平均值'}
                ]
            },
            itemStyle:{
                normal:{
                    color:'#ffae22'
                }
            }
        }
    ],
    animationType: 'scale',
    animationEasing: 'elasticOut',
    animationDelay: function (idx) {
        return Math.random() * 1000;
    }
};
schoolcharts2.setOption(schoolOption2);
/**
 * job
 */
    //上周出勤情况
    var attendancechart1 = echarts.init(document.getElementsByClassName('attendance-left')[0]);
    var attendanceOption = {
        title: {
            text: '上周学生出勤情况',
            textStyle:{
                color:'#272727',
                fontWeight:400
            },


        },
        tooltip : {
            trigger: 'axis'
        },
        legend: {
            data:['出勤人数','缺勤人数'],
            x:'right'
        },
        calculable : true,
        xAxis : [
            {
                type : 'category',
                boundaryGap : false,
                data : ['周一','周二','周三','周四','周五','周六','周日']
            }
        ],
        yAxis : [
            {
                type : 'value'
            }
        ],
        series : [
            {
                name:'出勤人数',
                type:'line',
                data:[310, 308, 300, 305, 308, 299, 312],
                itemStyle:{
                    color:'#2196f3'
                }
            },
            {
                name:'缺勤人数',
                type:'line',
                data:[7, 9, 17, 12, 9, 18, 5],
                itemStyle:{
                    color:'#d42447'
                }
            }
        ],
        animationType: 'scale',
        animationEasing: 'elasticOut',
        animationDelay: function (idx) {
            return Math.random() * 200;
        }

    };
    attendancechart1.setOption(attendanceOption);

    var attendancechart2 = echarts.init(document.getElementsByClassName('attendance-right')[0]);
    var sexoption = {
        title : {
            text: '学生性别比例',
            textStyle:{
                color:'#272727',
                fontWeight:400
            },
            x:'right'
        },
        tooltip : {
            trigger: 'item',
            formatter: "{a} <br/>{b} : {c} ({d}%)"
        },
        legend: {
            orient : 'vertical',
            x : 'left',
            data:['男','女']
        },
        calculable : true,
        series : [
            {
                name:'学生性别比例',
                type:'pie',
                radius : '65%',
                center: ['50%', '60%'],
                data:[
                    {value:male, name:'男',
                        itemStyle:{
                            color:'#3169a8'
                        }
                    },
                    {value:female, name:'女',
                        itemStyle:{
                            color:'#f13033'
                        }
                    }
                ],
                label:{            //饼图图形上的文本标签
                    normal:{
                        show:true,
                        position:'inner', //标签的位置
                        textStyle : {
                            fontWeight : 300 ,
                            fontSize : 16    //文字的字体大小
                        },
                        formatter:'{d}%'


                    }
                }
            }
        ],
        animationType: 'scale',
        animationEasing: 'elasticOut',
        animationDelay: function (idx) {
            return Math.random() * 200;
        }
    };
    attendancechart2.setOption(sexoption);

//部门人数
    var numscharts1 = echarts.init(document.getElementsByClassName('nums-left')[0]);
    var numsOption1 = {
        title : {
            text: '部门人数',
            textStyle:{
                color:'#272727',
                fontWeight:400
            }
        },
        tooltip : {
            trigger: 'axis'
        },
        calculable : true,
        xAxis : [
            {
                type : 'category',
                data : [depart[0].name,depart[1].name,depart[2].name,depart[3].name]
            }
        ],
        yAxis : [
            {
                type : 'value'
            }
        ],
        series : [
            {
                name:'人数',
                type:'bar',
                data:[depart[0].num,depart[1].num,depart[2].num,depart[3].num],
                itemStyle: {
                    normal: {
                        color: function(params) {
                            // build a color map as your need.
                            var colorList = [
                                '#C1232B','#B5C334','#FCCE10','#E87C25'
                            ];
                            return colorList[params.dataIndex]
                        }
                    }
                },
                barWidth:20
            }
        ],
        animationType: 'scale',
        animationEasing: 'elasticOut',
        animationDelay: function (idx) {
            return Math.random() * 200;
        }
    };
    numscharts1.setOption(numsOption1);

//班级人数
    var numscharts2 = echarts.init(document.getElementsByClassName('nums-right')[0]);
    var numsOption2 = {
        title : {
            text: '班级人数',
            textStyle:{
                color:'#272727',
                fontWeight:400
            },
            x:'right'
        },
        tooltip : {
            trigger: 'axis'
        },
        calculable : true,
        xAxis : [
            {
                type : 'category',
                data : [classes[0].className,classes[1].className,classes[2].className,classes[3].className,classes[4].className,classes[5].className,classes[6].className],
                axisLabel: {
                    show: true,
                    interval:0,
                    rotate:30,
                    fontSize:10
                }
            }
        ],
        yAxis : [
            {
                type : 'value'
            }
        ],
        series : [
            {
                name:'班级人数',
                type:'bar',
                data:[classes[0].nums,classes[1].nums,classes[2].nums,classes[3].nums,classes[4].nums,classes[5].nums,classes[6].nums],
                itemStyle: {
                    normal: {
                        color: function(params) {
                            // build a color map as your need.
                            var colorList = [
                                '#C1232B','#B5C334','#FCCE10','#82e8e5','#e81bd8','#24e849','#E87C25',
                            ];
                            return colorList[params.dataIndex]
                        }
                    }
                },
                barWidth:20
            }
        ],
        animationType: 'scale',
        animationEasing: 'elasticOut',
        animationDelay: function (idx) {
            return Math.random() * 200;
        }
    };
    numscharts2.setOption(numsOption2);

// window.onresize = function (ev) {
//     location.reload();
// }

    //重新渲染
    window.onresize = function () {
            schoolchart1.resize();
            schoolcharts2.resize();
            attendancechart1.resize();
            attendancechart2.resize();
            numscharts1.resize();
            numscharts2.resize();

    };

});
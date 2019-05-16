$(function () {
    //动态获取班级信息
    var classes = parent.classData;
    $.each(classes,function (index,value) {
        var name  = classes[index].className;
        var num = classes[index].nums;
        var $charts3_line = $(' <div class="charts3-in-line">\n' +
            '                            <p class="label1">'+name+'</p><div class="power">\n' +
            '                            <div class="power-in power'+(index+1)+'"></div>\n' +
            '                        </div></div>');
        $('.charts3-in').append($charts3_line);
        $($('.label1')[index]).text(name);
        /**
         * 班级人数动画
         */
        $('.power'+(index+1)).animate({
            width:num
        },2000);

    });

    //动态获取部门信息
    var depart = parent.departData;
    $.each(depart,function (index,value) {
        var name = depart[index].name;
        var num = depart[index].num;
        var $col = $('<div class="col col'+(index+1)+'><span class="parts-nums"></span></div>');
        var $p = $('<p class="charts4-text-p"></p>');
        $('.chars4-in').append($col);
        $('.charts4-text').append($p);
        /**
         * 部门人数动画
         */
        $col.animate({
            height:num*10
        },2000,function () {
            $('.parts-nums').fadeIn();
        });
        $($('.charts4-text-p')[index]).text(name);
    });

    /**
     * 动态获取日历的时间
     * @type {number}
     */

    var year = getTime()[0];
    var days = getTime()[1];
    $('.calender').text(year);
    $('td').each(function () {
        if ($(this).text() == days){
            $(this).css("backgroundColor","#e7de20");
        }
    });


    /**
     * 出勤率动画
     */
    var student = parent.studentData;
    var totalNums = student.length;
    for (var i=0;i<student.length;i++){
        if (student[i].status =='旷课'){
            totalNums--;
        }
    }
    var attend = Math.round(totalNums/student.length*100);
    var h = (parseInt($('.charts-in').css('height'))- 16) * (attend/100);
        $('.water').animate({
            height:h
        },2000);

    $(window).resize(function () {
        if ($(window).innerWidth <=1170) {
            var h = (parseInt($('.charts-in').css('height'))- 12) *(attend/100);
            $('.water').animate({
                height:h
            },100);
        }else{
            h = (parseInt($('.charts-in').css('height'))- 16) * 0.85;
            $('.water').animate({
                height:h
            },100);
        }

    });
    var watertimer = setInterval(function () {
        var nums = Number($('.water-nums').text());
        nums++;
        if (nums >= attend){
            clearInterval(watertimer);
        }
        $('.water-nums').text(nums);
    },22.2222222);


    //动态获取公告
    for (var i=0;i<6;i++){
        var announcement = parent.publishDatas;
        var title = announcement[i].publishTit;
        var time = announcement[i].publishTime.split(" ")[0];
        var $annous = $('<div class="word clear">\n' +
            '                <span class="iconfont icon-notice"></span><p class="text">'+title+'</p><span class="time">'+time+'</span>\n' +
            '            </div>');
        $('.announcement-content').append($annous);
    }




    /**
     * 初始化swiper
     */
    var mySwiper = new Swiper ('.swiper-container', {
        direction: 'horizontal', // 垂直切换选项
        loop: true, // 循环模式选项
        autoplay:{
            delay:5000
        },

        // 如果需要分页器
        pagination: {
            el: '.swiper-pagination',
            clickable :true
        },

        // 如果需要前进后退按钮
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        }
    })


    //首页的跳转
    $('.top-ul li:eq(1)').click(function () {
        window.location = '../pages/attendence.html';
        parent.$('.nav.nav-stacked li a').removeClass('active');
        parent.$('.nav.nav-stacked li a:contains(考勤管理)').addClass('active');
    });
    $('.top-ul li:eq(2)').click(function () {
        window.location = '../pages/class.html';
        parent.$('.nav.nav-stacked li a').removeClass('active');
        parent.$('.nav.nav-stacked li a:contains(班级管理)').addClass('active');
    });
    $('.top-ul li:eq(3)').click(function () {
        window.location = '../pages/department.html';
        parent.$('.nav.nav-stacked li a').removeClass('active');
        parent.$('.nav.nav-stacked li a:contains(部门管理)').addClass('active');

    });
    $('.announcement').click(function () {
        window.location = '../pages/announcement.html';
        parent.$('.nav.nav-stacked li a').removeClass('active');
        parent.$('.nav.nav-stacked li a:contains(公告管理)').addClass('active');
    });
    $('.swiper-container').click(function () {
        window.location = '../pages/photowall.html';
        parent.$('.nav.nav-stacked li a').removeClass('active');
        parent.$('.nav.nav-stacked li a:contains(照片墙)').addClass('active');
    });
    if (parent.role =='2'){
        $('.top-ul li:eq(3)').attr('onclick','').unbind('click');
    }else if (parent.role =='3'){
        $('.top-ul li:eq(1)').attr('onclick','').unbind('click');
        $('.top-ul li:eq(2)').attr('onclick','').unbind('click');
        $('.top-ul li:eq(3)').attr('onclick','').unbind('click');
        $('.swiper-container').attr('onclick','').unbind('click');
    }
});



/**
 * 获取时间
 */
function getTime() {
    var mydate = new Date();
    var year = mydate.getFullYear();
    var month = mydate.getMonth() +1;
    var day = mydate.getDate();
    var week = mydate.getDay();
    var hour = mydate.getHours();
    var minutes = mydate.getMinutes();
    var second = mydate.getSeconds();
    switch (week) {
        case 0:
            week = "星期日";
            break;
        case 1:
            week = "星期一";
            break;
        case 2:
            week = "星期二";
            break;
        case 3:
            week = "星期三";
            break;
        case 4:
            week = "星期四";
            break;
        case 5:
            week = "星期五";
            break;
        case 6:
            week = "星期六";
            break;
    }
    var rel = year+"年"+month+'月';
    var time = [];
    time.push(rel,day);
    return time;
}


var params=location.search.split('=')[1];
var role=params.split('&')[0],
    username=params.split('&')[1],
    head=params.split('&')[2];
var userLevel;
var $pageSiderNav;
console.log(head);
console.log(parent.localStorage.getItem('userData'));

console.log(usersArr.data.records[0].img);

//退出登录
// window.onload=function () {
//     var departStr;
//     var departArr;
//     var staffStr;
//     var staffArr;
//     if(localStorage.getItem('departData')) {
//         console.log('a');
//         departArr=JSON.parse(localStorage.getItem('departData'));
//         departData=departArr;
//     }
//     if(localStorage.getItem('staffData')){
//         console.log('b');
//         staffArr=JSON.parse(localStorage.getItem('staffData'));
//         staffArr.data.records=staffArr;
//     }
//     $('.logout').on('click',function () {
//         console.log('t');
//         departStr = JSON.stringify(departData);
//         staffStr = JSON.stringify(staffArr.data.records);
//         localStorage.setItem('departData', departStr);
//         localStorage.setItem('staffData', staffStr);
//     });
// };

window.onload=function () {
    var departStrL;
    var departArrL;
    var staffStrL;
    var staffArrL;
    var studentStrL;
    var studentArrL;
    var classStrL;
    var classArrL;
    var usersStrL;
    var usersArrL;
    var staffTotal;
    var publishStrL;
    var publishArrL;


    if(localStorage.getItem('departData')) {
        departArrL=JSON.parse(localStorage.getItem('departData'));
        departData=departArrL;
    };
    if(localStorage.getItem('staffData')) {
        staffArrL=JSON.parse(localStorage.getItem('staffData'));
        staffArr.data.records=staffArrL;
    };
    if(localStorage.getItem('staffTotal')) {
        console.log(localStorage.getItem('staffTotal'));
        staffTotal=localStorage.getItem('staffTotal');
        staffArr.data.total=staffTotal;
    };
    if(localStorage.getItem('studentData')){
        studentArrL=JSON.parse(localStorage.getItem('studentData'));
        studentData=studentArrL;
    };
    if(localStorage.getItem('classData')){
        classArrL=JSON.parse(localStorage.getItem('classData'));
        classData=classArrL;
    };
    if(localStorage.getItem('userData')) {
        console.log(localStorage.getItem('userData'));
        usersArrL=JSON.parse(localStorage.getItem('userData'));
        usersArr.data.records=usersArrL;
    };
    if(localStorage.getItem('publishDatas')){
        publishArrL=JSON.parse(localStorage.getItem('publishDatas'));
        publishDatas=publishArrL;
    };


    $('.logout').on('click',function () {
        departStrL = JSON.stringify(departData);
        staffStrL = JSON.stringify(staffArr.data.records);
        studentStrL = JSON.stringify(studentData);
        classStrL = JSON.stringify(classData);
        usersStrL = JSON.stringify(usersArr.data.records);
        publishStrL = JSON.stringify(publishDatas);

        localStorage.setItem('departData', departStrL);
        localStorage.setItem('staffData', staffStrL);
        localStorage.setItem('staffTotal', staffArr.data.total);
        localStorage.setItem('studentData',studentStrL);
        localStorage.setItem('classData',classStrL);
        localStorage.setItem('userData', usersStrL);
        localStorage.setItem('publishDatas', publishStrL);

    });
    $('.head').css('background-image', 'url('+usersArr.data.records[head - 1].img+')');
};

console.log(usersArr.data.records[head - 1].img);







if(role=='1'){
    userLevel='管理员';
    $('.userLevel').text(userLevel);
    $('.username').text(username);
    $('.downlist span:eq(1)').text(userLevel);
    $('.downlist span:eq(0)').text(username);
    // $('.head').css('background-image','url('+usersArr.data.records[role-1].img+')');
    $pageSiderNav=$('<ul class="nav nav-stacked nav-pills">\n                <li role="presentation">\n                    <a class="active" href="homepage.html" target="mainFrame"><i class="iconfont icon-shouye-copy-copy-copy"></i><span>首页</span></a>\n                </li>\n                <li role="presentation">\n                    <a href="department.html" target="mainFrame"><i class="iconfont icon-guanli"></i><span>部门管理</span></a>\n                </li>\n                <li role="presentation">\n                    <a href="staff.html" target="mainFrame"><i class="iconfont icon-zhigongguanli"></i><span>职工管理</span></a>\n                </li>\n                <li role="presentation">\n                    <a href="class.html" target="mainFrame"><i class="iconfont icon-biaoge"></i><span>班级管理</span></a>\n                </li>\n                <li role="presentation">\n                    <a href="student.html" target="mainFrame"><i class="iconfont icon-huiyuan"></i><span>学生管理</span></a>\n                </li>\n                <li role="presentation">\n                    <a href="charts.html" target="mainFrame"><i class="iconfont icon-shuju"></i><span>数据管理</span></a>\n                </li>\n                <li role="presentation">\n                    <a href="photowall.html" target="mainFrame"><i class="iconfont icon-zhaopian_xianxing"></i><span>照片墙</span></a>\n                </li>\n                <li role="presentation">\n                    <a href="attendence.html" target="mainFrame"><i class="iconfont icon-shijian"></i><span>考勤管理</span></a>\n                </li>\n                <li role="presentation">\n                    <a href="announcement.html" target="mainFrame"><i class="iconfont icon-notice"></i><span>公告管理</span></a>\n                </li>\n                <li role="presentation">\n                    <a href="role.html" target="mainFrame"><i class="iconfont icon-shezhi"></i><span>权限管理</span></a>\n                </li>\n            </ul>');
    $('.pageSidebar').append($pageSiderNav);
}
if(role=='2'){
    userLevel='老师';
    $('.userLevel').text(userLevel);
    $('.username').text(username);
    $('.downlist span:eq(1)').text(userLevel);
    $('.downlist span:eq(0)').text(username);
    // $('.head').css('background-image','url('+usersArr.data.records[role-1].img+')');
    $pageSiderNav=$('<ul class="nav nav-stacked nav-pills">\n                <li role="presentation">\n                    <a class="active" href="homepage.html" target="mainFrame"><i class="iconfont icon-shouye-copy-copy-copy"></i><span>首页</span></a>\n                </li>\n                <li role="presentation">\n                    <a href="class.html" target="mainFrame"><i class="iconfont icon-biaoge"></i><span>班级管理</span></a>\n                </li>\n                <li role="presentation">\n                    <a href="student.html" target="mainFrame"><i class="iconfont icon-huiyuan"></i><span>学生管理</span></a>\n                </li>\n                <li role="presentation">\n                    <a href="photowall.html" target="mainFrame"><i class="iconfont icon-zhaopian_xianxing"></i><span>照片墙</span></a>\n                </li>\n                <li role="presentation">\n                    <a href="attendence.html" target="mainFrame"><i class="iconfont icon-shijian"></i><span>考勤管理</span></a>\n                </li>\n                <li role="presentation">\n                    <a href="announcement.html" target="mainFrame"><i class="iconfont icon-notice"></i><span>公告管理</span></a>\n                </li>\n            </ul>');
    $('.pageSidebar').append($pageSiderNav);

}
if(role=='3'){
    userLevel='校长';
    $('.userLevel').text(userLevel);
    $('.username').text(username);
    $('.downlist span:eq(1)').text(userLevel);
    $('.downlist span:eq(0)').text(username);

    // $('.head').css('background-image','url('+usersArr.data.records[role-1].img+')');
    $pageSiderNav=$('<ul class="nav nav-stacked nav-pills">\n                <li role="presentation">\n                    <a class="active" href="homepage.html" target="mainFrame"><i class="iconfont icon-shouye-copy-copy-copy"></i><span>首页</span></a>\n                </li>\n                <li role="presentation">\n                    <a href="announcement.html" target="mainFrame"><i class="iconfont icon-notice"></i><span>公告管理</span></a>\n                </li>\n            </ul>');
    $('.pageSidebar').append($pageSiderNav);
}
$('.nav.nav-stacked li a').click(function () {
    $('.nav.nav-stacked li a').removeClass('active');
    $(this).addClass('active');
});
$('a:contains(个人中心)').click(function () {
    $('.nav.nav-stacked li a').removeClass('active');
});
// var reloadNav=function () {
//     $('.nav.nav-stacked li').each(function () {
//         if($(this).)
//     })
// }
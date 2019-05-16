$(function() {
    // Tab选项卡
    function resetTabs(){
        $("#content > div").hide(); //Hide all content
        $("#tabs a").attr("id",""); //Reset id's      
    }
    var myUrl = window.location.href; //get URL
    var myUrlTab = myUrl.substring(myUrl.indexOf("#")); 
    var myUrlTabName = myUrlTab.substring(0,4); 
    (function(){
        $("#content > div").hide(); // Initially hide all content
        $("#tabs li:first a").attr("id","current"); // Activate first tab
        $("#content > div:first").fadeIn(); // Show first tab content
         
        $("#tabs a").on("click",function(e) {
            e.preventDefault();
            if ($(this).attr("id") == "current"){ //detection for current tab
             return       
            }
            else{             
            resetTabs();
            $(this).attr("id","current"); // Activate this
            $($(this).attr('name')).fadeIn(); // Show content for current tab
            }
        });
        for (i = 1; i <= $("#tabs li").length; i++) {
          if (myUrlTab == myUrlTabName + i) {
              resetTabs();
              $("a[name='"+myUrlTab+"']").attr("id","current"); // Activate url tab
              $(myUrlTab).fadeIn(); // Show url tab content        
          }
        }
    })();
    
    //查看公告
    var pubCurrent = 0,  // 当前页
        pubPages, // 总页数
        pageN = 6, // 每页最多展示的信息数
        pubDataIndex = parent.publishDatas.length, // 数组序号
        jurisdiction = parent.role,   // 权限
        m,
        n;
    function yye() {     // 页码
        var len = $('#yeyeye').children().length;
        for(len; len < pubPages; len++) {
            $('#yeyeye').append(`<li class="yema">${len+1}</li>`)
        }
        if(len > pubPages) {
            for(var i = 0; i < len - pubPages;) {
                $('#yeyeye').children().eq(pubPages).remove();
                len = $('#yeyeye').children().length;
                if(parent.publishDatas.length % pageN == 0) {
                    if(parent.publishDatas.length == 0) {
                        return
                    } else {
                        pubPages = parent.publishDatas.length / pageN;
                    }
                } else {
                    pubPages = parseInt(parent.publishDatas.length / pageN) + 1;
                }  // 判断总页数
            }
            if(pubCurrent > pubPages - 1) {
                pubCurrent = pubPages - 1;
            }
            $('.yema').eq(pubCurrent).addClass('on');
            publishPage();
        }
    }
    function publishPage() {   // 在页面展示当前页的信息
        if(parent.publishDatas.length % pageN == 0) {
            if(parent.publishDatas.length == 0) {
                return
            } else {
                pubPages = parent.publishDatas.length / pageN;
            }
        } else {
            pubPages = parseInt(parent.publishDatas.length / pageN) + 1;
        }  // 判断总页数

        yye();
        var pubWd = document.getElementById('pub-wd').children;
        for(var i = 0; i < pageN; i++) {
            var tiao = parent.publishDatas[pubCurrent * pageN + i];
            if(tiao) {
                $(pubWd[i]).addClass('pub-fentiao')
                $(pubWd[i]).html(`<i class="iconfont icon-notice pub-icon"></i>
                <span class="pub-class">${tiao.publishBanji}</span>
                <span class="pub-ggg">${tiao.change}</span>
                <span class="pub-title">${tiao.publishTit}</span>
                <span class="pub-ptc" data-toggle="modal" data-target="#myModal"><i class="iconfont icon-xiangqing" ></i>查看详情</span>
                <span class="pub-time">${tiao.publishTime}</span>
                <span class="pub-change" data-toggle="modal" data-target="#myModal"><i class="iconfont icon-xiugai" ></i>修改</span>
                <span class="pub-del"><i class="iconfont icon-shanchu" ></i>删除</span>`);
                $(pubWd[i]).removeClass('pub-bg');
                if(i % 2 == 0) {
                    $(pubWd[i]).addClass('pub-bg');
                } // 行背景
                $(pubWd[i]).attr('index',tiao.index)
            } else {
                $(pubWd[i]).removeClass('pub-bg');
                $(pubWd[i]).html('');
                $(pubWd[i]).removeClass('pub-fentiao');
            }
        }  // 渲染公告栏
        quanXian();
    }
    publishPage(); // 默认执行一次

    // 点击页码
    $('#yema-wrap').on('click',$('.yema'),function(event) {
        if(event.target.id == 'prev' || 'next') {
            if(event.target.id == 'prev' && pubCurrent > 0) {
                pubCurrent--;
            }
            if(event.target.id == 'next' && pubCurrent < $('.yema').length-1) {
                pubCurrent++;
            }
        } 
        if(event.target.className == 'yema') {
            pubCurrent = $(event.target).text()-1;
        }
        for(var j = 0; j < $('#yeyeye').children().length; j++) {
            $('#yeyeye').children().eq(j).removeClass('on');
        }
        $('.yema').eq(pubCurrent).addClass('on');
        publishPage();
    });

    // 点击查看公告
    $('#tabs a').on('click',function(){
        publishPage();
    });

    // 选择班级
    $('#major').on('click','.pub-target',function() {
        var major = $(this).text();
        $('#btn-major>span:first-child').text(major);
        if($(this).hasClass('all-target')) {
            $('#btn-class').hide();
            $('#btn-class>span:first-child').text('');
        } else {
            $('#btn-class').show();
            $('#btn-class>span:first-child').text('选择班级')
        }
    });
    
    $('#class').on('click','.grade',function() {
        var cla = $(this).text();
        $('#btn-class>span:first-child').text(cla);
    });

    // 公告data

    // 创建公告
    //@param {string} tit 公告标题
    //@param {string} cont 公告内容
    //@param {string} time 发布公告时间
    //@param {} banji 公告目标
    //@param {} authority 发布权限
    function Publish(banji,tit,cont,time,authority) {
        this.publishBanji = banji;
        this.publishTit = tit;
        this.publishCont = cont;
        this.publishTime = time;
        this.pubAuthority = authority;
        this.index = pubDataIndex; // 序号
        pubDataIndex++; // 数组序号+1
        this.change = ''; // 是否更改过
    }
    function clearPub() {  // 清空草稿
        $('.inp-tit').val('');
        $('.pub-content').val('');
    }
    //点击确认发布
    $('#pub-affirm').on('click',function() {
        if($('#btn-major>span:first-child').text() == '选择专业') {
            alert('请选择专业');
            return
        }
        if($('#btn-class>span:first-child').text() == '选择班级') {
            alert('请选择班级');
            return
        }
        if($('.inp-tit').val() == '') {
            alert('请输入公告标题');
            return
        }
        if($('.pub-content').val() == '') {
            alert('请输入公告内容');
            return
        }
        var publishBanji;
        if($('#btn-major>span:first-child').text() == '全校师生') {
            publishBanji = $('#btn-major>span:first-child').text();
        } else {
            publishBanji = $('#btn-class>span:first-child').text()+'&nbsp;&nbsp;'+$('#btn-major>span:first-child').text();//班级对象
        }
        var publishTit = $('.inp-tit').val(),
            publishCont = $('.pub-content').val(),
            myDate = new Date(),
            publishTime = myDate.toLocaleString().replace(/\//g,'-'),
            ptime = publishTime.split('-');
        if(parseInt(ptime[1]) < 10) {
            ptime[1] = '0'+ptime[1];
        }
        if(parseInt(ptime[2]) < 10) {
            ptime[2] = '0'+ptime[2];
        }
        publishTime = ptime[0] + '-' + ptime[1] + '-' + ptime[2];
        var publishData = new Publish(publishBanji,publishTit,publishCont,publishTime);
        parent.publishDatas.unshift(publishData); //将输入的公告加入公告数组
        alert('提交成功');
        clearPub();
    });
    //点击取消
    $('#pub-cancel').on('click',function(){
        if($('.inp-tit').val() != '' || $('.pub-content').val() != '') {
            var a = confirm('此操作将清空操作，是否清空？');
            if(a) clearPub();
        }
    });
    $('.pub-fentiao').on('click',function(event) {
        //删除单条公告
        if($(event.target).hasClass('pub-del')) {
            var qdel = confirm('确认删除？');
            if(qdel) {
                for(var i = 0; i < parent.publishDatas.length; i++) {
                    if(parent.publishDatas[i].index == parseInt($(this).attr('index'))) {
                        parent.publishDatas.splice(i,1);
                    }
                }
                $(this).html('');
                publishPage();
            }
        }
        //查看详情
        if($(event.target).hasClass('pub-ptc')) {
            $('.btn-primary').hide();
            for(var y = 0; y < parent.publishDatas.length; y++) {
                if(parent.publishDatas[y].index == parseInt($(this).attr('index'))) {
                    $('#myModalLabel').val(parent.publishDatas[y].publishTit);
                    $('.modal-body').val(parent.publishDatas[y].publishCont);
                    $('#myModalLabel').attr('readonly','readonly');
                    $('.modal-body').attr('readonly','readonly');
                }
            }
        }
        // 更正公告
        if($(event.target).hasClass('pub-change')) {
            $('.btn-primary').show();
            $('#myModalLabel').removeAttr('readonly','readonly');
            $('.modal-body').removeAttr('readonly','readonly');
            for(var i = 0; i < parent.publishDatas.length; i++) {
                if(parent.publishDatas[i].index == parseInt($(this).attr('index'))) {
                    console.log(parseInt($(this).attr('index')))
                    m = parseInt($(this).attr('index'));
                    n = i;
                    $('#myModalLabel').val(parent.publishDatas[i].publishTit);
                    $('.modal-body').val(parent.publishDatas[i].publishCont);
                    // 点击确认更改
                    $('.btn-primary').on('click',function() {
                        parent.publishDatas[n].publishTit = $('#myModalLabel').val();
                        parent.publishDatas[n].publishCont = $('.modal-body').val();
                        parent.publishDatas[n].change = '更正!';
                        for(var k = 0; k < $('.pub-fentiao').length; k++) {
                            if(parseInt($('.pub-fentiao').eq(k).attr('index')) == m) {
                                $('.pub-fentiao').eq(k).html(`<i class="iconfont icon-notice pub-icon"></i>
                                <span class="pub-class">${parent.publishDatas[n].publishBanji}</span>
                                <span class="pub-ggg">${parent.publishDatas[n].change}</span>
                                <span class="pub-title">${parent.publishDatas[n].publishTit}</span>
                                <span class="pub-ptc" data-toggle="modal" data-target="#myModal"><i class="iconfont icon-xiangqing" ></i>查看详情</span>
                                <span class="pub-time">${parent.publishDatas[n].publishTime}</span>
                                <span class="pub-change" data-toggle="modal" data-target="#myModal"><i class="iconfont icon-xiugai" ></i>修改</span>
                                <span class="pub-del"><i class="iconfont icon-shanchu" ></i>删除</span>`);
                            }
                        }
                    });
                }
            }
        }
    });
    
    // 刷新
    $('.renovate').on('click',function(){
        publishPage();
    });
    // 上传附件
    $('#easyContainer').easyUpload({
        allowFileTypes: '*.jpg;*.doc;*.pdf',//允许上传文件类型，格式';*.doc;*.pdf'
        allowFileSize: 100000,//允许上传文件大小(KB)
        selectText: '选择文件',//选择文件按钮文案
        multi: true,//是否允许多文件上传
        multiNum: 5,//多文件上传时允许的文件数
        showNote: true,//是否展示文件上传说明
        note: '提示：最多上传5个文件，支持格式为doc、pdf、jpg',//文件上传说明
        showPreview: true,//是否显示文件预览
        url: '../images',//上传文件地址
        fileName: 'file',//文件filename配置参数
        formParam: {
          token: $.cookie('token_cookie')//不需要验证token时可以去掉
        },//文件filename以外的配置参数，格式：{key1:value1,key2:value2}
        timeout: 30000,//请求超时时间
        successFunc: function(res) {
          console.log('成功回调', res);
        },//上传成功回调函数
        errorFunc: function(res) {
          console.log('失败回调', res);
        },//上传失败回调函数
        deleteFunc: function(res) {
          console.log('删除回调', res);
        }//删除文件回调函数
    });
    var upp = 0;
    $('#up-btn').on('click',function(){
        if(!upp) {
            $(this).css('overflow','view');
            $('#easyContainer').show()
                .css('top','30px');
            upp = 1;
        } else {
            $('#easyContainer').hide()
                .css('top','30px');
            upp = 0;
        }
    });
    // 权限
    console.log(jurisdiction)
    function quanXian() {
        var dis = $('.pub-fentiao');
        $('#d-pub').show();
        $('.all-target').show();
        $('.divider').show();
        for(var k = 0; k < dis.length; k++) {
            $('.pub-change').eq(i).show();
        }
        if(jurisdiction == 1) {
            $('#d-pub').hide();
            for(var i = 0; i < dis.length; i++) {
                $('.pub-change').eq(i).hide();
                $('.pub-del').eq(i).hide();
            }
        }
        if(jurisdiction == 2) {
            $('.all-target').hide();
            $('.divider').hide();
            for(var i = 0; i < dis.length; i++) {
                if($('.pub-class').eq(i).text() == '全校师生') {
                    $('.pub-change').eq(i).hide();
                    $('.pub-del').eq(i).hide();
                }
            }
        }
    }
})
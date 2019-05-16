$(function () {
    //实例化多张图轮播
    var swiper = new Swiper('.swiper-container', {
        slidesPerView: 3,
        spaceBetween: 30,
        autoplay: true,
        pagination: {
            el: '.swiper-pagination',
            clickable: true
        }
    });
       //初始化
    $(".cancel").click(function () {
            $(".cancel").attr("data-dismiss","modal");
    })


    //将上传文件路径传入图片路径数据库
    var totalType,
        freshArr1,
        freshArr2,
        freshArr3,
        freshArr4,
        freshArr5,
        freshArr6,
        freshArr7;


  $(".pic-type").change(function () {
      var typeVal=$(".pic-type").val();
     var type=typeVal.split("\\")[2];
     totalType="../images/photowall/fresh-man1/"+type;
      //大一一班图片路径
      freshArr1=picSrc.freshMan1;
      //大一二班图片路径
      freshArr2=picSrc.freshMan2;
      //大二一班
      freshArr3=picSrc.junior1;
      freshArr4=picSrc.junior2;
      freshArr5=picSrc.senior1;
      freshArr6=picSrc.senior2;
      freshArr7=picSrc. sophomore1;
  });
  //确认发布
    var heading,
        depict,
        freshH1,
        freshC1,
        freshH2,
        freshC2;

    //专业选择
    $(".grade-choose .grade").change(function () {
        if($(".grade-choose .grade").val()!="--选择班级--"){
            $(".choose-txt").css("display","none");
        }else{
            $(".choose-txt").css("display","block");
        }
    });
   //图片格式判断
    $(".pic-type").change(function () {
        var  type=$(".pic-type").val();
        var typeStart=type.lastIndexOf(".");
        var ext=type.substring(typeStart,type.length).toUpperCase();

            if(ext!=".BMP"&&ext!=".PNG"&&ext!=".GIF"&&ext!=".JPG"&&ext!=".JPEG"){
                $(".img-txt").text("抱歉，您上传的文件不是图片格式，请重新上传");
        }else{
                $(".img-txt").text("");
            }
    })



  $(".realise").click(function () {

          // 定义专业名称选择
           var gradeVal=$(".grade-choose .grade").val();

          //动态渲染
          heading= $(".til input").val();
          depict=$(".description textarea").val();

          if(gradeVal=="计算机科学与技术"){
              //将标题存入数据库
              freshH1=picSrc.ha;
              freshC1=picSrc.contenta;
              freshH1.unshift(heading);
              freshC1.unshift(depict);
              freshArr1.unshift(totalType);
              action(".fresh1",freshArr1,freshH1,freshC1);
          }
          if(gradeVal=="电子商务"){
              freshH2=picSrc.hb;
              freshC2=picSrc.contentb;
              freshH2.unshift(heading);
              freshC2.unshift(depict);
              freshArr2.unshift(totalType);
              action(".fresh2",freshArr2,freshH2,freshC2);
          }
          if(gradeVal=="会计学"){
              //将标题存入数据库
              freshH1=picSrc.hc;
              freshC1=picSrc.contentc;
              freshH1.unshift(heading);
              freshC1.unshift(depict);
              freshArr3.unshift(totalType);
              action(".fresh3",freshArr3,freshH1,freshC1);
          }
          if(gradeVal=="信息工程"){
              freshH2=picSrc.hd;
              freshC2=picSrc.contentd;
              freshH2.unshift(heading);
              freshC2.unshift(depict);
              freshArr4.unshift(totalType);
              action(".fresh4",freshArr4,freshH2,freshC2);
          }
          if(gradeVal=="商务英语"){
              //将标题存入数据库
              freshH1=picSrc.he;
              freshC1=picSrc.contente;
              freshH1.unshift(heading);
              freshC1.unshift(depict);
              freshArr5.unshift(totalType);
              action(".fresh5",freshArr5,freshH1,freshC1);
          }
          if(gradeVal=="算法工程"){
              freshH2=picSrc.hf;
              freshC2=picSrc.contentf;
              freshH2.unshift(heading);
              freshC2.unshift(depict);
              freshArr6.unshift(totalType);
              action(".fresh6",freshArr6,freshH2,freshC2);
          }
          if(gradeVal=="播音主持"){
              freshH2=picSrc.hg;
              freshC2=picSrc.contentg;
              freshH2.unshift(heading);
              freshC2.unshift(depict);
              freshArr7.unshift(totalType);
              console.log(freshArr7);
              action(".fresh7",freshArr7,freshH2,freshC2);
          }
  })
    //动态渲染函数
    function action(dom,arr1,arr2,arr3) {
        $(dom).html("");
        for(var i=0;i<arr1.length;i++){
            var imgSrc=arr1[i];
            var haSrc=arr2[i];
            var contentSrc=arr3[i];
            var $conent=$(`<div class="swiper-slide">
                 <img src=${imgSrc} alt="">
                 <div class="information">
                     <h2>${haSrc}</h2>
                     <p>${contentSrc}</p>
                 </div>
             </div>`);
            $(dom).append($conent);
        }
        var swiper = new Swiper('.swiper-container', {
            slidesPerView: 3,
            spaceBetween: 30,
            autoplay: true,
            pagination: {
                el: '.swiper-pagination',
                clickable: true,
            },
        });
    }
    //图片地址存储
    var picSrc1;
    //点击获取详情--事件委托
    $(".swiper-wrapper").on("click",".swiper-slide",function () {
        $(".swiper-container").fadeToggle();
        $(".txt").fadeToggle();
        $(".detail").fadeToggle();
        picSrc1=$(this).find("img").attr("src");
        $(".detail .img").attr("src",picSrc1);
        var h2=$(this).find(".information").find("h2").text();
        var p=$(this).find(".information").find("p").text();
        //获取点击dom元素
        var dom2=$(this);
       $(".detail-txt h2").text(h2);
       $(".detail-txt p").text(p);

        //点击确认完成修改内容
        $(".change").click(function () {
            //获取标题内容
            var titleVal=$(".title input").val();
            //获取内容描述
            var textareaVal=$(".content-decription textarea").val();
            //内容修改,重新设置标题，内容描述为空
            if(titleVal){
                $(".detail-txt h2").text(titleVal);
                dom2.find(".information").find("h2").text(titleVal);
                $(".title input").val("");
            }
            if(textareaVal){
                $(".detail-txt p").text(textareaVal);
                dom2.find(".information").find("p").text(textareaVal);
                $(".content-decription textarea").val("");
            }
        })
    })
    $(".shut").click(function () {
        //点击关闭内容修改
        $(".detail").hide();
        $(".swiper-container").show();
        $(".txt").show();
    })
    //删除图片
    $(".cut").click(function () {
      // var is=confirm("确认删除该图片和内容");
        //关闭修改窗口
        $(".detail").fadeToggle();
        $(".swiper-container").fadeToggle();
        $(".txt").fadeToggle();
         // if(is){
            //大一一班删除
            //将标题存入数据库
                 var arrSrc=picSrc.freshMan1,
                    arrH=picSrc.ha,
                    arrC=picSrc.contenta;
                index=arrSrc.indexOf(picSrc1);
                arrH.splice(index,1);
                arrC.splice(index,1);
                if(index!=-1){
                    arrSrc.splice(index,1);
                    action(".fresh1",arrSrc,arrH,arrC);
                }
            //大一二班删除
                //将标题存入数据库
                arrSrc=picSrc.freshMan2;
                    arrH=picSrc.hb;
                    arrC=picSrc.contentb;
                index=arrSrc.indexOf(picSrc1);
                arrH.splice(index,1);
                arrC.splice(index,1);
                if(index!=-1){
                    arrSrc.splice(index,1);
                    action(".fresh2",arrSrc,arrH,arrC);
                }
            //大二一班删除
            //将标题存入数据库
            arrSrc=picSrc.junior1;
            arrH=picSrc.hc;
            arrC=picSrc.contentc;
            index=arrSrc.indexOf(picSrc1);
            arrH.splice(index,1);
            arrC.splice(index,1);
            if(index!=-1){
                arrSrc.splice(index,1);
                action(".fresh3",arrSrc,arrH,arrC);
            }
            //大二二班删除
            //将标题存入数据库
            arrSrc=picSrc.junior2;
            arrH=picSrc.hd;
            arrC=picSrc.contentd;
            index=arrSrc.indexOf(picSrc1);
            arrH.splice(index,1);
            arrC.splice(index,1);
            if(index!=-1){
                arrSrc.splice(index,1);
                action(".fresh4",arrSrc,arrH,arrC);
            }

            //大三一班删除
            //将标题存入数据库
            arrSrc=picSrc.senior1;
            arrH=picSrc.he;
            arrC=picSrc.contente;
            index=arrSrc.indexOf(picSrc1);
            arrH.splice(index,1);
            arrC.splice(index,1);
            if(index!=-1){
                arrSrc.splice(index,1);
                action(".fresh5",arrSrc,arrH,arrC);
            }
            //大三二班删除
            //将标题存入数据库
            arrSrc=picSrc.senior2;
            arrH=picSrc.hf;
            arrC=picSrc.contentf;
            index=arrSrc.indexOf(picSrc1);
            arrH.splice(index,1);
            arrC.splice(index,1);
            if(index!=-1){
                arrSrc.splice(index,1);
                action(".fresh6",arrSrc,arrH,arrC);
            }

            //大四一班删除
            //将标题存入数据库
            arrSrc=picSrc.sophomore1;
            arrH=picSrc.hg;
            arrC=picSrc.contentg;
            index=arrSrc.indexOf(picSrc1);
            arrH.splice(index,1);
            arrC.splice(index,1);
            if(index!=-1){
                arrSrc.splice(index,1);
                action(".fresh7",arrSrc,arrH,arrC);
            }
        // }
    });
    //搜索功能实现
    $(".search").click(function () {

        //搜索专业value值
        var searchSval=$(".search-section").val();

        if(searchSval=="计算机科学与技术") {
            $(".swiper1").show().siblings().hide();
        }
        if(searchSval=="电子商务") {
            $(".swiper2").show().siblings().hide();
        }

        if(searchSval=="会计学"){
            $(".swiper3").show().siblings().hide();

        }
        if(searchSval=="信息工程"){
            $(".swiper4").show().siblings().hide();
        }

        if(searchSval=="商务英语"){
            $(".swiper5").show().siblings().hide();

        }
        if(searchSval=="算法工程"){
            $(".swiper6").show().siblings().hide();
        }
        if(searchSval=="播音主持"){
            $(".swiper7").show().siblings().hide();
        }
        if(searchSval=="--搜索班级--"){
            $(".swiper7").show().prevAll().show();
        }

    })

})
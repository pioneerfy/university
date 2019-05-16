
    $('#myTabs a').click(function (e) {
        e.preventDefault();
        $(this).tab('show')
    });


    // $(".val")[0].text(users[0].age);
    var val=document.getElementsByClassName("val");
    var length=parent.location.search.split("=")[1].split("&").length;
    var role=parent.location.search.split("=")[1].split("&")[length-1];
    var input=document.getElementsByTagName("input");
    function information() {
        // 动态获取个人资料
        // $("input").eq(4).blur(function () {
        //   if( $("input").eq(4).val().match(
        //           /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/ )||$("input").eq(4).val()==""){
        //       $(".submit").removeAttr("disabled").css("cursor","pointer");
        //       $(".z1").hide()
        //   }else {
        //       $(".submit").attr("disabled","disabled").css("cursor","not-allowed");
        //       $(".z1").show();
        //
        //   }
        // });
        // $("input").eq(5).blur(function () {
        //     console.log($("input").eq(5).val());
        //     if( $("input").eq(5).val().match(/^((13[0-9])|(14[5,7])|(15[0-3,5-9])|(17[0,3,5-8])|(18[0-9])|166|198|199|(147))\\d{8}$/)||$("input").eq(5).val()==""){
        //         $(".submit").removeAttr("disabled").css("cursor","pointer");
        //         $(".z2").hide()
        //     }else {
        //         $(".submit").attr("disabled","disabled").css("cursor","not-allowed");
        //         $(".z2").show();
        //
        //     }
        // });

        $("input").eq(4).blur(function () {
            if( $("input").eq(4).val().match(
                /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/ )||$("input").eq(4).val()==""){
                $(".z1").css("display","none");
                // $(".submit").removeAttr("disabled").css("cursor","pointer");
            }else {
                $(".submit").attr("disabled","disabled").css("cursor","not-allowed");
                $(".z1").css("display","inline-block")
            }
        });
        $("input").eq(5).blur(function () {
            if( $("input").eq(5).val().match(/^[1][3,4,5,7,8][0-9]{9}$/)||$("input").eq(5).val()==""){
                $(".z2").css("display","none");
                // $(".submit").removeAttr("disabled").css("cursor","pointer");
            }else {
                $(".submit").attr("disabled","disabled").css("cursor","not-allowed");
                $(".z2").css("display","inline-block");
            }
        });
        $("input").blur(function (){
            if($(".z1").css("display")=="none"&&$(".z2").css("display")=="none"){

                $(".submit").removeAttr("disabled").css("cursor","pointer");
            }
        });

        if(role==1){
            $(".photo img").attr("src",parent.usersArr.data.records[0].img);
            val[0].innerText= parent.usersArr.data.records[0].username;
            val[1].innerText=parent.usersArr.data.records[0].name;
            val[2].innerText=parent.usersArr.data.records[0].age;
            val[3].innerText=parent.usersArr.data.records[0].taste;
            val[4].innerText=parent.usersArr.data.records[0].email;
            val[5].innerText=parent.usersArr.data.records[0].tel;
            input[0].placeholder=parent.usersArr.data.records[0].username;
            input[1].placeholder=parent.usersArr.data.records[0].name;
            input[2].placeholder=parent.usersArr.data.records[0].age;
            input[3].placeholder=parent.usersArr.data.records[0].taste;
            input[4].placeholder=parent.usersArr.data.records[0].email;
            input[5].placeholder=parent.usersArr.data.records[0].tel;
            $(".unload").click(function () {
                $(".file").click();

            });
            $(".file").change(function () {
                var src=$(this).val();
                var a=src.split("\\")[2];
                parent.usersArr.data.records[0].img="../images/information/"+src.split("\\")[2] ;
                console.log(parent.usersArr.data.records[0].img);
                $(".photo img").attr("src","../images/information/"+src.split("\\")[2]);
            });

            $(".submit").click(function () {
                if($("input").eq(0).val()!=""){
                    parent.usersArr.data.records[0].username=$("input").eq(0).val();

                }
                if($("input").eq(1).val()!=""){
                    parent.usersArr.data.records[0].name=$("input").eq(1).val();
                }
                if($("input").eq(2).val()!=""){
                    parent.usersArr.data.records[0].age=$("input").eq(2).val();
                }
                if($("input").eq(3).val()!=""){
                    parent.usersArr.data.records[0].taste=$("input").eq(3).val();
                }
                if($("input").eq(4).val()!=""){
                    parent.usersArr.data.records[0].email=$("input").eq(4).val();
                }
                if($("input").eq(5).val()!=""){
                    parent.usersArr.data.records[0].tel=$("input").eq(5).val();
                }
                parent.$('.head').css('background',"url("+ parent.usersArr.data.records[role-1].img+") no-repeat center");

                parent.$('.head').css("background-size","cover");

                alert("设置成功");
                parent.localStorage.setItem('departData', JSON.stringify(parent.departData));
                parent.localStorage.setItem('staffData', JSON.stringify(parent.staffArr.data.records));
                parent.localStorage.setItem('staffTotal', parent.staffArr.data.total);
                parent.localStorage.setItem('userData', JSON.stringify(parent.usersArr.data.records));
                parent.localStorage.setItem('studentData', JSON.stringify(parent.studentData));
                parent.localStorage.setItem('classData', JSON.stringify(parent.classData));
                information();
            });
        }
        if(role==2){
            $(".photo img").attr("src",parent.usersArr.data.records[1].img);
            val[0].innerText=parent.usersArr.data.records[1].username;
            val[1].innerText=parent.usersArr.data.records[1].name;
            val[2].innerText=parent.usersArr.data.records[1].age;
            val[3].innerText=parent.usersArr.data.records[1].taste;
            val[4].innerText=parent.usersArr.data.records[1].email;
            val[5].innerText=parent.usersArr.data.records[1].tel;
            input[0].placeholder=parent.usersArr.data.records[1].username;
            input[1].placeholder=parent.usersArr.data.records[1].name;
            input[2].placeholder=parent.usersArr.data.records[1].age;
            input[3].placeholder=parent.usersArr.data.records[1].taste;
            input[4].placeholder=parent.usersArr.data.records[1].email;
            input[5].placeholder=parent.usersArr.data.records[1].tel;
            $(".unload").click(function () {
                $(".file").click();

            });
            $(".file").change(function () {
                var src=$(this).val();
                parent.usersArr.data.records[1].img="../images/information/"+src.split("\\")[2];
                $(".photo img").attr("src","../images/information/"+src.split("\\")[2]);
            });
            $(".submit").click(function () {
                if($("input").eq(0).val()!=""){
                    parent.usersArr.data.records[1].username=$("input").eq(0).val();

                }
                if($("input").eq(1).val()!=""){
                    parent.usersArr.data.records[1].name=$("input").eq(1).val();
                }
                if($("input").eq(2).val()!=""){
                    parent.usersArr.data.records[1].age=$("input").eq(2).val();
                }
                if($("input").eq(3).val()!=""){
                    parent.usersArr.data.records[1].taste=$("input").eq(3).val();
                }
                if($("input").eq(4).val()!=""){
                    parent.usersArr.data.records[1].email=$("input").eq(4).val();
                }
                if($("input").eq(5).val()!=""){
                    parent.usersArr.data.records[1].tel=$("input").eq(5).val();
                }
                // parent.$('.head').css('background',"url("+ parent.usersArr.data.records[role-1].img+") no-repeat center");
                //
                // parent.$('.head').css("background-size","cover");

                alert("设置成功");
                information()
            });
        }
        if(role==3){
            $(".photo img").attr("src",parent.usersArr.data.records[2].img);
            val[0].innerText=parent.usersArr.data.records[2].username;
            val[1].innerText=parent.usersArr.data.records[2].name;
            val[2].innerText=parent.usersArr.data.records[2].age;
            val[3].innerText=parent.usersArr.data.records[2].taste;
            val[4].innerText=parent.usersArr.data.records[2].email;
            val[5].innerText=parent.usersArr.data.records[2].tel;
            input[0].placeholder=parent.usersArr.data.records[2].username;
            input[1].placeholder=parent.usersArr.data.records[2].name;
            input[2].placeholder=parent.usersArr.data.records[2].age;
            input[3].placeholder=parent.usersArr.data.records[2].taste;
            input[4].placeholder=parent.usersArr.data.records[2].email;
            input[5].placeholder=parent.usersArr.data.records[2].tel;
            $(".unload").click(function () {
                $(".file").click();

            });
            $(".file").change(function () {
                var src=$(this).val();
                // var a=src.split("\\")[2];
                parent.usersArr.data.records[2].img="../images/information/"+src.split("\\")[2];
                $(".photo img").attr("src","../images/information/"+src.split("\\")[2]);
            });
            $(".submit").click(function () {
                if($("input").eq(0).val()!=""){
                    parent.usersArr.data.records[2].username=$("input").eq(0).val();
                }
                if($("input").eq(1).val()!=""){
                    parent.usersArr.data.records[2].name=$("input").eq(1).val();
                }
                if($("input").eq(2).val()!=""){
                    parent.usersArr.data.records[2].age=$("input").eq(2).val();
                }

                if($("input").eq(3).val()!=""){
                    parent.usersArr.data.records[2].taste=$("input").eq(3).val();
                }
                if($("input").eq(4).val()!=""){
                    parent.usersArr.data.records[2].email=$("input").eq(4).val();
                }
                if($("input").eq(5).val()!=""){
                    parent.usersArr.data.records[2].tel=$("input").eq(5).val();
                }
                parent.$('.head').css('background',"url("+ parent.usersArr.data.records[role-1].img+") no-repeat center");

                parent.$('.head').css("background-size","cover");

                alert("设置成功");
                information()
            });
        }
        $(".reset").click(function () {
            $("input").val("");
            return false;
        });

    }
    $(".paw").blur(function () {
        var val=$(this).val();
        console.log(val);
        if(val.match(/^\d{6}$/)){
            $(".warn").text("");
            $(".warn").css("display","none")
        }else {
            $(".warn").text("密码必须为六位数字！");
            $(".warn").css("display","inline-block")
        }
    });
    $(".paw2").blur(function () {
        var val=$(this).val();
        if(val== $(".paw").val()){
            $(".warn-a").text("");
            $(".warn-a").css("display","none")
        }else {
            $(".warn-a").text("两次密码必须一致！");
            $(".warn-a").css("display","inline-block")
        }
    });
    $(".p-submit").click(function () {

        if($(".paw").val().match(/^\d{6}$/)&&$(".paw2").val()==$(".paw").val()){
            parent.usersArr.data.records[role-1].password=$(".paw").val();
            parent.localStorage.setItem('departData', JSON.stringify(parent.departData));
            parent.localStorage.setItem('staffData', JSON.stringify(parent.staffArr.data.records));
            parent.localStorage.setItem('staffTotal', parent.staffArr.data.total);
            parent.localStorage.setItem('userData', JSON.stringify(parent.usersArr.data.records));
            parent.localStorage.setItem('studentData', JSON.stringify(parent.studentData));
            parent.localStorage.setItem('classData', JSON.stringify(parent.classData));
            parent.localStorage.setItem('publishDatas', JSON.stringify(parent.publishDatas));

            // parent.departData=JSON.parse(departArrL);
            // parent.staffArr.data.records=JSON.parse(staffStrL);
            // parent.usersArr.data.records=JSON.parse(usersStrL);
            function a() {
                parent.location.href = '../login.html?'
            }
            $(".pick").slideDown();
            setTimeout(a,3000)

        }
        return false;
    });

    // 初始化
    information();



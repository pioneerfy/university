var currPage = 1;
var totalCount,
    dataList=[];
window.onload = function() {
    $.each(parent.classData, function (i) {
        $("#proSelect").append("<option value='" + i + "'>" + parent.classData[i].className + "</option>");
        $("#addProSelect").append("<option value='" + i + "'>" + parent.classData[i].className + "</option>");
        $("#instructorSelect").append("<option value='" + i + "'>" + parent.classData[i].instructor + "</option>");
        $("#addInstructorSelect").append("<option value='" + i + "'>" + parent.classData[i].instructor + "</option>");
    });

    $('#searchResult').hide();
    //初始化弹出框
    $(function () {
        $('[data-toggle="popover"]').popover()
    });
    //模态框关闭事件
    $('[data-dismiss]').on('click',function () {
        $('.popover').parent().find('.pop').trigger('click');
        nameIsOver_edit=false;
        telIsOver_edit=false;
        birthIsOver_edit=false;
        addressIsOver_edit=false;
    });
    /* 新增 */
    $('.add').click(function () {
        $('#addModal').modal();
        $('#addModal .popover').css('display','none');
        $('#addModal').find('#addId').val(parseInt(parent.studentData[parent.studentData.length-1].id)+1);
        $('#addModal').find('#addName').val('');
        $('#addModal').find('#age').val('');
        $('#addModal').find('#birthDate').val('');
        $('#addModal').find('#addTel').val('');
        $('#addModal').find('#addAddress').val('');
        $('#addModal').find('#addProSelect').find("option:eq(0)").prop('selected',true);
        $('#addModal').find('#addInstructorSelect').find("option:eq(0)").prop('selected',true);
        $('#addModal').find('#addRank').find("option:eq(0)").prop('selected',true);
        $('#addModal').find('.pop').css('visibility','hidden');
        nameIsOver_add=false;
        telIsOver_add=false;
        birthIsOver_add=false;
        addressIsOver_add=false;
        $('#addProSelect').change(function () {
            $('#addInstructorSelect').get(0).options[$('#addProSelect').prop('selectedIndex')].selected=true;
        });
        $('#addModal').find('#btn-add').off('click').click(function () {
            var obj={
                id: $('#addModal').find('#addId').val(),
                name: $('#addModal').find('#addName').val(),
                className: $('#addModal').find('#addProSelect').find("option:selected").text(),
                sex: $('input:radio[name="sex"]:checked').val(),
                age: (new Date().getFullYear())-$('#addModal').find('#birthDate').val().split('-')[0],
                birthDate: $('#addModal').find('#birthDate').val(),
                instructor: $('#addModal').find('#addInstructorSelect').find("option:selected").text(),
                tel: $('#addModal').find('#addTel').val(),
                address: $('#addModal').find('#addAddress').val(),
                rank: $('#addModal').find('#addRank').find("option:selected").text(),
                "attendTime": "",
                "dismissTime": "",
                "status": "",
                "reason":""
            }
            parent.studentData.push(obj);

            $('.allDel').show().siblings().show();
            // $table.show();
            $("#all").prop("checked", false);
            $("#addModal").modal('hide');
            load('','');
            $.each(parent.classData, function (i) {
                if (obj.className==parent.classData[i].className){
                    parent.classData[i].nums++;
                }
            });
        });
    });
    // 新增模态框验证
    var nameIsOver_add=false;
    $('#addName').on('input',function () {
        if($(this).val().length>10){
            if(!nameIsOver_add) {
                $(this).parent().find('.popover-content').text('长度不能大于10字符');
                $(this).parent().find('.pop').trigger('click');
                $(this).parent().find('.pop').css('visibility','hidden');
                nameIsOver_add=true;
            }
        }else if($(this).val().length<=10&&$(this).val().length>0){
            $(this).parent().find('.pop').css('visibility','visible');
            if(nameIsOver_add) {
                $(this).parent().find('.pop').trigger('click');
                nameIsOver_add=false;
            }
        }else {
            if(nameIsOver_add==true) {
                $(this).parent().find('.popover-content').text('学生名称不能为空');
                $(this).parent().find('.pop').css('visibility','hidden');
            }else {
                $(this).parent().find('.pop').trigger('click');
                $(this).parent().find('.pop').css('visibility','hidden');
                $(this).parent().find('.popover-content').text('学生名称不能为空');
                nameIsOver_add=true;
            }
        }
        if($('#addName').parent().find('.pop').css('visibility')=='visible'&&$('#addTel').parent().find('.pop').css('visibility')=='visible'&&$('#birthDate').parent().find('.pop').css('visibility')=='visible'&&$('#addAddress').parent().find('.pop').css('visibility')=='visible'){
            $('#btn-add').attr('disabled',false);
        }else {
            $('#btn-add').attr('disabled',true);
        }
    });
    var telIsOver_add=false;
    $('#addTel').on('input',function () {
        if(!$(this).val().match(/^1[34578]\d{9}$/)){
            if(!telIsOver_add) {
                $(this).parent().find('.pop').trigger('click');
                $(this).parent().find('.pop').css('visibility', 'hidden');
                telIsOver_add=true;
            }
            if($(this).val().length==0){
                $(this).parent().find('.popover-content').text('手机号码不能为空');
            }else {
                console.log(telIsOver_add);
                $(this).parent().find('.popover-content').text('手机号码格式不正确');
            }
        }else{
            $(this).parent().find('.pop').css('visibility','visible');
            if(telIsOver_add) {
                $(this).parent().find('.pop').trigger('click');
                telIsOver_add=false;
            }
        }
        if($('#addName').parent().find('.pop').css('visibility')=='visible'&&$('#addTel').parent().find('.pop').css('visibility')=='visible'&&$('#birthDate').parent().find('.pop').css('visibility')=='visible'&&$('#addAddress').parent().find('.pop').css('visibility')=='visible'){
            $('#btn-add').attr('disabled',false);
        }else {
            $('#btn-add').attr('disabled',true);
        }
    });
    var birthIsOver_add=false;
    $('#birthDate').on('input',function () {
        if(!$(this).val().match(/^[12]\d{3}[-](0[123456789]|1[012])[-](0[1-9]|[12][0-9]|3[01])$/)){
            if(!birthIsOver_add) {
                $(this).parent().find('.pop').trigger('click');
                $(this).parent().find('.pop').css('visibility', 'hidden');
                birthIsOver_add=true;
            }
            if($(this).val().length==0){
                $(this).parent().find('.popover-content').text('生日不能为空');
            }else {
                $(this).parent().find('.popover-content').text('日期格式为1996-08-09');
            }
        }else{
            $(this).parent().find('.pop').css('visibility','visible');
            if(birthIsOver_add) {
                $(this).parent().find('.pop').trigger('click');
                birthIsOver_add=false;
            }
        }
        if($('#addName').parent().find('.pop').css('visibility')=='visible'&&$('#addTel').parent().find('.pop').css('visibility')=='visible'&&$('#birthDate').parent().find('.pop').css('visibility')=='visible'&&$('#addAddress').parent().find('.pop').css('visibility')=='visible'){
            $('#btn-add').attr('disabled',false);
        }else {
            $('#btn-add').attr('disabled',true);
        }
    });
    var addressIsOver_add=false;
    $('#addAddress').on('input',function () {
        console.log(addressIsOver_add);
        if($(this).val().length<2&&$(this).val().length>0){
            $(this).parent().find('.popover-content').text('长度不能小于2字符');
            if(!addressIsOver_add) {
                $(this).parent().find('.pop').trigger('click');
                $(this).parent().find('.pop').css('visibility','hidden');
                addressIsOver_add=true;
            }
        }else if($(this).val().length>=2){
            $(this).parent().find('.popover').hide();
            $(this).parent().find('.pop').css('visibility','visible');
            if(addressIsOver_add) {
                $(this).parent().find('.pop').trigger('click');
                addressIsOver_add=false;
            }
        }else {
            if(addressIsOver_add==true) {
                $(this).parent().find('.popover-content').text('家庭地址不能为空');
                $(this).parent().find('.pop').css('visibility','hidden');
            }else {
                $(this).parent().find('.pop').trigger('click');
                $(this).parent().find('.pop').css('visibility','hidden');
                $(this).parent().find('.popover-content').text('家庭地址不能为空');
                addressIsOver_add=true;
            }
        }
        if($('#addAddress').parent().find('.pop').css('visibility')=='visible'&&$('#addTel').parent().find('.pop').css('visibility')=='visible'&&$('#birthDate').parent().find('.pop').css('visibility')=='visible'&&$('#addAddress').parent().find('.pop').css('visibility')=='visible'){
            $('#btn-add').attr('disabled',false);
        }else {
            $('#btn-add').attr('disabled',true);
        }
    });

    // 修改模态框验证
    // $('#btn-save').attr('disabled',true);
    var nameIsOver_edit=false;
    $('#name').on('input',function () {
        if($(this).val().length>10){
            if(!nameIsOver_edit) {
                $(this).parent().find('.popover-content').text('长度不能大于10字符');
                $(this).parent().find('.pop').trigger('click');
                $(this).parent().find('.pop').css('visibility','hidden');
                nameIsOver_edit=true;
            }
        }else if($(this).val().length<=10&&$(this).val().length>0){
            $(this).parent().find('.pop').css('visibility','visible');
            if(nameIsOver_edit) {
                $(this).parent().find('.pop').trigger('click');
                nameIsOver_edit=false;
            }
        }else {
            if(nameIsOver_edit==true) {
                $(this).parent().find('.popover-content').text('学生姓名不能为空');
                $(this).parent().find('.pop').css('visibility','hidden');
            }else {
                $(this).parent().find('.pop').trigger('click');
                $(this).parent().find('.pop').css('visibility','hidden');
                $(this).parent().find('.popover-content').text('学生姓名不能为空');
                nameIsOver_edit=true;
            }
        }
        $('#btn-save').attr('disabled',nameIsOver_edit||telIsOver_edit||birthIsOver_edit||addressIsOver_edit);
    });
    var telIsOver_edit=false;
    $('#tel').on('input',function () {
        if(!$(this).val().match(/^1[34578]\d{9}$/)){
            if(!telIsOver_edit) {
                $(this).parent().find('.pop').trigger('click');
                $(this).parent().find('.pop').css('visibility', 'hidden');
                telIsOver_edit=true;
            }
            if($(this).val().length==0){
                $(this).parent().find('.popover-content').text('手机号码不能为空');
            }else {
                $(this).parent().find('.popover-content').text('手机号码格式不正确');
            }
        }else{
            $(this).parent().find('.pop').css('visibility','visible');
            if(telIsOver_edit) {
                $(this).parent().find('.pop').trigger('click');
                telIsOver_edit=false;
            }
        }
        $('#btn-save').attr('disabled',nameIsOver_edit||telIsOver_edit||birthIsOver_edit||addressIsOver_edit);
    });
    var birthIsOver_edit=false;
    $('#editBirthDate').on('input',function () {
        if(!$(this).val().match(/^[12]\d{3}[-](0[123456789]|1[012])[-](0[1-9]|[12][0-9]|3[01])$/)){
            if(!birthIsOver_edit) {
                $(this).parent().find('.pop').trigger('click');
                $(this).parent().find('.pop').css('visibility', 'hidden');
                birthIsOver_edit=true;
            }
            if($(this).val().length==0){
                $(this).parent().find('.popover-content').text('生日不能为空');
            }else {
                $(this).parent().find('.popover-content').text('日期格式为1996-08-09');
            }
        }else{
            $(this).parent().find('.pop').css('visibility','visible');
            if(birthIsOver_edit) {
                $(this).parent().find('.pop').trigger('click');
                birthIsOver_edit=false;
            }
        }
        $('#btn-save').attr('disabled',nameIsOver_edit||telIsOver_edit||birthIsOver_edit||addressIsOver_edit);
    });
    var addressIsOver_edit=false;
    $('#address').on('input',function () {
        if($(this).val().length>=2){
            $(this).parent().find('.popover').hide();
            $(this).parent().find('.pop').css('visibility','visible');
            if(addressIsOver_edit) {
                $(this).parent().find('.pop').trigger('click');
                addressIsOver_edit=false;
            }
        }else if($(this).val().length<2&&$(this).val().length>0){
            $(this).parent().find('.popover-content').text('长度不能小于2字符');
            if(!addressIsOver_edit) {
                $(this).parent().find('.pop').trigger('click');
                $(this).parent().find('.pop').css('visibility','hidden');
                addressIsOver_edit=true;
            }
        }else {
            if(addressIsOver_edit==true) {
                $(this).parent().find('.popover-content').text('家庭地址不能为空');
                $(this).parent().find('.pop').css('visibility','hidden');
            }else {
                $(this).parent().find('.pop').trigger('click');
                $(this).parent().find('.pop').css('visibility','hidden');
                $(this).parent().find('.popover-content').text('家庭地址不能为空');
                addressIsOver_edit=true;
            }
        }
        $('#btn-save').attr('disabled',nameIsOver_edit||telIsOver_edit||birthIsOver_edit||addressIsOver_edit);
    });

    load('','');
};
    function load(instructor,name) {
        var limit = 10;
        data(currPage, limit,instructor,name);

        $('#callBackPager').extendPagination({
            totalCount: totalCount,
            limit: limit,
            callback: function(curr, limit) {
                data(curr, limit,instructor,name);
            }
        });
    }
    //查找
    $('#selectInstructor').focus(function () {
        $('#searchResult').hide();
    });
    $('#selectName').focus(function () {
        $('#searchResult').hide();
    });
    $('#search-btn').click(function () {
        var selectInstructor=$('#selectInstructor').val();
        var selectName=$('#selectName').val();
        load(selectInstructor,selectName);
    });
    $('#searchAll-btn').click(function () {
        load('','');
    });
    function data(curr,limit,instructor,name) {
        totalCount=parent.studentData.length;
        if(instructor!=''||name!=''){
            totalCount=0;
            dataList=[];
            for(var i=0;i<parent.studentData.length;i++){
                if(($.trim(instructor)!='')&&($.trim(name)!='')){
                    if((parent.studentData[i].instructor.search(instructor)>-1)&&(parent.studentData[i].name.search(name)>-1)){
                        dataList.push(parent.studentData[i]);
                        totalCount++;
                    }
                }
                if(($.trim(instructor)=='')&&($.trim(name)!='')){
                    if((parent.studentData[i].name.search(name)>-1)){
                        dataList.push(parent.studentData[i]);
                        totalCount++;
                    }
                }
                if(($.trim(instructor)!='')&&($.trim(name)=='')){
                    if((parent.studentData[i].instructor.search(instructor)>-1)){
                        dataList.push(parent.studentData[i]);
                        totalCount++;
                    }
                }
            }
            if(dataList.length==0){
                dataList=parent.studentData;
                totalCount=[];
                $('#searchResult').show();
            }
        }else {
            dataList=parent.studentData;
            $('#searchResult').hide();
        }
        createTable(curr,limit,totalCount)
    }
    function createTable(currPage, limit, total) {
        var html=[], showNum=limit;
        html.push('<table class="table table-striped ">');
        html.push(' <thead><tr><th>选择</th><th>ID</th><th>学生姓名</th><th>性别</th><th>年龄</th><th>出生日期</th><th>所属班级</th><th>辅导员</th><th>联系电话</th><th>家庭地址</th><th>年级</th><th>操作</th></thead><tbody>');
        if(total - (currPage * limit) < 0) {
            showNum = total - ((currPage - 1) * limit);
        }
        for(var i = 0; i < showNum; i++) {
            html.push('<tr data-index='+(i+((currPage-1) * limit))+'>');
            html.push('<td><input type="checkbox" class="choose" disabled></td>');
            html.push('<td>' + dataList[i+((currPage-1) * limit)].id + '</td>');
            html.push('<td>' + dataList[i+((currPage-1) * limit)].name + '</td>');
            html.push('<td>' + dataList[i+((currPage-1) * limit)].sex + '</td>');
            html.push('<td>' + dataList[i+((currPage-1) * limit)].age + '</td>');
            html.push('<td>' + dataList[i+((currPage-1) * limit)].birthDate + '</td>');
            html.push('<td>' + dataList[i+((currPage-1) * limit)].className + '</td>');
            html.push('<td>' + dataList[i+((currPage-1) * limit)].instructor + '</td>');
            html.push('<td>' + dataList[i+((currPage-1) * limit)].tel + '</td>');
            html.push('<td>' + dataList[i+((currPage-1) * limit)].address + '</td>');
            html.push('<td>' + dataList[i+((currPage-1) * limit)].rank + '</td>');
            html.push('<td><button class="edit"><span class="iconfont icon-xiugai"></span>编辑</button>' +
                '<button class="del btn-danger "><span class="iconfont icon-shanchu"></span>删除</button>' +
                '<button class="drop btn-danger"><span class="iconfont icon-guanbi"></span>退学' +
                '</button><button class="detail"><span class="iconfont icon-xiangqing"></span>详情</button></td>');
            html.push('</tr>');
        }
        html.push('</tbody></table>');
        var $table=$('.table');
        $table.empty();
        $table.html(html.join(''));


        /* 修改 */
        $('.edit').click(function () {
            $('#updateModal').modal();

            $('#updateModal').find('.pop').css('visibility','visible');

            $('#updateModal .popover').css('display','none');

            var index=$(this).parents('tr').data('index');
            var flag='';
            var classValue = null;
            // console.log(index);
            $.each(parent.studentData, function (i) {
                if (dataList[index].id==parent.studentData[i].id){
                    flag=i;
                    // console.log(flag);
                }
            });
            $('#updateModal').find('#studentId').val(parent.studentData[flag].id);
            $('#updateModal').find('#name').val( parent.studentData[flag].name);
            $('#updateModal').find(":radio[name='editSex'][value='" + parent.studentData[flag].sex + "']").prop("checked", "checked");
            // $('#updateModal').find('#editAge').val(parent.studentData[index].age);
            $('#updateModal').find('#editBirthDate').val( parent.studentData[flag].birthDate);
            $('#updateModal').find('#proSelect').find('option:contains('+parent.studentData[flag].className+')').prop('selected',true).siblings().removeAttr('selected');
            $('#updateModal').find('#instructorSelect').val(parent.studentData[flag].instructor);
            $('#updateModal').find('#tel').val( parent.studentData[flag].tel);
            $('#updateModal').find('#address').val( parent.studentData[flag].address);
            classValue = $('#updateModal').find('#proSelect').find("option:selected").text();
            if (parent.studentData[flag].rank=="已退学") {
                $("#updateModal #name").attr("readonly","readonly");
                $("#updateModal #editBirthDate").attr("readonly","readonly");
                $("#updateModal #tel").attr("readonly","readonly");
                $("#updateModal #address").attr("readonly","readonly");
                $("#updateModal #proSelect").attr("disabled","disabled");
                $('#updateModal #item5').attr("disabled","disabled");
                $('#updateModal #item6').attr("disabled","disabled");
            }else {
                $("#updateModal #name").removeAttr("readonly");
                $("#updateModal #editBirthDate").removeAttr("readonly");
                $("#updateModal #tel").removeAttr("readonly");
                $("#updateModal #address").removeAttr("readonly");
                $("#updateModal #proSelect").removeAttr("disabled");
                $('#updateModal #item5').removeAttr("disabled");
                $('#updateModal #item6').removeAttr("disabled");
            }
            $('#proSelect').change(function () {
                $.each(parent.classData, function (i) {
                    if ($('#updateModal').find('#proSelect').find("option:selected").text()==parent.classData[i].className){
                        $('#updateModal').find('#instructorSelect').val(parent.classData[i].instructor);
                    }
                });
            });
            $('#updateModal').find('#btn-save').off('click').click(function () {
                if ($('#updateModal').find('#proSelect').find("option:selected").text() != classValue) {
                    $.each(parent.classData, function (j) {
                        if (parent.studentData[flag].className==parent.classData[j].className){
                            parent.classData[j].nums--;
                        }
                    });
                }
                parent.studentData[flag].id=$('#updateModal').find('#studentId').val();
                parent.studentData[flag].name=$('#updateModal').find('#name').val();
                parent.studentData[flag].sex=$('input:radio[name="editSex"]:checked').val();
                parent.studentData[flag].age=(new Date().getFullYear())-$('#updateModal').find('#editBirthDate').val().split('-')[0];
                parent.studentData[flag].birthDate=$('#updateModal').find('#editBirthDate').val();
                parent.studentData[flag].className=$('#updateModal').find('#proSelect').find("option:selected").text();
                parent.studentData[flag].instructor=$('#updateModal').find('#instructorSelect').val();
                parent.studentData[flag].tel=$('#updateModal').find('#tel').val();
                parent.studentData[flag].address=$('#updateModal').find('#address').val();
                console.log(parent.studentData[flag]);
                $('.allDel').show().siblings().show();
                // $table.show();
                $("#all").prop("checked", false);
                $("#updateModal").modal('hide');
                load('','');
                data(currPage, limit,'','');
                if ($('#updateModal').find('#proSelect').find("option:selected").text() != classValue) {
                    $.each(parent.classData, function (j) {
                        if (parent.studentData[flag].className==parent.classData[j].className){
                            parent.classData[j].nums++;
                        }
                    });
                }
            });
        });
        /* 删除 */
        $('.del').click(function () {
            var index=$(this).parents('tr').data('index');
            $('#deleteModal').modal();
            $('#deleteModal').find('#btn-del').off('click').click(function () {
                var flag='';
                $.each(parent.studentData, function (i) {
                    if (dataList[index].id==parent.studentData[i].id){
                        flag=i;
                    }
                });
                $.each(parent.classData, function (j) {
                    if (parent.studentData[flag].className==parent.classData[j].className){
                        parent.classData[j].nums--;
                    }
                });
                parent.studentData.splice(flag, 1);
                $("#deleteModal").modal('hide');
                // load('','');
                data(currPage, limit,'','');
                if (showNum==1){
                    load('','');
                }
            });
        });
        /* 退学 */
        $('.drop').click(function () {
            var index=$(this).parents('tr').data('index');
            var flag='';
            $.each(parent.studentData, function (i) {
                if (dataList[index].id==parent.studentData[i].id){
                    flag=i;
                }
            });
            if (dataList[index].rank=="已退学") {
                $('#hasEndAlertModal').modal();
            }else {
                $('#endModal').modal();
                $('#endModal').find('#btn-end').off('click').click(function () {
                    // console.log(index);
                    // console.log(flag);
                    parent.studentData[flag].rank="已退学";
                    // $('.drop').parent().parent().children(0).get(10).setAttribute("color","red");
                    $('.allDel').show().siblings().show();
                    // $table.show();
                    $("#all").prop("checked", false);
                    $("#endModal").modal('hide');
                    data(currPage, limit,'','');
                    // $.each(parent.classData, function (j) {
                    //     if (parent.studentData[flag].className==parent.classData[j].className){
                    //         parent.classData[j].nums--;
                    //     }
                    // });
                });
            }
        });
        /* 详情 */
        $('.detail').click(function (){
            $('#detailModal').modal();
            var index=$(this).parents('tr').data('index');var flag='';
            $.each(parent.studentData, function (i) {
                if (dataList[index].id==parent.studentData[i].id){
                    flag=i;
                }
            });
            $('#detailModal').find('#detailId').val(parent.studentData[flag].id);
            $('#detailModal').find('#detailStudentName').val( parent.studentData[flag].name);
            $(":radio[name='detailSex'][value='" + parent.studentData[flag].sex + "']").prop("checked", "checked");
            $('#detailModal').find('#detailAge').val( parent.studentData[flag].age);
            $('#detailModal').find('#detailBirthDate').val( parent.studentData[flag].birthDate);
            $('#detailModal').find('#detailProSelect').val( parent.studentData[flag].className);
            $('#detailModal').find('#detailInstructorSelect').val( parent.studentData[flag].instructor);
            $('#detailModal').find('#detailTel').val( parent.studentData[flag].tel);
            $('#detailModal').find('#detailAddress').val( parent.studentData[flag].address);
            $('#detailModal').find('#detailRank').val( parent.studentData[flag].rank);
            // $('#detailModal').find('#detailStatus').val( parent.studentData[index].status);
        });

        /* 全选 */
        $('.allDel').click(function () {
            var allChecked=$('#all').get(0);
            if (allChecked.checked){
                $('#deleteModal').modal();
                $('#deleteModal h4').text('删除数据');
                $('#deleteModal .modal-body').text('确认删除当前页所有数据吗？');
                $('#deleteModal').find('#btn-del').off('click').click(function () {
                    var flag;
                    if (showNum==limit) {
                        flag=limit;
                    }else {
                        flag=dataList.length-(currPage-1)*limit;
                    }
                    for (var j=(currPage-1)*limit;j<((currPage-1)*limit)+flag;j++) {
                        for (var k=0;k<parent.classData.length;k++) {
                            if (parent.classData[k].className==dataList[j].className){
                                parent.classData[k].nums--;
                            }
                        }
                    }
                    parent.studentData.splice((currPage-1)*limit,flag);

                    if (parent.studentData.length==0) {
                        $('.allDel').hide().siblings().hide();
                        // $table.hide();
                    }
                    $("#deleteModal").modal('hide');
                    // load('','');
                    // data(currPage,limit,'','');
                    // if (showNum==1){
                        load('','');
                    // }
                });
            }else {
                $('#delAlertModal').modal();
                $('#delAlertModal .modal-body').text('请选择当前页所有数据！！');
            }
        });

        if($('#all').is(':checked')){
            $('.choose').prop('checked',true);
        }else {
            $('.choose').prop('checked',false);
        }

    }
    //全部删除
    $(document).on('click','#all',function(){
        if($(this).is(":checked")){
            $('.choose').prop('checked',true);
        }else{
            $('.choose').prop('checked',false);
        }
    });
    /*$('#selectClassname').on("change",function () {
        text = $('#selectClassname').find("option:selected").text();
        if ($("option:selected",this).index()!=0) {
            $("tr").not('tr:first').hide().filter(":contains('" + text + "')").show();
        }else {
            $('tr').show();
        }
    });*/
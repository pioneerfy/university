var status1=true;
var currPage = 1;
var totalCount,
    dataList=[];
window.onload = function() {
    $.each(parent.classData, function (i) {
        $("#editClassNameSelect").append("<option value='" + i + "'>" + parent.classData[i].className + "</option>");
        // $("#editInstructorSelect").append("<option value='" + i + "'>" + parent.classData[i].instructor + "</option>");
        // $("#addInstructor").append("<option value='" + i + "'>" + parent.classData[i].instructor + "</option>");
    });
    load('');
    status1=!status1;
    // $('body').css("padding-right")
};
function load(endText) {
    var limit = 10;
    data(currPage, limit,endText);

    $('#callBackPager').extendPagination({
        totalCount: totalCount,
        limit: limit,
        callback: function(curr, limit) {
            data(curr, limit,endText);
        }
    });

}

//查找
$('.endSelect').click(function () {
    var endText='已毕业';
    load(endText);
    status1=!status1;
});
function data(curr,limit,txt) {
    totalCount=parent.classData.length;
    if (!status1){
        totalCount=0;
        dataList=[];
        for(var i=0;i<parent.classData.length;i++) {
            if (parent.classData[i].status.search(txt) > -1) {
                dataList.push(parent.classData[i]);
                totalCount++;
            }
        }
        $('.endSelect').text("展示所有班级");
    }else {
        dataList = parent.classData;
        $('.endSelect').text("查看毕业班级");
    }
    // status1=!status1;
    createTable(curr,limit,totalCount);
}
function createTable(currPage, limit, total) {
    var html=[], showNum=limit;
    html.push('<table class="table table-striped " name="table">');
    html.push(' <thead><tr><th>ID</th><th>班级名称</th><th>年级</th><th>人数</th><th>辅导员</th><th>是否毕业</th><th>操作</th></thead><tbody>');
    if(total - (currPage * limit) < 0) {
        showNum = total - ((currPage - 1) * limit)  //最后一页显示剩余条数
    }
    for(var i = 0; i < showNum; i++) {
        html.push('<tr data-index='+(i+((currPage-1) * limit))+'>');
        // html.push('<td><input type="checkbox" class="choose"></td>');
        html.push('<td>' + dataList[i+((currPage-1) * limit)].id + '</td>');
        html.push('<td>' + dataList[i+((currPage-1) * limit)].className + '</td>');
        html.push('<td>' + dataList[i+((currPage-1) * limit)].grade + '</td>');
        html.push('<td>' + dataList[i+((currPage-1) * limit)].nums + '</td>');
        html.push('<td>' + dataList[i+((currPage-1) * limit)].instructor + '</td>');
        html.push('<td>' + dataList[i+((currPage-1) * limit)].status + '</td>');
        html.push('<td><button class="edit"><span class="iconfont icon-xiugai"></span>编辑</button>' +
            '<button class="del btn-danger "><span class="iconfont icon-shanchu"></span>删除</button>' +
            '<button class="up btn-danger "><span class="iconfont icon-shangyiji"></span>升班</button>' /*+
                            '<button class="end">毕业</button></td>'*/);
        html.push('</tr>');
    }
    html.push('</tbody></table>');
    var $table=$('.table');
    $table.empty();
    $table.html(html.join(''));

    /* 修改 */
    $('.edit').click(function () {
        $('#updateModal').modal();
        // $('body').attr('style','padding:0');
        var index=$(this).parents('tr').data('index');
        var flag='';
        $.each(parent.classData, function (i) {
            if (dataList[index].id==parent.classData[i].id){
                flag=i;
            }
        });
        $('#updateModal').find('#classId').val(parent.classData[flag].id);
        $('#updateModal').find('#editClassNameSelect').val(parent.classData[flag].className);
        $('#updateModal').find('#editRankSelect').find('option:contains('+parent.classData[flag].grade+')').prop('selected',true).siblings().removeAttr('selected');
        // $('#updateModal').find("#editRankSelect").find("option:selected").text( parent.classData[index].grade);
        $('#updateModal').find('#classNum').val( parent.classData[flag].nums);
        $('#updateModal').find('#editInstructorSelect').find('option:contains('+parent.classData[flag].instructor+')').prop('selected',true).siblings().removeAttr('selected');
        $('#updateModal').find('#classState').val( parent.classData[flag].status);
        if (parent.classData[flag].status=="已毕业"){
            $('#updateModal').find('#editRankSelect').attr("disabled","disabled"); //年级
            $('#updateModal').find('#editInstructorSelect').attr("disabled","disabled"); //辅导员
        }else if (parent.classData[flag].nums<=0){
            $('#updateModal').find('#editRankSelect').attr("disabled","disabled");
            $('#updateModal').find('#editInstructorSelect').attr("disabled",false);
        }else {
            $('#updateModal').find('#editRankSelect').attr("disabled",false);
            $('#updateModal').find('#editInstructorSelect').attr("disabled",false);
        }
        $('#editRankSelect').change(function () {
            if ((new Date().getFullYear()-parseInt($('#updateModal').find("#editRankSelect").find("option:selected").text()))>4){
                $('#updateModal').find('#classState').val("已毕业");
            }else {
                if ((new Date().getFullYear()-parseInt($('#updateModal').find("#editRankSelect").find("option:selected").text()))==4){
                    $('#updateModal').find('#classState').val("大四");
                }
                if ((new Date().getFullYear()-parseInt($('#updateModal').find("#editRankSelect").find("option:selected").text()))==3){
                    $('#updateModal').find('#classState').val("大三");
                }
                if ((new Date().getFullYear()-parseInt($('#updateModal').find("#editRankSelect").find("option:selected").text()))==2){
                    $('#updateModal').find('#classState').val("大二");
                }
                if ((new Date().getFullYear()-parseInt($('#updateModal').find("#editRankSelect").find("option:selected").text()))==1){
                    $('#updateModal').find('#classState').val("大一");
                }
            }
        });
        $('#updateModal').find('#btn-save').off('click').click(function () {
            $('body').attr('style','padding:0');
            parent.classData[flag].id=$('#updateModal').find('#classId').val();
            parent.classData[flag].className=$('#updateModal').find('#editClassNameSelect').val();
            parent.classData[flag].grade=$('#updateModal').find("#editRankSelect").find("option:selected").text();
            parent.classData[flag].nums=$('#updateModal').find('#classNum').val();
            parent.classData[flag].instructor=$('#updateModal').find('#editInstructorSelect').find("option:selected").text();
            parent.classData[flag].status=$('#updateModal').find('#classState').val();
            data(currPage, limit );
            $("#updateModal").modal('hide');
            if ($('#updateModal').find('#classState').val()=="已毕业") {
                $("#upEndModal").modal();
                $('body').attr('style','padding:0');
                $('#upEndModal').find('#btn-upEnd').off('click').click(function () {
                    $("#upEndModal").modal('hide');
                });
                // alert('祝贺本班已经毕业！！');
            }
        });
    });

    /* 删除 */
    $('.del').click(function () {
        var ra=$($(this).parents('tr').children()[0]).children()[0];
        var index=$(this).parents('tr').data('index');
        var flag='';
        $.each(parent.classData, function (i) {
            if (dataList[index].id==parent.classData[i].id){
                flag=i;
            }
        });

        if (parent.classData[flag].nums<=0) {
            $('#deleteModal').modal();
            $('#deleteModal').find('#btn-del').off('click').click(function () {
                parent.classData.splice(flag, 1);
                $("#deleteModal").modal('hide');
                data(currPage, limit ,'');
                if (showNum==1){
                    load('','');
                }
                // load('');
            });
        }else {
            $('#delAlertModal').modal();
            $('#delAlertModal').find('.modal-body').text("该班还存在学生，不能删除！！");
        }
    });

    /* 升班 */
    $('.up').click(function () {
        var index = $(this).parents('tr').data('index');
        var flag = '';
        $.each(parent.classData, function (i) {
            if (dataList[index].id == parent.classData[i].id) {
                flag = i;
            }
        });
        if (parent.classData[flag].status == "已毕业") {
            $('#upFalseModal').modal();
        } else if (parent.classData[flag].nums<=0){
            $('#upAlertModal').modal();
        }else {
            $('#upModal').modal();
            $('#upModal').find('#btn-up').off('click').click(function () {
                $("#upModal").modal('hide');
                parent.classData[flag].grade=parseInt(parent.classData[flag].grade)-1;
                if ((new Date().getFullYear()-parseInt(parent.classData[flag].grade))>4){
                    parent.classData[flag].status="已毕业";
                }else {
                    if ((new Date().getFullYear()-parseInt(parent.classData[flag].grade))==4){
                        parent.classData[flag].status="大四";
                    }
                    if ((new Date().getFullYear()-parseInt(parent.classData[flag].grade))==3){
                        parent.classData[flag].status="大三";
                    }
                    if ((new Date().getFullYear()-parseInt(parent.classData[flag].grade))==2){
                        parent.classData[flag].status="大二";
                    }
                    if ((new Date().getFullYear()-parseInt(parent.classData[flag].grade))==1){
                        parent.classData[flag].status="大一";
                    }
                }
                if (parseInt(parent.classData[flag].grade)<2015){
                    $('body').attr('style','padding:0');
                    $("#upEndModal").modal();
                }
                data(currPage, limit );
            });
        }
    });

    /* 新增 */
    $('.add').click(function () {
        $('#addModal').modal();
        if (parent.classData.length==0) {
            $('#addModal').find('#addId').val('170100');
        } else{
            $('#addModal').find('#addId').val(parseInt(parent.classData[parent.classData.length-1].id)+100);
        }
        $('#addModal').find('#addName').find("option:eq(0)").prop('selected',true);
        $('#addModal').find('#addInstructor').find("option:eq(0)").prop('selected',true);

        $('#addModal').find('#btn-add').off('click').click(function () {
            var obj={
                id: $('#addModal').find('#addId').val(),
                className: $('#addModal').find('#addName').find("option:selected").text(),
                nums: '0',
                instructor: $('#addModal').find('#addInstructor').find("option:selected").text(),
                grade: $('#addModal').find('#addRankSelect').val(),
                status: ""
            };
            if ((new Date().getFullYear()-obj.grade)>4){
                obj.status="已毕业";
            }else {
                if ((new Date().getFullYear()-obj.grade)==4){
                    obj.status="大四";
                }
                if ((new Date().getFullYear()-obj.grade)==3){
                    obj.status="大三";
                }
                if ((new Date().getFullYear()-obj.grade)==2){
                    obj.status="大二";
                }
                if ((new Date().getFullYear()-obj.grade)==1){
                    obj.status="大一";
                }
            }
            var flag=true;
            $.each(parent.classData, function (i) {
                // 若班级名存在相同，则不能添加
                if (obj.className==parent.classData[i].className){
                    flag=false;
                    $('body').attr('style','padding:0');
                    $('#addAlertModal').modal();
                }else {
                    flag == true;
                }
            });

            if (flag){
                parent.classNameArr.push(obj.className);
                parent.instructorArr.push(obj.instructor);
                parent.classData.push(obj);
            }

            $('.allDel').show().siblings().show();
            $table.show();

            $("#addModal").modal('hide');
            load('');
        });
    });

    /* 全选 */
    /*$('.allDel').click(function () {
        var allChecked=$('#all').get(0);
        if (allChecked.checked){
            $('#deleteAllModal').modal();
            $('#deleteAllModal').find('#btn-delAll').off('click').click(function () {
                parent.classData.splice((currPage-1) * limit,parent.classData.length-(currPage-1) * limit);
                if (parent.classData.length==0) {
                    $('.allDel').hide().siblings().hide();
                    // $table.hide();
                }
                $("#deleteAllModal").modal('hide');
                load('');
            });
        }else {
            $('#delAllAlertModal').modal();
        }
    });
    if($('#all').is(':checked')){
        $('.choose').prop('checked',true);
    }else {
        $('.choose').prop('checked',false);
    }*/
}
//删除
/*
$(document).on('click','#all',function(){
    if($(this).is(":checked")){
        $('.choose').prop('checked',true);
    }else{
        $('.choose').prop('checked',false);
    }
});*/

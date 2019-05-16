$(function () {
    var currPage = 1,now = 1;
    var limit = 15;
    var totalCount,dataList = [];
    load();


    /**
     *渲染数据
     */
    function load() {
        var name = $('#s_name').val();
        var state = $('#s_state').val();
        currPage=now;
        data(currPage, limit,name,state);
        // createTable(1, limit, totalCount);
        $('#callBackPager').extendPagination({
            totalCount: totalCount,
            limit: limit,
            callback: function(curr, limit,name,state) {
                data(curr, limit,name,state);
            }
        });
    }
    /**
     * 获取考勤的数据
     */
    function  data(curr,limit,name,state) {
        for (var i=0;i<parent.studentData.length;i++){
            if (name !="" && state !=""){
                if (parent.studentData[i].name.search(name) != -1  && parent.studentData[i].status.search( state) !=-1  ){
                    dataList.push(parent.studentData[i]);
                }
            }else if (name !="" && state =="") {
                if (parent.studentData[i].name.search(name) != -1 ){
                    dataList.push(parent.studentData[i]);
                }
            }else if (name =="" && state !="") {
                if (parent.studentData[i].status.search( state) !=-1 ){
                    dataList.push(parent.studentData[i]);
                }
            }
        }
        if ($('#s_name').val() =='' && $('#s_state').val()=='') {
            dataList=parent.studentData;
        }
        totalCount=dataList.length;
        createTable(curr,limit,totalCount);
    }

    /**
     * 创建表
     * @param currPage
     * @param limit
     * @param total
     */
    function createTable(currPage, limit, total) {
        var showNum=limit;
        $('.table-out').html(" ");
        //表格主体
        var $table = $('<table class="table table-striped">\n' +
            '            <thead>\n' +
            '            <tr>\n' +
            '                <th>学号</th>\n' +
            '                <th>姓名</th>\n' +
            '                <th>班级</th>\n' +
            '                <th>年级</th>\n' +
            '                <th>进入时间</th>\n' +
            '                <th>离开时间</th>\n' +
            '                <th>电话</th>\n' +
            '                <th>班主任</th>\n' +
            '                <th>状态</th>\n' +
            '                <th>操作</th>\n' +
            '            </tr>\n' +
            '            </thead>\n' +
            '            <tbody class="tbody">\n' +
            '           \n' +
            '            </tbody>\n' +
            '\n' +
            '        </table>');
        $('.table-out').append($table);
            if(total - (currPage * limit) < 0) {
                showNum = total - ((currPage - 1) * limit);
            }
            for (var i=0;i<showNum;i++){
                var reg = /\d/g;
                var attendTime = dataList[i + ((currPage - 1) * limit)].attendTime;
                var bt = Number(attendTime.split(":").join(""));
                var departureTime = dataList[i + ((currPage - 1) * limit)].departureTime;
                var et = Number(departureTime.split(":").join(""));

                var $tr = $('<tr data-index='+(i+((currPage-1) * limit))+'>\n' +
                    '                 <td>'+dataList[i+((currPage-1) * limit)].id+'</td>\n' +
                    '                <td>'+dataList[i+((currPage-1) * limit)].name+'</td>\n' +
                    '                <td>'+dataList[i+((currPage-1) * limit)].className+'</td>\n' +
                    '                <td>'+dataList[i+((currPage-1) * limit)].grade+'</td>\n' +
                    '                <td>'+dataList[i+((currPage-1) * limit)].attendTime+'</td>\n' +
                    '                <td>'+dataList[i+((currPage-1) * limit)].departureTime+'</td>\n' +
                    '                <td>'+dataList[i+((currPage-1) * limit)].tel+'</td>\n' +
                    '                <td>'+dataList[i+((currPage-1) * limit)].instructor+'</td>\n' +
                    '                <td>'+dataList[i+((currPage-1) * limit)].status+'</td>\n' +
                    '                <td><button class="detail"><span class="iconfont icon-xiangqing"></span>详情</button></td>\n' +
                    '            </tr>');
                $('.tbody').append($tr);
            }


        /**
         * 查看详情
         */
        $('.detail').click(function () {
            $('#detailModal').modal();
            var index=$(this).parents('tr').data('index');
            now = Math.ceil(index/limit);
            $('#detailModal').find('#ID').val(parent.studentData[index].id);
            $('#detailModal').find('#name').val( parent.studentData[index].name);
            $('#detailModal').find('#class').val( parent.studentData[index].className);
            $('#detailModal').find('#grade').val( parent.studentData[index].grade);
            $('#detailModal').find('#time').val( parent.studentData[index].attendTime+'-'+parent.studentData[index].departureTime);
            $('#detailModal').find('#tel').val(parent.studentData[index].tel);
            $('#detailModal').find('#teacher').val( parent.studentData[index].instructor);
            $('#detailModal').find('#state').val( parent.studentData[index].status);
            $('#detailModal').find('#reason').val( parent.studentData[index].reason);

            $('#detailModal').find('#btn-save').off('click').click(function () {
                if (now == 0){
                    now = 1;
                }
                parent.studentData[index].status=$('#detailModal').find('#state').val();
                parent.studentData[index].reason=$('#detailModal').find('#reason').val();
                $("#detailModal").modal('hide');

                data(currPage, limit,name,state);
            });
        });
    }
    /**
     * 查找
     */
    $('.search-btn').click(function () {
        dataList = [];
        load();
        if (dataList ==''){
            $('.noinfo').addClass('noinfo-show');
        }else{
            $('.noinfo').removeClass('noinfo-show');
        }
    });
    /**
     * 显示所有
     */
    $('.search-all').click(function () {
        console.log(11);
        dataList=parent.studentData;
        load();
        $('.noinfo').removeClass('noinfo-show');
    })
});



window.onload=function () {
    if(localStorage.getItem('userData')){
        usersArr.data.records=JSON.parse(localStorage.getItem('userData'));
    }
    $('.page-container form').submit(function () {
        var username = $(this).find('.username').val();
        var password = $(this).find('.password').val();
        for (var i = 0; i < usersArr.data.records.length; i++) {
            if (username == usersArr.data.records[i].username && password == usersArr.data.records[i].password) {
                location.href = "pages/main.html?role=" + usersArr.data.records[i].role + "&" + usersArr.data.records[i].username  + "&" + usersArr.data.records[i].means;
                return false;
            }
        }
        for (var i = 0; i < usersArr.data.records.length; i++) {
            if (username != usersArr.data.records[i].username && password != usersArr.data.records[i].password) {
                $(this).find('.error').fadeOut('fast', function () {
                    $(this).css('top', '96px');
                });
                $(this).find('.error').fadeIn('fast', function () {
                    $(this).parent().find('.password').focus();
                });
                return false;
            }
        }
        if (username == '') {
            $(this).find('.error').fadeOut('fast', function () {
                $(this).css('top', '27px');
            });
            $(this).find('.error').fadeIn('fast', function () {
                $(this).parent().find('.username').focus();
            });
            return false;
        }
        if (password == '') {
            $(this).find('.error').fadeOut('fast', function () {
                $(this).css('top', '96px');
            });
            $(this).find('.error').fadeIn('fast', function () {
                $(this).parent().find('.password').focus();
            });
            return false;
        }
    });

    $('.page-container form .username, .page-container form .password').keyup(function () {
        $(this).parent().find('.error').fadeOut('fast');
    });
    // var pra = location.href.split("?")[1].split("&&")[0];
    // var role = location.href.split("?")[1].split("&&")[1];

    // console.log(pra);

    // if (!isNaN(pra)) {
    //     usersArr.data.records[role - 1].password = pra
    // }
    // for (var z = 0; z <usersArr.data.records.length; z++) {
    //     if (usersArr.data.records[z].username == location.href.split("=")[1].split("&")[1]) {
    //         usersArr.data.records[z].role = location.href.split("=")[1].split("&")[0];
    //     }
    //
    // }
};
        



(function () {
    /****************************点击菜单按钮动画**************************************/
    var animMenu = $(".navbar-toggle");
    var flag = true;
    animMenu.on({
        click: function () {
            if (flag) {
                //                $(this).children('.menu-btn').addClass('menu-show-btn').children('.menu-show-line-m').fadeOut(300);
                $(this).toggleClass('menu-line-show');
                $(".menu-line-m").fadeToggle("fast");
                $(".menu .active").parents(".menu,.category").slideDown("fast");
                flag = false;
            } else {
                //                $(this).children('.menu-btn').removeClass('menu-show-btn').children('.menu-show-line-m').fadeIn(300);
                $(this).toggleClass('menu-line-show');
                $(".menu-line-m").fadeToggle("fast");
                $(".menu .active").parents(".menu,.category").slideUp("fast");
                flag = true;
            }
        }
    });

    /*判断手机与PC*/
    if ($(window).width() < 768) {
        $('.category>.pages').append("<li class='page'><a href='\/'>返回开发文档<\/a><\/li><li class='page'><a href='https:\/\/www.wilddog.com'>返回官网<\/a><\/li>");
    }
})();
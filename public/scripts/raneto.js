(function ($, hljs) {
    $(document).ready(function () {
        if ($('.content').length) {
            // Syntax highlighting
            hljs.initHighlightingOnLoad();
            $('.content table').addClass('table');
            // FitVids
            //            $('.content').fitVids();
        }
        if ($('.home-categories').length) {
            $('.home-categories').masonry({
                columnWidth: '.col',
                itemSelector: '.col',
                transitionDuration: 0
            });
        }
    });

})(jQuery, hljs);

//搜索
var searchStart = function (data) {
    if (data) {
        window.location.href = encodeURI("/?search=" + data);
    };
};

$(".search").click(function (event) {
    event.preventDefault();
    var searchContent = $(this).siblings(".search-input").val();
    searchStart(searchContent);
});
$(window).keypress(function (event) {
    if (event.keyCode == 13) {
        //移动端还是pc端回车来搜素
        var searchContent = $(".searchbar").find(".search-input").val();
        searchStart(searchContent);
    }
});

function loadOver() {
    var tocFirstH = $(".toc>ul>li:first").outerHeight() + 43;
    var init = function () {
        var a = $(window.location.hash);
        $(".toc").animate({
            "height": tocFirstH
        }, 300);
        setTimeout(function () {
            $(".toc").parent().siblings('.content').fadeIn(300);
            if (a.length != 0) {
                $("html,body").scrollTop(a.offset().top);
            }
        }, 350);
        var headingLi = $(".toc>ul>li");
        if (!headingLi.find("ul").length) {
            headingLi.css({
                "padding-bottom": 0
            });
        }
        var headingLiLength = headingLi.length;
        for (var i = 0; i < headingLiLength; i++) {
            var smallLiArr = headingLi.eq(i);
            //            var smallLiArray = smallLiArr.find('li');
            if (smallLiArr.parent("ul").outerHeight() < tocFirstH) {
                smallLiArr.parent("ul").siblings('.wd-font').hide();
            };
        };
    }
    init();

    /*api文档顶部目录动画*/
    var flag = true;
    var animateHeight;
    $(".toc .wd-font").click(function (event) {
        animateHeight = $(".toc").children('ul').outerHeight() + 45;
        if (flag) {
            $(this).html("R").parent(".toc").animate({
                "height": animateHeight
            });
            flag = false;
        } else {
            $(this).html("4").parent(".toc").animate({
                "height": tocFirstH
            });
            flag = true;
        }
    });

    /*返回顶部按钮*/
    var backTop = $(".back-top");
    var windHeight = $(window).height();
    var scrollT;
    $(window).scroll(function (event) {
        scrollT = $(window).scrollTop();
        if (scrollT > windHeight) {
            backTop.fadeIn(300);
        } else {
            backTop.fadeOut(300);
        }
    });
    backTop.click(function (event) {
        $(window).scrollTop(0);
    });
    
    $(".api-content-text h6").prev().css("margin-bottom","1.5rem");
};
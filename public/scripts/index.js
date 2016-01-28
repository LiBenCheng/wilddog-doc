//知识库首页背景滑动效果
/*var scrollElelength = $(".item").length;
var bgFrame = $(".bg-frame");
var bgouterWidth = $(".item").outerWidth();
$(".item").hover(function (event) {
    var index = $(this).index();
    var bgSlideLength = (bgouterWidth * index) + 10;
    var flagBoolean = bgFrame.css("display");
    if (flagBoolean === "none") {
        bgFrame.css("left", bgSlideLength).show();
    } else {
        bgFrame.stop().animate({
            "left": bgSlideLength
        }, 300).show();
    }
});*/

(function () {
    $(".item").mouseenter(function (event) {
        $(this).children(".bg-frame").show();
    }).mouseleave(function () {
        $(this).children(".bg-frame").hide();
    });
    var windowWidth = $(window).width();
    if (windowWidth < 1300) {
        $("#item1").click(function () {
            window.location.href = "/overview/guide"
        });
        $("#item2").click(function () {
            window.location.href = "/questions"
        });
        $("#item3").click(function () {
            window.location.href = "/video"
        });
        $("#item4").click(function () {
            window.location.href = "https://blog.wilddog.com/"
        });
    }
    var menuShow = true;
    $(".navbar-toggle").on("click", function () {
        if (menuShow) {
            $(this).toggleClass('menu-line-show');
            $(".menu-line-m").fadeToggle("fast");
            $(".header").slideDown("fast")
            menuShow = false;
        } else {
            $(this).toggleClass('menu-line-show');
            $(".menu-line-m").fadeToggle("fast");
            $(".header").slideUp("fast")
            menuShow = true;
        }
    });
})();
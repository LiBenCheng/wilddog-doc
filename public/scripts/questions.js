(function () {
    $(".menu .category").click(function () {
            $(this).addClass("active").siblings(".category").removeClass("active");
        })
        //    var flag = true;
    $(".content-text li .question").click(function () {
        var flag = $(this).siblings(".answer").css("display");
    /*    console.log(flag);*/
        if (flag == "none") {
            $(this).children("i").removeClass("icon-48").addClass("icon-47");
            $(this).siblings(".answer").show();
        } else {
            $(this).children("i").removeClass("icon-47").addClass("icon-48");
            $(this).siblings(".answer").hide();
        }
    });
})()
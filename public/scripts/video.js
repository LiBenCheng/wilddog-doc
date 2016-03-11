$(function() {
    $('video').mediaelementplayer({
        // if the <video width> is not specified, this is the default
        //            defaultVideoWidth: 480,
        // if the <video height> is not specified, this is the default
        //            defaultVideoHeight: 270,
        // if set, overrides <video width>
        videoWidth: -1,
        // if set, overrides <video height>
        videoHeight: -1,
        // width of audio player
        //            audioWidth: 400,
        // height of audio player
        //            audioHeight: 30,
        // initial volume when the player starts
        startVolume: 0.8,
        // useful for <audio> player loops
        loop: false,
        // enables Flash and Silverlight to resize to content size
        enableAutosize: true,
        // the order of controls you want on the control bar (and other plugins below)
        features: ['playpause', 'progress', 'current', 'duration', 'tracks', 'volume', 'fullscreen'],
        // Hide controls when playing and mouse is not over the video
        alwaysShowControls: false,
        // force iPad's native controls
        iPadUseNativeControls: false,
        // force iPhone's native controls
        iPhoneUseNativeControls: false,
        // force Android's native controls
        AndroidUseNativeControls: false,
        // forces the hour marker (##:00:00)
        alwaysShowHours: false,
        // show framecount in timecode (##:00:00:00)
        showTimecodeFrameCount: false,
        // used when showTimecodeFrameCount is set to true
        framesPerSecond: 10,
        // turns keyboard support on and off for this instance
        enableKeyboard: true,
        // when this player starts, it will pause other players
        pauseOtherPlayers: true,
        // array of keyboard commands
        keyActions: []
    });
});

$(function() {
    $(".card").hover(function(e) {
        $(this).children(".card-text").show();
    }, function() {
        $(this).children(".card-text").hide();
    });

    $(".video-selects li").click(function() {
        var index = $(this).index();
        $(this).addClass("active").siblings().removeClass("active");
        $(".video-selected li").eq(index).addClass("active").siblings().removeClass("active");
    });

    $(".video-selected li").click(function() {
        var index = $(this).index();
        $(".wrap-bg").show();
        $(".wrap-bg").children(".video-overall").eq(index).show();
    });



    //点击出现下拉菜单
    $(".func-1").click(function(event) {
        var e = window.event || event;
        if (e.stopPropagation) {
            e.stopPropagation();
        } else {
            e.cancelBubble = true;
        }
        //阻止冒泡
        $(this).siblings("ul").slideDown();
        $(".func-2").siblings("ul").slideUp(100);
    });

    $(".func-2").click(function(event) {
        var e = window.event || event;
        if (e.stopPropagation) {
            e.stopPropagation();
        } else {
            e.cancelBubble = true;
        }
        //阻止冒泡
        $(this).siblings("ul").slideDown();
        $(".func-1").siblings("ul").slideUp(100);
    });

    $(".main-func ul").click(function(event) {
        var e = window.event || event;
        if (e.stopPropagation) {
            e.stopPropagation();
        } else {
            e.cancelBubble = true;
        }
    });

    document.onclick = function() {
        $(".main-func ul").slideUp(100);
    };

    $(".cards .card").click(function() {

        $(".wrap-bg").show();
        $(this).children(".video-overall").show();
    });


    $(".video-overall .video-cancel").click(function(e) {
        event.stopPropagation();
        $(".wrap-bg").hide();
        $(this).parent(".video-overall").hide();
        var currentVideo = $(this).parent(".video-overall").find("video.video-player")[0]
        currentVideo.pause();
    });


    var funcLi = $(".main-function-1 ul li");
    var timeLi = $(".main-function-2 ul li");

    /*类别分组*/
    var cardsArr = new Array();
    cardsArr[0] = "";
    cardsArr[1] = "tiro";
    cardsArr[2] = "js";
    cardsArr[3] = "ios";
    cardsArr[4] = "c";

    /*类别分类*/
    funcLi.click(function() {
        var index = $(this).index();
        var type = cardsArr[index];
        var liText = $(this).text();
        $(".cards .card").show();
        if (index !== 0) {
            $(".cards .card[data-type!=" + type + "]").hide();
        }

        $(".main-function-1 ul").slideUp(100);
        $(".func-1 .li-text").text(liText);
    });



    /*时间分类*/
    var dateTime = $(".card .card-bottom .card-date");
    var timeCardsArr = new Array;
    var cardJQ = $(".cards .card");
    cardJQ.each(function(index) {
        var thisObj = $(this);
        var dateTimeText = $(this).find(".card-date").text();
        var dateNum = Date.parse(dateTimeText);
        timeCardsArr.push({
            Date: dateNum,
            Obj: thisObj
        });
    });

    timeLi.click(function() {
        var index = $(this).index();
        var liText = $(this).text();
        //重新生成排好序的数组
        if (index == 0) {
            timeCardsArr.sort(function(a, b) {
                return b.Date - a.Date;
            });
        } else {
            timeCardsArr.sort(function(a, b) {
                return a.Date - b.Date;
            });
        }
        for (i = 0; i < cardJQ.length; i++) {
            $(".cards").append(timeCardsArr[i].Obj);
        };
        $(".main-function-2 ul").slideUp(100);
        $(".func-2 .li-text").text(liText);
    });

    timeLi.eq(0).click();
});

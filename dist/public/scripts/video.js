$(function(){$("video").mediaelementplayer({videoWidth:-1,videoHeight:-1,startVolume:.8,loop:!1,enableAutosize:!0,features:["playpause","progress","current","duration","tracks","volume","fullscreen"],alwaysShowControls:!1,iPadUseNativeControls:!1,iPhoneUseNativeControls:!1,AndroidUseNativeControls:!1,alwaysShowHours:!1,showTimecodeFrameCount:!1,framesPerSecond:10,enableKeyboard:!0,pauseOtherPlayers:!0,keyActions:[]})}),$(function(){$(".card").hover(function(){$(this).children(".card-text").show()},function(){$(this).children(".card-text").hide()}),$(".video-selects li").click(function(){var i=$(this).index();$(this).addClass("active").siblings().removeClass("active"),$(".video-selected li").eq(i).addClass("active").siblings().removeClass("active")}),$(".video-selected li").click(function(){var i=$(this).index();$(".wrap-bg").show(),$(".wrap-bg").children(".video-overall").eq(i).show()}),$(".func-1").click(function(i){var e=window.event||i;e.stopPropagation?e.stopPropagation():e.cancelBubble=!0,$(this).siblings("ul").slideDown(),$(".func-2").siblings("ul").slideUp(100)}),$(".func-2").click(function(i){var e=window.event||i;e.stopPropagation?e.stopPropagation():e.cancelBubble=!0,$(this).siblings("ul").slideDown(),$(".func-1").siblings("ul").slideUp(100)}),$(".main-func ul").click(function(i){var e=window.event||i;e.stopPropagation?e.stopPropagation():e.cancelBubble=!0}),document.onclick=function(){$(".main-func ul").slideUp(100)},$(".video-cancel").on("click",function(){var e=$(".video-overall video");for($(this).parents(".wrap-bg").hide(),$(this).parents(".wrap-bg").children(".video-overall").hide(),i=0;i<e.length;i++)$(".video-overall video")[i].pause()}),$(".cards .card").click(function(){var i=$(this).index();$(".wrap-bg").show(),$(".wrap-bg").children(".video-overall").eq(i).show()});var e=$(".main-function-1 ul li"),t=$(".main-function-2 ul li"),n=new Array;n[0]="",n[1]="tiro",n[2]="js",n[3]="ios",n[4]="c",e.click(function(){var i=$(this).index(),e=n[i],t=$(this).text();$(".cards .card").show(),0!==i&&$(".cards .card[data-type!="+e+"]").hide(),$(".main-function-1 ul").slideUp(100),$(".func-1 .li-text").text(t)});var a=($(".card .card-bottom .card-date"),new Array),o=$(".cards .card");o.each(function(i){var e=$(this),t=$(this).find(".card-date").text(),n=Date.parse(t);a.push({Date:n,Obj:e})}),t.click(function(){var e=$(this).index(),t=$(this).text();for(0==e?a.sort(function(i,e){return e.Date-i.Date}):a.sort(function(i,e){return i.Date-e.Date}),i=0;i<o.length;i++)$(".cards").append(a[i].Obj);$(".main-function-2 ul").slideUp(100),$(".func-2 .li-text").text(t)}),t.eq(0).click()});
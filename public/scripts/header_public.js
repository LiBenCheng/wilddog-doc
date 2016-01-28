var searchStart = function (data) {
    if(data){
    window.location.href = encodeURI("/?search=" + data);
    };
};
$(".search").click(function(){
        var searchContent = $(this).siblings(".search-input").val(); 
        searchStart(searchContent);
});
$(window).keypress(function(event) {
    if(event.keyCode==13){
        if( $(".header-mobile").css("display") == "none" ) {
            var searchContent = $(".header-right").find(".search-input").val(); 
            searchStart(searchContent);
        }else {
            var searchContent = $(".header-mobile").find(".search-input").val(); 
            searchStart(searchContent);
        }
    }
});
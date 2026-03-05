$.getJSON("_ajax/cooperation.json", function(data){
    var output = "";
    for (var i in data.cooperation) {
        output += '<a class="fade-in-top box ' + data.cooperation[i].tag + '" href="' + data.cooperation[i].link + '" target="_blank"><img src="' + data.cooperation[i].img + '"><button type="button" onclick="window.open('+ data.cooperation[i].link + ')">前往專區</button></a>'
    }
    document.getElementById("cooperation_list").innerHTML = output;
})

$("#cooperation_filter span").click(function(){
    var type = $(this).text();

    $(this).addClass("active").siblings().removeClass("active");

    if (type == "權益兌換") {
        $("#cooperation_list").find(".box").hide();
        setTimeout(() => {
            $("#cooperation_list").find(".right").show();
        }, 100);
        
    } else if (type == "紅利兌換") {
        $("#cooperation_list").find(".box").hide();
        setTimeout(() => {
            $("#cooperation_list").find(".point").show();
        }, 100);
        
    } else {
        $("#cooperation_list").find(".box").hide();
        setTimeout(() => {
             $("#cooperation_list").find(".box").show();
        }, 100);
    }

})
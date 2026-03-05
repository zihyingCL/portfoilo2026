$.getJSON("_ajax/faq.json", function(data){
    var simOutput = "";
    var simCount = 0;
    for (var i in data.sim) {
        simCount += 1;
        simOutput += '<div class="faq__row">'+
        '<button type="button" data-bs-toggle="collapse" data-bs-target="#sim-Q' + simCount + '" class="collapsed" aria-expanded="false">'+
        '<span>Q' + simCount + '.</span><p>' + data.sim[i].question + '</p></button>'+
        '<div class="collapse" id="sim-Q' + simCount + '"><div class="body">'+
        '<span>A' + simCount + '.</span><div class="col"><p>' + data.sim[i].answer + '</p></div></div></div>'+
        '</div>'
    }
    document.getElementById("simFAQ").innerHTML = simOutput;

    var esimOutput = "";
    var esimCount = 0;
    for (var i in data.esim) {
        esimCount += 1;
        esimOutput += '<div class="faq__row">'+
        '<button type="button" data-bs-toggle="collapse" data-bs-target="#esim-Q' + esimCount + '" class="collapsed" aria-expanded="false">'+
        '<span>Q' + esimCount + '.</span><p>' + data.esim[i].question + '</p></button>'+
        '<div class="collapse" id="esim-Q' + esimCount + '"><div class="body">'+
        '<span>A' + esimCount + '.</span><div class="col"><p>' + data.esim[i].answer + '</p></div></div></div>'+
        '</div>'
    }
    document.getElementById("esimFAQ").innerHTML = esimOutput;

    var wifiOutput = "";
    var wifiCount = 0;
    for (var i in data.wifi) {
        wifiCount += 1;
        wifiOutput += '<div class="faq__row">'+
        '<button type="button" data-bs-toggle="collapse" data-bs-target="#wifi-Q' + wifiCount + '" class="collapsed" aria-expanded="false">'+
        '<span>Q' + wifiCount + '.</span><p>' + data.wifi[i].question + '</p></button>'+
        '<div class="collapse" id="wifi-Q' + wifiCount + '"><div class="body">'+
        '<span>A' + wifiCount + '.</span><div class="col"><p>' + data.wifi[i].answer + '</p></div></div></div>'+
        '</div>'
    }
    document.getElementById("wifiFAQ").innerHTML = wifiOutput;

    var roamingOutput = "";
    var roamingCount = 0;
    for (var i in data.roaming) {
        roamingCount += 1;
        roamingOutput += '<div class="faq__row">'+
        '<button type="button" data-bs-toggle="collapse" data-bs-target="#roaming-Q' + roamingCount + '" class="collapsed" aria-expanded="false">'+
        '<span>Q' + roamingCount + '.</span><p>' + data.roaming[i].question + '</p></button>'+
        '<div class="collapse" id="roaming-Q' + roamingCount + '"><div class="body">'+
        '<span>A' + roamingCount + '.</span><div class="col"><p>' + data.roaming[i].answer + '</p></div></div></div>'+
        '</div>'
    }
    document.getElementById("roamingFAQ").innerHTML = roamingOutput;
})
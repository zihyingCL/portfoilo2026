//本來想用讀取json檔的方式，但一直跑錯誤就先放棄ㄌ有空再說

var esim_areaList = ["亞洲", "美洲", "大洋洲", "歐洲"]
var esimSelect = document.getElementById("esim-area");
var esimArea = "<option selected disabled hidden>請選擇洲別</option>";
for (var i = 0; i < esim_areaList.length; i++) {
    esimArea += '<option value="' + [i] + '">' + esim_areaList[i] + '</option>';
}
esimSelect.innerHTML = esimArea;

$("#esim-area").change(function () {
    switch (parseInt($(this).val())) {
        case 0:
            $("#esim-country option").remove();
            var esim_countryList = ["日本", "韓國", "新加坡", "馬來西亞", "印尼", "泰國", "柬埔寨", "越南", "菲律賓", "香港", "澳門", "中國", "杜拜"];
            $.each(esim_countryList, function (i, val) {
                $("#esim-country").append($("<option selected disabled hidden>請選擇國家</option><option value='" + esim_countryList[i] + "'>" + esim_countryList[i] + "</option>"));
            });
            $("#nav-esim .price__row").hide();
            setTimeout(() => {
                $("#nav-esim .price__row.asia").show();
            }, 10);
            break;
        case 1:
            $("#esim-country option").remove();
            var esim_countryList = ["美國", "加拿大"];
            $.each(esim_countryList, function (i, val) {
                $("#esim-country").append($("<option selected disabled hidden>請選擇國家</option><option value='" + esim_countryList[i] + "'>" + esim_countryList[i] + "</option>"));
            });
            $("#nav-esim .price__row").hide();
            setTimeout(() => {
            $("#nav-esim .price__row.usa").show();
        }, 10);
            break;
        case 2:
            $("#esim-country option").remove();
            var esim_countryList = ["澳洲", "紐西蘭"];
            $.each(esim_countryList, function (i, val) {
                $("#esim-country").append($("<option selected disabled hidden>請選擇國家</option><option value='" + esim_countryList[i] + "'>" + esim_countryList[i] + "</option>"));
            });
            $("#nav-esim .price__row").hide();
            setTimeout(() => {
            $("#nav-esim .price__row.ocea").show();
        }, 10);
            break;
        case 3:
            $("#esim-country option").remove();
            var esim_countryList = ["英國", "歐洲各國"];
            $.each(esim_countryList, function (i, val) {
                $("#esim-country").append($("<option selected disabled hidden>請選擇國家</option><option value='" + esim_countryList[i] + "'>" + esim_countryList[i] + "</option>"));
            });
            $("#nav-esim .price__row").hide();
            setTimeout(() => {
            $("#nav-esim .price__row.eup").show();
        }, 10);
            break;
    }
});

$("#esim-country").change(function(){
    var country = $(this).val();
    var searchCountry = ".country:contains('" + country + "')"

    $("#nav-esim .price__row").hide();
    setTimeout(() => {
    $(searchCountry).parents("#nav-esim .price__row").show();
}, 10);
})



var sim_areaList = ["亞洲", "美洲", "大洋洲", "歐洲"]
var simSelect = document.getElementById("sim-area");
var simArea = "<option selected disabled hidden>請選擇洲別</option>";
for (var i = 0; i < sim_areaList.length; i++) {
    simArea += '<option value="' + [i] + '">' + sim_areaList[i] + '</option>';
}
simSelect.innerHTML = simArea;

$("#sim-area").change(function () {
    switch (parseInt($(this).val())) {
        case 0:
            $("#sim-country option").remove();
            var sim_countryList = ["日本", "韓國", "新加坡", "馬來西亞", "印尼", "泰國", "柬埔寨", "越南", "菲律賓", "香港", "澳門", "中國", "杜拜"];
            $.each(sim_countryList, function (i, val) {
                $("#sim-country").append($("<option selected disabled hidden>請選擇國家</option><option value='" + sim_countryList[i] + "'>" + sim_countryList[i] + "</option>"));
            });
            $("#nav-sim .price__row").hide();
            setTimeout(() => {
            $("#nav-sim .price__row.asia").show();
        }, 10);
            break;
        case 1:
            $("#sim-country option").remove();
            var sim_countryList = ["美國", "加拿大"];
            $.each(sim_countryList, function (i, val) {
                $("#sim-country").append($("<option selected disabled hidden>請選擇國家</option><option value='" + sim_countryList[i] + "'>" + sim_countryList[i] + "</option>"));
            });
            $("#nav-sim .price__row").hide();
            setTimeout(() => {
            $("#nav-sim .price__row.usa").show();
        }, 10);
            break;
        case 2:
            $("#sim-country option").remove();
            var sim_countryList = ["澳洲", "紐西蘭", "帛琉"];
            $.each(sim_countryList, function (i, val) {
                $("#sim-country").append($("<option selected disabled hidden>請選擇國家</option><option value='" + sim_countryList[i] + "'>" + sim_countryList[i] + "</option>"));
            });
            $("#nav-sim .price__row").hide();
            setTimeout(() => {
            $("#nav-sim .price__row.ocea").show();
        }, 10);
            break;
        case 3:
            $("#sim-country option").remove();
            var sim_countryList = ["英國", "歐洲各國"];
            $.each(sim_countryList, function (i, val) {
                $("#sim-country").append($("<option selected disabled hidden>請選擇國家</option><option value='" + sim_countryList[i] + "'>" + sim_countryList[i] + "</option>"));
            });
            $("#nav-sim .price__row").hide();
            setTimeout(() => {
            $("#nav-sim .price__row.eup").show();
        }, 10);
            break;
    }
});

$("#sim-country").change(function(){
    var country = $(this).val();
    var searchCountry = ".country:contains('" + country + "')"

    $("#nav-sim .price__row").hide();
    setTimeout(() => {
    $(searchCountry).parents("#nav-sim .price__row").show();
}, 10);
})
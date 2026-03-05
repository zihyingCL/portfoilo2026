function callUseSlide() {
    $('.use-slide').slick({
        slidesToShow: 1,
        slidesToScroll: 1,
        infinite: true,
        arrows: true,
        prevArrow: '<div class="arr arr-left"><i class="fa-solid fa-chevron-left"></i></div>',
        nextArrow: '<div class="arr arr-right"><i class="fa-solid fa-chevron-right"></i></div>'
    });
}

function hideSimAndroid() {
    $("#sim-android").hide();
    $("#sim-ios").show();
}
function hideSimIOS() {
    $("#sim-android").show();
    $("#sim-ios").hide();
}

function hideESimAndroid() {
    $("#esim-android").hide();
    $("#esim-ios").show();
}
function hideESimIOS() {
    $("#esim-android").show();
    $("#esim-ios").hide();
}

$(document).ready(function(){
    setTimeout(() => {
    callUseSlide();
    hideSimAndroid();
    hideESimAndroid();
    }, 100);
})

$("#rental-tab button").click(function() {
    $('.use-slide').slick('refresh');
})

$("#nav-sim input[type='radio']").click(function(){
    if ($("#sim-radio-1").is(':checked') ) {
        hideSimAndroid();
        $('.use-slide').slick('refresh');
    } else if ($("#sim-radio-2").is(':checked') ) {
        hideSimIOS();
        $('.use-slide').slick('refresh');
    }
})

$("#nav-esim input[type='radio']").click(function(){
    if ($("#esim-radio-1").is(':checked') ) {
        hideESimAndroid();
        $('.use-slide').slick('refresh');
    } else if ($("#esim-radio-2").is(':checked') ) {
        hideESimIOS();
        $('.use-slide').slick('refresh');
    }
})
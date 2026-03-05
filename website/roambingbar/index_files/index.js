$(document).ready(function () {
    $('.slider-index').slick({
        dots: true,
        autoplay: true,
        autoplaySpeed: 5000,
        arrows: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        fade: true,
        cssEase: 'ease-in-out',
    });

    var wd = $('body').width();
    if (wd >= 1200) {
        $("navbar").hide();
        $(window).scroll(function () {
            var aTop = $('header').height();
            if ($(this).scrollTop() >= aTop) {
                $("navbar").show();
                $("navbar").addClass("in_scroll")
            } else {
                $("navbar").removeClass("in_scroll")
                $("navbar").hide();
            }
        });
    }
});


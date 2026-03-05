$(document).ready(function () {
    $(".navbar-brand.logo, .header").addClass("animated index");
})

// 首圖輪播
var bannerSwiper = new Swiper('.swiper-banner', {
    spaceBetween: 30,
    effect: "fade",
    navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
    },
    pagination: {
        el: ".swiper-pagination",
        clickable: true,
    },
    observer: true,
    observeParents: true,
    loop: true,
    autoplay: {
        delay: 5000,
        disableOnInteraction: false,
    },
});

// 停車場環境輪播
var NavSwiper = new Swiper(".swiper-nav", {
    // loop: true,
    spaceBetween: 16,
    slidesPerView: 3,
    freeMode: true,
    watchSlidesProgress: true,
    breakpoints: {
        1200: {
            slidesPerView: 6,
        },
        992: {
            slidesPerView: 5,
        },
        768: {
            slidesPerView: 4,
            spaceBetween: 28,
        }
    }
});

var ForSwiper = new Swiper(".swiper-for", {
    loop: true,
    spaceBetween: 100,
    effect: "fade",
    navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
    },
    thumbs: {
        swiper: NavSwiper,
    },
    autoplay: {
        delay: 2500,
        disableOnInteraction: false,
      },
});
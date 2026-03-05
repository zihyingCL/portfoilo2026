
//依照 link ?type= 的類型切換不同的 tab

const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const type = urlParams.get('type')

$(document).ready(function () {
  if (type == 'sim') {
    $("#nav-sim-tab").addClass("active");
    $("#nav-sim").addClass("show active");
  } else if (type == 'esim') {
    $("#nav-esim-tab").addClass("active");
    $("#nav-esim").addClass("show active");
  } else if (type == 'wifi') {
    $("#nav-wifi-tab").addClass("active");
    $("#nav-wifi").addClass("show active");
  } else if (type == 'roaming') {
    $("#nav-roaming-tab").addClass("active");
    $("#nav-roaming").addClass("show active");
  } else {
    $("#nav-sim-tab").addClass("active");
    $("#nav-sim").addClass("show active");
  }
});

//呼叫彈窗
function callSlide() {
  $('.modal-slide').slick({
    centerMode: true,
    centerPadding: '10rem',
    slidesToShow: 1,
    slidesToScroll: 1,
    infinite: true,
    focusOnSelect: true,
    arrows: true,
    prevArrow: '<div class="arr arr-left"><i class="fa-solid fa-chevron-left"></i></div>',
    nextArrow: '<div class="arr arr-right"><i class="fa-solid fa-chevron-right"></i></div>',
    responsive: [
      {
        breakpoint: 992,
        settings: {
          centerMode: false,
          centerPadding: "0rem"
        }
      }
    ]
  });

  setTimeout(() => {
    $("#renew-android").hide();
  }, 1);
};

$(".callDisrenew").click(function () {
  setTimeout('callSlide();', 155);
})

$("input[type='radio']").click(function () {
  if ($("#radio-1").is(':checked')) {
    $("#renew-ios").show();
    $("#renew-android").hide();
    $('.modal-slide').slick('refresh');
  } else if ($("#radio-2").is(':checked')) {
    $("#renew-ios").hide();
    $("#renew-android").show();
    $('.modal-slide').slick('refresh');
  }
})
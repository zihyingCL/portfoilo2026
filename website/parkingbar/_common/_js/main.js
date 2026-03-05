//Scrolling navbar
// var prevScrollpos = window.scrollY;
// window.onscroll = function () {
//   var currentScrollPos = window.scrollY;
//   if (prevScrollpos > currentScrollPos) {
//     document.getElementById("header").style.top = "0";
//   } else {
//     document.getElementById("header").style.top = "-200px";
//   }
//   prevScrollpos = currentScrollPos;
// }

//mobile menu
var backdrop = '<div class="modal-backdrop nav fade show"></div>'
$(".navbar-toggler").click(function () {
  if ($(this).hasClass("collapsed")) {
    $(".modal-backdrop.nav").remove();
  } else {
    // $("form").append(backdrop);
  }
})

// LOADING
const loaderBox = {
  className: 'loader-box',
  init: function () {
    const loaderBox = `
    <div class="${this.className}" style="display: none;">
      <div class="loader-stage">
        <div class="dot-carousel"></div>
      </div>
      <span class="loader-box__txt">LOADING</span>
    </div>
    `;

    $('body').append(loaderBox);
  },
  open: function () {
    document.querySelector('.' + this.className).style.cssText = 'display: block;';
  },
  close: function () {
    document.querySelector('.' + this.className).style.cssText = 'display: none;';
  }
}
loaderBox.init();

window.addEventListener('pageshow', function (e) {
  loaderBox.close();
}, false);

// ALERT
const modalBox = `
  <div class="modal fade" id="windowAlert" tabindex="-1">
    <div class="modal-dialog modal-dialog-centered modal-dialog-scrollable">
      <div class="modal-content">
        <div class="modal-body text-center">
          <div id="windowAlertMsg"></div>
          <div class="mt-4">
            <button type="button" class="btn btn-main">確定</button>
          </div>
        </div>
      </div>
    </div>
  </div>
`;
$('body').append(modalBox);

const windowAlert = function (msg, nextPage) {
  $('#windowAlertMsg').html(msg);
  $('#windowAlert .btn').click(function () {
    if (nextPage === undefined) {
      $('#windowAlert').modal('hide');
    } else {
      location.href = nextPage;
    }
  })
  $('#windowAlert').modal('show');
  $('*').css("animation","none")
};


//同意條款後才能預約
$(document).ready(function () {
  if ($("#agree1").is(":checked") && $("#agree2").is(":checked")) {
    $(".agree_btn").removeClass("disabled");
  } else {
    $(".agree_btn").addClass("disabled");
  }
})
$("#agree1").click(function () {
  if ($("#agree1").is(":checked") && $("#agree2").is(":checked")) {
    $(".agree_btn").removeClass("disabled");
  } else {
    $(".agree_btn").addClass("disabled");
  }
});
$("#agree2").click(function () {
  if ($("#agree1").is(":checked") && $("#agree2").is(":checked")) {
    $(".agree_btn").removeClass("disabled");
  } else {
    $(".agree_btn").addClass("disabled");
  }
});

//card number
function moveToNext(current, nextFieldId) {
  if (current.value.length >= current.maxLength) {
      $(nextFieldId).focus();
  }
}
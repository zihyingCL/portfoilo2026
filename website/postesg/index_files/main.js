//////////////////////////////////////
// FUNCTION
/* ==================== GOTOTOP ==================== */
let lastKnownScrollPosition = 0;
let ticking = false;

function scrollAcrion(scrollPos) {
  // gotoTop
  const gotop = document.querySelector(".gototop");

  if(scrollPos >= 400 && gotop.style.opacity == 0){
    fadeToggle(gotop);
  }else if(scrollPos < 400 && gotop.style.opacity == 1){
    fadeToggle(gotop);
  }

  // navbar
  const navbar = document.querySelector(".navbar");
  //const scrollDown = document.querySelector("#scroll-down");
  if(scrollPos >= 100){
    navbar.classList.add('inScroll');
    //scrollDown.classList.add('hide');
  }else if(scrollPos < 100){
    navbar.classList.remove('inScroll');
    //scrollDown.classList.remove('hide');
  }

  // top-price
  const jsAnchor = document.querySelector(".jsAnchor");
  const topPrice = document.querySelector(".top-price");
  if(jsAnchor && topPrice) {
    const vlArea = scrollPos + navbar.offsetHeight;
    const elArea = jsAnchor.offsetTop + jsAnchor.offsetHeight;

    // console.log('jsAnchor.offsetTop: ', jsAnchor.offsetTop);
    // console.log('navbar.offsetHeight: ', navbar.offsetHeight);
    // console.log('scrollPos: ', scrollPos);

    if(vlArea >= elArea){
      topPrice.classList.add('inScroll');
    }else{
      topPrice.classList.remove('inScroll');
    }
  }

  // index
  const indexBox1 = document.querySelector('.index-wrap__box1');
  if(indexBox1){
    const reactIndexBox1 = indexBox1.getBoundingClientRect();
    // console.log('reactIndexBox1.top: ', reactIndexBox1.top);
    // console.log('window.innerHeight: ', window.innerHeight);
    if(reactIndexBox1.top <= (window.innerHeight - 50) ){
      indexBox1.classList.add('showbg');
    }else{
      indexBox1.classList.remove('showbg');
    }
  }

  const indexBox3 = document.querySelector('.index-wrap-3__img');
  if(indexBox3){
    const reactIndexBox3 = indexBox3.getBoundingClientRect();
    if(reactIndexBox3.top <= (window.innerHeight - 50) ){
      indexBox3.classList.add('showbg');
    }else{
      indexBox3.classList.remove('showbg');
    }
  }
}

document.addEventListener('scroll', function(e) {
  lastKnownScrollPosition = window.scrollY;

  if (!ticking) {
    window.requestAnimationFrame(function() {
      scrollAcrion(lastKnownScrollPosition);
      ticking = false;
    });

    ticking = true;
  }
});

function fadeToggle(elemt) {
    let ispeed = 5;

    if(elemt.style.opacity == 0){

        let num = 0;
        let timer = setInterval(function(){
            num ++;
            elemt.style.opacity = num / 20;
            if(num >= 20) {
                clearInterval(timer);
            }
        }, ispeed);

    }else if(elemt.style.opacity == 1){

        let num = 20;
        let timer = setInterval(function(){
            num --;
            elemt.style.opacity = num / 20;
            if(num == 0) {
                clearInterval(timer);
            }
        }, ispeed);

    }
}

function scrollToTop(){
    window.scrollTo({top: 0, behavior: 'smooth'});
}


/* ==================== LOADING ==================== */
const loaderBox = {
    className: 'loader-box',
    init: function(){
      const loaderBox = `
      <div class="loader-box__txt load-9">
        <div class="spinner">
            <div class="bubble-1"></div>
            <div class="bubble-2"></div>
        </div>
        <p>Loading...</p>
      </div>
      `;

      const box = document.createElement('div');
      box.classList.add(this.className);
      box.innerHTML = loaderBox;
      document.body.appendChild(box);
    },
    open: function(){
      document.querySelector('.'+this.className).style.cssText = 'display: block;';
    },
    close: function(){
      document.querySelector('.'+this.className).style.cssText = 'display: none;';
    }
}
loaderBox.init();

window.addEventListener('pageshow', function (e) {
    loaderBox.close();
}, false);


/* ==================== ALERT ==================== */
const modalBox = `
  <div class="modal fade" id="windowAlert" tabindex="-1" aria-labelledby="windowAlertLabel" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered modal-sm modal-dialog-scrollable">
      <div class="modal-content">
        <div class="modal-body text-center">
          <div id="windowAlertMsg"></div>
          <div class="mt-4">
            <button type="button" class="btn btn-2">確定</button>
          </div>
        </div>
      </div>
    </div>
  </div>
`;
const alertModalBox = document.createElement('div');
alertModalBox.innerHTML = modalBox;
document.body.append(alertModalBox);

const alertModal = new bootstrap.Modal(document.getElementById('windowAlert'));
const windowAlert = function(msg, nextPage) {
    const windowAlertMsg = document.getElementById('windowAlertMsg');
    const windowAlert = document.getElementById('windowAlert');
    const modal = bootstrap.Modal.getInstance(windowAlert);

    windowAlertMsg.innerHTML = msg;

    const btn = document.querySelector('#windowAlert .btn');
    btn.addEventListener('click', function(){
    if(nextPage === undefined){
        alertModal.hide();
    }else{
        location.href=nextPage;
    }
    });
    alertModal.show();
};
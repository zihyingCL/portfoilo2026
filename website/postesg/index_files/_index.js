//////////////////////////////////////
// PLUGIN
let thumbnails;

function init() {
    var main = new Splide( '#index-carousel', {
        type       : 'fade',
        rewind     : 'true',
        //heightRatio: 0.5,
        pagination : false,
        autoplay   : true,
        interval   : 5000,
        speed      : 1300,
        arrows     : false,
        cover      : true,
        lazyLoad   : 'nearby',
        breakpoints : {
          768: {
            arrows : true,
          },
        },
      } );
      
      var thumbnails = new Splide( '#thumbnail-index', {
        rewind          : true,
        fixedWidth      : 120,
        fixedHeight     : 60,
        isNavigation    : true,
        gap             : 10,
        // focus           : 'center',
        pagination      : false,
        arrows          : true,
        cover           : true,
        lazyLoad   : 'nearby',
        dragMinThreshold: {
          mouse: 4,
          touch: 10,
        },
        breakpoints : {
          768: {
            fixedWidth      : 100,
            fixedHeight     : 60,
          },
          // 640: {
          //   fixedWidth  : 66,
          //   fixedHeight : 38,
          // },
        },
      } );
      
      main.sync( thumbnails );
      main.mount();
      thumbnails.mount();

    AOS.init();
}

// document.addEventListener( 'DOMContentLoaded', function () {
//     init();
// });


//////////////////////////////////////
// FUNCTION
/* ==================== FADE ==================== */
const createHero = function(url) {
    const hero = document.createElement('div');
    hero.classList.add('index-hero__img');
    hero.style.backgroundImage = 'url(' + url + ')';
    document.querySelector('.index-hero').append(hero);
}

const changeHero = function(next){
    const nextHero = createHero(indexHero[next].img2);

    let removeTarget = document.querySelectorAll('.index-hero__img');
    removeTarget = removeTarget[removeTarget.length-2];

    if(removeTarget){
      removeTarget.style.opacity = '0';
      removeTarget.style.zIndex = '2';
      setTimeout(() => removeTarget.remove(), 1000);
    }
}



//////////////////////////////////////
// VUE
const { createApp } = Vue;

const app = createApp({
    data() {
        return {
            data: null,
        }
    },
    created() {
        this.data = indexHero;
    },
    mounted() {
        init();
    },
}).mount('#app');
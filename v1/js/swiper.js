$(function () {
  function filterAnchor ($el) {
    var $parent = $el.parent(),
      // distance = $el.get(0).offsetLeft - 30;
      distance = $el.get(0).offsetLeft - 100;
    $parent.stop(0,1).animate({
      scrollLeft:distance
    },700)
  }
// swiper autoplay
  $('#hd .swiper-general').each(function(){
    var id = $(this).attr('id'),
        $swiperContainer = $('#' + id);
    var swiper = new Swiper('#'+id, {
      slidesPerView: 1,
      loop: false,
      // loopAdditionalSlides: 3,
      loopAddBlankSlides: false,
      loopPreventsSliding: true,
      grabCursor: true,
      slideToClickedSlide: true,
      // lazyPreloadPrevNext: 2,
      observer: true,
      observeParents: true,
      speed: 800,
      keyboard: {
        enabled: true,
        onlyInViewport: false
      },
      pagination:{
        enabled: true,
        el: '.swiper-pagination',
        clickable: true,
        renderBullet: function (index, className) {
          return `<button type="button" class="custom-dot ${className}">
                    <span class="custom-dot-progress"></span>
                    <span class="custom-dot-name">${this.slides[index].getAttribute('data-title')}</span>
                  </button>`;
        },
      },
      on:{
        slideChange: function(swiper){
          $swiperContainer.find('video').each(function(i, vid){
            vid.pause();
          })
          $swiperContainer.find('.vid-control').removeClass('hd-active');
          $swiperContainer.find('.vid-control').attr('aria-pressed', 'false');
          const slide = swiper.slides[swiper.activeIndex];
          let $vid = $(slide).find("video");
          if ($vid.length > 0) {
            $vid[0].play();
          }
        }
      }
    });
  })

// swiper autoplay
  $('#hd .swiper-autoplay').each(function(){
    var id = $(this).attr('id'),
        $swiperContainer = $('#' + id),
        $swiperPaueBtn = $swiperContainer.find('.swiper-pause-btn');
    var swiper = new Swiper('#'+id, {
      slidesPerView: 1,
      loop: false,
      // loopAdditionalSlides: 3,
      loopAddBlankSlides: false,
      loopPreventsSliding: true,
      grabCursor: true,
      slideToClickedSlide: true,
      // lazyPreloadPrevNext: 2,
      observer: true,
      observeParents: true,
      speed: 800,
      autoplay: {
        delay: 6000,
        disableOnInteraction: false
      },
      keyboard: {
        enabled: true,
        onlyInViewport: false
      },
      pagination:{
        enabled: true,
        el: '.swiper-pagination',
        clickable: true,
        renderBullet: function (index, className) {
          return `<button type="button" class="custom-dot ${className}">
                    <span class="custom-dot-progress"></span>
                    <span class="custom-dot-name">${this.slides[index].getAttribute('data-title')}</span>
                  </button>`;
        },
      },
      on:{
        slideChange: function(swiper){
          $swiperContainer.find('video').each(function(i, vid){
            vid.pause();
          })
          $swiperContainer.find('.vid-control').removeClass('hd-active');
          $swiperContainer.find('.vid-control').attr('aria-pressed', 'false');
          const slide = swiper.slides[swiper.activeIndex];
          let $vid = $(slide).find("video");
          if ($vid.length > 0) {
            $vid[0].play();
          }
        },
        afterInit: function(swiper){
          swiper.autoplay.start();
          // $swiperContainer.find('.swiper-button-next, .swiper-button-prev, .swiper-pagination').on('click', function() {
          //   swiper.autoplay.start();
          // })
          $swiperPaueBtn.on('click', function() {
            var isPressed = this.getAttribute('aria-pressed');
            if(isPressed !== 'false'){
              swiper.slideToLoop(swiper.activeIndex, 16000, false);
              swiper.autoplay.start();
              swiper.el.classList.remove('is-paused');
            }else{
              swiper.autoplay.stop();
              swiper.setTranslate(swiper.getTranslate());
              swiper.el.classList.add('is-paused');
            }
          });
        },
        autoplayStop: function(swiper){
          $swiperPaueBtn[0].setAttribute('aria-pressed', 'true');
        },
        autoplayStart: function(swiper){
          $swiperPaueBtn[0].setAttribute('aria-pressed', 'false');
        }
      }
    });
  })
  
// swiper gallery
  $('#hd .swiper-gallery').each(function(){
    var id = $(this).attr('id'),
        $swiperContainer = $('#' + id),
        $swiperPaueBtn = $swiperContainer.find('.swiper-pause-btn');
    var swiper = new Swiper('#'+id, {
      loop: true,
      loopAdditionalSlides: 3,
      loopAddBlankSlides: false,
      loopPreventsSliding: true,
      grabCursor: true,
      slideToClickedSlide: true,
      lazyPreloadPrevNext: 3,
      observer: true,
      // observeParents: true,
      speed: 16000,
      autoplay: {
        delay: 0,
        disableOnInteraction: false
      },
      keyboard: {
        enabled: true,
        onlyInViewport: false
      },
      breakpoints:{
        0: {
          slidesPerView: 1.125,
        },
        769: {
          slidesPerView: 1.75,
        },
        1024: {
          slidesPerView: 2.5,
        }
      },
      on:{
        afterInit: function(swiper){
          swiper.autoplay.start();
          // $swiperContainer.find('.swiper-button-next, .swiper-button-prev, .swiper-pagination').on('click', function() {
          //   swiper.autoplay.start();
          // })
          $swiperPaueBtn.on('click', function() {
            var isPressed = this.getAttribute('aria-pressed');
            if(isPressed !== 'false'){
              swiper.slideToLoop(swiper.activeIndex, 16000, false);
              swiper.autoplay.start();
            }else{
              swiper.autoplay.stop();
              swiper.setTranslate(swiper.getTranslate());
            }
          });
        },
        autoplayStop: function(swiper){
          $swiperPaueBtn[0].setAttribute('aria-pressed', 'true');
        },
        autoplayStart: function(swiper){
          $swiperPaueBtn[0].setAttribute('aria-pressed', 'false');
        }
      }
    });
  })

// slider bios 
  var oledSwiper = new Swiper('.bios-swiper', {
    loop: false,
    slidesPerView: 1.1,
    // effect:'fade',
    pagination: {
      el: '.bios-pagination',
      clickable: true,
    },
    navigation: {
      nextEl: ".bios-swiper-button-next",
      prevEl: ".bios-swiper-button-prev",
    }
  }); 

// slider software
  var titles = document.querySelectorAll('.software-swiper .software-slide');
  var title = [];
  titles.forEach(function(element) {
    title.push(element.dataset.title);
  });
  var gas = document.querySelectorAll('.software-swiper .software-slide');
  var ga = [];
  gas.forEach(function(element) {
    ga.push(element.dataset.ga);
  });

  var softwareSwiper = new Swiper('.software-swiper', {
    loop: false,
    slidesPerView: 1,
    // effect:'fade',
    pagination: {
      el: '.software-pagination',
      clickable: true,
      renderBullet: function (index, className) {

        return '<span class="' + className + '" role="button" onclick="' + ga[index] + '"><h3>' + title[index] + '</h3></span>';

      },
    },
  }); 
  $('.swiper-pagination-bullet').on('click', function(){
    // console.log('wefew');
    var $this = $(this)
    filterAnchor($this);
  });

// slider hwinfo 
  var hwinfoSwiper = new Swiper('.hwinfo-swiper', {
    loop: false,
    slidesPerView: 1,
    // effect:'fade',
    pagination: {
      el: '.hwinfo-pagination',
      clickable: true,
    }
  });   

// slider more 
  var oledSwiper = new Swiper('.more-swiper', {
    loop: false,
    slidesPerView: 1,
    // effect:'fade',
    pagination: {
      el: '.more-pagination',
      clickable: true,
    },
    navigation: {
      nextEl: ".more-swiper-button-next",
      prevEl: ".more-swiper-button-prev",
    }
  });

});
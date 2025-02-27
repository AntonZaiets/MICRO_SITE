$(function() {
// hash detect
  var url_hash = window.location.hash,
      $main_tab = $('#trigger-main'),
      $bios_tab = $('#trigger-bios'),
      $palooza_tab = $('#trigger-palooza'),
      $main_content = $('#content-main'),
      $bios_content = $('#content-bios'),
      $palooza_content = $('#event-palooza');
  var show_content = function(target) {
    target = target.toLowerCase();
    if(target.includes('#bios-update')){
      $bios_content.fadeIn().attr('aria-current', 'true');
      $main_content.hide().attr('aria-current', 'false');
      $palooza_content.hide().attr('aria-current', 'false');
      $bios_tab.addClass('hd-active').parent().siblings().find('a').removeClass('hd-active');
      $('html, body').stop(0, 1).animate({
        scrollTop: 0
      }, 0);
    } else if(target.includes('#upgrade-a-palooza')){
      $palooza_content.fadeIn().attr('aria-current', 'true');
      $main_content.hide().attr('aria-current', 'false');
      $bios_content.hide().attr('aria-current', 'false');
      $palooza_tab.addClass('hd-active').parent().siblings().find('a').removeClass('hd-active');
      if(target.includes('wheretobuy')){
        $('html, body').stop(0, 1).animate({
          scrollTop: $('#pageContent-sec-wtb').offset().top
        }, 0);
      }else if(target.includes('joinnow')){
        $('html, body').stop(0, 1).animate({
          scrollTop: $('#pageContent-sec-rule').offset().top
        }, 0);
      }
      else{
        $('html, body').stop(0, 1).animate({
          scrollTop: 0
        }, 0);
      }
    } else{
      $main_content.fadeIn().attr('aria-current', 'true');
      $bios_content.hide().attr('aria-current', 'false');
      $palooza_content.hide().attr('aria-current', 'false');
      $main_tab.addClass('hd-active').parent().siblings().find('a').removeClass('hd-active');
      // $('html, body').stop(0, 1).animate({
      //   scrollTop: 0
      // }, 0);
    }
  }
  show_content(url_hash);
  window.addEventListener('popstate', function () {
    url_hash = window.location.hash;
    show_content(url_hash);
  });
  $('#event-palooza .trigger-event-anchor').on('click', function(){
    show_content(url_hash);
  });

// // main-tab switch
//   $('.trigger-mainTab').on('click', function() {
//     var target = $(this).data('target').toLowerCase();
//     show_content(target);

//     $('html, body').stop(0, 1).animate({
//       scrollTop: 0
//     }, 0);
//   });


// horizontal scroll to target element
  function filterAnchor ($el) {
    var $parent = $el.parent(),
      // distance = $el.get(0).offsetLeft - 30;
      distance = $el.get(0).offsetLeft - 100;
    $parent.stop(0,1).animate({
      scrollLeft:distance
    },700)
  }

// more btn
  var $bodyScroller = $('html, body');
  $('#pageContent-btn-more').on('click', function(){
    var $this = $(this),
        $target = $('#' + $this.attr('aria-controls'));
    $this.toggleClass('hd-active');
    if($this.hasClass('hd-active')){
      $target.removeClass('collapse');
    }else{
      $target.addClass('collapse');
    }
  });

// TAB
  var $tabs = $('[role="tab"]');
  var $tabList = $('[role="tablist"]');

  $tabs.on('click', changeTabs);

  function changeTabs() {
    var $this = $(this),
        target = $this.attr('aria-controls'),
        $target = target.split(',');

    $this.addClass('hd-active').attr('aria-selected', 'true')
         .siblings().removeClass('hd-active').attr('aria-selected', 'false');

    filterAnchor($this);

    $target.forEach(function(item, i){
      item = item.trim();
      $('#' + item).addClass('hd-active').attr('aria-current', 'true')
         .siblings().removeClass('hd-active').attr('aria-current', 'false');
    })
  }
  function filterAnchor ($el) {
   var $parent = $el.parent(),
     distance = $el.get(0).offsetLeft - 30;
   $parent.stop(0,1).animate({
     scrollLeft:distance
   },700)
  }

// video paused
  $('#hd').on('click', '.trigger-video-toggle .vid-control', function(){
    let $this = $(this);
    $this.toggleClass('hd-active');
    if($this.hasClass('hd-active')){
      $this.attr('aria-pressed', 'true');
      $this.parent().find('video')[0].pause();
    }else{
      $this.attr('aria-pressed', 'false');
      $this.parent().find('video')[0].play();
    }
  });
  $('#hd .trigger-video-toggle video').on('play', function(){
    $(this).parent().find('.vid-control').removeClass('hd-active')
                                       .attr('aria-pressed', 'false');
  })
  $('#hd .trigger-video-toggle video').on('pause end', function(){
    $(this).parent().find('.vid-control').addClass('hd-active')
                                       .attr('aria-pressed', 'true');
  })
// banner swiper
  var $swiperBannerContainer = $('#pageContent-swiper-banner');
  var swiperBanner = new Swiper("#pageContent-swiper-banner", {
    slidesPerView: 1,
    loop:true,
    grabCursor: true,
    observer: true,
    observeParents: true,
    // lazy: true,
    // scrollbar: {
    //   el: ".swiper-scrollbar",
    //   hide: false,
    //   snapOnRelease: true
    // },
    // navigation: {
    //   nextEl: ".swiper-button-next",
    //   prevEl: ".swiper-button-prev",
    // },
    autoplay: {
      delay: 4000,
      disableOnInteraction: true
    },
    pagination: {
      el: '#pageContent-swiper-banner .swiper-pagination',
      clickable: true,
    },
    on:{
      afterInit: function(swiper){
        $swiperBannerContainer.find('.vid-control').on('click', function() {
          if (!toggleButtonState(this)){
            swiper.autoplay.start();
            // $swiperNvContainer.find('.swiper-pagination-bullet').removeClass('swiper-paused');
          }else{
            swiper.autoplay.stop();
            // $swiperNvContainer.find('.swiper-pagination-bullet').addClass('swiper-paused');
          }
        })
      }
    }
  });

//features swiper
    var titles = document.querySelectorAll('.features-swiper .swiper-slide');
    var title = [];
    titles.forEach(function(element) {
      title.push(element.dataset.title);
    });
    var gas = document.querySelectorAll('.features-swiper .swiper-slide');
    var ga = [];
    gas.forEach(function(element) {
      ga.push(element.dataset.ga);
    });

    var oledSwiper = new Swiper('.features-swiper', {
      loop: false,
      slidesPerView: 1,
      autoHeight: true,
      // effect:'fade',
      pagination: {
        el: '.features-pagination',
        clickable: true,
        renderBullet: function (index, className) {

          return '<span class="' + className + '" role="button" onclick="' + ga[index] + '"><h3>' + title[index] + '</h3></span>';

        },
      },
      on:{
        slideChange: function(swiper){
          $('.features-swiper').find('video').each(function(i, vid){
            vid.pause();
          })
          $('.features-swiper').find('.vid-control').removeClass('hd-active');
          $('.features-swiper').find('.vid-control').attr('aria-pressed', 'false');
          const slide = swiper.slides[swiper.activeIndex];
          let $vid = $(slide).find("video");
          if ($vid.length > 0) {
            $vid[0].play();
          }
        }
      }
    });
    $('.swiper-pagination-bullet').on('click', function(){
      // console.log('wefew');
      var $this = $(this)
      filterAnchor($this);
    });

// dimm swiper
  var $swiperDIMMContainer = $('#pageContent-swiper-dimm');
  var swiperDIMM = new Swiper("#pageContent-swiper-dimm", {
    slidesPerView: 1,
    loop:true,
    grabCursor: true,
    observer: true,
    observeParents: true,
    // lazy: true,
    // scrollbar: {
    //   el: ".swiper-scrollbar",
    //   hide: false,
    //   snapOnRelease: true
    // },
    // navigation: {
    //   nextEl: ".swiper-button-next",
    //   prevEl: ".swiper-button-prev",
    // },
    autoplay: {
      delay: 4000,
      disableOnInteraction: true
    },
    pagination: {
      el: '#pageContent-swiper-dimm .swiper-pagination',
      clickable: true,
    },
    on:{
      afterInit: function(swiper){
        $swiperDIMMContainer.find('.vid-control').on('click', function() {
          if (!toggleButtonState(this)){
            swiper.autoplay.start();
            // $swiperNvContainer.find('.swiper-pagination-bullet').removeClass('swiper-paused');
          }else{
            swiper.autoplay.stop();
            // $swiperNvContainer.find('.swiper-pagination-bullet').addClass('swiper-paused');
          }
        })
      }
    }
  });

  // lightbox
    lightbox.option({
      'resizeDuration': 200,
      // 'wrapAround': true,
      'showImageNumberLabel': false,
      'disableScrolling': true,
      'positionFromTop': 100,
    })

  function toggleButtonState(button) {
    var isAriaPressed = button.getAttribute('aria-pressed') === 'true';
    button.setAttribute('aria-pressed', isAriaPressed ? 'false' : 'true');
    return isAriaPressed ? false : true;
  }

  // lightbox video play
  $('.diy-btn').click(function () {
    $('#pageContent-vid-pcieqrelease').trigger('play');
  })

// panel control
  const $body = $('body');

  function closeLightbox(){
    $vidLightbox.removeClass('hd-active');

    if($currentFocus != ''){
      $currentFocus.focus();
    }
  }

  function closePanel(){
    var $panel = $('.hd-panel.is-expanded');
    if ($panel.length) {
      var panelId = $panel.attr('id');
      var $trigger = $('.trigger-panel[aria-controls="' + panelId + '"]');

      // Collapse the panel
      $panel.attr('aria-hidden', 'true');
      $panel.removeClass('is-expanded');
      $trigger.attr('aria-expanded', 'false');
      $body.removeClass('no-scroll');

      // Set focus back to the trigger button
      $trigger.focus();

      // Update tabindex for focusable elements within the panel
      $panel.find('a, button, input, [tabindex]').attr('tabindex', '-1');
    }
  }

  $("#hd .promotionBanner.corner .PB_close").on("click", function() {
    closePromo();
  });
  function closePromo(){
    $("#hd .promotionBanner.corner").fadeOut();
  }

// close everything on ESC
  $(document).on('keydown', function(e) {
    if (e.which == 27) {
      closePanel();
      $body.removeClass('no-scroll');
    }
  });
// trigger small lightbox
  var $triggerLightbox = $('.trigger-lightbox-s'),
      $smallLightboxContainers = $triggerLightbox.parents('[role="tabpanel"]'),
      $smallLightbox = $('.hd-lightbox-s');
  $triggerLightbox.on('click', function(){
    var $container = $(this).parents('[role="tabpanel"]'),
        $target = $('#' + $(this).attr('aria-controls'));
    $container.addClass('is-open');
    $target.addClass('hd-active');
  });
  $smallLightbox.find('.trigger-close').on('click', function(){
    closeSmallLightbox()
  });
  $smallLightboxContainers.on('click', function(e){
    var $target = $(e.target);
    if($target.parents('.hd-lightbox-s').length <= 0 && $target.parents('.trigger-lightbox-s').length <= 0 && !$target.hasClass('trigger-lightbox-s')){
      closeSmallLightbox()
    }
  });
  function closeSmallLightbox(){
    $smallLightboxContainers.removeClass('is-open');
    $smallLightbox.removeClass('hd-active');
  }

// DIY hover/focus play video
  $('#pageContent-diy .hd-frame').on('mouseenter focus', function(){
    if($(this).find('video').length > 0){
      $(this).find('video')[0].play();
    }
  })
  $('#pageContent-diy .hd-frame').on('mouseleave blur', function(){
    if($(this).find('video').length > 0){
      $(this).find('video')[0].pause();
      $(this).find('video')[0].currentTime = 0;
    }
  })
});
// youtube iframe control (for stop videos when closing lightbox)
function callPlayer(func, args) {
  var i = 0,
      iframes = document.getElementsByTagName('iframe'),
      src = '';
  for (i = 0; i < iframes.length; i += 1) {
    src = iframes[i].getAttribute('src');
    if (src && src.indexOf('youtube.com/embed') !== -1) {
      iframes[i].contentWindow.postMessage(JSON.stringify({
          'event': 'command',
          'func': func,
          'args': args || []
      }), '*');
    }
  }
}
$(function() {
// // smooth scrollTo
//   $('a[href*="#"]:not([href="#"])').click(function() {
//     if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
//       var target = $(this.hash);
//       target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
//       if (target.length) {
//         $('html, body').stop(0, 1).animate({
//           scrollTop: target.offset().top
//         }, 1000);
//         return false;
//       }
//     }
//   });

// keyboard accessibility (trigger click)
  function keyboardTrigger($element){ // trigger click on space and enter
    $element.off('keydown').on('keydown', function(e) {
      var keycode = (e.keyCode ? e.keyCode : e.which);
      // e.stopPropagation();
      if (keycode == '13' || keycode == '32') {
        var attr = $(this).attr('href');
        if(keycode == '32'){
            e.preventDefault();
        }
        $(this).trigger('click');
      }
    });
  }
  keyboardTrigger($('[role="button"]:not(button, a), li[tabindex="0"], div[tabindex="0"], label[tabindex="0"]'));

// vertical nav dots
  var $scrollTop = $('#pageContent-scrollTop');
  $(window).scroll(function () {
    var windscroll = $(window).scrollTop();
    if (windscroll >= 50) {
      $('#hd section.nav-sec').each(function (i) {
        var $this = $(this);
        if ($this.offset().top <= windscroll + 120) {
          // if(i >= 3){
            $('#hd .hd-nav li a.hd-active').removeClass('hd-active').attr('aria-current', false);
            $('#hd .hd-nav li').eq(i).find("a").addClass('hd-active').attr('aria-current', true);
          // }
        }
      });
      $scrollTop.addClass('is-show');
    } else {
      $('#hd .hd-nav li a.hd-active').removeClass('hd-active').attr('aria-current', false);
      $('#hd .hd-nav li').eq(0).children('a').addClass('hd-active').attr('aria-current', true);
      $scrollTop.removeClass('is-show');
    }
  }).scroll();

// scrollUp btn
  $scrollTop.on('click', function () {
    $("html, body").stop(0,1).animate({
      scrollTop: 0
    }, 1000);
    return false;
  });

// scrollReveal
// Changing the defaults
  window.sr = ScrollReveal({
    reset: false,
    mobile: true,
    duration: 600,
    origin: 'bottom',
    distance: '50px',
    opacity: 0,
    scale: 1,
    easing: 'cubic-bezier(.38,.02,.52,1.35)'
  });
  sr.reveal('.reveal-fromBottom', {});
  sr.reveal('.reveal-fromBottom-delay1', {
    delay: 100
  });
  sr.reveal('.reveal-fromBottom-delay2', {
    delay: 150
  });
  sr.reveal('.reveal-list', {
    delay: 150
  }, 150);
  sr.reveal('#hd .reveal-animate', {
    reset: false,
    duration: 100,
    opacity:1,
    distance: 0,
    easing: 'ease-out',
    viewFactor: .5,
    beforeReveal:function(domEl){
      $(domEl).addClass('is-animated');
    },
    beforeReset:function(domEl){
      $(domEl).removeClass('is-animated');
    }
  })
  sr.reveal('#hd .reveal-animate-reset', {
    reset: true,
    duration: 100,
    opacity:1,
    distance: 0,
    easing: 'ease-out',
    viewFactor: .5,
    beforeReveal:function(domEl){
      $(domEl).addClass('is-animated');
    },
    beforeReset:function(domEl){
      $(domEl).removeClass('is-animated');
    }
  })

// toggle mobile menu
  var $ham = $('.hamburger');
  $ham.on('click', function(){
    // console.log('test');
      $(this).toggleClass('hd-active');
  });
  $('.menu a').on('click', function(){
    $ham.removeClass('hd-active');
  });

// // video pause/play toggle
//   $('.trigger-video-toggle .vid-control').on('click', function(){
//     var $this = $(this),
//         $vids = $this.siblings('video');
//     if($vids[0].paused){
//       $vids.each(function(){
//         this.play();
//       })
//       $this.removeClass('hd-active');
//     }else{
//       $vids.each(function(){
//         this.pause();
//       })
//       $this.addClass('hd-active');
//     }

//     if($this.hasClass('hd-active')){
//       $this.attr('aria-pressed', true);
//     }else{
//       $this.attr('aria-pressed', false);
//     }
//   });

// gif paused
  $('.gif-container .vid-control').on('click', function(){
    var $this = $(this);
    $this.toggleClass('hd-active');
    if($this.hasClass('hd-active')){
      $this.attr('aria-pressed', true);
    }else{
      $this.attr('aria-pressed', false);
    }
    $this.parent().toggleClass('is-reduced-motion');
  });

// qrelease
  var $lightboxQrelease = $('#pageContent-lightbox-qrelease');
  $('.trigger-qrelease').on('click', function(){
    $lightboxQrelease.addClass('hd-active').attr('aira-current', true);
    $lightboxQrelease.focus();
    $('body').css('overflow', 'hidden');
  });


// play video
  var $lightboxVid = $('#pageContent-lightbox-vid'),
      player = $lightboxVid.find('iframe');
  $('.trigger-video').on('click', function(){


    var video = $(this).data('src') + '?modestbranding=0&color=white&mute=1&autoplay=0';

    player.attr('src', video);
    player.attr('src', video.replace("autoplay=0", "autoplay=1")); // autoplay
    $lightboxVid.addClass('hd-active').attr('aira-current', true);
    $lightboxVid.focus();
    callPlayer('playVideo');
    $('body').css('overflow', 'hidden');
  });

// close lightbox
  function closelightboxVid(){
    $lightboxQrelease.removeClass('hd-active').attr('aira-current', false);
    $lightboxVid.removeClass('hd-active').attr('aira-current', false);
    player.attr('src', '');
    callPlayer('pauseVideo');
    $('body').css('overflow', '');
  }

// lightboxes
  var $lightbox = $('#pageContent-lightbox');
  $('.trigger-lightbox').on('click', function(){
    var target = $(this).attr('aria-controls'),
        $target = $('#'+target);
    $target.addClass('hd-active').attr('aria-current, true');
    $target.focus();
    $('body').css('overflow', 'hidden');
  });
// close lightbox
  $('.hd-lightbox .hd-filter, .hd-lightbox .trigger-close').on('click', function(e) {
    if($(e.target).hasClass('hd-filter') || $(e.target).hasClass('trigger-close')){
      closelightboxVid();
      closeLightbox();
    }
  });
  function closeLightbox(){
    $lightbox.removeClass('hd-active').attr('aira-current', false);
    $('body').css('overflow', '');
  }

// ESC close everything
  $(document).on('keydown', function(e) {
    if (e.which == 27) {
      closelightboxVid();
      closeLightbox();
    }
  });

// GTM tracking
  var event_category = '',
      event_action = '',
      event_label = '';
  $('[data-action="clicked"], [data-action="played"], [data-action="downloaded"]').on('click', function() {
    var $this = $(this);
    console.log(event_label);
    event_category = $this.data('category');
    event_action = $this.data('action');
    event_label = $this.data('label');

    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({
      'event': 'data_layer_event',
      'event_category_DL': event_category,
      'event_action_DL': event_action,
      'event_label_DL': event_label
    });
  });
  $('#hd').on('mouseenter', '[data-action="hovered"]', function(){
    var $this = $(this);

    event_category = $this.data('category');
    event_action = $this.data('action');
    event_label = $this.data('label');

    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({
      'event': 'data_layer_event',
      'event_category_DL': event_category,
      'event_action_DL': event_action,
      'event_label_DL': event_label,
    });
  });

  $('#hd .sec-component .wtb-btn, #hd .sec-bios-list a').on('click', function(){
    var $this = $(this);
    var event_label = $this.parents('td').prev('td').text();

    if($this.parents('.sec-bios-list').length > 0){
      event_label = 'SUPPORT MODEL LIST - ' + event_label;
    }else{
      event_label = 'Select Your Components - ' + event_label;
    }

    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({
      'event': 'data_layer_event',
      'event_category_DL': 'internal-links',
      'event_action_DL': 'clicked',
      'event_label_DL': event_label,
    });
  });
});
$(function() {
// countdown
  function setCounterData(distance) {
    var days =Math.floor(distance / (1000 * 60 * 60 * 24));
    var hours =Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    var minutes =Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    var seconds =Math.floor((distance % (1000 * 60)) / 1000);

    days = days <= 0 ? 0 : days;
    hours = hours <= 0 ? 0 : hours;
    minutes = minutes <= 0 ? 0 : minutes;
    seconds = seconds <= 0 ? 0 : seconds;

    $daySlot.html(days.toLocaleString('en-US', {minimumIntegerDigits: 2, useGrouping: false}));
    $hourSlot.html(hours.toLocaleString('en-US', {minimumIntegerDigits: 2, useGrouping: false}));
    $minuteSlot.html(minutes.toLocaleString('en-US', {minimumIntegerDigits: 2, useGrouping: false}));
    $secondSlot.html(seconds.toLocaleString('en-US', {minimumIntegerDigits: 2, useGrouping: false}));
  }
  var $daySlot = $('.e-m-days'),
      $hourSlot = $('.e-m-hours'),
      $minuteSlot = $('.e-m-minutes'),
      $secondSlot = $('.e-m-seconds'),
      date = $('#hd .list-time').data('time'),
      targetDate = new Date(date).getTime(),
      timer = setInterval(function() {
        var now = new Date().getTime(),
            distance = targetDate - now;

        setCounterData(distance);
        // count--;
        if (distance <= 0) {
          clearInterval(timer);
          return;
        }
      }, 1000);
});
$(function () {
  const $body = $('body');
  $('#hd .trigger-panel').on('click', function() {
    var panelId = $(this).attr('aria-controls');
    var $panel = $('#' + panelId);
    var isExpanded = $(this).attr('aria-expanded') === 'true';

    // Toggle the panel's expanded state
    $(this).attr('aria-expanded', !isExpanded);
    $panel.attr('aria-hidden', isExpanded);
    $panel.addClass('is-expanded');

    // Set focus on the first focusable element in the panel if it is expanded
    var $focusableElements = $panel.find('a, button, input, [tabindex]:not([tabindex="-1"])');
    $focusableElements.first().focus();
    $body.addClass('no-scroll');

    $panel.find('a, button, input, [tabindex]').attr('tabindex', function() {
      return isExpanded ? '-1' : '0';
    });
  });

  $('#hd .trigger-panel-close').on('click', function() {
    var $panel = $(this).closest('.hd-panel');
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
  });


  // Trap focus within dialog
  $(document).on('keydown', 'div[role="dialog"].is-expanded', function(event) {
    var $panel = $(this);
    var $focusableElements = $panel.find('a, button, input, [tabindex]:not([tabindex="-1"])');
    var firstFocusableElement = $focusableElements.first()[0];
    var lastFocusableElement = $focusableElements.last()[0];

    if (event.key === 'Tab') {
      if (event.shiftKey) {
        // Shift + Tab
        if (document.activeElement === firstFocusableElement) {
          event.preventDefault();
          lastFocusableElement.focus();
        }
      } else {
        // Tab
        if (document.activeElement === lastFocusableElement) {
          event.preventDefault();
          firstFocusableElement.focus();
        }
      }
    }
  });
  // Initialize tabindex for focusable elements within the dialog panels
  $('div[role="dialog"]').find('a, button, input, [tabindex]').attr('tabindex', '-1');
});
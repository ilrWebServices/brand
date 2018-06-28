/**
 * @file
 * A JavaScript file containing the main menu functionality (small/large screen)
 *
 */

(function ($, Drupal) {

  Drupal.behaviors.mainMenu = {
    attach: function (context) {
      'use strict';

      var toggle_expand = $('#toggle-expand'),
          menu = $('#main-nav'),
          expanded = false,
          items = [],
          timing = .4,
          stagger = .02,
          offset = timing - stagger,
          tl = new TimelineLite({ onComplete: resetTrigger, onReverseComplete: resetMenu });

      if (menu) {
        $(toggle_expand).hover(
          function() {
            if (tl.isActive() && !$(this).hasClass('animating')) { // They rolled back over menu
              tl.pause();//$(this).addClass('hovered');
            }
            if (!expanded) {
              expandMenu();
            }
          },
          function(){},
        );

        // Hide menu after they leave hover
        $(menu).hover(
          function(){},
          function() {
            hideMenu();
          }
        );

        $(toggle_expand).click(function(){
          if (!expanded) {
            expandMenu();
          } else {
            hideMenu();
          }
        });
      }

      function expandMenu() {
        toggle_expand.addClass('expanded');
        toggle_expand.addClass('animating');
        menu.addClass('main-nav--open');
        expanded = true;
        if (items.length) {
          tl.restart();
        } else {
          items = $('.main-menu__item');
          $(items).each(function(index){
            tl.from(this, timing, {top:"-=30px", autoAlpha: 0, ease: Power3.easeOut}, '-='+offset);
          });
        }
      }

      function hideMenu() {
        tl.reverse();
      }

      function resetMenu() {
        expanded = false;
        toggle_expand.removeClass('expanded');
        menu.removeClass('main-nav--open');
      }

      function resetTrigger() {
        toggle_expand.removeClass('animating');
      }
    }
  };
}(jQuery, Drupal)); // UNCOMMENT IF DRUPAL.

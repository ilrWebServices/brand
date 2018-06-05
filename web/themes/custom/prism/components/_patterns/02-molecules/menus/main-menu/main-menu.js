/**
 * @file
 * A JavaScript file containing the main menu functionality (small/large screen)
 *
 */

// JavaScript should be made compatible with libraries other than jQuery by
// wrapping it with an "anonymous closure". See:
// - https://drupal.org/node/1446420
// - http://www.adequatelygood.com/2010/3/JavaScript-Module-Pattern-In-Depth


(function ($, Drupal) { // UNCOMMENT IF DRUPAL.

  Drupal.behaviors.mainMenu = {
    attach: function (context) {
      'use strict';

      // Use context instead of document IF DRUPAL.
      var toggle_expand = $('#toggle-expand'),
          menu = $('#main-nav'),
          expanded = false,
          items = [],
          timing = .4,
          stagger = .02,
          offset = timing - stagger,
          tl = new TimelineLite({ onReverseComplete: resetMenu });

      if (menu) {
        $(toggle_expand).hover(
          function() {
            if (tl.isActive()) { // They rolled back over menu
              tl.pause();
            }
            if (!expanded) {
              toggle_expand.addClass('expanded');
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
          },
          function(){},
        );

        $(menu).hover(
          function(){},
          function() {
            tl.reverse();
          }
        );
      }

      function resetMenu() {
        expanded = false;
        menu.removeClass('main-nav--open');
      }
    }
  };
}(jQuery, Drupal)); // UNCOMMENT IF DRUPAL.

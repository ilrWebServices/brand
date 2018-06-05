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
      var toggle_expand = document.getElementById('toggle-expand'),
          menu = document.getElementById('main-nav'),
          expand_menu = false,
          items = [],
          timing = .4,
          stagger = .02,
          offset = timing - stagger,
          tl = new TimelineLite({ onReverseComplete: resetMenu });

      if (menu) {
        expand_menu = menu.getElementsByClassName('expand-sub');

        $(toggle_expand).hover(
          function() {
            menu.classList.toggle('main-nav--open');
            if (items.length) {
              tl.restart();
            }
            else {
              items = $('.main-menu__item');
              $(items).each(function(index){
                tl.from(this, timing, {top:"-=30px", autoAlpha: 0, ease: Power3.easeOut}, '-='+offset);
              });
            }
          },
          function(){},
        );

        $(menu).hover(
          function(){},
          function() {
            // if (!tl.reversed()) {
              tl.reverse();
            // }
          }
        );
      }

      function resetMenu() {
        menu.classList.toggle('main-nav--open');
      }
    }
  };
}(jQuery, Drupal)); // UNCOMMENT IF DRUPAL.

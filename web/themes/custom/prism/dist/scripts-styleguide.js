'use strict';

// Global javascript (loaded on all pages in Pattern Lab and Drupal)
// Should be used sparingly because javascript files can be used in components
// See https://github.com/fourkitchens/emulsify/wiki/Drupal-Components#javascript-in-drupal for more details on using component javascript in Drupal.

// Typekit Example
try {
  Typekit.load({ async: true });
} catch (e) {
  alert('An error has occurred: ' + e.message);
}
'use strict';

(function ($, Drupal) {
  Drupal.behaviors.titleScreen = {
    attach: function attach(context) {
      var screen = $('div.title-screen__wrapper', context),
          frame = $('div.title-screen__frame', context),
          playBtn = $('a.button--replay'),
          sectionHeading = $('.title-screen__section', context),
          content = $('div.main-content', context),
          length = 3;

      function animateTitle() {
        TweenLite.from(frame, length / 4, { autoAlpha: 0, top: "100px", opacity: 0 }).delay(length / 4);
        TweenLite.from(sectionHeading, length / 5, { text: '', ease: Linear.easeNone }).delay(length / 2);
        // TweenLite.to(screen, length/4, {top:"-100vh", autoAlpha: 0}).delay(length);
        // TweenLite.from(content, length/4, {top:"200px"}).delay(length);
      }

      function reset() {
        TweenLite.to(screen, 0, { top: "0", autoAlpha: 1 });
      }

      playBtn.click(function () {
        reset();
        animateTitle();
      });

      animateTitle();
    }
  };
})(jQuery, Drupal);
'use strict';

(function ($, Drupal) {
  Drupal.behaviors.slide = {
    attach: function attach(context) {
      // $(document).ready(function() {
      $('#slide__wrapper').fullpage({
        navigation: true,
        navigationPosition: 'right',

        //Scrolling
        css3: true,
        scrollingSpeed: 700,
        autoScrolling: false,
        fitToSection: false,
        // fitToSectionDelay: 1000,
        scrollBar: false,
        easing: 'easeInOutCubic',
        easingcss3: 'ease',
        loopBottom: false,
        loopTop: false,
        // continuousVertical: false,
        // continuousHorizontal: false,
        // scrollHorizontally: false,
        // interlockedSlides: false,
        // dragAndMove: false,
        // offsetSections: false,
        // resetSliders: false,
        fadingEffect: false,
        // normalScrollElements: '#element1, .element2',
        scrollOverflow: false,
        // scrollOverflowReset: false,
        // scrollOverflowOptions: null,
        touchSensitivity: 15,
        normalScrollElementTouchThreshold: 5,
        // bigSectionsDestination: null,

        //Accessibility
        keyboardScrolling: true,
        animateAnchor: true,
        recordHistory: true,

        //Design
        controlArrows: true,
        verticalCentered: true,
        // sectionsColor : ['#ccc', '#fff'],
        // paddingTop: '2em',
        // paddingBottom: '10px',
        // fixedElements: '#block-prism-main-menu',
        responsiveWidth: 769,
        responsiveHeight: 0,
        responsiveSlides: false,

        //Custom selectors
        sectionSelector: '.slide'
      });
    }
  };
})(jQuery, Drupal);
"use strict";

(function ($, Drupal) {
  Drupal.behaviors.logoAnimation = {
    attach: function attach(context) {
      var logo = $('.wordmark__img--masked', context);
      function animateLogo() {
        // for transition speed, "see _logo.scss"
        TweenLite.to(logo, .6, { clipPath: "inset(0 64.3% 0 0)" }).delay(2);
      }
      // playBtn.click(function(){
      //   animateLogo();
      // });
      animateLogo();
    }
  };
})(jQuery, Drupal);
'use strict';

/**
 * @file
 * A JavaScript file containing the main menu functionality (small/large screen)
 *
 */

(function ($, Drupal) {

  return;

  Drupal.behaviors.mainMenu = {
    attach: function attach(context) {
      'use strict';

      var toggle_expand = $('#toggle-expand'),
          menu = $('#main-nav'),
          expanded = false,
          items = [],
          timing = .3,
          stagger = .02,
          offset = timing - stagger,
          tl = new TimelineLite({ onComplete: resetTrigger, onReverseComplete: resetMenu });

      if (menu) {
        $(toggle_expand).hover(function () {
          if (tl.isActive() && !$(this).hasClass('animating')) {
            // They rolled back over menu
            tl.pause(); //$(this).addClass('hovered');
          }
          if (!expanded) {
            expandMenu();
          }
        }, function () {});

        // Hide menu after they leave hover
        $(menu).hover(function () {}, function () {
          hideMenu();
        });

        $(toggle_expand).click(function () {
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
          $(items).each(function (index) {
            tl.from(this, timing, { top: "-=30px", autoAlpha: 0, ease: Power3.easeOut }, '-=' + offset);
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
})(jQuery, Drupal); // UNCOMMENT IF DRUPAL.
'use strict';

(function () {

  'use strict';

  var el = document.querySelectorAll('.tabs');
  var tabNavigationLinks = document.querySelectorAll('.tabs__link');
  var tabContentContainers = document.querySelectorAll('.tabs__tab');
  var activeIndex = 0;

  /**
   * handleClick
   * @description Handles click event listeners on each of the links in the
   *   tab navigation. Returns nothing.
   * @param {HTMLElement} link The link to listen for events on
   * @param {Number} index The index of that link
   */
  var handleClick = function handleClick(link, index) {
    link.addEventListener('click', function (e) {
      e.preventDefault();
      goToTab(index);
    });
  };

  /**
   * goToTab
   * @description Goes to a specific tab based on index. Returns nothing.
   * @param {Number} index The index of the tab to go to
   */
  var goToTab = function goToTab(index) {
    if (index !== activeIndex && index >= 0 && index <= tabNavigationLinks.length) {
      tabNavigationLinks[activeIndex].classList.remove('is-active');
      tabNavigationLinks[index].classList.add('is-active');
      tabContentContainers[activeIndex].classList.remove('is-active');
      tabContentContainers[index].classList.add('is-active');
      activeIndex = index;
    }
  };

  /**
   * init
   * @description Initializes the component by removing the no-js class from
   *   the component, and attaching event listeners to each of the nav items.
   *   Returns nothing.
   */
  for (var e = 0; e < el.length; e++) {
    el[e].classList.remove('no-js');
  }

  for (var i = 0; i < tabNavigationLinks.length; i++) {
    var link = tabNavigationLinks[i];
    handleClick(link, i);
  }
})();
//# sourceMappingURL=scripts-styleguide.js.map

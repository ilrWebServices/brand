(function ($, Drupal) {
  Drupal.behaviors.slide = {
    attach: function (context) {
      // $(document).ready(function() {
      $('#slide__wrapper').fullpage({
        navigation: true,
        navigationPosition: 'left',

        //Scrolling
        css3: true,
        scrollingSpeed: 700,
        autoScrolling: true,
        fitToSection: true,
        fitToSectionDelay: 1000,
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
        fixedElements: '#block-prism-main-menu',
        responsiveWidth: 769,
        responsiveHeight: 0,
        responsiveSlides: false,

        //Custom selectors
        sectionSelector: '.slide'
      });
    }
  };
}(jQuery, Drupal));

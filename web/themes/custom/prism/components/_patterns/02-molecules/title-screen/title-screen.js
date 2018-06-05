(function ($, Drupal) {
  Drupal.behaviors.titleScreen = {
    attach: function (context) {
      var screen = $('div.title-screen__wrapper', context),
          frame = $('div.title-screen__frame', context),
          playBtn = $('a.button--replay'),
          sectionHeading = $('.title-screen__section', context),
          content = $('div.main-content', context),
          length = 3;

      function animateTitle() {
        TweenLite.from(frame, length/4, {autoAlpha: 0, top:"100px", opacity: 0}).delay(length/4);
        TweenLite.from(sectionHeading, length/5, {text:'', ease:Linear.easeNone}).delay(length/2);
        // TweenLite.to(screen, length/4, {top:"-100vh", autoAlpha: 0}).delay(length);
        // TweenLite.from(content, length/4, {top:"200px"}).delay(length);
      }

      function reset() {
        TweenLite.to(screen, 0, {top:"0", autoAlpha: 1});
      }

      playBtn.click(function(){
        reset();
        animateTitle();
      });

      animateTitle();
    }
  };
}(jQuery, Drupal));

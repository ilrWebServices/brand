(function ($, Drupal) {
  Drupal.behaviors.titleScreen = {
    attach: function (context) {
      var screen = $('div.title-screen__wrapper', context);
      var frame = $('div.title-screen__frame', context);
      var playBtn = $('a.button--replay');
      var sectionHeading = $('.title-screen__section');

      function animateTitle() {
        TweenLite.to(screen, 0, {opacity: 1, top: 0});
        TweenLite.to(sectionHeading, 0, {text:"", ease:Linear.easeNone});
        TweenLite.from(screen, 1, {top:"100px", opacity: 0});
        TweenLite.to(sectionHeading, .75, {text:"Personality & Tone", ease:Linear.easeNone}).delay(1);
        TweenLite.to(screen, 1, {top:"100px", opacity: 0}).delay(3);
      }

      playBtn.click(function(){
        animateTitle();
      });

      // animateTitle();

    }
  };
}(jQuery, Drupal));

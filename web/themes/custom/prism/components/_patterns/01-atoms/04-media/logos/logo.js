(function ($, Drupal) {
  Drupal.behaviors.logoAnimation = {
    attach: function (context) {
      var logo = $('.wordmark__img--masked', context);
      function animateLogo() {
        // for transition speed, "see _logo.scss"
        TweenLite.to(logo, .6, {clipPath: "inset(0 64.3% 0 0)"}).delay(2);
      }
      // playBtn.click(function(){
      //   animateLogo();
      // });
      animateLogo();
    }
  };
}(jQuery, Drupal));

'use strict';(function(a,b){b.behaviors.titleScreen={attach:function attach(b){function c(){TweenLite.from(f,j/4,{autoAlpha:0,top:'100px',opacity:0}).delay(j/4),TweenLite.from(h,j/5,{text:'',ease:Linear.easeNone}).delay(j/2)}function d(){TweenLite.to(e,0,{top:'0',autoAlpha:1})}var e=a('div.title-screen__wrapper',b),f=a('div.title-screen__frame',b),g=a('a.button--replay'),h=a('.title-screen__section',b),i=a('div.main-content',b),j=3;g.click(function(){d(),c()}),c()}}})(jQuery,Drupal);
//# sourceMappingURL=title-screen.js.map
TSSi.Tour = (function(){
	var tour ={};
	tour.init =function(){
		$(this).BootJoyride({
		  'cookieMonster': false,               // true/false for whether cookies are used
		  'cookieName': 'simple-tour',    // choose your own cookie name
		  'cookieDomain': false,                // set to false or yoursite.com
		  'tipContent': '#home-tour',     // The ID of the <ol> used for content
		  'postRideCallback':tour.endTour,           // A method to call once the tour closes
		  'postStepCallback': function(index){
			tour.nextStep(index);
		  },           // A method to call after each step
		  'nextOnClose': false,                 // If cookies are enabled, increment the current step on close
		  'debug': false
		});
			tour.nextStep(0);
		//Initialize simple-overlay markup
		$('body').prepend('<div class="simple-overlay" id="simple-overlay-window"></div>')
		$('body').prepend('<div class="simple-overlay" id="simple-overlay-top"></div>');
		$('body').prepend('<div class="simple-overlay" id="simple-overlay-left"></div>');
		$('body').prepend('<div class="simple-overlay" id="simple-overlay-right"></div>');
		$('body').prepend('<div class="simple-overlay" id="simple-overlay-bottom"></div>');
		$('.simple-overlay').attr('style','display:none;width: 100%;height: 100%;position: absolute;background: rgba(255, 255, 255, 0.66);z-index:100');
		$('#simple-overlay-window').css('background','rgba(255, 255, 255, 0.01)').css('box-shadow','0px 1px 2px #000').css('paddong-bottom','3px').css('paddong-right','3px');
		$('.simple-overlay').fadeIn('slow');
	
	}
	tour.nextStep =function(index){
		setTimeout(
			function(){
				index++;
				var target = $('.popover-content a[data-touridx="'+index+'"]').parents('.popover:first').prev();
				var tH = target.height();
				var tW = target.width();
				var tO = target.offset();
				tO.top -=3;
				tO.left -=3;
				tH+=3;
				var bH = $('body').height();
				var bW = $('body').width();
				$('#simple-overlay-top').offset({'top':0,'left':0}).height(tO.top).width(bW);
				$('#simple-overlay-left').offset({'top':tO.top,'left':0}).height(tH).width(tO.left);
				$('#simple-overlay-right').offset({'top':tO.top,'left':tO.left+tW}).height(tH).width(bW-(tO.left+tW));
				$('#simple-overlay-bottom').offset({'top':tO.top+tH,'left':0}).height(bH-(tO.top+tH)).width(bW);
				$('#simple-overlay-window').offset(tO).height(tH).width(tW);
			}
		,100);
	}
	tour.endTour= function(){
		$('.simple-overlay').fadeOut('slow').remove();
	}
	return tour;
}());
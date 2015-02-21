//= require_tree .

$(document).ready(function(){

	// Scroll to show/hide navbar
	var didScroll = false,
			$window = $(window),
			$nav = $('nav');

	var aboveThreshold = function(){
		var scrollTop = $window.scrollTop(),
				navHeight = ($window.height() - 150);

		return scrollTop > navHeight;
	};

	$window.scroll(function(){ didScroll = true; });

	setInterval(function(){
		if (didScroll){
			didScroll = false;

			if (aboveThreshold()){ $nav.slideDown(); }
			else { $nav.slideUp(); }
		}
	}, 200);

	// Navbar links on click
	$('.navbar a').on('click', function(e){
		e.preventDefault();
		var el = $($(this).attr('href'));

		$('html, body').animate({
        scrollTop: el.offset().top
    }, 1000, 'swing');
	});

	// Initialize slick for image gallery
	$('.gallery').slick();

});

//= require_tree .

$(document).ready(function(){

	// Scroll to show/hide navbar
	var didScroll = false,
			$window = $(window),
			$nav = $('nav');

	var aboveThreshold = function(){
		var scrollTop = $window.scrollTop(),
				navHeight = ($window.height() - 50);

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
	$('.navbar a, a.home-link').on('click', function(e){
		var $this = $(this);

		if (!$this.hasClass('blog-link')) {
			e.preventDefault();
			var el = $($this.attr('href'));

			$('html, body').animate({
				scrollTop: el.offset().top
	    }, 1000, 'swing');
		}
	});

	// Product image hover
	// TODO fix hover on smaller screen sizes
	$('.product-info').hover(
		function(){
			if (window.innerWidth > 991) {
				var $this = $(this),
						$image = $this.children('.product-image'),
						$description = $this.children('.product-description');

				$image.hide();
				$description.show();
			}
		},
		function(){
			if (window.innerWidth > 991) {
				var $this = $(this),
						$image = $this.children('.product-image'),
						$description = $this.children('.product-description');

				$image.show();
				$description.hide();
			}
		}
	);

	// Product view gallery
	$('.gallery-link').on('click', function(e) {
		e.preventDefault();

		var $this = $(this),
				target = $this.data('gallery'),
				$targetGallery = $("#" + target + "-gallery"),
				$productInfo = $('#product .section-container .row');

		$targetGallery.show();
		$productInfo.hide();

		blueimp.Gallery(
				document.getElementById(target + '-gallery').getElementsByTagName('a'),
				{
						container: '#blueimp-gallery-carousel',
						carousel: true
				}
		);
	});

	$('#blueimp-gallery-carousel .close').on('click', function(e){
		$('.product-gallery').hide('fast', function(){
			$('#product .section-container .row').show('slow');
		});
	});

});

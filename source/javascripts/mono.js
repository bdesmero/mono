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

	// Initialize slick for image gallery
	$('.gallery').slick();

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
	$('.gallery-link').on('click', function(e){
		e.preventDefault();

		var $this = $(this),
				target = $this.data('gallery'),
				$targetGallery = $("#" + target + "-gallery"),
				$productInfo = $('#product .section-container .row');

		$targetGallery.show();
		$productInfo.hide();
	});

	$('.gallery-close').on('click', function(e){
		e.preventDefault();

		var $galleryContainer = $('.gallery-container:visible'),
				$productInfo = $('#product .section-container .row');

		$galleryContainer.hide();
		$productInfo.show();
	});
});

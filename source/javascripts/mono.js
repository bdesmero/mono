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

	// Sticky links - Activate links on navbar as user scrolls through sections
	var $sections = $('section'),
			$nav = $('nav'),
			navHeight = $nav.outerHeight();

	$window.on('scroll', function () {
	  var currentPosition = $(this).scrollTop();

	  $sections.each(function() {
	    var $this = $(this),
					top = $this.offset().top - navHeight,
	        bottom = top + $this.outerHeight();

	    if (currentPosition >= top && currentPosition <= bottom) {
	      $nav.find('a').removeClass('active');
	      $sections.removeClass('active');

	      $this.addClass('active');
	      $nav.find('a[href="#'+$this.attr('id')+'"]').addClass('active');
	    }
	  });
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

		$window.scrollTop($targetGallery.offset().top - 50);

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

	// Contact form submit
	$('.contact-submit').on('click', function(e) {
		e.preventDefault();

		if ($('.g-recaptcha-response').val()) {
			$.ajax({
			  dataType: 'jsonp',
			  url: "http://getsimpleform.com/messages/ajax?form_api_token=e353fff5c3ce9b797632717c333784c6",
			  data: {
			    name: $('form #contact-name').val(),
					email: $('form #contact-email').val(),
					subject: $('form #contact-subject').val(),
			    message: $('form #contact-message').val()
			  }
			}).done(function() {
			  $('.alert-success').slideDown().delay(2000).fadeOut('slow');
			});
		} else {
			$('.alert-danger').slideDown().delay(2000).fadeOut('slow');
		}
	});

});

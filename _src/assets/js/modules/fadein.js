export default function (selector) {
	const init = () => {
		fadein();
	}

	const fadein = () => {
		jQuery(function ($) {

			var doAnimations = function () {

				var offset = $(window).scrollTop() + $(window).height(),
					$animatables = $('.animatable');

				if ($animatables.length == 0) {
					$(window).off('scroll', doAnimations);
				}

				$animatables.each(function (i) {
					var $animatable = $(this);
					if (($animatable.offset().top + $animatable.height() - 20) < offset) {
						$animatable.removeClass('animatable').addClass('animated');
					}
				});

			};

			$(window).on('scroll', doAnimations);
			$(window).trigger('scroll');

		});
	}

	init();

	return {}
}
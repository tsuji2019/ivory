import Swiper, { Pagination } from 'swiper';

export default function(selector) {
  const init = () => {
    slider();
  }

	const slider = () => {
		const swiper = new Swiper('.swiper-container', {
			autoplay: {
				delay : 5000,
				disableOnInteraction : false,
			},
			speed: 800,
			loop: true,
			effect: 'fade',
			pagination: {
				el: '.swiper-pagination',
				type: 'bullets',
				clickable: true,
				renderBullet: function (index, className) {
					return '<span class="' + className + '">' + (index + 1) + ' - 5' + '</span>';
				}
			},
		});
	}

	init();

	return {}
}
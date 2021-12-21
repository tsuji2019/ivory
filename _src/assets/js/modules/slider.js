import Swiper, {
	Pagination
} from 'swiper';

export default function (selector) {
	const init = () => {
		Slider();
	}

	const Slider = () => {
		var swiper = new Swiper(".mySwiper", {
			slidesPerView: "3",
			spaceBetween: 20,
			loop: true,
			pagination: {
				el: ".swiper-pagination",
				type: "progressbar",
			},
			navigation: {
				nextEl: ".swiper-button-next",
				prevEl: ".swiper-button-prev",
			},
			// autoplay: {
			// 	disableOnInteraction: false,
			// }
		});
	}

	init();

	return {}
}
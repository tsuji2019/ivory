import Swiper, {
	Pagination
} from 'swiper';

export default function (selector) {
	const init = () => {
		modal();
	}

	const modal = () => {
		$(function () {

			var swiper = new Swiper('.swiper-container', {
				loop: true,
				slidesPerView: 'auto',
				centeredSlides: true,
				navigation: {
					nextEl: '.swiper-button-next',
					prevEl: '.swiper-button-prev',
				}
			});

			// モーダル開く
			$('.Card-Item').on('click', function () {
				var index = $(this).index();
				swiper.slideTo(index);
				$('.ModalLayer').addClass('isShow');
			});
			$('.ModalLayer-Mask').on('click', function () {
				$('.ModalLayer').removeClass('isShow');
			});
			$('.JS_Click_CloseModal_Trigger').on('click', function () {
				$('.ModalLayer').removeClass('isShow');
			});

		});

	}

	init();

	return {}
}
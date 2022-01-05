export default function (selector) {

	const init = () => {
		header();
	}

	const header = () => {
		var elemTop = [];

		function PositionCheck() {
			var headerH = $("#header").outerHeight(true);
			$(".scroll-point").each(function (i) {
				elemTop[i] = Math.round(parseInt($(this).offset().top - headerH));
			});
		}

		function ScrollAnime() {
			var scroll = Math.round($(window).scrollTop());
			var NavElem = $("#g-nav li");
			$("#g-nav li").removeClass('current');
			if (scroll >= 0 && scroll < elemTop[1]) {
				$(NavElem[0]).addClass('current');
			} else if (scroll >= elemTop[1] && scroll < elemTop[2]) {
				$(NavElem[1]).addClass('current');
			}
		}

		$('#g-nav a').click(function () {
			var elmHash = $(this).attr('href');
			var headerH = $("#header").outerHeight(true);
			var pos = Math.round($(elmHash).offset().top - headerH);
			$('body,html').animate({
				scrollTop: pos
			}, 500);
			return false;
		});


		$(window).scroll(function () {
			PositionCheck();
			ScrollAnime();
		});

		$(window).on('load', function () {
			PositionCheck();
			ScrollAnime();
		});

		$(window).resize(function () {
			PositionCheck()
		});
		備
		var elemTop = [];

		function PositionCheck() {
			var headerH = $("#header").outerHeight(true);
			$(".scroll-point").each(function (i) {
				elemTop[i] = Math.round(parseInt($(this).offset().top - headerH));
			});
		}

		function ScrollAnime() {
			var scroll = Math.round($(window).scrollTop());
			var NavElem = $("#g-nav li");
			$("#g-nav li").removeClass('current');
			if (scroll >= 0 && scroll < elemTop[1]) {
				$(NavElem[0]).addClass('current');
			} else if (scroll >= elemTop[1]) {
				$(NavElem[1]).addClass('current');
			}
		}

		//ナビゲーションをクリックした際のスムーススクロール
		$('#g-nav a').click(function () {
			var elmHash = $(this).attr('href');
			var headerH = $("#header").outerHeight(true);
			var pos = Math.round($(elmHash).offset().top - headerH);
			$('body,html').animate({
				scrollTop: pos
			}, 500);
			return false;
		});


		$(window).scroll(function () {
			PositionCheck();
			ScrollAnime();
		});

		$(window).on('load', function () {
			PositionCheck();
			ScrollAnime();
		});

		$(window).resize(function () {
			//リサイズされたときの処理
			PositionCheck()
		});
	}

	init();

	return {}
}
export default function (selector) {

	const init = () => {
		mousestalker();
	}

	const mousestalker = () => {
		const stalker = document.getElementById('stalker');

		let hovFlag = false;

		document.addEventListener('mousemove', function (e) {
			if (!hovFlag) {
				stalker.style.transform = 'translate(' + e.clientX + 'px, ' + e.clientY + 'px)';
			}
		});

		const linkElem = document.querySelectorAll('a:not(.no_stick_)');
		for (let i = 0; i < linkElem.length; i++) {
			linkElem[i].addEventListener('mouseover', function (e) {
				hovFlag = true;

				//マウスストーカーにクラスをつける
				stalker.classList.add('hov_');

				//マウスストーカーの位置をリンクの中心に固定
				let rect = e.target.getBoundingClientRect();
				let posX = rect.left + (rect.width / 2);
				let posY = rect.top + (rect.height / 2);

				stalker.style.transform = 'translate(' + posX + 'px, ' + posY + 'px)';

			});
			//マウスホバー解除時
			linkElem[i].addEventListener('mouseout', function (e) {
				hovFlag = false;
				stalker.classList.remove('hov_');
			});
		}
	}

	init();

	return {}
}
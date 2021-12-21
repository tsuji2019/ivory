export default function (selector) {

	const init = () => {
		parallax();
	}

	const parallax = () => {

		// @param {DOM Node} parent This is DOM node of parent element
		// @param {DOM Node} child This is DOM node for parallax element
		// @param {Object} opts Settings for parallax such as speed, dirrection etc.

		var PrlxRAF = function (parent, child, opts) {
			var defaults = {
				speed: .5,
				direction: 'y',
				everyStep: null,
				type: 'parallax', // parallax, scrollspy
				scrollspy: {
					class: 'show',
					reverse: false
				},
				offset: 0
			}

			var param = Object.assign({}, defaults, opts)
			var parent = document.querySelectorAll(parent);
			var oldStep = 0;
			var timeOutId = 0;
			var storage = [];

			//     Timings
			var then = Date.now()
			var now = then
			var elapsed = 0
			var interval = 0


			for (var i = 0; i < parent.length; i++) {
				// Push to storage if has child
				if (parent[i].querySelector(child)) {
					storage.push({
						parent: parent[i],
						child: parent[i].querySelectorAll(child)
					})
				}
			}


			var loop = window.requestAnimationFrame;
			var speed = param.speed;

			var play = function () {
				function animateIt() {
					for (var i = 0; i < storage.length; i++) {
						var detectElmPos = getInView(storage[i].parent)

						if (detectElmPos.isInView && storage[i].child) {
							var scrollY = window.scrollY + window.innerHeight
							var step = (detectElmPos.top - window.innerHeight) * speed


							// Every Step function;
							if (oldStep != step) {
								if (param.everyStep) {
									param.everyStep(storage[i].child[0])
								}
								oldStep = step
							}


							// Type
							if (param.type === 'parallax') {
								// Dirrection
								if (param.direction == 'x') {
									storage[i].child[0].style.transform = `translate3d(${step}px, 0, 0)`;
								} else {
									storage[i].child[0].style.transform = `translate3d(0, ${step}px, 0)`;
								}
							} else if (param.type === 'scrollspy') {
								// Scrollspy
								var inViewStorage = [];
								storage[i].child.forEach(function (elm) {
									var detectChildPos = getInView(elm)
									if (detectChildPos.isInView) {
										inViewStorage.push(elm)
									}

									// If child is in view
									if (detectChildPos.isInView) {
										if (!elm.classList.contains(param.scrollspy.class)) {
											elm.classList.add(param.scrollspy.class)
										}

									} else if (!detectChildPos.isInView && param.scrollspy.reverse) {
										// If child is out of view
										if (elm.classList.contains(param.scrollspy.class)) {
											elm.classList.remove(param.scrollspy.class)
										}

									}
								})
							}
						}

						if (!detectElmPos.isInView && storage[i].child) {
							if (param.type === 'scrollspy' && param.scrollspy.reverse) {
								storage[i].child.forEach(function (elm) {
									var detectChildPos = getInView(elm)
									if (!detectChildPos.isInView) {
										if (elm.classList.contains(param.scrollspy.class)) {
											elm.classList.remove(param.scrollspy.class)
										}
									}
								})
							}
						}
					}


				}
				now = Date.now()
				elapsed = now - then

				if (elapsed > interval) {
					elapsed = 0
					then = Date.now()

					animateIt()
				}

				loop(play)

			}
			play()

			function getInView(elm) {
				var top = elm.getBoundingClientRect().top + param.offset
				var bottom = elm.getBoundingClientRect().bottom
				var inView = top - window.innerHeight < 0 && bottom > param.offset
				return {
					isInView: inView,
					top: top
				}
			}
		}



		/////////////////////////////////////////
		//             EXAMPLES                //
		/////////////////////////////////////////
		let prlx1 = new PrlxRAF('.prlx__parent1', '.prlx__child', {
			speed: .2
		})


		let prlx2 = new PrlxRAF('.prlx__parent2', '.prlx__child', {
			speed: .3,
			direction: 'x'
		})



		// let rotate = 0;
		// let prlx3 = new PrlxRAF('.prlx__parent3', '.prlx__child', {
		// 	speed: .2,
		// 	everyStep: function (elm) {
		// 		rotate++
		// 		elm.querySelector('img').style.transform = `rotate(${rotate}deg)`
		// 	}
		// })


		// let prlx4 = new PrlxRAF('.prlx__parent4', '.prlx__child', {
		// 	type: 'scrollspy',
		// 	offset: 100,
		// 	scrollspy: {
		// 		reverse: true,
		// 		class: 'show'
		// 	}
		// })
	}

	init();

	return {}
}
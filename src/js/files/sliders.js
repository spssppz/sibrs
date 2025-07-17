/* Документация слайдера: https://swiperjs.com/ */

import Swiper from 'swiper';
import { Navigation, Pagination } from 'swiper/modules';
/*
Основниые модули слайдера:
Navigation, Pagination, Autoplay, EffectFade, Lazy, Manipulation
*/

function initSliders() {
	if (window.innerWidth < 992) {
		if (document.querySelector('.terms__slider')) {
			new Swiper('.terms__slider', {
				modules: [Pagination],
				speed: 800,
				spaceBetween: 10,
				pagination: {
					el: '.terms__pagination',
					clickable: true,
				},
				breakpoints: {
					375: {
						slidesPerView: 1,
					},
					768: {
						slidesPerView: 2,
					},
				},
			})
		}
	}
	if (document.querySelector('.reasons__slider')) {
		new Swiper('.reasons__slider', {
			modules: [Navigation, Pagination],
			speed: 800,
			pagination: {
				el: '.reasons__pagination',
				clickable: true,
			},
			navigation: {
				prevEl: '.reasons__slider-btn_prev',
				nextEl: '.reasons__slider-btn_next',
			},
			breakpoints: {
				375: {
					slidesPerView: 1,
					spaceBetween: 10,
				},
				768: {
					slidesPerView: 2,
					spaceBetween: 10,
				},
				992: {
					spaceBetween: 20,
				},
				1300: {
					slidesPerView: 3,
					spaceBetween: 20,

				},
			},
		})
	}
	if (document.querySelector('.right-tests__slider')) {
		new Swiper('.right-tests__slider', {
			modules: [Navigation],
			speed: 800,
			slidesPerView: 1,
			navigation: {
				prevEl: '.right-tests__slider-btn_prev',
				nextEl: '.right-tests__slider-btn_next',
			},
			breakpoints: {
				375: {
					spaceBetween: 10,
				},
				1300: {
					spaceBetween: 20,
				},
			},
		})
	}
	if (window.innerWidth >= 992) {
		if (document.querySelector('.news-main__slider')) {
			new Swiper('.news-main__slider', {
				spaceBetween: 20,
				speed: 800,

				breakpoints: {
					992: {
						slidesPerView: 2,
					},
					1300: {
						slidesPerView: 3,
					},
				},
			})
		}
	}
}

window.addEventListener("load", () => initSliders())

// if (document.querySelector('.news-main__slider')) {
// 	new Swiper('.news-main__slider', {
// 		// modules: [Navigation],
// 		slidesPerView: 3,
// 		spaceBetween: 20,
// 		speed: 800,

// 		//loop: true,

// 		// pagination: {
// 		// 	el: '.swiper-pagination',
// 		// 	clickable: true,
// 		// },

// 		// scrollbar: {
// 		// 	el: '.swiper-scrollbar',
// 		// 	draggable: true,
// 		// },

// 		// navigation: {
// 		// 	prevEl: '.swiper-button-prev',
// 		// 	nextEl: '.swiper-button-next',
// 		// },

// 		// breakpoints: {
// 		// 	320: {
// 		// 		slidesPerView: 1,
// 		// 		spaceBetween: 0,
// 		// 		autoHeight: true,
// 		// 	},
// 		// 	768: {
// 		// 		slidesPerView: 2,
// 		// 		spaceBetween: 20,
// 		// 	},
// 		// 	992: {
// 		// 		slidesPerView: 3,
// 		// 		spaceBetween: 20,
// 		// 	},
// 		// 	1268: {
// 		// 		slidesPerView: 4,
// 		// 		spaceBetween: 30,
// 		// 	},
// 		// },

// 		// on: {}
// 	})
// }
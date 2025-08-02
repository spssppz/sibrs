/* Документация слайдера: https://swiperjs.com/ */

import Swiper from 'swiper';
import { Navigation, Pagination, Thumbs, Scrollbar } from 'swiper/modules';
/*
Основниые модули слайдера:
Navigation, Pagination, Autoplay, EffectFade, Lazy, Manipulation
*/
let cabinetSlider = null
let termsSlider = null
let newsSlider = null
let currentMode = window.innerWidth < 992 ? 'mobile' : 'desktop'

function initSlidersResize() {
	const isMobile = window.innerWidth < 992

	if (isMobile) {
		if (!cabinetSlider && document.querySelector('.cabinet__cols')) {
			cabinetSlider = new Swiper('.cabinet__cols', {
				modules: [Scrollbar],
				freeMode: true,
				speed: 800,
				spaceBetween: 5,
				scrollbar: {
					el: '.cabinet__scrollbar',
					draggable: true,
				},
				breakpoints: {
					375: { slidesPerView: 2.5, },
					480: { slidesPerView: 3, },
					768: { slidesPerView: 3.5, },
				},
			})
		}

		if (!termsSlider && document.querySelector('.terms__slider')) {
			termsSlider = new Swiper('.terms__slider', {
				modules: [Pagination],
				speed: 800,
				spaceBetween: 10,
				pagination: {
					el: '.terms__pagination',
					clickable: true,
				},
				breakpoints: {
					375: { slidesPerView: 1, },
					768: { slidesPerView: 2, },
				},
			})
		}

		if (newsSlider) {
			newsSlider.destroy(true, true)
			newsSlider = null
		}
	} else {
		if (!newsSlider && document.querySelector('.news-main__slider')) {
			newsSlider = new Swiper('.news-main__slider', {
				spaceBetween: 20,
				speed: 800,
				breakpoints: {
					992: { slidesPerView: 2 },
					1300: { slidesPerView: 3 },
				},
			})
		}

		// Уничтожаем мобильные слайдеры, если они есть
		if (cabinetSlider) {
			cabinetSlider.destroy(true, true)
			cabinetSlider = null
		}
		if (termsSlider) {
			termsSlider.destroy(true, true)
			termsSlider = null
		}
	}
}

function initSliders() {
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
				375: { spaceBetween: 10, },
				1300: { spaceBetween: 20, },
			},
		})
	}
	if (document.querySelector('.product__thumbs') && document.querySelector('.product__slider')) {
		const productThumbs = new Swiper('.product__thumbs', {
			modules: [Navigation],
			speed: 800,
			navigation: {
				nextEl: '.product__thumbs-btn_next',
			},
			breakpoints: {
				375: {
					direction: 'horizontal',
					slidesPerView: 3,
					spaceBetween: 5,
				},
				480: {
					direction: 'horizontal',
					slidesPerView: 4,
					spaceBetween: 5,
				},
				768: {
					direction: 'vertical',
					slidesPerView: 'auto',
					spaceBetween: 5,
				},
			},
		})
		new Swiper('.product__slider', {
			modules: [Thumbs],
			speed: 800,
			slidesPerView: 1,
			spaceBetween: 20,
			thumbs: {
				swiper: productThumbs,
				slideThumbActiveClass: 'product__thumb_current',
			},
		})
	}
	if (document.querySelector('.other__slider')) {
		new Swiper('.other__slider', {
			modules: [Navigation, Pagination],
			speed: 800,
			noSwiping: true,
			noSwipingClass: 'product-slider-init',
			pagination: {
				el: '.other__pagination',
				clickable: true,
			},
			navigation: {
				prevEl: '.other__slider-btn_prev',
				nextEl: '.other__slider-btn_next',
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
					slidesPerView: 2,
				},
				1300: {
					slidesPerView: 3,
					spaceBetween: 20,
				},
				1700: {
					slidesPerView: 4,
					spaceBetween: 20,
				},
			},
		})
	}
	if (document.querySelector('.other-posts__slider')) {
		new Swiper('.other-posts__slider', {
			speed: 800,

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
	if (document.querySelector('.comp__slider')) {
		new Swiper('.comp__slider', {
			speed: 800,
			spaceBetween: 10,

			breakpoints: {
				375: { slidesPerView: 1, },
				768: { slidesPerView: 2, },
				1300: { slidesPerView: 3, },
				1700: { slidesPerView: 4, },
			},
			on: {
				setTranslate() {
					const charCols = document.querySelectorAll('.char__cols')
					if (charCols) {
						charCols.forEach(charCol => {
							charCol.scrollLeft = -this.translate
						})
					}
				}
			}
		})
	}
}

window.addEventListener("load", () => {
	initSliders()
	initSlidersResize()
})

window.addEventListener('resize', () => {
	const newMode = window.innerWidth < 992 ? 'mobile' : 'desktop'
	if (newMode !== currentMode) {
		currentMode = newMode
		initSlidersResize()
	}
})

const serverSliders = document.querySelectorAll('.product-slider')
if (serverSliders) {
	serverSliders.forEach(serverSlider => {
		const track = serverSlider.querySelector('.product-track')
		const items = serverSlider.querySelectorAll('.product-item')
		const pag = serverSlider.querySelector('.product-pagination')
		let current = 0

		const goTo = i => {
			current = Math.max(0, Math.min(i, items.length - 1))
			track.style.transform = `translateX(-${current * 100}%)`
			pag.querySelectorAll('button').forEach((btn, idx) => {
				btn.classList.toggle('active', idx === current)
			})
		}

		// Пагинация
		if (items.length > 1) {
			serverSlider.classList.add('product-slider-init')
			items.forEach((_, i) => {
				const dot = document.createElement('button')
				dot.setAttribute('aria-label', `Перейти к ${i + 1} слайду`)
				if (i === 0) dot.classList.add('active')
				dot.addEventListener('click', () => goTo(i))
				pag.appendChild(dot)
			})
		} else pag.style.display = 'none'


		// Общие переменные для свайпа
		let startX = 0
		let isDragging = false

		// --- TOUCH EVENTS ---
		track.addEventListener('touchstart', e => {
			startX = e.touches[0].clientX
			isDragging = true
		})

		track.addEventListener('touchend', e => {
			if (!isDragging) return
			const endX = e.changedTouches[0].clientX
			handleSwipe(endX - startX)
			isDragging = false
		})

		// --- MOUSE EVENTS ---
		track.addEventListener('mousedown', e => {
			startX = e.clientX
			isDragging = true
		})

		document.addEventListener('mouseup', e => {
			if (!isDragging) return
			const endX = e.clientX
			handleSwipe(endX - startX)
			isDragging = false
		})

		// Обработка свайпа
		function handleSwipe(diff) {
			if (Math.abs(diff) > 50) {
				if (diff < 0 && current < items.length - 1) goTo(current + 1)
				else if (diff > 0 && current > 0) goTo(current - 1)
			}
		}
	})
}
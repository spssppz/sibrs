import { bodyLockToggle, isMobile, menuClose } from "./functions.js";
import { flsModules } from "./modules.js";

document.documentElement.addEventListener('click', e => {
	if (e.target.closest('.filter-btn') && window.innerWidth <= 992) {
		bodyLockToggle()
		document.documentElement.classList.toggle('filter-show')
	}
	if (!e.target.closest('.sidebar') &&
		document.documentElement.classList.contains('menu-open') &&
		window.innerWidth >= 992) {
		menuClose()
	}
})
document.querySelectorAll('.catalog-sort').forEach(sortBlock => {
	const title = sortBlock.querySelector('.catalog-sort__title')
	const optionsWrapper = sortBlock.querySelector('.catalog-sort__sub')
	const options = optionsWrapper.querySelectorAll('button')

	title.addEventListener('click', () => sortBlock.classList.toggle('is-open'))

	// Выбор пункта
	options.forEach(btn => {
		btn.addEventListener('click', () => {
			options.forEach(opt => opt.classList.remove('is-active'))
			btn.classList.add('is-active')
			title.textContent = btn.textContent
			sortBlock.classList.remove('is-open')
		})
	})

	// Клик вне — закрытие
	document.addEventListener('click', e => {
		if (!sortBlock.contains(e.target)) sortBlock.classList.remove('is-open')
	})
})
function positionAside() {
	const aside = document.querySelector('.sidebar')
	if (!aside) return

	const containerWidth = 1660
	const windowWidth = window.innerWidth

	if (windowWidth > (containerWidth + 40)) {
		const leftOffset = (windowWidth - containerWidth) / 2
		aside.style.paddingLeft = `${leftOffset}px`
	} else {
		aside.style.paddingLeft = '20px'
	}
}

window.addEventListener('resize', positionAside)
positionAside()

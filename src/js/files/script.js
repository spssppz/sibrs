import { isMobile } from "./functions.js";
import { flsModules } from "./modules.js";


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

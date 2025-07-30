import { bodyLockToggle, isMobile, menuClose } from "./functions.js";
import { flsModules } from "./modules.js";

document.documentElement.addEventListener('click', e => {
	if (e.target.closest('.server__action')) {
		e.target.closest('.server__action').classList.toggle('active')
	}
	if (e.target.closest('.sidebar__link')) {
		e.target.closest('.sidebar__item_has-sub')?.classList.toggle('sub-menu-show')
	}
	if (e.target.closest('.sub-sidebar__back')) {
		e.target.closest('.sub-menu-show')?.classList.remove('sub-menu-show')
	}
	if (e.target.closest('[data-tooltip]') && isMobile.any()) {
		e.target.closest('[data-tooltip]').classList.toggle('show-tooltip')
	}
	if (e.target.closest('.inp-line__pass-eye')) {
		const input = e.target.closest('.inp-line__pass').querySelector('input')
		e.target.closest('.inp-line__pass').classList.toggle('show-pass')

		const isPassword = input.type === 'password'
		input.type = isPassword ? 'text' : 'password'
	}
	if (e.target.closest('.header-search__btn')) {
		const searchInput = document.querySelector('.header-search__input')
		const isOpening = !document.documentElement.classList.contains('search-show')

		if (isOpening) {
			document.documentElement.classList.add('search-show')
			searchInput.focus()
		} else {
			document.documentElement.classList.remove('sub-search-show')
			document.documentElement.classList.remove('search-show')
			searchInput.value = ''
		}
	} else if (
		document.documentElement.classList.contains('search-show') &&
		!e.target.closest('.header-search')
	) {
		document.documentElement.classList.remove('sub-search-show', 'search-show')
	}


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



const inputFileContainers = document.querySelectorAll('.input-file-wrapper')

if (inputFileContainers.length) {
	inputFileContainers.forEach(container => {
		const inputFile = container.querySelector('.input-file__input')
		const fileLabel = container.querySelector('.input-file__text')
		const fileDescr = container.querySelector('.input-file-wrapper__descr')

		const maxFiles = Number(inputFile.dataset.maxFiles) || 6
		const maxFileWeightMB = Number(inputFile.dataset.maxFilesWeight) || 12
		const maxFileWeightBytes = maxFileWeightMB * 1024 * 1024

		inputFile.addEventListener('change', handleFileSelect)

		container.addEventListener('dragover', handleDragOver)
		container.addEventListener('dragleave', handleDragLeave)
		container.addEventListener('drop', handleDrop)

		function handleFileSelect(e) {
			const files = [...e.target.files]
			updateFileInfo(files)
		}

		function handleDragOver(e) {
			e.preventDefault()
			container.classList.add('input-file-active')
		}

		function handleDragLeave(e) {
			e.preventDefault()
			container.classList.remove('input-file-active')
		}

		function handleDrop(e) {
			e.preventDefault()
			container.classList.remove('input-file-active')

			const files = [...e.dataTransfer.files]
			if (!files.length) return

			// ⚠️ Валидируем ДО добавления в input
			if (files.length > maxFiles) {
				showError(`Максимум ${maxFiles} файлов`)
				return resetInput()
			}

			const invalidFiles = files.filter(file => {
				const isValidType = ['image/jpeg', 'image/png'].includes(file.type)
				const isValidSize = file.size <= maxFileWeightBytes
				return !isValidType || !isValidSize
			})

			if (invalidFiles.length) {
				showError(`Неверный формат или файл > ${maxFileWeightMB}MB`)
				return resetInput()
			}

			// ✅ Всё ок — добавляем в input
			const dataTransfer = new DataTransfer()
			files.forEach(file => dataTransfer.items.add(file))
			inputFile.files = dataTransfer.files

			updateFileInfo(files)
			inputFile.dispatchEvent(new Event('change'))
		}


		function updateFileInfo(files) {
			if (files.length > maxFiles) {
				showError(`Максимум ${maxFiles} файлов`)
				return resetInput()
			}

			const invalidFiles = files.filter(file => {
				const isValidType = ['image/jpeg', 'image/png'].includes(file.type)
				const isValidSize = file.size <= maxFileWeightBytes
				return !isValidType || !isValidSize
			})

			if (invalidFiles.length) {
				showError(`Неверный формат или файл > ${maxFileWeightMB}MB`)
				return resetInput()
			}

			const totalSizeKB = files.reduce((sum, file) => sum + file.size, 0) / 1024
			const names = files.map(file => file.name).join(', ')

			fileLabel.textContent = names
			fileDescr.textContent = `${files.length} файл(ов), ${(totalSizeKB).toFixed(2)} KB`
			fileDescr.style.color = ''
		}

		function showError(message) {
			fileLabel.textContent = 'Ошибка загрузки'
			fileDescr.textContent = message
			fileDescr.style.color = 'red'
		}

		function resetInput() {
			inputFile.value = ''
		}
	})
}

const inputsMaxWords = document.querySelectorAll('textarea[data-max-words]')
if (inputsMaxWords.length) {
	inputsMaxWords.forEach(inputMaxWords => {
		const maxLength = parseInt(inputMaxWords.dataset.maxWords)
		const wrapper = inputMaxWords.closest('.inp-line')
		const counterEl = wrapper?.querySelector('.inp-line__descr span')

		if (!counterEl) return

		updateCounter()

		inputMaxWords.addEventListener('input', updateCounter)
		inputMaxWords.addEventListener('keydown', preventExtraInput)
		inputMaxWords.addEventListener('paste', handlePaste)

		function updateCounter() {
			const currentLength = inputMaxWords.value.length
			const remaining = Math.max(0, maxLength - currentLength)
			counterEl.textContent = remaining

			// Усекание текста, если вставили слишком много
			if (currentLength > maxLength) {
				inputMaxWords.value = inputMaxWords.value.slice(0, maxLength)
				counterEl.textContent = 0
			}
		}

		function preventExtraInput(e) {
			const allowedKeys = [
				'Backspace', 'Delete', 'ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown',
				'Control', 'Meta', 'Alt', 'Tab', 'Escape', 'Enter'
			]

			const isModifier = e.ctrlKey || e.metaKey || e.altKey

			if (
				inputMaxWords.value.length >= maxLength &&
				!allowedKeys.includes(e.key) &&
				!isModifier
			) {
				e.preventDefault()
			}
		}

		function handlePaste(e) {
			e.preventDefault()
			const pastedText = (e.clipboardData || window.clipboardData).getData('text')
			const allowed = maxLength - inputMaxWords.value.length

			if (allowed <= 0) return

			const insert = pastedText.slice(0, allowed)
			const start = inputMaxWords.selectionStart
			const end = inputMaxWords.selectionEnd

			const currentValue = inputMaxWords.value
			inputMaxWords.value =
				currentValue.slice(0, start) + insert + currentValue.slice(end)

			// Сдвигаем курсор после вставки
			const newCursorPos = start + insert.length
			inputMaxWords.setSelectionRange(newCursorPos, newCursorPos)

			updateCounter()
		}
	})
}

(() => {
	const stock = document.querySelector('.stock')
	if (!stock) return

	const deadlineAttr = stock.dataset.deadline
	if (!deadlineAttr) return

	const deadline = new Date(`${deadlineAttr}T23:59:59`)
	const now = new Date()

	// 🔒 Если дата уже в прошлом — выходим
	if (deadline <= now) return

	const daysEl = stock.querySelector('[data-unit="days"]')
	const hoursEl = stock.querySelector('[data-unit="hours"]')
	const minutesEl = stock.querySelector('[data-unit="minutes"]')
	const secondsEl = stock.querySelector('[data-unit="seconds"]')
	let timer
	const updateCountdown = () => {
		const now = new Date()
		const diff = deadline - now

		if (diff <= 0) {
			clearInterval(timer)
			const cap = stock.querySelector('.stock__cap')
			if (cap) cap.textContent = 'Акция завершена!'
			[daysEl, hoursEl, minutesEl, secondsEl].forEach(el => el.textContent = '00')
			return
		}

		const days = Math.floor(diff / (1000 * 60 * 60 * 24))
		const hours = Math.floor((diff / (1000 * 60 * 60)) % 24)
		const minutes = Math.floor((diff / (1000 * 60)) % 60)
		const seconds = Math.floor((diff / 1000) % 60)

		daysEl.textContent = String(days).padStart(2, '0')
		hoursEl.textContent = String(hours).padStart(2, '0')
		minutesEl.textContent = String(minutes).padStart(2, '0')
		secondsEl.textContent = String(seconds).padStart(2, '0')
	}

	updateCountdown()
	timer = setInterval(updateCountdown, 1000)
})()

const calcProgress = document.querySelector('.calc-circle__progress')

if (calcProgress) {
	const percent = Number(calcProgress.dataset.percent) || 10
	const totalBars = 40
	const g = calcProgress.querySelector('svg g')

	if (!g) {
		console.warn('Внутри .calc-circle__progress нет <svg><g> для отрисовки прогресса')
	} else {
		const activeBars = Math.round((percent / 100) * totalBars)

		for (let i = 0; i < totalBars; i++) {
			const angle = (360 / totalBars) * i
			const color = i < activeBars ? '#0dd359' : '#e1e1e1'

			const rect = document.createElementNS('http://www.w3.org/2000/svg', 'rect')
			rect.setAttribute('x', -6)
			rect.setAttribute('y', -140)
			rect.setAttribute('width', 12)
			rect.setAttribute('height', 30)
			rect.setAttribute('rx', 4)
			rect.setAttribute('ry', 4)
			rect.setAttribute('fill', color)
			rect.setAttribute('transform', `rotate(${angle})`)
			g.appendChild(rect)
		}
	}
}



if (document.querySelector('.form-validate')) {
	const validateForms = document.querySelectorAll('.form-validate')

	validateForms.forEach(validateForm => {
		const btnForm = validateForm.querySelector('button[type="submit"]')
		if (!btnForm) return
		const reqInputs = validateForm.querySelectorAll('.req, .req-email, .req-checkbox, .req-phone')

		reqInputs.forEach(reqInput => {
			reqInput.addEventListener('focus', () => {
				if (reqInput.classList.contains('error') || reqInput.classList.contains('error-email') || reqInput.classList.contains('error-phone')) {
					reqInput.classList.remove('error', 'error-email', 'error-phone')
					reqInput.removeAttribute('aria-invalid')
					const prev = reqInput.previousElementSibling
					if (prev?.classList.contains('error-message')) prev.remove()
				}
			})
			reqInput.addEventListener('change', () => {
				if (reqInput.classList.contains('error-checkbox')) {
					reqInput.classList.remove('error-checkbox')
					reqInput.removeAttribute('aria-invalid')
				}
			})
		})

		btnForm.addEventListener('click', e => {
			let errors = 0
			// Очищаем старые ошибки
			validateForm.querySelectorAll('.error-message').forEach(el => el.remove())

			reqInputs.forEach(reqInput => {
				const isEmpty = !reqInput.value
				const isEmail = reqInput.classList.contains('req-email')
				const isCheckbox = reqInput.classList.contains('req-checkbox')
				const isPhone = reqInput.classList.contains('req-phone')

				if (!isEmail && !isCheckbox && !isPhone && isEmpty) {
					errors++
					reqInput.classList.add('error')
					reqInput.setAttribute('aria-invalid', 'true')
					const errorMessage = document.createElement('span')
					errorMessage.classList.add('error-message')
					errorMessage.textContent = 'Это поле обязательно для заполнения'
					reqInput.before(errorMessage)
				}

				if (isEmail) {
					const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
					if (!reqInput.value || !emailPattern.test(reqInput.value)) {
						errors++
						reqInput.classList.add('error-email')
						reqInput.setAttribute('aria-invalid', 'true')
						const errorMessage = document.createElement('span')
						errorMessage.classList.add('error-message')
						errorMessage.textContent = 'Это поле заполнено неправильно'
						reqInput.before(errorMessage)
					}
				}

				if (isPhone) {
					// Маска +7(999) 999-99-99, регулярка для проверки заполнения цифр
					const phonePattern = /^\+7\(\d{3}\) \d{3}-\d{2}-\d{2}$/
					if (!reqInput.value || !phonePattern.test(reqInput.value)) {
						errors++
						reqInput.classList.add('error-phone')
						reqInput.setAttribute('aria-invalid', 'true')
						const errorMessage = document.createElement('span')
						errorMessage.classList.add('error-message')
						errorMessage.textContent = 'Это поле заполнено неправильно'
						reqInput.before(errorMessage)
					}
				}

				if (isCheckbox && !reqInput.checked) {
					errors++
					reqInput.classList.add('error-checkbox')
					reqInput.setAttribute('aria-invalid', 'true')
				}
			})

			if (errors) e.preventDefault()
		})
	})

}

const headerSearchInput = document.querySelector('.header-search__input')

if (headerSearchInput) {
	headerSearchInput.addEventListener('input', () => {
		document.documentElement.classList.toggle('sub-search-show', headerSearchInput.value.trim())
	})
}
import * as noUiSlider from 'nouislider';

const priceSlider = document.querySelector('.filter-price__slider')
if (priceSlider) {

	const priceFrom = +priceSlider.dataset.from
	const priceTo = +priceSlider.dataset.to
	const priceMin = +priceSlider.dataset.min
	const priceMax = +priceSlider.dataset.max

	noUiSlider.create(priceSlider, {
		start: [priceFrom, priceTo],
		connect: true,
		range: {
			'min': priceMin,
			'max': priceMax
		},
		format: {
			to: n => parseFloat(n).toFixed(0),
			from: n => parseFloat(n).toFixed(0)
		}
	})

	const inputFrom = document.querySelector('.filter-price__input_from')
	const inputTo = document.querySelector('.filter-price__input_to')

	inputFrom.addEventListener('change', setPriceValues)
	inputTo.addEventListener('change', setPriceValues)

	function setPriceValues() {
		let priceStartValue
		let priceEndValue

		inputFrom.value != '' ? priceStartValue = inputFrom.value : null
		inputTo.value != '' ? priceEndValue = inputTo.value : null

		priceSlider.noUiSlider.set([priceStartValue, priceEndValue])
	}

	priceSlider.noUiSlider.on('update', (values, handle) => {
		(handle) ? inputTo.value = values[handle] : inputFrom.value = values[handle]
	})
}

const volumeSlider = document.querySelector('.left-calc__range_volume')
if (volumeSlider) {
	const valuesForSlider = [128, 2000, 4000, 6000, 8000, 10000, 12000, 16000, 18000, 20000, 22000, 24000, 26000, 28000]
	const inputVolume = document.querySelector('.volume-input')

	// Формат отображения
	const format = {
		to: value => `${valuesForSlider[Math.round(value)]} GB`,
		from: value => {
			const numeric = parseInt(value.toString().replace(' GB', ''), 10)
			return valuesForSlider.indexOf(numeric)
		}
	}

	// Определяем пипсы в зависимости от ширины экрана
	const isMobile = window.innerWidth <= 1420
	const pipsValues = isMobile
		? valuesForSlider
			.map((v, i) => i)       // индексы
			.filter(i => i % 2 === 0) // каждое второе
		: valuesForSlider.map((_, i) => i) // все индексы

	noUiSlider.create(volumeSlider, {
		start: 0,
		range: { min: 0, max: valuesForSlider.length - 1 },
		step: 1,
		tooltips: true,
		format,
		pips: {
			mode: 'values',
			values: pipsValues,
			format: {
				to: value => valuesForSlider[Math.round(value)],
				from: value => {
					const numeric = parseInt(value.toString(), 10)
					return valuesForSlider.indexOf(numeric)
				}
			},
			density: window.innerWidth <= 1420 ? 10 : 5
		}
	})


	// Обновляем input при движении слайдера
	volumeSlider.noUiSlider.on('update', (values, handle) => {

		const numericValue = parseInt(values[handle].toString().replace(' GB', ''), 10)
		inputVolume.value = numericValue


		const index = parseInt(values[handle].replace(' GB', ''), 10)
		const realIndex = valuesForSlider.indexOf(index)

		const handleEl = volumeSlider.querySelectorAll('.noUi-handle')[handle]

		// Убираем все классы с хэндлов
		volumeSlider.querySelectorAll('.noUi-handle').forEach(h => {
			h.classList.remove('at-start', 'at-end')
		})

		if (realIndex === 0) {
			handleEl.classList.add('at-start')
		} else if (realIndex === valuesForSlider.length - 1) {
			handleEl.classList.add('at-end')
		}
	})

	// Обновляем слайдер при ручном вводе
	inputVolume.addEventListener('change', () => {
		const val = parseInt(inputVolume.value, 10)
		const index = valuesForSlider.indexOf(val)
		if (index !== -1) {
			volumeSlider.noUiSlider.set([index])
		}
	})
}
const disksSlider = document.querySelector('.left-calc__range_disks')
if (disksSlider) {
	const valuesForSlider = [4, 6, 8, 10, 12, 14, 16, 18, 20, 22, 24, 26]
	const inputDisks = document.querySelector('.disks-input')

	// Формат отображения
	const format = {
		to: value => `${valuesForSlider[Math.round(value)]} дисков`,
		from: value => {
			const numeric = parseInt(value.toString().replace(' дисков', ''), 10)
			return valuesForSlider.indexOf(numeric)
		}
	}

	// Определяем пипсы в зависимости от ширины экрана
	const isMobile = window.innerWidth <= 1420
	const pipsValues = isMobile
		? valuesForSlider
			.map((v, i) => i)       // индексы
			.filter(i => i % 2 === 0) // каждое второе
		: valuesForSlider.map((_, i) => i) // все индексы

	noUiSlider.create(disksSlider, {
		start: 0,
		range: { min: 0, max: valuesForSlider.length - 1 },
		step: 1,
		tooltips: true,
		format,
		pips: {
			mode: 'values',
			values: pipsValues,
			format: {
				to: value => valuesForSlider[Math.round(value)],
				from: value => {
					const numeric = parseInt(value.toString(), 10)
					return valuesForSlider.indexOf(numeric)
				}
			},
			density: window.innerWidth <= 1420 ? 10 : 5
		}
	})

	// Обновляем input при движении слайдера
	disksSlider.noUiSlider.on('update', (values, handle) => {
		const numericValue = parseInt(values[handle].toString().replace(' дисков', ''), 10)
		inputDisks.value = numericValue


		const index = parseInt(values[handle].replace(' дисков', ''), 10)
		const realIndex = valuesForSlider.indexOf(index)

		const handleEl = disksSlider.querySelectorAll('.noUi-handle')[handle]

		// Убираем все классы с хэндлов
		disksSlider.querySelectorAll('.noUi-handle').forEach(h => {
			h.classList.remove('at-start', 'at-end')
		})

		if (realIndex === 0) {
			handleEl.classList.add('at-start')
		} else if (realIndex === valuesForSlider.length - 1) {
			handleEl.classList.add('at-end')
		}
	})

	// Обновляем слайдер при ручном вводе
	inputDisks.addEventListener('change', () => {
		const val = parseInt(inputDisks.value, 10)
		const index = valuesForSlider.indexOf(val)
		if (index !== -1) {
			disksSlider.noUiSlider.set([index])
		}
	})
}

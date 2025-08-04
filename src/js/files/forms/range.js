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
	const inputVolume = document.querySelector('.volume-input')

	const btnVolumeMinus = document.querySelector('.volume-minus')
	const btnVolumePlus = document.querySelector('.volume-plus')

	const min = parseInt(volumeSlider.dataset.min) || 128
	const max = parseInt(volumeSlider.dataset.max) || 20000
	const step = parseInt(volumeSlider.dataset.step) || 2

	const format = {
		to: value => `${Math.round(value)} GB`,
		from: value => parseInt(value.toString().replace(/[^\d]/g, ''), 10)
	}

	const isMobile = window.innerWidth < 1420

	// Все значения от min до max
	const allValues = Array.from({ length: max - min + 1 }, (_, i) => i + min)

	// Пипсы: на мобиле — каждые 1000 GB, на десктопе — каждые 500 GB (например)
	const pipsStep = isMobile ? 4400 : 2000

	const pipsValues = allValues.filter(v => (v - min) % pipsStep === 0)

	noUiSlider.create(volumeSlider, {
		start: min,
		range: { min, max },
		step: step,
		tooltips: true,
		format,
		pips: {
			mode: 'values',
			values: pipsValues,
			format: {
				to: value => `${value}`, // без "GB"
				from: value => parseInt(value)
			},
			density: window.innerWidth < 1420 ? 7 : 4
		}
	})

	// Обновляем input при движении слайдера
	volumeSlider.noUiSlider.on('update', (values, handle) => {
		const numericValue = parseInt(values[handle].toString().replace(/[^\d]/g, ''), 10)
		inputVolume.value = numericValue

		const handleEl = volumeSlider.querySelectorAll('.noUi-handle')[handle]

		volumeSlider.querySelectorAll('.noUi-handle').forEach(h => {
			h.classList.remove('at-start', 'at-end')
		})

		if (numericValue === min) handleEl.classList.add('at-start')
		else if (numericValue === max) handleEl.classList.add('at-end')
	})

	// Обновляем слайдер при ручном вводе
	inputVolume.addEventListener('change', () => {
		const val = parseInt(inputVolume.value, 10)
		if (!isNaN(val) && val >= min && val <= max) {
			volumeSlider.noUiSlider.set(val)
		}
	})

	btnVolumeMinus.addEventListener('click', () => {
		const current = parseInt(volumeSlider.noUiSlider.get(true))
		const next = Math.max(current - step, min)
		volumeSlider.noUiSlider.set(next)
	})

	btnVolumePlus.addEventListener('click', () => {
		const current = parseInt(volumeSlider.noUiSlider.get(true))
		const next = Math.min(current + step, max)
		volumeSlider.noUiSlider.set(next)
	})

}


const disksSlider = document.querySelector('.left-calc__range_disks')
if (disksSlider) {
	const inputDisks = document.querySelector('.disks-input')

	const btnDisksMinus = document.querySelector('.disks-minus')
	const btnDisksPlus = document.querySelector('.disks-plus')
	const min = parseInt(disksSlider.dataset.min) || 4
	const max = parseInt(disksSlider.dataset.max) || 26
	const step = parseInt(disksSlider.dataset.step) || 2

	const format = {
		to: value => {
			const num = Math.round(value)
			const suffix = pluralize(num, 'диск', 'диска', 'дисков')
			return `${num} ${suffix}`
		},
		from: value => parseInt(value.toString().replace(/[^\d]/g, ''), 10)
	}


	const isMobile = window.innerWidth < 1420

	// Все значения от min до max
	const allValues = Array.from({ length: max - min + 1 }, (_, i) => i + min)

	// Пипсы: каждые 4 или 2 шага
	const pipsValues = allValues.filter(v =>
		isMobile ? (v - min) % 4 === 0 : (v - min) % 2 === 0
	)

	noUiSlider.create(disksSlider, {
		start: min,
		range: { min, max },
		step: 1,
		tooltips: true,
		format,
		pips: {
			mode: 'values',
			values: pipsValues,
			format: {
				to: value => `${value}`,
				from: value => parseInt(value)
			},
			density: isMobile ? 6 : 4
		}
	})

	// Обновляем input при движении слайдера
	disksSlider.noUiSlider.on('update', (values, handle) => {
		const numericValue = parseInt(values[handle].toString().replace(/[^\d]/g, ''), 10)
		inputDisks.value = numericValue

		const handleEl = disksSlider.querySelectorAll('.noUi-handle')[handle]

		disksSlider.querySelectorAll('.noUi-handle').forEach(h => {
			h.classList.remove('at-start', 'at-end')
		})

		if (numericValue === min) handleEl.classList.add('at-start')
		else if (numericValue === max) handleEl.classList.add('at-end')
	})

	// Обновляем слайдер при ручном вводе
	inputDisks.addEventListener('change', () => {
		const val = parseInt(inputDisks.value, 10)
		if (!isNaN(val) && val >= min && val <= max) {
			disksSlider.noUiSlider.set(val)
		}
	})

	btnDisksMinus.addEventListener('click', () => {
		const current = parseInt(disksSlider.noUiSlider.get(true))
		const next = Math.max(current - step, min)
		disksSlider.noUiSlider.set(next)
	})

	btnDisksPlus.addEventListener('click', () => {
		const current = parseInt(disksSlider.noUiSlider.get(true))
		const next = Math.min(current + step, max)
		disksSlider.noUiSlider.set(next)
	})
}

function pluralize(number, one, few, many) {
	const mod10 = number % 10
	const mod100 = number % 100

	if (mod10 === 1 && mod100 !== 11) return one
	if (mod10 >= 2 && mod10 <= 4 && (mod100 < 10 || mod100 >= 20)) return few
	return many
}

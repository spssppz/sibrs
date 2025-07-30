import IMask from 'imask'

document.querySelectorAll('.phone').forEach(phoneInput => {
	IMask(phoneInput, { mask: '+{7}(000) 000-00-00' })
})

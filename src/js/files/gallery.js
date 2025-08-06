import lightGallery from 'lightgallery'

if (document.querySelector('[data-gallery]')) {
	const galleries = document.querySelectorAll('[data-gallery]')

	galleries.forEach(gallery => {
		lightGallery(gallery, {
			licenseKey: '0000-0000-0000-0000',
			selector: '[data-src]',
			download: false // 👈 отключает кнопку "скачать"
		})
	})
}

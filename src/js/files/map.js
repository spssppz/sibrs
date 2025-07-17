const apikey = '51092280-e018-4241-bc97-180570de25d4'
const coordsLocationMain = [55.006884569692986, 73.36514849999996]

function initMap() {
	if (document.querySelector('#contacts-map')) {
		let map = new ymaps.Map('contacts-map', {
			center: coordsLocationMain,
			zoom: 18,
		})

	}
};

if (document.querySelector('#contacts-map')) {
	window.addEventListener('load',
		() => setTimeout(() => {
			const mapScript = document.createElement('script')
			mapScript.src = `https://api-maps.yandex.ru/2.1/?load=package.standard&apikey=${apikey}&lang=ru_RU`
			document.querySelector('.wrapper').after(mapScript)
			setTimeout(() => ymaps.ready(initMap), 3000)
		}, 1000))
}
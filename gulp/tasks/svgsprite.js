import svgSprite from 'gulp-svg-sprite'
// import svgmin from 'gulp-svgmin'
// import cheerio from 'gulp-cheerio'

export const svgSpriter = () => {
	return app.gulp.src(app.path.src.svgicons) // например: 'src/icons/*.svg'
		.pipe(app.plugins.plumber(
			app.plugins.notify.onError({
				title: 'SVG',
				message: 'Error: <%= error.message %>'
			})
		))
		// .pipe(svgmin({
		// 	js2svg: {
		// 		pretty: true
		// 	}
		// }))
		// .pipe(cheerio({
		// 	run: ($) => {
		// 		$('[style]').removeAttr('style')
		// 	},
		// 	parserOptions: { xmlMode: true }
		// }))
		.pipe(svgSprite({
			mode: {
				symbol: {
					sprite: '../sprite.svg',
					example: !app.isBuild
				}
			}
		}))
		.pipe(app.gulp.dest(`${app.path.build.images}`))
}

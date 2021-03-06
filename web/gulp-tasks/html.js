const gulp = require('gulp')
const hb = require('gulp-hb')
const rename = require('gulp-rename')
const include = require('gulp-file-include')
const plumber = require('gulp-plumber')
const report = require('../report-error.js')
const browserSync = require('browser-sync')
const timeFormat = require('d3-time-format').timeFormat

const srcIndex = 'src/html/index.hbs'
const svgPath = `${process.cwd()}/svg/`

function getDate() {
	return timeFormat('%b. %d, %Y %I:%M %p')(new Date)
}

gulp.task('html-dev', () => {
	const hbStream = hb()
		.partials('./src/html/partials/**/*.hbs')
		// .helpers('./src/html/helpers/*.js')
		.data('./template-data/**/*.{js,json}')
		.data({ timestamp: Date.now(), date: getDate() })

	return gulp.src(srcIndex)
		.pipe(plumber({ errorHandler: report}))
		.pipe(hbStream)
		.pipe(include({ basepath: svgPath }))
		.pipe(rename('index.html'))
		.pipe(gulp.dest('dist/dev'))
		.pipe(browserSync.reload({ stream: true }))
})

gulp.task('html-prod', () => {
	const hbStream = hb()
		.partials('./src/html/partials/**/*.hbs')
		// .helpers('./src/html/helpers/*.js')
		.data('./template-data/**/*.{js,json}')
		.data({ timestamp: Date.now(), date: getDate() })

	return gulp.src(srcIndex)
		.pipe(plumber({ errorHandler: report}))
		.pipe(hbStream)
		.pipe(include({ basepath: svgPath }))
		.pipe(rename('index.html'))
		.pipe(gulp.dest('.tmp'))
})

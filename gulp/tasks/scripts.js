import gulp from 'gulp';
import gulpif from 'gulp-if';

import browserify from 'browserify';

import buffer from 'vinyl-buffer';
import source from 'vinyl-source-stream';
import sourcemaps from 'gulp-sourcemaps';
import uglify from 'gulp-uglify-es';
import rename from 'gulp-rename';

import config from '../config';

export const scriptsBuild = () =>
  browserify(`${config.src.js}/main.js`, gulpif(config.isDev, { debug: true }))
    .transform('babelify', { presets: ['@babel/preset-env'] })
    .bundle()
    .on('error', function browserifyError(error) {
      console.log(error.stack);
      this.emit('end');
    })
    .pipe(source('main.js'))
    .pipe(buffer())
    .pipe(gulpif(config.isDev, sourcemaps.init({ loadMaps: true })))
    .pipe(gulpif(config.isProd, uglify()))
    .pipe(
      rename({
        suffix: '.min',
      })
    )
    .pipe(gulpif(config.isDev, sourcemaps.write()))
    .pipe(gulp.dest(config.dest.js));

export const scriptsWatch = () =>
  gulp.watch(`${config.src.js}/**/*.js`, scriptsBuild);

import path from 'path';

import gulp from 'gulp';
import gulpif from 'gulp-if';

import browserify from 'browserify';
import glob from 'glob';
import buffer from 'vinyl-buffer';
import source from 'vinyl-source-stream';
import sourcemaps from 'gulp-sourcemaps';
import merge from 'merge-stream';
import uglify from 'gulp-uglify-es';
import rename from 'gulp-rename';

import config from '../config';

export const vendorsBuild = () => {
  const files = glob.sync(`${config.src.vendors}/**/*.js`);

  return merge(
    files.map((item) =>
      browserify(item, gulpif(config.isDev, { debug: true }))
        .transform('babelify', { presets: ['@babel/preset-env'] })
        .bundle()
        .on('error', function browserifyError(error) {
          console.log(error.stack);
          this.emit('end');
        })
        .pipe(source(`${path.basename(item, '.js')}.js`))
        .pipe(buffer())
        .pipe(gulpif(config.isDev, sourcemaps.init({ loadMaps: true })))
        .pipe(gulpif(config.isProd, uglify()))
        .pipe(
          rename({
            suffix: '.min',
          })
        )
        .pipe(gulpif(config.isDev, sourcemaps.write()))
        .pipe(gulp.dest(config.dest.vendors))
    )
  );
};

export const vendorsWatch = () =>
  gulp.watch(`${config.src.vendors}/**/*.js`, vendorsBuild);

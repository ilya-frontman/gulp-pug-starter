import gulp from 'gulp';
import svgSprite from 'gulp-svg-sprite';
import config from '../config';

const spriteMono = () =>
  gulp
    .src(`${config.src.iconsMono}/**/*.svg`)
    .pipe(
      svgSprite({
        mode: {
          symbol: {
            sprite: '../sprites/sprite-mono.svg',
          },
        },
        shape: {
          transform: [
            {
              svgo: {
                plugins: [
                  {
                    name:'preset-default',
                    params: {
                      overrides: {
                        cleanupIDs: false
                      }
                    }
                  },
                ],
              },
            },
          ],
        },
      })
    )
    .pipe(gulp.dest(config.dest.images));

const spriteMulti = () =>
  gulp
    .src(`${config.src.iconsMulti}/**/*.svg`)
    .pipe(
      svgSprite({
        mode: {
          symbol: {
            sprite: '../sprites/sprite-multi.svg',
          },
        },
        shape: {
          transform: [
            {
              svgo: {
                plugins: [
                  {
                    name:'preset-default',
                    params: {
                      overrides: {
                        cleanupIDs: false
                      }
                    }
                  },
                ],
              },
            },
          ],
        },
      })
    )
    .pipe(gulp.dest(config.dest.images));

export const spritesBuild = gulp.parallel(spriteMono, spriteMulti);

export const spritesWatch = () => {
  gulp.watch(`${config.src.iconsMono}/**/*.svg`, spriteMono);
  gulp.watch(`${config.src.iconsMulti}/**/*.svg`, spriteMulti);
};

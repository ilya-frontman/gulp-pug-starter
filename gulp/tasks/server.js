import browserSync from 'browser-sync';
import config from '../config';

const server = (cb) => {
  browserSync.create().init({
    server: {
      baseDir: config.dest.root,
    },
    files: [
      `${config.dest.html}/*.html`,
      `${config.dest.css}/*.css`,
      `${config.dest.js}/*.js`,
      {
        match: [`${config.dest.images}/**/*`],
        fn() {
          browserSync.reload();
        },
      },
    ],
    open: false,
    notify: false,
  });

  cb();
};

export default server;

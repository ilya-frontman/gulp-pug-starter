const srcPath = 'src';
const destPath = 'build';

const config = {
  src: {
    root: srcPath,
    sass: `${srcPath}/scss`,
    js: `${srcPath}/js`,
    vendors: `${srcPath}/js/vendors`,
    pug: `${srcPath}/pug`,
    fonts: `${srcPath}/assets/fonts`,
    images: `${srcPath}/assets/images`,
    iconsMono: `${srcPath}/assets/icons/mono`,
    iconsMulti: `${srcPath}/assets/icons/multi`,
  },
  dest: {
    root: destPath,
    html: `${destPath}`,
    css: `${destPath}/css`,
    js: `${destPath}/js`,
    vendors: `${destPath}/js/vendors`,
    fonts: `${destPath}/fonts`,
    images: `${destPath}/images`,
  },
  setEnv() {
    this.isProd = process.env.NODE_ENV === 'production';
    this.isDev = !this.isProd;
  },
};

export default config;

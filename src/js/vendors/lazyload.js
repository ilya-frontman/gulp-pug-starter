import LazyLoad from 'vanilla-lazyload';

const lazy = new LazyLoad({
  elements_selector: '.lazy',
  use_native: true,
});

lazy.update();

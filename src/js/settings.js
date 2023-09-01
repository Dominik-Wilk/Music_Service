export const select = {
  templateOf: {
    song: '#template-song',
  },
  containerOf: {
    songs: '#songs',
    searchResult: '#searchResults',
    discoverResult: '#discoverResult',
    home: '.home-wrapper',
    pages: '#pages',
  },
  links: {
    links: ' a',
  },
};
export const classNames = {
  nav: {
    active: 'clicked',
  },
  pages: {
    active: 'active',
  },
};
export const templates = {
  song: Handlebars.compile(document.querySelector(select.templateOf.song).innerHTML),
};

export const settings = {
  db: {
    url: '//' + window.location.hostname + (window.location.hostname == 'localhost' ? ':3131' : ''),
    songs: 'songs',
    authors: 'authors',
  },
};

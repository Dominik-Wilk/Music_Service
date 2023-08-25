export const select = {
  templateOf: {
    songHome: '#template-song',
    songLottery: '#template-song-lottery',
  },
  containerOf: {
    songs: '#songs',
    searchResult: '#searchResult',
    discoverResult: '#discoverResult',
    home: '.home-wrapper',
    pages: '#pages',
  },
  nav: {
    links: '.navigation a',
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
  songHome: Handlebars.compile(document.querySelector(select.templateOf.songHome).innerHTML),
  song: Handlebars.compile(document.querySelector(select.templateOf.songLottery).innerHTML),
};

export const settings = {
  db: {
    url: '//' + window.location.hostname + (window.location.hostname == 'localhost' ? ':3131' : ''),
    songs: 'songs',
  },
};

import { select, classNames, settings } from './settings.js';
import Song from './components/Song.js';
import GreenAudioPlayer from '../vendor/green-audio-player.js';
import Discover from './components/Discover.js';
import Search from './components/Search.js';

const app = {
  init: function () {
    this.initPages();
    this.initData();
    this.initDiscover();
    this.initSearch();

    this.getElement();
  },

  getElement: function () {
    this.wrapper = document.querySelectorAll('.wrapper');
  },

  resetWrapper: function () {
    document.querySelector('.navigation').addEventListener('click', e => {
      if (e.target.getAttribute('href')) {
        for (let item of this.wrapper) {
          item.innerHTML = '';
        }
        document.querySelector('#searchMsg').innerHTML = '';
        if (e.target.getAttribute('href') === '#home') {
          this.initMenu();
        }
      }
    });
  },

  initPages: function () {
    this.pages = document.querySelector(select.containerOf.pages).children;
    this.navLinks = document.querySelectorAll(select.nav.links);
    const idFromHash = window.location.hash.replace('#', '');
    let pageMatchingHash = this.pages[0].id;
    for (let page of this.pages) {
      if (page.id === idFromHash) {
        pageMatchingHash = page.id;
        break;
      }
    }
    this.activatePage(pageMatchingHash);

    for (let link of this.navLinks) {
      link.addEventListener('click', e => {
        const clickedElement = e.currentTarget;

        e.preventDefault();

        const id = clickedElement.getAttribute('href').replace('#', '');
        this.activatePage(id);

        window.location.hash = `#/${id}`;
      });
    }
    this.resetWrapper();
  },
  initData: function () {
    this.data = {};

    const url = settings.db.url + '/' + settings.db.songs;
    fetch(url)
      .then(function (rawResponse) {
        return rawResponse.json();
      })
      .then(parsedResponse => {
        this.data.songs = parsedResponse;
        this.initMenu();
      });
  },

  initMenu: function () {
    for (let songData in this.data.songs) {
      new Song(this.data.songs[songData].id, this.data.songs[songData]);
    }

    this.initPlayer(select.containerOf.songs);
  },

  initPlayer: function (select) {
    GreenAudioPlayer.init({
      selector: `${select} .song__player`,
      stopOthersOnPlay: true,
    });
  },

  activatePage: function (pageId) {
    for (let page of this.pages) {
      page.classList.toggle(classNames.pages.active, page.id === pageId);
    }

    for (let link of this.navLinks) {
      link.classList.toggle(classNames.nav.active, link.getAttribute('href') === `#${pageId}`);
    }
  },

  initDiscover: function () {
    new Discover(this.data);
  },
  initSearch: function () {
    new Search(this.data);
  },
};
app.init();

export default app;

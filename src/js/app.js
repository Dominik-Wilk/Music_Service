import { select, classNames, settings, templates } from './settings.js';
import Home from './components/Home.js';
import utils from './utils.js';
import GreenAudioPlayer from '../vendor/green-audio-player.js';
import Discover from './components/Discover.js';
import Search from './components/Search.js';

const app = {
  init: function () {
    this.initPages();
    this.initData();
    this.initDiscover();
    this.initSearch();
  },

  initPages: function () {
    this.pages = document.querySelector(select.containerOf.pages).children;
    this.links = document.querySelectorAll(select.links.links);
    const idFromHash = window.location.hash.replace('#', '');
    let pageMatchingHash = this.pages[0].id;
    for (let page of this.pages) {
      if (page.id === idFromHash) {
        pageMatchingHash = page.id;
        break;
      }
    }
    this.activatePage(pageMatchingHash);

    for (let link of this.links) {
      link.addEventListener('click', e => {
        const clickedElement = e.currentTarget;

        e.preventDefault();

        const id = clickedElement.getAttribute('href').replace('#', '');
        this.activatePage(id);

        window.location.hash = `#/${id}`;
      });
    }
  },
  initData: function () {
    this.data = {};

    const url = settings.db.url + '/' + settings.db.songs;
    const urlAuthors = settings.db.url + '/' + settings.db.authors;

    Promise.all([fetch(url), fetch(urlAuthors)])
      .then(function (allResponse) {
        const songsResponse = allResponse[0];
        const authorsResponse = allResponse[1];
        return Promise.all([songsResponse.json(), authorsResponse.json()]);
      })
      .then(([songs, authors]) => {
        this.data.songs = songs;
        this.data.authors = authors;
        this.initHome();
      });
  },
  renderCategory() {
    let category = [];
    this.catsContainer = document.querySelector(select.containerOf.categories);

    this.data.songs.forEach(song => {
      category = category.concat(song.categories);
    });

    this.categories = new Set(category);

    this.categories.forEach(item => {
      this.catsContainer.innerHTML += `<a class='category'>${item}</a> `;
    });

    this.listenCategory();
  },

  listenCategory() {
    this.categoryLinks = document.querySelector(select.containerOf.categories);
    this.categoryWrapp = this.categoryLinks.children;
    console.log(this.categoryWrapp);

    for (let category of this.categoryWrapp) {
      category.addEventListener('click', e => {
        e.preventDefault();
        const songContainer = document.querySelector(select.containerOf.songs);
        const activeCategories = document.querySelectorAll(select.all.categoryActive);
        songContainer.innerHTML = '';

        for (let activeCategory of activeCategories) {
          if (activeCategory !== e.currentTarget) {
            activeCategory.classList.remove('active');
          }
        }
        e.currentTarget.classList.toggle('active');
        songContainer.innerHTML = '';
        this.data.songs.forEach(song => {
          const generatedHTML = templates.song(song);
          this.element = utils.createDOMFromHTML(generatedHTML);

          if (song.categories.includes(e.currentTarget.innerHTML)) {
            songContainer.appendChild(this.element);
          }
        });
        this.initPlayer(select.containerOf.songs);

        if (this.categoryLinks.querySelector('.active') === null) {
          songContainer.innerHTML = '';
          this.catsContainer.innerHTML = '';

          this.initHome();
        }
      });
    }
  },

  initHome: function () {
    for (let songData in this.data.songs) {
      new Home(this.data.authors[songData], this.data.songs[songData], this.data.songs);
    }

    this.renderCategory();
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

    for (let link of this.links) {
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

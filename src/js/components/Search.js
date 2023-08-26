import { templates, select } from '../settings.js';
import utils from '../utils.js';
import GreenAudioPlayer from '../../vendor/green-audio-player.js';

class Search {
  constructor(data) {
    this.data = data;
    this.dom = {};
    this.getElement();
    this.initSearch();
  }

  getElement() {
    this.dom.searchBtn = document.querySelector('#searchBtn');
    this.dom.inputSearch = document.querySelector('#search-input');
    this.dom.searchMsg = document.querySelector('#searchMsg');

    this.dom.resultsContainer = document.querySelector(select.containerOf.searchResult);
  }

  initSearch() {
    this.dom.searchBtn.addEventListener('click', event => {
      event.preventDefault();
      this.songsArr = [];
      this.dom.resultsContainer.innerHTML = '';
      for (let songData of this.data.songs) {
        const generatedHTML = templates.songSearch(songData);
        this.element = utils.createDOMFromHTML(generatedHTML);

        if (
          songData.filename
            .slice(0, -4)
            .split('_')
            .map(word => word.toLowerCase())
            .includes(this.dom.inputSearch.value.toLowerCase())
        ) {
          this.songsArr.push(songData.filename);
          this.dom.resultsContainer.appendChild(this.element);
        }
      }
      this.dom.searchMsg.innerHTML = `We have found ${this.songsArr.length} songs...`;

      GreenAudioPlayer.init({
        selector: '.song__player1',
        stopOthersOnPlay: true,
      });
      this.dom.inputSearch.value = '';
    });
  }
}

export default Search;

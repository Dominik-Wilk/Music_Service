import utils from '../utils.js';
import { select, templates } from '../settings.js';
import GreenAudioPlayer from '../../vendor/green-audio-player.js';

class Discover {
  constructor(data) {
    this.data = data;
    this.initDiscover();
  }
  initDiscover() {
    const discoverLink = document.querySelector('#discoverLink');
    discoverLink.addEventListener('click', () => {
      let max = this.data.songs.length;
      let arrEl = Math.floor(Math.random() * max);
      for (let song of this.data.songs) {
        if (song === this.data.songs[arrEl]) {
          const resultsContainer = document.querySelector(select.containerOf.discoverResult);
          const generatedHTML = templates.song(song);
          console.log(generatedHTML);
          this.element = utils.createDOMFromHTML(generatedHTML);

          if (resultsContainer.innerHTML === '') {
            resultsContainer.appendChild(this.element);
          } else {
            resultsContainer.removeChild(resultsContainer.firstChild);
            resultsContainer.appendChild(this.element);
          }
        }
      }
      GreenAudioPlayer.init({
        selector: '.song__player2',
        stopOthersOnPlay: true,
      });
    });
  }
}

export default Discover;

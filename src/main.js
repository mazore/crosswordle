import Game from './game.js';

function Main() {
    this.game = new Game(this);
    this.game.loadGridFile('hoops');
}

window.main = new Main();

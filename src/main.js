import GameGrid from './game_grid.js';

function Main() {
    this.gameGrid = new GameGrid(this);
}

window.main = new Main();

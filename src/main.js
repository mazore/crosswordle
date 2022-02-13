import GameGrid from './game_grid.js';

function Main() {
    this.gameGrid = new GameGrid(this);

    this.gameGrid.loadGridFile('hoops');
}

window.main = new Main();

import GameGrid from './game_grid.js';

function Main() {
    this.gameGrid = new GameGrid(this);

    this.loadGridFile = (filename) => {
        fetch(`grids/${filename}.csv`)
            .then((response) => response.text())
            .then((text) => {
                this.gameGrid.loadTilesFromText(text);
                this.gameGrid.loadWordsFromTiles();
                this.gameGrid.drawAll();
            });
    };
    this.loadGridFile('hoops');
}

window.main = new Main();

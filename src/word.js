import Tile from './tile.js';
import ps from './parameters.js';

export default function Word(game, wordIndex, tileInfos) {
    this.game = game;
    this.color = ps.WORD_COLORS[wordIndex];
    this.wordLength = tileInfos.length;

    this.tiles = [];
    for (let i = 0; i < tileInfos.length; i += 1) {
        const { letter, gridX, gridY } = tileInfos[i];
        game.wordGrid[gridY][gridX].push(this);
        this.tiles.push(new Tile(this, gridX, gridY, letter));
    }

    this.selectedTile = null; // Is null when this Word isn't selected

    this.isSelected = () => this.selectedTile != null;

    this.draw = () => {
        for (let i = 0; i < this.tiles.length; i += 1) {
            this.tiles[i].draw();
        }
    };

    this.tileAtPosition = (gridX, gridY) => {
        for (const tile of this.tiles) {
            if (tile.gridX === gridX && tile.gridY === gridY) {
                return tile;
            }
        }
        return null;
    };

    this.select = (gridX, gridY) => {
        if (this.isSelected()) {
            this.selectedTile.selected = false;
        }
        const tile = this.tileAtPosition(gridX, gridY);
        tile.selected = true;
        this.selectedTile = tile;
    };

    this.deselect = () => {
        if (this.isSelected()) {
            this.selectedTile.selected = false;
            this.selectedTile = null;
        }
    };
}

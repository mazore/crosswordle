import { rect } from './helpers/drawing.js';
import ps from './parameters.js';

export default function Word(gameGrid, wordIndex, tiles) {
    this.color = ps.WORD_COLORS[wordIndex];
    this.wordLength = tiles.length;

    this.tilePositions = [];
    for (let i = 0; i < tiles.length; i += 1) {
        this.tilePositions.push([tiles[i].gridX, tiles[i].gridY]);
        tiles[i].words.push(this);
        tiles[i].indexInWord.push(i);
    }

    this.selectedTilePosition = null; // Is null when this Word isn't selected

    this.draw = () => {
        for (let i = 0; i < this.tilePositions.length; i += 1) {
            gameGrid.getTile(this.tilePositions[i]).draw();
        }
    };

    this.select = (tile) => {
        tile.selected = true;
        this.selectedTilePosition = [tile.gridX, tile.gridY];
    };

    this.deselect = () => {
        gameGrid.getTile(this.selectedTilePosition).selected = false;
        this.selectedTilePosition = null;
    };

    this.moveSelectedTile = () => {
        const selectedTile = gameGrid.getTile(this.selectedTilePosition);
        if (selectedTile.indexInWord[0] === this.wordLength - 1) {
            this.deselect();
            gameGrid.selectedWord = null;
            return;
        }
        selectedTile.selected = false;
        this.selectedTilePosition = this.tilePositions[selectedTile.indexInWord[0] + 1];
        gameGrid.getTile(this.selectedTilePosition).selected = true;
    };
}

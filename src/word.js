import Tile from './tile.js';
import ps from './parameters.js';

export default function Word(game, wordIndex, tileInfos) {
    this.game = game;
    this.color = ps.WORD_COLORS[wordIndex];
    this.wordLength = tileInfos.length;

    this.tiles = [];
    for (let i = 0; i < tileInfos.length; i += 1) {
        const { letter, gridX, gridY } = tileInfos[i];
        this.tiles.push(new Tile(this, i, gridX, gridY, letter));
        game.wordGrid[gridY][gridX].push(this);
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

    this.setSelectedTile = (tile) => {
        if (this.isSelected()) {
            this.selectedTile.selected = false;
        }
        tile.selected = true;
        this.selectedTile = tile;
    };

    this.select = (gridX, gridY) => {
        const tile = this.tileAtPosition(gridX, gridY);
        console.log(this.selectedTile, tile);
        if (this.selectedTile === tile && tile.duplicate != null) {
            // If cliked shared tile that's already selected, switch word direction
            console.log('asd');
            this.deselect();
            tile.duplicate.word.select();
            return;
        }
        this.setSelectedTile(tile);
    };

    this.deselect = () => {
        this.selectedTile.selected = false;
        this.selectedTile = null;
        game.selectedWord = null;
    };

    this.typeLetter = (letter) => {
        this.selectedTile.setLetter(letter);
        if (this.selectedTile.indexInWord === this.wordLength - 1) {
            this.deselect();
        } else { // If isn't last letter, move to next letter
            const tile = this.tiles[this.selectedTile.indexInWord + 1];
            this.setSelectedTile(tile);
        }
    };
}

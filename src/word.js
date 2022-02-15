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

    this.isSelected = false;
    this.selectedTile = null;

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

    this.selectTile = (tile) => {
        if (this.selectedTile != null) {
            this.selectedTile.selected = false;
        }
        tile.selected = true;
        this.selectedTile = tile;
        this.isSelected = true;
    };

    this.deselect = () => {
        if (this.selectedTile != null) {
            this.selectedTile.selected = false;
            this.selectedTile = null;
        }
        this.isSelected = false;
    };

    this.typeLetter = (letter) => {
        if (this.selectedTile == null) return;

        this.selectedTile.setLetter(letter);
        if (this.selectedTile.indexInWord !== this.wordLength - 1) {
            this.selectTile(this.tiles[this.selectedTile.indexInWord + 1]);
        } else { // If it's the end of the word
            this.selectedTile.selected = false;
            this.selectedTile = null;
        }
    };

    this.deletePressed = () => {
        if (this.selectedTile?.letter === '') { // If blank, move back a space
            if (this.selectedTile.indexInWord !== 0) {
                this.selectTile(this.tiles[this.selectedTile.indexInWord - 1]);
            }
        }
        if (this.selectedTile == null) { // If no tile selected
            this.selectTile(this.tiles[this.wordLength - 1]);
        }
        this.selectedTile.setLetter('');
    };

    this.enterPressed = () => {
        for (const tile of this.tiles) {
            console.log(tile.letter === tile.correctLetter);
        }
    };
}

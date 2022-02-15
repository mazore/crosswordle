import { text, rect } from './helpers/drawing.js';
import { combineColors } from './helpers/functions.js';
import ps from './parameters.js';

export default function Tile(word, indexInWord, gridX, gridY, correctLetter) {
    this.word = word;
    this.indexInWord = indexInWord;
    this.gridX = gridX;
    this.gridY = gridY;
    this.correctLetter = correctLetter;

    this.letter = '';
    this.selected = false;

    this.duplicate = null; // Tile that this shares a space with
    const otherWord = word.game.wordGrid[gridY][gridX][0];
    if (otherWord) {
        const otherTile = otherWord.tileAtPosition(gridX, gridY);
        this.duplicate = otherTile;
        otherTile.duplicate = this;
    }

    this.midX = ps.SQUARE_WIDTH * gridX + ps.SQUARE_WIDTH / 2;
    this.midY = ps.SQUARE_WIDTH * gridY + ps.SQUARE_WIDTH / 2;
    this.width = ps.SQUARE_WIDTH - ps.SQUARE_PADDING;
    this.left = this.midX - this.width / 2;
    this.top = this.midY - this.width / 2;

    this.draw = () => {
        if (this.duplicate != null && this.duplicate.word.isSelected) {
            return; // Don't draw if duplicate is selected
        }

        let bg = ps.BLANK_TILE_BG;
        if (this.selected) {
            bg = ps.ACTIVE_TILE_BG;
        }
        const strokeInfo = { width: ps.TILE_STROKE, color: word.color };
        if (word.isSelected) { // Stroke is thicker if selected
            strokeInfo.width += 1.5;
        }
        if (this.duplicate != null) { // Mix colors if it's a duplicate
            strokeInfo.color = combineColors(word.color, this.duplicate.word.color);
        }

        rect(word.game.ctx, this.left, this.top, this.width, this.width, bg, true, strokeInfo);

        const fontSize = this.width / 2 + 3;
        text(word.game.ctx, this.letter, this.midX, this.midY, ps.BLACK, fontSize, true);
    };

    this.setLetter = (letter) => {
        this.letter = letter;
        if (this.duplicate) {
            this.duplicate.letter = letter;
        }
    };
}

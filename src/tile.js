import { text, rect } from './helpers/drawing.js';
import { combineColors, lighten } from './helpers/functions.js';
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
    this.bg = ps.BLANK_TILE_BG;
    this.fg = ps.BLACKISH;

    this.draw = () => {
        if (this.duplicate != null && this.duplicate.word.isSelected) {
            return; // Don't draw if duplicate is selected
        }

        let { bg } = this;
        if (this.selected) { // TODO
            bg = lighten(bg, -40);
        }
        const strokeInfo = { width: ps.TILE_STROKE, color: ps.BLACKISH };
        if (word.isSelected) { // Stroke is thicker if selected
            strokeInfo.width += 1.5;
        }
        if (ps.ENABLE_WORD_COLORS) {
            strokeInfo.color = word.color;
        }
        if (ps.COLOR_MIXING && this.duplicate != null) { // Mix colors if it's a duplicate
            strokeInfo.color = combineColors(word.color, this.duplicate.word.color);
        }

        rect(word.game.ctx, this.left, this.top, this.width, this.width, bg, true, strokeInfo);

        const fontSize = this.width / 2 + 3;
        text(word.game.ctx, this.letter, this.midX, this.midY, this.fg, fontSize, true);
    };

    this.setLetter = (letter) => {
        this.letter = letter;
        if (this.duplicate) {
            this.duplicate.letter = letter;
        }
    };

    this.checkLetter = (recursed) => {
        if (this.letter === this.correctLetter) {
            this.bg = ps.CORRECT;
        } else if (word.letterList.includes(this.letter)) {
            this.bg = ps.WRONG_SPOT;
        } else {
            this.bg = ps.WRONG;
        }
        this.fg = '#ffffff';
        if (this.duplicate != null && !recursed) {
            this.duplicate.checkLetter(true);
        }
    };
}

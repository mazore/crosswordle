import { text, rect } from './helpers/drawing.js';
import ps from './parameters.js';

export default function Tile(word, indexInWord, gridX, gridY, correctLetter) {
    this.word = word;
    this.indexInWord = indexInWord;
    this.gridX = gridX;
    this.gridY = gridY;
    this.correctLetter = correctLetter;

    this.letter = correctLetter;
    this.selected = false;

    this.midX = ps.SQUARE_WIDTH * gridX + ps.SQUARE_WIDTH / 2;
    this.midY = ps.SQUARE_WIDTH * gridY + ps.SQUARE_WIDTH / 2;
    this.width = ps.SQUARE_WIDTH - ps.SQUARE_PADDING;
    this.left = this.midX - this.width / 2;
    this.top = this.midY - this.width / 2;

    this.draw = () => {
        let bg = ps.BLANK_TILE_BG;
        if (this.selected) {
            bg = ps.ACTIVE_TILE_BG;
        }
        const strokeInfo = { width: ps.TILE_STROKE, color: word.color };
        if (word.isSelected()) {
            strokeInfo.width += 1.5;
        }
        rect(word.game.ctx, this.left, this.top, this.width, this.width, bg, true, strokeInfo);

        const fontSize = this.width / 2 + 3;
        text(word.game.ctx, this.letter, this.midX, this.midY, ps.BLACK, fontSize, true);
    };
}

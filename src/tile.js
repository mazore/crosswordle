import { text, rect } from './helpers/drawing.js';
import ps from './parameters.js';

export default function Tile(gameGrid, gridX, gridY, correctLetter) {
    this.gridX = gridX;
    this.gridY = gridY;

    this.selected = false;
    this.letter = correctLetter;
    this.correctLetter = correctLetter;

    this.words = [];
    this.indexInWord = [];

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
        const strokeInfo = { width: ps.TILE_STROKE, color: this.words[0].color };
        if (this.words[0].selectedTilePosition) {
            strokeInfo.width += 1.5;
        }
        rect(gameGrid.ctx, this.left, this.top, this.width, this.width, bg, true, strokeInfo);

        const fontSize = this.width / 2 + 3;
        text(gameGrid.ctx, this.letter, this.midX, this.midY, ps.BLACK, fontSize, true);
    };
}

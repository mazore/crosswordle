import { text, rect } from './helpers/drawing.js';
import ps from './parameters.js';

export default function Tile(gameGrid, gridX, gridY, correctLetter) {
    this.gridX = gridX;
    this.gridY = gridY;

    this.words = [];
    this.letter = correctLetter;
    this.correctLetter = correctLetter;
    this.selected = false;

    this.midX = ps.SQUARE_WIDTH * gridX + ps.SQUARE_WIDTH / 2;
    this.midY = ps.SQUARE_WIDTH * gridY + ps.SQUARE_WIDTH / 2;

    this.draw = () => {
        const width = ps.SQUARE_WIDTH - ps.SQUARE_PADDING;
        const left = this.midX - width / 2;
        const top = this.midY - width / 2;
        const strokeInfo = { width: 2, color: this.words[0].color };
        if (this.selected) {
            strokeInfo.width = 4;
        }
        rect(gameGrid.ctx, left, top, width, width, ps.BLANK_TILE_BG, true, strokeInfo);

        const fontSize = width / 2 + 3;
        text(gameGrid.ctx, this.letter, this.midX, this.midY, '#2d3436', fontSize, true);

        // rect(gameGrid.ctx, this.midX - 1, this.midY - 1, 2, 2, '#ff0000');
    };
}

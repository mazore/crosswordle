import { text, rect } from './helpers/drawing.js';
import ps from './parameters.js';

export default function Tile(gameGrid, gridX, gridY) {
    this.gridX = gridX;
    this.gridY = gridY;
    this.letter = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'[Math.floor(Math.random() * 26)];
    this.selected = false;

    this.midX = ps.SQUARE_WIDTH * gridX + ps.SQUARE_WIDTH / 2;
    this.midY = ps.SQUARE_WIDTH * gridY + ps.SQUARE_WIDTH / 2;

    this.draw = () => {
        const width = ps.SQUARE_WIDTH - ps.SQUARE_PADDING;
        const left = this.midX - width / 2;
        const top = this.midY - width / 2;
        let strokeInfo = { width: 1, color: '#000000' };
        if (this.selected) {
            strokeInfo = { width: 3, color: '#000000' };
        }
        rect(gameGrid.ctx, left, top, width, width, ps.BLANK_TILE_BG, true, strokeInfo);

        const fontSize = width / 2 + 3;
        text(gameGrid.ctx, this.letter, this.midX, this.midY, '#000000', fontSize, true);
    };
    this.draw();
}

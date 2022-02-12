import { text, rect } from './helpers/drawing.js';
import ps from './parameters.js';

export default function Tile(gameGrid, gridX, gridY) {
    this.gridX = gridX;
    this.gridY = gridY;
    this.letter = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"[Math.floor(Math.random()*26)];

    this.midX = ps.SQUARE_WIDTH*gridX + ps.SQUARE_WIDTH/2;
    this.midY = ps.SQUARE_WIDTH*gridY + ps.SQUARE_WIDTH/2;
    this.drawWidth = ps.SQUARE_WIDTH - ps.SQUARE_PADDING;

    this.draw = () => {
        const left = this.midX - this.drawWidth/2;
        const top = this.midY - this.drawWidth/2;
        rect(gameGrid.ctx, left, top, this.drawWidth, this.drawWidth, ps.BLANK_TILE_BG, true);
        text(gameGrid.ctx, this.letter, this.midX, this.midY, '#000000', this.drawWidth/2+3, true);
    }
    this.draw();

    this.clicked = () => {
        console.log(this.letter);
    }
}

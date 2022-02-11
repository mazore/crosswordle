import { rect } from './helpers/drawing.js';
import ps from './parameters.js';

export default function Tile(gameGrid, gridX, gridY) {
    this.gridX = gridX; 
    this.gridY = gridY;
    this.left = ps.SQUARE_WIDTH*gridX + ps.SQUARE_PADDING/2;
    this.top = ps.SQUARE_WIDTH*gridY + ps.SQUARE_PADDING/2;
    this.drawWidth = ps.SQUARE_WIDTH - ps.SQUARE_PADDING;
    
    this.draw = () => {
        rect(this.ctx, this.left, this.top, this.drawWidth, this.drawWidth, ps.BLANK_TILE_BG, true);
    }
    this.draw();
}
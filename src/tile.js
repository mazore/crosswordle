import ps from './parameters.js';

export default function Tile(gameGrid, gridX, gridY) {
    this.gridX = gridX; 
    this.gridY = gridY;
    this.left = SQUARE_WIDTH*gridX + SQUARE_PADDING/2;
    this.top = SQUARE_WIDTH*gridY + SQUARE_PADDING/2;
    this.drawWidth = SQUARE_WIDTH - SQUARE_PADDING;
    
    this.draw = () => {
        rect(this.ctx, this.left, this.top, this.drawWidth, this.drawWidth, BLANK_TILE_BG, true);
    }
    this.draw();
}
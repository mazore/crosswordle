function Parameters() {
    this.GAME_GRID_WIDTH = 400;
    this.GRID_WIDTH = 8;
    this.SQUARE_WIDTH = this.GAME_GRID_WIDTH / this.GRID_WIDTH;
    this.SQUARE_PADDING = 6; // Should be even probably
    this.BLANK_TILE_BG = '#dfe6e9';
}

export default new Parameters();
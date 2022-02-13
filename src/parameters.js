function Parameters() {
    this.GAMEGRID_WIDTH = 500;
    this.GRID_WIDTH = 10;
    this.SQUARE_PADDING = 8;

    this.SQUARE_WIDTH = this.GAMEGRID_WIDTH / this.GRID_WIDTH;

    this.BLACK = '#2d3436';
    this.BLANK_TILE_BG = '#dfe6e9';
    this.ACTIVE_TILE_BG = '#b2bec3';
    this.WORD_COLORS = [
        '#2d3436', // Black
        '#6c5ce7', // Dark purple
        '#00b894', // Dark green
        '#0984e3', // Dark blue
        '#d63031', // Dark red
    ];
    this.TILE_STROKE = 3.5;
}

export default new Parameters();

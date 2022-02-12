function Parameters() {
    this.GAMEGRID_WIDTH = 500;
    this.GRID_WIDTH = 10;
    this.SQUARE_PADDING = 5;

    this.SQUARE_WIDTH = this.GAMEGRID_WIDTH / this.GRID_WIDTH;

    this.BLANK_TILE_BG = '#dfe6e9';
    this.WORD_COLORS = [
        '#2d3436', // Black
        '#6c5ce7', // Dark purple
        '#d63031', // Dark red
        // '#00b894', // Dark green
        '#0984e3', // Dark blue
    ];
}

export default new Parameters();

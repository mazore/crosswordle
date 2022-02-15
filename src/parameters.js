function Parameters() {
    this.GAME_WIDTH = 500;
    this.GRID_WIDTH = 10;
    this.SQUARE_PADDING = 8;

    this.SQUARE_WIDTH = this.GAME_WIDTH / this.GRID_WIDTH;

    this.BLACK = '#2d3436';
    this.BLANK_TILE_BG = '#dfe6e9';
    this.ACTIVE_TILE_BG = '#b2bec3';
    this.WORD_COLORS = [
        'rgb(45, 52, 54)', // Black
        'rgb(108, 92, 231)', // Dark purple
        'rgb(209, 128, 101)', // Orangeville, r-16 g&b+16
        'rgb(9, 132, 227)', // Dark blue
        'rgb(232, 67, 147)', // Pink
    ];
    this.TILE_STROKE = 3.5;
}

export default new Parameters();

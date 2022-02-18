function Parameters() {
    this.GAME_WIDTH = 500;
    this.GRID_WIDTH = 10;
    this.SQUARE_PADDING = 8;

    this.SQUARE_WIDTH = this.GAME_WIDTH / this.GRID_WIDTH;

    this.BLACKISH = 'rgb(45, 52, 54)';
    this.LIGHT_GRAY = 'rgb(223, 230, 233)';
    this.WRONG = 'rgb(119, 124, 125)';
    this.WRONG_SPOT = 'rgb(201, 181, 86)';
    this.CORRECT = 'rgb(106, 170, 101)';
    this.WORD_COLORS = [
        'rgb(45, 52, 54)', // Black
        'rgb(108, 92, 231)', // Dark purple
        'rgb(209, 128, 101)', // Orangeville, r-16 g&b+16
        'rgb(9, 132, 227)', // Dark blue
        'rgb(232, 67, 147)', // Pink
    ];
    this.TILE_STROKE = 3.5;

    this.ENABLE_WORD_COLORS = false;
    const wordColors = document.getElementById('wordColors');
    wordColors.oninput = (event) => {
        this.ENABLE_WORD_COLORS = event.target.checked;
        window.main.game.drawAll();
    };
    this.COLOR_MIXING = false;
    const colorMixing = document.getElementById('colorMixing');
    colorMixing.oninput = (event) => {
        this.COLOR_MIXING = event.target.checked;
        window.main.game.drawAll();
    };
}

export default new Parameters();

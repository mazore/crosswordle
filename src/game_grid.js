import { rect } from './helpers/drawing.js';

const GAME_GRID_WIDTH = 400;
const GRID_WIDTH = 8;
const SQUARE_PADDING = 6; // Should be even
const BLANK_TILE_BG = '#dfe6e9';

const SQUARE_WIDTH = GAME_GRID_WIDTH / GRID_WIDTH;


export default function GameGrid(main) {
    this.canvas = document.getElementById('game-grid');
    this.ctx = this.canvas.getContext('2d');

    this.setup = () => {
        this.setCanvasDimensions(GAME_GRID_WIDTH, GAME_GRID_WIDTH);

        for (let i = 0; i < 8; i++) {
            for (let j = 0; j < 8; j++) {
                const x = SQUARE_WIDTH*i + SQUARE_PADDING/2;
                const y = SQUARE_WIDTH*j + SQUARE_PADDING/2;
                const w = SQUARE_WIDTH - SQUARE_PADDING;
                rect(this.ctx, x, y, w, w, BLANK_TILE_BG, true)
            }
        }
    };

    this.setCanvasDimensions = (width, height) => {
        // Needs to be more complicated to fix blurriness
        this.canvas.width = width * 2;
        this.canvas.height = height * 2;
        this.canvas.style.width = `${width}px`;
        this.canvas.style.height = `${height}px`;
        this.ctx.scale(2, 2);
        this.ctx.lineCap = 'square';
    };

    this.setup();
}
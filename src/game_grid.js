import { rect } from './helpers/drawing.js';

const GAME_GRID_WIDTH = 800;
const GRID_WIDTH = 8;
const SQUARE_WIDTH = GAME_GRID_WIDTH / GRID_WIDTH;


export default function GameGrid(main) {
    const canvas = document.getElementById('game-grid');
    this.canvas = canvas;
    this.ctx = this.canvas.getContext('2d');

    this.setup = () => {
        this.setCanvasDimensions(GAME_GRID_WIDTH, GAME_GRID_WIDTH);

        for (let i = 0; i < 8; i++) {
            for (let j = 0; j < 8; j++) {
                rect(this.ctx, SQUARE_WIDTH*i, SQUARE_WIDTH*j, SQUARE_WIDTH*(i+1)-10, SQUARE_WIDTH*(j+1)-10, stroke=false)
            }
        }
    };

    this.setCanvasDimensions = (width, height) => {
        // Needs to be more complicated to fix blurriness
        // this.canvas.width = width * 2;
        // this.canvas.height = height * 2;
        // this.canvas.style.width = `${width}px`;
        // this.canvas.style.height = `${height}px`;
        // this.ctx.scale(2, 2);
        // this.ctx.lineCap = 'square';
        this.canvas.width = width;
        this.canvas.height = height;
    };

    this.setup();
}
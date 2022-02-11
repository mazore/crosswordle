import Tile from './tile.js';
import ps from './parameters.js';

export default function GameGrid(main) {
    this.canvas = document.getElementById('game-grid');
    this.ctx = this.canvas.getContext('2d');

    this.setup = () => {
        this.setCanvasDimensions(ps.GAME_GRID_WIDTH, ps.GAME_GRID_WIDTH);

        this.createTiles();
    };

    this.createTiles = () => {
        this.tiles = [];
        for (let i = 0; i < ps.GRID_WIDTH; i++) {
            const row = [];
            for (let j = 0; j < ps.GRID_WIDTH; j++) {
                row.push(new Tile(this, i, j));
            }
        }
    }

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
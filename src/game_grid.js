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
        for (let gridY = 0; gridY < ps.GRID_WIDTH; gridY++) {
            const row = [];
            for (let gridX = 0; gridX < ps.GRID_WIDTH; gridX++) {
                row.push(new Tile(this, gridX, gridY));
            }
            this.tiles.push(row);
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

    this.drawAllTiles = () => {
        for (let i = 0; i < tiles.length; i++) {
            this.tiles[i].draw();
        }
    }

    this.mouseDown = (event) => {
        const rect = this.canvas.getBoundingClientRect();
        const x = event.clientX - rect.left;
        const y = event.clientY - rect.top;
        const gridX = Math.floor(x / ps.SQUARE_WIDTH);
        const gridY = Math.floor(y / ps.SQUARE_WIDTH);
        this.tiles[gridY][gridX].clicked();
    };

    this.canvas.addEventListener('mousedown', this.mouseDown);

    this.setup();
}

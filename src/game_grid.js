import { rect } from './helpers/drawing.js';
import Tile from './tile.js';
import ps from './parameters.js';

export default function GameGrid() {
    this.canvas = document.getElementById('game-grid');
    this.ctx = this.canvas.getContext('2d');

    this.selection = null;

    this.setup = () => {
        this.setCanvasDimensions(ps.GAMEGRID_WIDTH, ps.GAMEGRID_WIDTH);

        this.createTiles();
    };

    this.createTiles = () => {
        this.tiles = [];
        for (let gridY = 0; gridY < ps.GRID_WIDTH; gridY += 1) {
            const row = [];
            for (let gridX = 0; gridX < ps.GRID_WIDTH; gridX += 1) {
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

    this.drawAll = () => {
        rect(this.ctx, 0, 0, ps.GAMEGRID_WIDTH, ps.GAMEGRID_WIDTH, '#ffffff'); // Background
        for (const row of this.tiles) {
            for (const tile of row) {
                tile.draw();
            }
        }
    };

    this.setSelection = (gridX, gridY) => {
        if (this.selection != null) { // Unselect last
            const [x, y] = this.selection;
            this.tiles[y][x].selected = false;
        }

        this.tiles[gridY][gridX].selected = true;
        this.selection = [gridX, gridY];

        this.drawAll();
    };

    this.mouseDown = (event) => {
        const rect = this.canvas.getBoundingClientRect();
        const x = event.clientX - rect.left;
        const y = event.clientY - rect.top;
        const gridX = Math.floor(x / ps.SQUARE_WIDTH);
        const gridY = Math.floor(y / ps.SQUARE_WIDTH);

        this.setSelection(gridX, gridY);
    };

    this.canvas.addEventListener('mousedown', this.mouseDown);

    this.setup();
}

import { rect } from './helpers/drawing.js';
import Tile from './tile.js';
import Word from './word.js';
import ps from './parameters.js';

export default function GameGrid() {
    this.canvas = document.getElementById('game-grid');
    this.ctx = this.canvas.getContext('2d');

    this.selection = null;
    this.tiles = [];
    this.words = [];

    this.setup = () => {
        this.setCanvasDimensions();
    };

    this.setCanvasDimensions = () => {
        // Complicated to fix bluriness
        this.canvas.width = ps.GAMEGRID_WIDTH * 2;
        this.canvas.height = ps.GAMEGRID_WIDTH * 2;
        this.canvas.style.width = `${ps.GAMEGRID_WIDTH}px`;
        this.canvas.style.height = `${ps.GAMEGRID_WIDTH}px`;
        this.ctx.scale(2, 2);
        this.ctx.lineCap = 'square';
        // this.canvas.width = ps.GAMEGRID_WIDTH; // Blurry method
        // this.canvas.height = ps.GAMEGRID_WIDTH;
    };

    /* Takes a csv `text` and creates a grid of Tiles */
    this.loadTilesFromText = (text) => {
        let gridX = 0;
        let gridY = 0;
        for (const row of text.split('\n')) {
            gridX = 0;
            const tileRow = [];
            for (const letter of row.split(',')) {
                if (letter[0] === '_') {
                    tileRow.push(null);
                } else {
                    tileRow.push(new Tile(this, gridX, gridY, letter));
                }
                gridX += 1;
            }
            this.tiles.push(tileRow);
            gridY += 1;
            if (gridY === ps.GRID_WIDTH) break;
        }
    };

    /**
     * Loads many Word objects from the grid of tiles by finding streaks of more than one letter
     * horizontally or vertically.
     */
    this.loadWordsFromTiles = () => {
        // Stacks contain Tiles and are used to create new Words once a streak of Letters ends
        let wordIndex = 0;
        const stackHorizontal = [];
        const stackVertical = [];

        const checkTile = (stack, tile) => {
            if (tile == null) {
                if (stack.length > 1) {
                    // If we found a word
                    this.words.push(new Word(this, wordIndex, stack));
                    wordIndex += 1;
                }
                stack.length = 0; // Clear stack
            } else {
                stack.push(tile);
            }
        };

        for (let i = 0; i < ps.GRID_WIDTH; i += 1) {
            for (let j = 0; j < ps.GRID_WIDTH; j += 1) {
                // We can check both directions simultaneously because the grid is a square
                checkTile(stackHorizontal, this.tiles[i][j]);
                checkTile(stackVertical, this.tiles[j][i]);
            }
        }
    };

    /** Redraws all tiles and background */
    this.drawAll = () => {
        rect(this.ctx, 0, 0, ps.GAMEGRID_WIDTH, ps.GAMEGRID_WIDTH, '#ffffff'); // Background
        for (const row of this.tiles) {
            for (const tile of row) {
                tile?.draw();
            }
        }
    };

    /** Deselects last tile and selects the new one */
    this.setSelection = (tile) => {
        if (this.selection != null) { // Unselect last
            this.selection.selected = false;
        }
        if (tile !== null && typeof tile !== 'undefined') {
            tile.selected = true;
            this.selection = tile;
        }

        this.drawAll();
    };

    this.mouseDown = (event) => {
        const canvasRect = this.canvas.getBoundingClientRect();
        const x = event.clientX - canvasRect.left;
        const y = event.clientY - canvasRect.top;
        const gridX = Math.floor(x / ps.SQUARE_WIDTH);
        const gridY = Math.floor(y / ps.SQUARE_WIDTH);

        this.setSelection(this.tiles[gridY][gridX]);
    };

    this.canvas.addEventListener('mousedown', this.mouseDown);

    this.setup();
}

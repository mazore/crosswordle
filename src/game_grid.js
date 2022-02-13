import { rect } from './helpers/drawing.js';
import Tile from './tile.js';
import Word from './word.js';
import ps from './parameters.js';

export default function GameGrid() {
    this.canvas = document.getElementById('game-grid');
    this.ctx = this.canvas.getContext('2d');

    this.selectedWord = null;
    this.tiles = Array(ps.GRID_WIDTH).fill(null).map(() => Array(ps.GRID_WIDTH));
    this.words = [];

    this.setup = () => {
        this.setCanvasDimensions();
    };

    this.setCanvasDimensions = () => {
        // Complicated to fix blurriness
        this.canvas.width = ps.GAMEGRID_WIDTH * 2;
        this.canvas.height = ps.GAMEGRID_WIDTH * 2;
        this.canvas.style.width = `${ps.GAMEGRID_WIDTH}px`;
        this.canvas.style.height = `${ps.GAMEGRID_WIDTH}px`;
        this.ctx.scale(2, 2);
        this.ctx.lineCap = 'square';
        // this.canvas.width = ps.GAMEGRID_WIDTH; // Blurry method
        // this.canvas.height = ps.GAMEGRID_WIDTH;
    };

    this.getTile = (position) => {
        const [x, y] = position;
        return this.tiles[y][x];
    };

    this.loadGridFile = (filename) => {
        fetch(`grids/${filename}.csv`)
            .then((response) => response.text())
            .then((text) => {
                this.loadTilesFromText(text);
                this.loadWordsFromTiles();
                this.drawAll();
            });
    };

    /* Populates this.tiles by parsing a csv string */
    this.loadTilesFromText = (text) => {
        const letters = text.split('\r\n').map((row) => row.split(','));
        for (let gridX = 0; gridX < ps.GRID_WIDTH; gridX += 1) {
            for (let gridY = 0; gridY < ps.GRID_WIDTH; gridY += 1) {
                const letter = letters[gridY][gridX];
                if (letter === '_') {
                    this.tiles[gridY][gridX] = null;
                } else {
                    this.tiles[gridY][gridX] = new Tile(this, gridX, gridY, letter);
                }
            }
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
            if (tile != null) {
                stack.push(tile);
            } else {
                if (stack.length > 1) {
                    // If we found a word
                    this.words.push(new Word(this, wordIndex, stack));
                    wordIndex += 1;
                }
                stack.length = 0; // Clear stack
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
        for (const word of this.words) {
            word.draw();
        }
    };

    this.setSelection = (tile) => {
        if (this.selectedWord != null) {
            this.selectedWord.deselect();
        }
        const word = tile.words[0];
        word.select(tile);
        this.selectedWord = word;
        this.drawAll();
    };

    this.mouseDown = (event) => {
        const canvasRect = this.canvas.getBoundingClientRect();
        const x = event.clientX - canvasRect.left;
        const y = event.clientY - canvasRect.top;
        const gridX = Math.floor(x / ps.SQUARE_WIDTH);
        const gridY = Math.floor(y / ps.SQUARE_WIDTH);

        const tile = this.tiles[gridY][gridX];
        if (tile !== null && typeof tile !== 'undefined') {
            this.setSelection(tile);
        }
    };
    this.canvas.addEventListener('mousedown', this.mouseDown);

    this.keyPress = (letter) => { // `letter` should be uppercase
        this.getTile(this.selectedWord.selectedTilePosition).letter = letter;
        this.selectedWord.moveSelectedTile();
        this.drawAll();
    };
    this.deletePressed = () => {
        this.getTile(this.selectedWord.selectedTilePosition).letter = '';
        this.getTile(this.selectedWord.selectedTilePosition).draw();
    };

    this.keydown = (event) => { // Raw event letter
        if (event.key.match(/^[a-z]$/i)) { // If is letter
            this.keyPress(event.key.toUpperCase());
        } else if (event.key === 'Backspace') {
            this.deletePressed();
        }
    };
    document.addEventListener('keydown', this.keydown);

    this.setup();
}

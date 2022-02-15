import { rect } from './helpers/drawing.js';
import Word from './word.js';
import ps from './parameters.js';

export default function Game() {
    this.canvas = document.getElementById('game-grid');
    this.ctx = this.canvas.getContext('2d');

    this.words = [];
    this.selectedWord = null;
    // wordGrid is 2d array of empty arrays that contain what word(s) are at each position
    this.wordGrid = [...Array(ps.GRID_WIDTH)].map(() => [...Array(ps.GRID_WIDTH)].map(() => []));

    this.setup = () => {
        this.setCanvasDimensions();
    };

    this.setCanvasDimensions = () => {
        // Complicated to fix blurriness
        this.canvas.width = ps.GAME_WIDTH * 2;
        this.canvas.height = ps.GAME_WIDTH * 2;
        this.canvas.style.width = `${ps.GAME_WIDTH}px`;
        this.canvas.style.height = `${ps.GAME_WIDTH}px`;
        this.ctx.scale(2, 2);
        this.ctx.lineCap = 'square';
        // this.canvas.width = ps.GAME_WIDTH; // Blurry method
        // this.canvas.height = ps.GAME_WIDTH;
    };

    this.loadGridFile = (filename) => {
        fetch(`grids/${filename}.csv`)
            .then((response) => response.text())
            .then((text) => {
                // this.loadTilesFromText(text);
                // this.loadWordsFromTiles();
                this.loadWordsFromText(text);
                this.drawAll();
            });
    };

    this.loadWordsFromText = (text) => {
        const letters = text.split('\n').map((row) => row.split(','));

        let wordIndex = 0;
        // Stacks are arrays of letters that are used to find words
        const stackHorizontal = [];
        const stackVertical = [];

        const checkTile = (stack, letter, gridX, gridY) => {
            if (letter !== '_') {
                stack.push({ letter, gridX, gridY });
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
                checkTile(stackHorizontal, letters[i][j], j, i);
                checkTile(stackVertical, letters[j][i], i, j);
            }
        }
    };

    /** Redraws all words and background */
    this.drawAll = () => {
        rect(this.ctx, 0, 0, ps.GAME_WIDTH, ps.GAME_WIDTH, '#ffffff'); // Background
        for (const word of this.words) {
            word.draw();
        }
    };

    this.setSelection = (gridX, gridY) => {
        const words = this.wordGrid[gridY][gridX];
        
        if (!words || words.length === 0) { // If didn't click on a word
            this.selectedWord.deselect();
            this.selectedWord = null;
            return;
        }

        if (words.length === 1) {
            this.selectedWord.deselect();
            this.selectedWord = words[0];
            const tile = this.selectedWord.tileAtPosition(gridX, gridY);
            this.selectedWord.selectTile(tile);
        }

        if (words.length === 2) {
            const selectedBefore = {
                word: this.selectedWord,
                tile: this.selectedWord.selectedTile,
            }
            this.selectedWord?.deselect();
            let wordIndex = 0; // Default to selecting the first word
            if (this.selectedWord === words[1]) { // If clicking a selected word
                wordIndex = 1; // Prefer keeping current word selected
            }
            const tileToSelect = words[wordIndex].tileAtPosition(gridX, gridY);
            if (tileToSelect === selectedTileBefore) {
                // TODO:
            }
            this.selectedWord = words[wordIndex];
            this.selectedWord.setSelectedTile(tile);
        }
    };

    this.mouseDown = (event) => {
        const canvasRect = this.canvas.getBoundingClientRect();
        const x = event.clientX - canvasRect.left;
        const y = event.clientY - canvasRect.top;
        const gridX = Math.floor(x / ps.SQUARE_WIDTH);
        const gridY = Math.floor(y / ps.SQUARE_WIDTH);

        this.setSelection(gridX, gridY);

        this.drawAll();
    };
    this.canvas.addEventListener('mousedown', this.mouseDown);

    this.keyPress = (letter) => { // `letter` should always be uppercase
        if (this.selectedWord == null) return;
        this.selectedWord.typeLetter(letter);
        this.drawAll();
    };
    this.deletePressed = () => {
        if (this.selectedWord == null) return;
        this.selectedWord.selectedTile.setLetter('');
        this.drawAll();
    };

    document.addEventListener('keydown', (event) => {
        if (event.key.match(/^[a-z]$/i)) { // If is letter
            this.keyPress(event.key.toUpperCase());
        } else if (event.key === 'Backspace') {
            this.deletePressed();
        }
    });

    this.setup();
}

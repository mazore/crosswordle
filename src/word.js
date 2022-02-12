import ps from './parameters.js';

export default function Word(gameGrid, wordIndex, tiles) {
    this.color = ps.WORD_COLORS[wordIndex];
    this.tiles = tiles;
    for (let i = 0; i < tiles.length; i += 1) {
        tiles[i].words.push(this);
    }
}

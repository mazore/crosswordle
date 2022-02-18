import { text, roundedRect } from './helpers/drawing.js';
import ps from './parameters.js';

export default function Keyboard(word) {
    this.word = word;

    this.shown = false;

    this.width = 300;
    this.height = 150;

    this.setPosition = () => {
        const firstTile = word.tiles[0];
        const lastTile = word.tiles[word.tiles.length - 1];
        if (firstTile.gridY === lastTile.gridY) { // Horizontal
            const farRight = lastTile.left + lastTile.width;
            const wordMiddle = (firstTile.left + farRight) / 2;
            this.left = wordMiddle - this.width / 2;
            this.top = firstTile.top + (1.25 * firstTile.width);
        } else { // Vertical
            // const farBottom = lastTile.top + lastTile.width;
            // const wordMiddle = (firstTile.top + farBottom) / 2;
            const marginLeft = firstTile.left;
            const marginRight = ps.GAME_WIDTH - (lastTile.left + lastTile.width);
            if (marginRight > marginLeft) { // Keyboard right of the word
                this.left = firstTile.left + (1.25 * firstTile.width);
            } else { // Keyboard left of the word
                this.left = firstTile.left - this.width - (firstTile.width * 0.25);
            }
            this.top = firstTile.top;
        }
    };
    this.setPosition();

    this.draw = () => {
        if (!this.shown) return;

        const strokeInfo = { width: 2, color: '#000000' };
        const bg = ps.LIGHT_GRAY;
        const w = this.width;
        const h = this.height;
        roundedRect(word.game.ctx, this.left, this.top, w, h, 15, bg, true, strokeInfo);
    };

    this.show = () => {
        this.shown = true;
    };

    this.hide = () => {
        this.shown = false;
    };
}

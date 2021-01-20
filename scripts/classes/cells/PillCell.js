import {
    CELL_TYPES,
    COLORS,
    PILL_BEAT_TIME
} from "../../constants.js";
import BoardCell from "./BoardCell.js";

("use strict");

export default class PillCell extends BoardCell {
    constructor(row, column, place) {
        super(row, column);
        this.color = COLORS[Math.floor(Math.random() * COLORS.length)];
        this.type = CELL_TYPES.pill;
        this.isFalling = true;
        this.isHorizontal = true;
        this.singleCell = false;
        this.adjacentCell = null;
        this.isBeat = false;
        this.place = place; // pillCell place at pill from left bottom
    }

    getCellPosition() {
        return this.isHorizontal
            ? this.place == 0
                ? "left"
                : "right"
            : this.place == 0
            ? "down"
            : "up";
    }

    beat(afterAnimCallback) {
        this.type = CELL_TYPES.blank;
        this.isFalling = false;
        // destroy connection between pill cells
        if (!this.singleCell) {
            this.adjacentCell.singleCell = true;
            this.singleCell = true;
            this.adjacentCell.adjacentCell = null;
            this.adjacentCell = null;
        }

        this.isBeat = true
        setTimeout(() => {
            afterAnimCallback();
        }, PILL_BEAT_TIME);
    }

    makeCellNode(rowIndex, columnIndex) {
        let cellNode = super.makeCellNode(rowIndex, columnIndex);

        let backgroundStr = 
            this.isBeat 
            ? 
            `url('./img/${this.color}_o.png')`
            :
            this.singleCell
                ? `url('./img/${this.color}_dot.png')`
                : `url('./img/${
                        this.color
                    }_${this.getCellPosition()}.png')`;
        cellNode.style.backgroundImage = backgroundStr;

        return cellNode;
    }
}

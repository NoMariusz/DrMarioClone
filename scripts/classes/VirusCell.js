import {
    CELL_TYPES,
    COLORS,
    PILL_BEAT_TIME
} from "../constants.js";
import BoardCell from "./BoardCell.js";

("use strict");

export default class VirusCell extends BoardCell {
    constructor(row, column, color) {
        super(row, column);
        this.color = color;
        this.type = CELL_TYPES.virus;
        this.isBeat = false;
    }

    beat(afterAnimCallback) {
        this.type = CELL_TYPES.blank;

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
            `url('./img/${this.color}_x.png')`
            :
            `url('./img/${this.color}_virus.png')`;
        cellNode.style.backgroundImage = backgroundStr;

        return cellNode;
    }
}

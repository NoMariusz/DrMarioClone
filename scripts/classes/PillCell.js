import {CELL_TYPES, COLORS} from "../constants.js";
import BoardCell from "./BoardCell.js";

"use strict";

export default class PillCell extends BoardCell{
    constructor(row, column, place){
        super(row, column);
        this.color = COLORS[Math.floor(Math.random() * COLORS.length)];
        this.type = CELL_TYPES.pill;
        this.isFalling = true;
        this.isHorizontal = true;
        this.singleCell = false;
        this.place = place; // pillCell place at pill from left bottom
    }
    
    resetCell(){
        this.color = '';
        this.type = CELL_TYPES.blank;
        this.isFalling = false;
        this.singleCell = true;
    }
}

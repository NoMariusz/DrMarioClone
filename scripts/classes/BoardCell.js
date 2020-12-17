import {CELL_TYPES} from "../constants.js"

"use strict";

export default class BoardCell{
    constructor(row, column){
        this.row = row;
        this.column = column;
        this.type = CELL_TYPES.blank;
        this.color = '';
        this.isFalling = false;
    }
}

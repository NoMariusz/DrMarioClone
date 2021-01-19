import {CELL_TYPES, BOARD_COLUMNS, BOARD_ROWS} from "../constants.js"

"use strict";

export default class BoardCell{
    constructor(row, column){
        this.row = row;
        this.column = column;
        this.type = CELL_TYPES.blank;
        this.color = '';
        this.isFalling = false;
    }

    makeCellNode(rowIndex, columnIndex){
        let cellNode = document.createElement("div");

        cellNode.style.width = 100 / BOARD_COLUMNS + "%";
        cellNode.style.height = 100 / BOARD_ROWS + "%";
        cellNode.style.top = (100 / BOARD_ROWS) * rowIndex + "%";
        cellNode.style.left = (100 / BOARD_COLUMNS) * columnIndex + "%";
        cellNode.classList.add("cell");

        return cellNode
    }
}

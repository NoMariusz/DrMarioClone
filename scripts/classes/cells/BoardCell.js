import {
    CELL_TYPES,
    BOARD_COLUMNS,
    BOARD_ROWS,
    THROW_BOARD_COLUMNS,
    THROW_BOARD_ROWS,
} from "../../constants.js";

("use strict");

export default class BoardCell {
    constructor(row, column) {
        this.row = row;
        this.column = column;
        this.type = CELL_TYPES.blank;
        this.color = "";
        this.isFalling = false;
        this.atThrow = false;
    }

    makeCellNode(rowIndex, columnIndex) {
        let cellNode = document.createElement("div");

        let columns = this.atThrow ? THROW_BOARD_COLUMNS : BOARD_COLUMNS;
        let row = this.atThrow ? BOARD_COLUMNS : BOARD_ROWS;

        cellNode.style.width = 100 / columns + "%";
        cellNode.style.height = 100 / row + "%";
        cellNode.style.top = (100 / row) * rowIndex + "%";
        cellNode.style.left = (100 / columns) * columnIndex + "%";
        cellNode.classList.add("cell");

        return cellNode;
    }
}

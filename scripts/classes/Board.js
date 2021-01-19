import BoardCell from "./BoardCell.js";
import RecordsBlock from "./RecordsBlock.js";
import {
    CHECK_CELL_CAN_MOVE_STATUSES,
    CELL_TYPES,
    BOARD_ROWS,
    BOARD_COLUMNS,
    PILL_AUTO_FALL_FREQUENCY,
} from "../constants.js";

("use strict");

export default class Board {
    constructor() {
        this.array = this.initArray();
        this.htmlNode = document.getElementById("boardBlock");
        this.renderBoard();
        // initialize records block to display records
        this.recordsBlock = new RecordsBlock();
    }

    initArray() {
        let newArray = [];
        for (let rowIndex = 0; rowIndex < BOARD_ROWS; rowIndex++) {
            newArray.push([]);
            for (
                let columnIndex = 0;
                columnIndex < BOARD_COLUMNS;
                columnIndex++
            ) {
                newArray[rowIndex].push(new BoardCell(rowIndex, columnIndex));
            }
        }
        return newArray;
    }

    refresh(){
        this.renderBoard()
        this.recordsBlock.renderBlock()
    }

    renderBoard() {
        this.htmlNode.innerHTML = "";
        for (let rowIndex = 0; rowIndex < BOARD_ROWS; rowIndex++) {
            for (
                let columnIndex = 0;
                columnIndex < BOARD_COLUMNS;
                columnIndex++
            ) {
                let cellObj = this.array[rowIndex][columnIndex];
                let cellNode = cellObj.makeCellNode(rowIndex, columnIndex)
                this.htmlNode.appendChild(cellNode);
            }
        }
    }

    checkCellCanMove(cell, newRow, newColumn) {
        if (
            newRow >= BOARD_ROWS ||
            newColumn >= BOARD_COLUMNS ||
            newRow < 0 ||
            newColumn < 0
        ) {
            // console.log('checkCellCanMove CHECK_CELL_CAN_MOVE_STATUSES.hitBorder');
            return CHECK_CELL_CAN_MOVE_STATUSES.hitBorder;
        }
        if (
            Math.abs(cell.row - newRow) > 1 ||
            Math.abs(cell.column - newColumn) > 1
        ) {
            // console.log('checkCellCanMove CHECK_CELL_CAN_MOVE_STATUSES.tooMuchDistance');
            return CHECK_CELL_CAN_MOVE_STATUSES.tooMuchDistance;
        }
        if (
            this.array[newRow][newColumn].type != CELL_TYPES.blank &&
            this.array[newRow][newColumn].adjacentCell != cell
        ) {
            // console.log('checkCellCanMove CHECK_CELL_CAN_MOVE_STATUSES.hitOtherBlock');
            return CHECK_CELL_CAN_MOVE_STATUSES.hitOtherBlock;
        }
        // console.log('checkCellCanMove CHECK_CELL_CAN_MOVE_STATUSES.canMove');
        return CHECK_CELL_CAN_MOVE_STATUSES.canMove;
    }

    insertNewCell(cell) {
        this.array[cell.row].splice(cell.column, 1, cell);
        // this.renderBoard();
    }

    swapCells(cell1, cell2) {
        this.array[cell1.row].splice(cell1.column, 1, cell2);
        this.array[cell2.row].splice(cell2.column, 1, cell1);
        [cell1.row, cell2.row] = [cell2.row, cell1.row];
        [cell1.column, cell2.column] = [cell2.column, cell1.column];
        // this.renderBoard();
    }

    moveCell(cell, velocityRow, velocityColumn) {
        let newRow = cell.row + velocityRow;
        let newColumn = cell.column + velocityColumn;
        if (
            this.checkCellCanMove(cell, newRow, newColumn) ==
            CHECK_CELL_CAN_MOVE_STATUSES.canMove
        ) {
            this.swapCells(cell, this.array[newRow][newColumn]);
            return true;
        } else {
            return false;
        }
    }

    movePill(pill, velocityRow, velocityColumn) {
        let tempPill = [...pill];
        if (velocityRow < 0 || velocityColumn > 0) {
            // if go in other side than pills order then reverse pills
            tempPill.reverse();
        }
        let canMove = tempPill.every(
            (
                pillCell // changing if all pils can be moved
            ) =>
                this.checkCellCanMove(
                    pillCell,
                    pillCell.row + velocityRow,
                    pillCell.column + velocityColumn
                ) == CHECK_CELL_CAN_MOVE_STATUSES.canMove
        );
        if (canMove) {
            // swapping all pill cells with near velocity cells
            tempPill.forEach((pillCell) => {
                this.swapCells(
                    pillCell,
                    this.array[(pillCell, pillCell.row + velocityRow)][
                        pillCell.column + velocityColumn
                    ]
                );
            });
            return true;
        }
        return false;
    }

    // rotation

    rotatePill(pill, toLeft){       // some wrapper to render after rotation
        let result = this.makePillRotation(pill, toLeft)
        // this.renderBoard();
        return result
    }

    makePillRotation(pill, toLeft) {    // function making mainly rotation
        let changePillPlaces = () => {
            // changing places, to first pill be at left or bottom
            [pill[0].place, pill[1].place] = [pill[1].place, pill[0].place];
            pill = pill.sort((a, b) => a.place - b.place);
        };

        let doubleCellRotate = (
            pill0RowVelocity,
            pill0ColumnVelocity,
            pill1RowVelocity,
            pill1ColumnVelocity,
            toHorizontal
        ) => {
            let isCellMoved = this.moveCell(
                pill[0],
                pill0RowVelocity,
                pill0ColumnVelocity
            );
            if (!isCellMoved) {
                if (
                    toHorizontal &&
                    this.checkCellCanMove(
                        pill[0],
                        pill[0].row + pill0RowVelocity,
                        pill[0].column + pill0ColumnVelocity
                    ) == CHECK_CELL_CAN_MOVE_STATUSES.hitBorder
                ) {
                    // behaviour when not move first pillcell because hit right border
                    if (this.moveCell(pill[1], 1, -1)) {
                        changePillPlaces();
                        pill.forEach((pillCell) => {
                            pillCell.isHorizontal = toHorizontal;
                        });
                        return true;
                    }
                }
                return false;
            }
            this.moveCell(pill[1], pill1RowVelocity, pill1ColumnVelocity);
            pill.forEach((pillCell) => {
                pillCell.isHorizontal = toHorizontal;
            });
            changePillPlaces();
            return true;
        };

        let singleCellRotate = (
            pill1RowVelocity,
            pill1ColumnVelocity,
            toHorizontal
        ) => {
            let isCellMoved = this.moveCell(
                pill[1],
                pill1RowVelocity,
                pill1ColumnVelocity
            );
            if (isCellMoved) {
                // normal behaviour when cell can be moved
                pill.forEach((pillCell) => {
                    pillCell.isHorizontal = toHorizontal;
                });
                return true;
            } else if (
                toHorizontal &&
                this.checkCellCanMove(
                    pill[1],
                    pill[1].row + pill1RowVelocity,
                    pill[1].column + pill1ColumnVelocity
                ) == CHECK_CELL_CAN_MOVE_STATUSES.hitBorder
            ) {
                // behaviour when first cell can not be moved because hit right border
                if (doubleCellRotate(0, -1, 1, 0, true)) {
                    // if rotation to left side of border maked
                    changePillPlaces(); // change pill places one more time after doubleCellRotate to restore previous places
                    return true;
                }
            }
            return false;
        };

        if (toLeft) {
            return pill[0].isHorizontal
                ? singleCellRotate(-1, -1, false)
                : doubleCellRotate(0, 1, 1, 0, true);
        } else {
            return pill[0].isHorizontal
                ? doubleCellRotate(-1, 0, 0, -1, false)
                : singleCellRotate(1, 1, true);
        }
    }

    // beating stuff

    doBeating() {
        // find all beating cells and celar they
        const getfoundCells = (horizontal) => {
            let foundCells = [];
            // firstIterMax determine for max to firstIter work like row in
            // horizontal and like column to vertical
            let firstIterMax = horizontal
                ? this.array.length
                : this.array[0].length;

            for (let firstIter = 0; firstIter < firstIterMax; firstIter++) {
                let lastColor = "";
                let colorCount = 0;
                // secondIterMax determine for max to first item work like
                // column in horizontal and like row to vertical
                let secondIterMax = horizontal
                    ? this.array[0].length
                    : this.array.length;

                for (
                    let secondIter = 0;
                    secondIter < secondIterMax;
                    secondIter++
                ) {
                    let cell = horizontal
                        ? this.array[firstIter][secondIter]
                        : this.array[secondIter][firstIter];

                    if (cell.color == lastColor) {
                        colorCount++;
                        if (colorCount >= 4 && lastColor != "") {
                            for (
                                let backIndex = secondIter;
                                backIndex > secondIter - 4;
                                backIndex--
                            ) {
                                let backCell = horizontal
                                    ? this.array[firstIter][backIndex]
                                    : this.array[backIndex][firstIter];

                                if (!foundCells.includes(backCell)) {
                                    foundCells.push(backCell);
                                }
                            }
                        }
                    } else {
                        colorCount = 1;
                        lastColor = cell.color;
                    }
                }
            }
            return foundCells;
        };
        let cellsToBeat = [];

        // horizontal beating
        cellsToBeat = cellsToBeat.concat(getfoundCells(true));
        // vertical beating
        cellsToBeat = cellsToBeat.concat(getfoundCells(false));

        if (cellsToBeat.length == 0) {
            return false;
        }

        cellsToBeat.forEach((cell) => {
            cell.resetCell();
        });
        // this.renderBoard();
        return true;
    }

    doFalling(afterFallingCallback) {
        let autoFallingInterval = setInterval(() => {
            console.log("autoFallingInterval");
            // get array of pills
            let pillArray = this.array
                .map((row) =>
                    row.map((cell) => {
                        if (cell.type == CELL_TYPES.pill) {
                            return !cell.singleCell
                                ? [cell, cell.adjacentCell]
                                : [cell];
                        }
                    })
                )
                .map((row) => row.filter((el) => el != undefined))
                .filter((row) => row.length > 0)
                .flat();
            // sort array from cells on down to up and delete uniques
            pillArray.sort((a, b) => b[0].row - a[0].row);
            console.log(pillArray);
            // for every cell move them down by  movePill(pill, 1, 0)
            let makedMoving = false;
            pillArray.forEach((pill) => {
                console.log(`moving pill ${pill}`);
                let moved = this.movePill(pill, 1, 0);
                makedMoving = moved ? true : makedMoving; // if move pill, change makedMoving to true
            });
            // if at least one of them moved then make it again
            // if no one moved call afterFallingCallback, and end
            if (!makedMoving) {
                afterFallingCallback();
                clearInterval(autoFallingInterval);
            }
        }, PILL_AUTO_FALL_FREQUENCY);
    }
}

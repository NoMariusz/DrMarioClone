import BoardCell from "./cells/BoardCell.js";
import VirusCell from "./cells/VirusCell.js";
import RecordsBlock from "./RecordsBlock.js";
import VirusCountBlock from "./VirusCountBlock.js";
import VirusesBlock from "./VirusesBlock.js";
import ThrowPillBlock from "./ThrowPillBlock.js";
import {
    CHECK_CELL_CAN_MOVE_STATUSES,
    CELL_TYPES,
    BOARD_ROWS,
    BOARD_COLUMNS,
    COLORS,
    PILL_AUTO_FALL_FREQUENCY,
} from "../constants.js";

("use strict");

export default class Board {
    constructor(stage, winCallback, loseCallback) {
        this.stage = stage;
        this.array = this.initArray();
        this.htmlNode = document.getElementById("boardBlock");
        this.renderBoard();

        // initialize records block to display records
        this.recordsBlock = new RecordsBlock();

        let virusesCountDict = this.spawnViruses();
        this.virusCountBlock = new VirusCountBlock(virusesCountDict);

        this.virusesBlock = new VirusesBlock(() => this.virusCountBlock.virusesCountDict);

        this.throwPillBlock = new ThrowPillBlock();

        this.winCallback = winCallback;
        this.loseCallback = loseCallback;
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

    refresh() {
        this.renderBoard();
        this.recordsBlock.renderBlock();
        this.virusCountBlock.renderBlock();
        this.virusesBlock.refreshBlock();
        this.throwPillBlock.refreshBlock();
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
                let cellNode = cellObj.makeCellNode(rowIndex, columnIndex);
                this.htmlNode.appendChild(cellNode);
            }
        }
    }

    onGameOver() {
        this.virusesBlock.onGameOver();
        this.throwPillBlock.onGameOver();
    }

    // pills stuff

    throwPill(afterThrowCallback) {
        // add to callback stuff to propermove pill to board
        const afterThrowCallback2 = (pill) => {
            for (let pillsCountIter = 0; pillsCountIter < 2; pillsCountIter++) {
                const pillCell = pill[pillsCountIter];
                pillCell.row = 1;
                pillCell.column =
                    Math.floor(BOARD_COLUMNS / 2) + pillsCountIter - 1;
                pillCell.isHorizontal = true;
                pillCell.place = pillsCountIter; // because is count from left
                this.insertNewCell(pillCell);
            }
            afterThrowCallback(pill);
        };

        this.throwPillBlock.throwPill(afterThrowCallback2);
    }

    checkCellCanMove(cell, newRow, newColumn) {
        if (
            newRow >= BOARD_ROWS ||
            newColumn >= BOARD_COLUMNS ||
            newRow < 1 ||
            newColumn < 0
        ) {     // if this positoon is not in the bottleneck of board, then return hit border
            if (
                !(
                    newRow == 0 &&
                    (newColumn == Math.floor(BOARD_COLUMNS / 2) - 1 ||
                        newColumn == Math.floor(BOARD_COLUMNS / 2))
                )
            ) {
                return CHECK_CELL_CAN_MOVE_STATUSES.hitBorder;
            }
        }
        if (
            Math.abs(cell.row - newRow) > 1 ||
            Math.abs(cell.column - newColumn) > 1
        ) {
            return CHECK_CELL_CAN_MOVE_STATUSES.tooMuchDistance;
        }
        if (
            this.array[newRow][newColumn].type != CELL_TYPES.blank &&
            this.array[newRow][newColumn].adjacentCell != cell
        ) {
            return CHECK_CELL_CAN_MOVE_STATUSES.hitOtherBlock;
        }
        return CHECK_CELL_CAN_MOVE_STATUSES.canMove;
    }

    insertNewCell(cell) {
        let poppedCell = this.array[cell.row].splice(cell.column, 1, cell)[0];
        if (poppedCell.type == CELL_TYPES.pill) {
            this.loseCallback();
        }
    }

    swapCells(cell1, cell2) {
        this.array[cell1.row].splice(cell1.column, 1, cell2);
        this.array[cell2.row].splice(cell2.column, 1, cell1);
        [cell1.row, cell2.row] = [cell2.row, cell1.row];
        [cell1.column, cell2.column] = [cell2.column, cell1.column];
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

    rotatePill(pill, toLeft) {
        // function making rotation, by changing places of pills
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
        let cellsToBeat = [];

        // get horizontal cells to beat
        cellsToBeat = cellsToBeat.concat(this.getCellsToBeat(true));
        // get vertical cells to beat
        cellsToBeat = cellsToBeat.concat(this.getCellsToBeat(false));

        if (cellsToBeat.length == 0) {
            return false;
        }

        // beating
        cellsToBeat.forEach((cell) => {
            if (cell.type == CELL_TYPES.virus) {
                this.virusBeat(cell.color);
            }
            cell.beat(() => {
                this.array[cell.row].splice(
                    cell.column,
                    1,
                    new BoardCell(cell.row, cell.column)
                );
            });
        });
        return true;
    }

    getCellsToBeat(horizontal) {
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

            for (let secondIter = 0; secondIter < secondIterMax; secondIter++) {
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
    }

    virusBeat(virusColor) {
        this.recordsBlock.addScore(100);
        this.virusCountBlock.onVirusBeat(virusColor);
        this.virusesBlock.onVirusBeat(virusColor);
        if (this.virusCountBlock.virusesCount <= 0) {
            this.winCallback();
        }
    }

    doFalling(afterFallingCallback) {
        let autoFallingInterval = setInterval(() => {
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
            // for every cell move them down by  movePill(pill, 1, 0)
            let makedMoving = false;
            pillArray.forEach((pill) => {
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

    // viruses

    spawnViruses() {
        // Math.min to not spawn viruses more than is places to put them
        let virusesCount = Math.min(
            Math.random(Math.random() * this.stage * 3) + 3 + this.stage * 2,
            Math.floor((BOARD_COLUMNS * (BOARD_ROWS - 1) * 2) / 3)
        );
        let virusesDict = {}    // dict storing information about count virus by color

        let startColorIdx = Math.floor(Math.random() * COLORS.length);

        for (let virusIter = 0; virusIter < virusesCount; virusIter++) {
            let randomRow;
            let randomColumn;
            let cellToPop;
            do {
                // * 2 / 3) + 5 to resp viruses to 2/3 board height
                randomRow =
                    Math.floor((Math.random() * (BOARD_ROWS - 1) * 2) / 3) + 5;
                randomColumn = Math.floor(Math.random() * BOARD_COLUMNS);
                cellToPop = this.array[randomRow][randomColumn];
            } while (cellToPop.type == CELL_TYPES.virus);

            // to have more or less equal colors viruses count
            let virusColor = COLORS[(startColorIdx + virusIter) % 3];
            let virus = new VirusCell(randomRow, randomColumn, virusColor);

            let viruscolorCount = virusesDict[virusColor]
            virusesDict[virusColor] = viruscolorCount == undefined ? 1 : viruscolorCount + 1

            this.array[randomRow].splice(randomColumn, 1, virus);
        }
        return virusesDict;
    }
}

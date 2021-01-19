import Board from "./classes/Board.js";
import PillCell from "./classes/PillCell.js";
import {
    BOARD_COLUMNS,
    PILL_FALL_FREQUENCY,
    REFRESH_RATE,
} from "./constants.js";

("use strict");

let movingPillInterval;
let movingPill = [];
let mainBoard;
let canControl = true;

let startGame = () => {
    mainBoard = new Board();
    console.log("Main Board array", mainBoard.array);
    initNewPill();
    document.body.onkeydown = keyDownHandler;

    // start clock refreshing game elements
    setInterval(refreshDisplay, REFRESH_RATE);
};

let initNewPill = () => {
    console.log("init new pills");
    canControl = true;
    movingPill = [];
    for (let pillsCountIter = 0; pillsCountIter < 2; pillsCountIter++) {
        const pillCell = new PillCell(
            0,
            Math.floor(BOARD_COLUMNS / 2) + pillsCountIter - 1,
            pillsCountIter
        );
        movingPill.push(pillCell);
        mainBoard.insertNewCell(pillCell);
    }
    // setting reference between pillCells
    movingPill[0].adjacentCell = movingPill[1];
    movingPill[1].adjacentCell = movingPill[0];

    movingPillInterval = setInterval(movePillToDown, PILL_FALL_FREQUENCY);
};

let movePillToDown = () => {
    const beatAndFallCells = () => {
        let beaten = mainBoard.doBeating();

        if (beaten) {
            mainBoard.doFalling(beatAndFallCells);
        } else {
            initNewPill();
        }
    };

    let isMovingMaked = mainBoard.movePill(movingPill, 1, 0);
    if (!isMovingMaked) {
        // when pill hit bottom
        clearInterval(movingPillInterval);
        movingPill.forEach((pillCell) => {
            pillCell.isFalling = false;
        });
        movingPill = [];

        beatAndFallCells();
    }
};

let keyDownHandler = (e) => {
    switch (e.keyCode) {
        case 65:
        case 37: // a
            if (canControl) {
                mainBoard.movePill(movingPill, 0, -1);
            }
            break;
        case 68:
        case 39: // d
            if (canControl) {
                mainBoard.movePill(movingPill, 0, 1);
            }
            break;
        case 87:
        case 38: // w
            if (canControl) {
                mainBoard.rotatePill(movingPill, true);
            }
            break;
        case 16: // shift
            if (canControl) {
                mainBoard.rotatePill(movingPill, false);
            }
            break;
        case 83:
        case 40: // s
            throwPill();
            break;
    }
};

let throwPill = () => {
    clearInterval(movingPillInterval);
    canControl = false;
    movingPillInterval = setInterval(movePillToDown, PILL_FALL_FREQUENCY / 10);
};

let refreshDisplay = () => {
    mainBoard.refresh();
};

startGame();

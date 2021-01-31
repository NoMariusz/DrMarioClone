"use strict";

export const BOARD_COLUMNS = 8;
export const BOARD_ROWS = 17;

export const THROW_BOARD_COLUMNS = 12;
export const THROW_BOARD_ROWS = 8;

// Object.freeze make obj work like enum
export const CHECK_CELL_CAN_MOVE_STATUSES = Object.freeze({
    canMove: 0,
    hitBorder: 1,
    tooMuchDistance: 2,
    hitOtherBlock: 3,
});
export const CELL_TYPES = Object.freeze({ blank: 0, pill: 1, virus: 2 });
export const COLORS = ["bl", "br", "yl"];

export const PILL_FALL_FREQUENCY = 700;
export const PILL_AUTO_FALL_FREQUENCY = 200;
export const PILL_BEAT_TIME = 180;
export const REFRESH_RATE = 100; // in ms

export const SCORE_MARGIN_TOP = "8.8vh";
export const TOP_MARGIN_TOP = "10.7vh";

export const VIRUSES_POSITIONS = [
    ["4.166vh", "35.5%"],
    ["10.4vh", "19%"],
    ["18.5vh", "7.69%"],
    ["29vh", "17%"],
    ["34vh", "35.5%"],
    ["27vh", "50%"],
    ["18.5vh", "61.5%"],
    ["8.4vh", "51%"],
];

export const STAGES_COLORS = [
    "#621c73",
    "#308572",
    "#83b2ff",
    "#eeeef2",
    "#4700a1",
    "#6f205f",
];

export const DYING_VIRUS_SHOW_INTERVALS = 3;

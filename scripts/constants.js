"use strict";

export const BOARD_COLUMNS = 8;
export const BOARD_ROWS = BOARD_COLUMNS * 2;
export const CHECK_CELL_CAN_MOVE_STATUSES = Object.freeze({"canMove": 0, "hitBorder": 1, "tooMuchDistance": 2, "hitOtherBlock": 3});

export const CELL_TYPES = Object.freeze({"blank": 0, "pill": 1, "virus": 2});   // Object.freeze make obj work like enum
export const COLORS = ['bl', 'br', 'yl'];

export const PILL_FALL_FREQUENCY = 1000;
export const PILL_AUTO_FALL_FREQUENCY = 300;

export const SCORE_MARGIN_TOP = '8.8vh';
export const TOP_MARGIN_TOP = '10.7vh';

export const REFRESH_RATE = 100;    // in ms


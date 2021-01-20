"use strict";

export const BOARD_COLUMNS = 8;
export const BOARD_ROWS = 16;

export const CHECK_CELL_CAN_MOVE_STATUSES = Object.freeze({"canMove": 0, "hitBorder": 1, "tooMuchDistance": 2, "hitOtherBlock": 3});
export const CELL_TYPES = Object.freeze({"blank": 0, "pill": 1, "virus": 2});   // Object.freeze make obj work like enum
export const COLORS = ['bl', 'br', 'yl'];

export const PILL_FALL_FREQUENCY = 700;
export const PILL_AUTO_FALL_FREQUENCY = 200;
export const PILL_BEAT_TIME = 180;
export const REFRESH_RATE = 100;    // in ms

export const SCORE_MARGIN_TOP = '8.8vh';
export const TOP_MARGIN_TOP = '10.7vh';

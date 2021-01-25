("use strict");

export const animationFrames = [
    {
        pill: {
            pill0: { row: 3, column: 10, place: 0 },
            pill1: { row: 3, column: 11, place: 1 },
            isHorizontal: true,
        },
        hand: "up",
    },
    {
        pill: {
            pill0: { row: 3, column: 10, place: 0 },
            pill1: { row: 2, column: 10, place: 1 },
            isHorizontal: false,
        },
        hand: "up",
    },
    {
        pill: {
            pill0: { row: 2, column: 10, place: 1 },
            pill1: { row: 2, column: 9, place: 0 },
            isHorizontal: true,
        },
        hand: "up",
    },
    {
        pill: {
            pill0: { row: 1, column: 9, place: 1 },
            pill1: { row: 2, column: 9, place: 0 },
            isHorizontal: false,
        },
        hand: "up",
    },
    {
        pill: {
            pill0: { row: 1, column: 8, place: 0 },
            pill1: { row: 1, column: 9, place: 1 },
            isHorizontal: true,
        },
        hand: "middle",
    },
    {
        pill: {
            pill0: { row: 1, column: 8, place: 0 },
            pill1: { row: 0, column: 8, place: 1 },
            isHorizontal: false,
        },
        hand: "middle",
    },
    {
        pill: {
            pill0: { row: 1, column: 8, place: 1 },
            pill1: { row: 1, column: 7, place: 0 },
            isHorizontal: true,
        },
        hand: "middle",
    },
    {
        pill: {
            pill0: { row: 0, column: 7, place: 1 },
            pill1: { row: 1, column: 7, place: 0 },
            isHorizontal: false,
        },
        hand: "down",
    },
    {
        pill: {
            pill0: { row: 1, column: 6, place: 0 },
            pill1: { row: 1, column: 7, place: 1 },
            isHorizontal: true,
        },
        hand: "down",
    },
    {
        pill: {
            pill0: { row: 1, column: 6, place: 0 },
            pill1: { row: 0, column: 6, place: 1 },
            isHorizontal: false,
        },
        hand: "down",
    },
    {
        pill: {
            pill0: { row: 1, column: 6, place: 1 },
            pill1: { row: 1, column: 5, place: 0 },
            isHorizontal: true,
        },
        hand: "down",
    },
    {
        pill: {
            pill0: { row: 0, column: 5, place: 1 },
            pill1: { row: 1, column: 5, place: 0 },
            isHorizontal: false,
        },
        hand: "down",
    },
    {
        pill: {
            pill0: { row: 1, column: 4, place: 0 },
            pill1: { row: 1, column: 5, place: 1 },
            isHorizontal: true,
        },
        hand: "down",
    },
    {
        pill: {
            pill0: { row: 1, column: 4, place: 0 },
            pill1: { row: 0, column: 4, place: 1 },
            isHorizontal: false,
        },
        hand: "down",
    },
    {
        pill: {
            pill0: { row: 1, column: 4, place: 1 },
            pill1: { row: 1, column: 3, place: 0 },
            isHorizontal: true,
        },
        hand: "down",
    },
    {
        pill: {
            pill0: { row: 0, column: 3, place: 1 },
            pill1: { row: 1, column: 3, place: 0 },
            isHorizontal: false,
        },
        hand: "down",
    },
    {
        pill: {
            pill0: { row: 1, column: 2, place: 0 },
            pill1: { row: 1, column: 3, place: 1 },
            isHorizontal: true,
        },
        hand: "down",
    },
    {
        pill: {
            pill0: { row: 1, column: 2, place: 0 },
            pill1: { row: 0, column: 2, place: 1 },
            isHorizontal: false,
        },
        hand: "down",
    },
    {
        pill: {
            pill0: { row: 2, column: 2, place: 1 },
            pill1: { row: 2, column: 1, place: 0 },
            isHorizontal: true,
        },
        hand: "down",
    },
    {
        pill: {
            pill0: { row: 1, column: 1, place: 1 },
            pill1: { row: 2, column: 1, place: 0 },
            isHorizontal: false,
        },
        hand: "down",
    },
    {
        pill: {
            pill0: { row: 2, column: 0, place: 0 },
            pill1: { row: 2, column: 1, place: 1 },
            isHorizontal: true,
        },
        hand: "down",
    },
    {
        pill: {
            pill0: { row: 3, column: 0, place: 0 },
            pill1: { row: 3, column: 1, place: 1 },
            isHorizontal: true,
        },
        hand: "down",
    },
    {
        pill: {
            pill0: { row: 4, column: 0, place: 0 },
            pill1: { row: 4, column: 1, place: 1 },
            isHorizontal: true,
        },
        hand: "down",
    },
    {
        pill: {
            pill0: { row: 5, column: 0, place: 0 },
            pill1: { row: 5, column: 1, place: 1 },
            isHorizontal: true,
        },
        hand: "down",
    },
];
// pill 0 is yellow on film, 1 is red

export const handFrames = {
    up: [
        { texture: "up_1", row: 4, column: 11 },
        { texture: "up_2", row: 5, column: 11 },
        { texture: "up_3", row: 6, column: 11 },
    ],
    middle: [
        { texture: "middle11", row: 5, column: 10 },
        { texture: "middle12", row: 5, column: 11 },
        { texture: "middle21", row: 6, column: 10 },
        { texture: "middle22", row: 6, column: 11 },
    ],
    down: [
        { texture: "down_1", row: 6, column: 11 },
        { texture: "down_2", row: 7, column: 11 },
    ],
};

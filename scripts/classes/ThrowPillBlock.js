import PillCell from "./cells/PillCell.js";
import { animationFrames, handFrames } from "../throwFrames.js";
import { THROW_BOARD_COLUMNS, THROW_BOARD_ROWS, THROW_PILL_SPEED } from "../constants.js";

("use strict");

export default class ThrowPillBlock {
    constructor() {
        this.node = document.getElementById("throwPillBlock");
        this.frame = 0;
        this.pill = this.makePill();
    }

    refreshBlock() {
        let frameObj = animationFrames[this.frame];

        this.node.innerHTML = "";
        for (let pillIter = 0; pillIter <= 1; pillIter++) {
            let pillFrame = frameObj.pill[`pill${pillIter}`];

            this.pill[pillIter].place = pillFrame.place;
            this.pill[pillIter].isHorizontal = frameObj.pill.isHorizontal;

            let pillNode = this.pill[pillIter].makeCellNode(
                pillFrame.row,
                pillFrame.column
            );
            this.node.appendChild(pillNode);
        }

        let handFrame = handFrames[frameObj.hand];
        handFrame.forEach((element) => {
            let node = document.createElement("div");
            node.classList.add("cell");
            node.style.backgroundImage = `url("./img/hands/${element.texture}.png")`;

            node.style.width = 100 / THROW_BOARD_COLUMNS + "%";
            node.style.height = 100 / THROW_BOARD_ROWS + "%";
            node.style.top = (100 / THROW_BOARD_ROWS) * element.row + "%";
            node.style.left =
                (100 / THROW_BOARD_COLUMNS) * element.column + "%";

            this.node.appendChild(node);
        });
    }

    onGameOver(){
        this.node.classList.add('hidden');
    }

    throwPill(afterThrowCallback) {
        let animInterval = setInterval(() => {
            this.frame++;
            if (this.frame >= animationFrames.length) {
                // rert fram and stop
                this.frame = 0;
                clearInterval(animInterval);
                // return pill as callback
                this.pill[0].atThrow = false;
                this.pill[1].atThrow = false;
                afterThrowCallback(this.pill);
                // make new pill
                this.pill = this.makePill();
            }
        }, THROW_PILL_SPEED);
    }

    makePill() {
        let pill = [];
        for (let pillsCountIter = 0; pillsCountIter < 2; pillsCountIter++) {
            const pillCell = new PillCell(
                3,
                10 + pillsCountIter,
                pillsCountIter
            );
            pill.push(pillCell);
        }
        // setting reference between pillCells
        pill[0].adjacentCell = pill[1];
        pill[1].adjacentCell = pill[0];
        return pill;
    }
}

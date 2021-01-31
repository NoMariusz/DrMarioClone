("use strict");

import { SCORE_MARGIN_TOP, TOP_MARGIN_TOP } from "../constants.js";

export default class ScoreBlock {
    constructor() {
        this.node = document.getElementById('scoreBlock');
        this.top = this.getTop();
        this.score = 0;
        this.renderBlock();
    }

    getTop() {
        this.top = localStorage.getItem("top");
        return this.top;
    }

    setTop(value) {
        this.top = value
        localStorage.setItem("top", this.top);
    }

    addScore(value) {
        this.score += value;
        if (this.getTop() < this.score) {
            this.setTop(this.score);
        }
    }

    renderBlock() {
        const makeNumArray = (number) => {
            let tempNumber = number;
            let numberArray = [];
            for (let divider = 1000000; divider >= 1; divider /= 10) {
                numberArray.push(Math.floor(tempNumber / divider));
                tempNumber = tempNumber % divider;
            }
            return numberArray;
        };

        //clear old scores
        this.node.innerHTML = "";

        for (let scoreIter = 0; scoreIter < 2; scoreIter ++){
            let score = scoreIter == 0 ? this.top : this.score
            // make arrays with top and score vals
            let singleNumArray = makeNumArray(score);

            // render section displaying numbers
            let block = document.createElement("div");
            this.node.appendChild(block);
            block.classList.add("scoreNumbers");
            block.style.marginTop =
                scoreIter == 0 ? TOP_MARGIN_TOP : SCORE_MARGIN_TOP;

            for (let numIter = 0; numIter < 7; numIter++) {
                let cell = document.createElement("div");
                block.appendChild(cell);
                cell.classList.add("scoreNumber");
                cell.style.backgroundImage = `url('./img/numbers/${singleNumArray[numIter]}.png')`;
            }
        };
    }
}

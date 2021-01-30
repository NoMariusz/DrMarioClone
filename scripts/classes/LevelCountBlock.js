("use strict");

export default class LevelCountBlock {
    constructor(level) {
        this.node = document.getElementById("levelCountBlock");
        this.level = level;
    }

    renderBlock() {
        // making array with next numbers
        let tempNumber = this.level;
        let numberArray = [];
        for (let divider = 10; divider >= 1; divider /= 10) {
            numberArray.push(Math.floor(tempNumber / divider));
            tempNumber = tempNumber % divider;
        }

        this.node.innerHTML = "";
        numberArray.forEach((number) => {
            let block = document.createElement("div");
            this.node.appendChild(block);
            block.classList.add("twoNumCountCell");
            block.style.backgroundImage = `url(./img/numbers/${number}.png)`;
        });
    }

    setNextLvl(level){
        this.level = level;
        this.renderBlock();
    }
}

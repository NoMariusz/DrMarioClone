export default class VirusCountBlock {
    constructor(virusesCount) {
        this.node = document.getElementById("virusCountBlock");
        this.virusesCount = virusesCount;
    }

    renderBlock() {
        // making array with next numbers
        let tempNumber = this.virusesCount;
        let numberArray = [];
        for (let divider = 10; divider >= 1; divider /= 10) {
            numberArray.push(Math.floor(tempNumber / divider));
            tempNumber = tempNumber % divider;
        }

        this.node.innerHTML = "";
        numberArray.forEach((number) => {
            let block = document.createElement("div");
            this.node.appendChild(block);
            block.classList.add("virusCountCell");
            block.style.backgroundImage = `url(./img/numbers/${number}.png)`;
        });
    }
}

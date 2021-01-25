("use strict");

export default class VirusBlock {
    stageToFrame = [2, 1, 2, 3, 2, 4];
    constructor(color) {
        this.node = document.createElement("div");
        this.color = color;
        this.stage = 0;
        this.laughing = false;
        this.prepareNode();
        this.startAnimTimer();
    }

    prepareNode() {
        this.node.classList.add("virus");
        this.node.style.backgroundImage = `url(./img/viruses/${this.color}/1.png)`;
    }

    refreshBlock() {
        this.node.style.backgroundImage = `url(./img/viruses/${this.color}/${
            this.stageToFrame[this.stage]
        }.png)`;
    }

    startAnimTimer() {
        setInterval(() => {
            if (this.laughing) {
                this.stage = this.stage == 0 ? 5 : 0;
            } else {
                this.stage = this.stage >= 4 ? 0 : this.stage + 1;
            }
        }, 200);
    }
}

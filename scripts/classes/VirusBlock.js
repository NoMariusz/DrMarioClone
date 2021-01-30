("use strict");

export default class VirusBlock {
    stageToFrame = [2, 1, 2, 3, 2, 4, 5, 6];
    constructor(color) {
        this.node = document.createElement("div");
        this.color = color;
        this.stage = 0;
        this.laughing = false;
        this.dying = false;
        this.prepareNode();
        this.animInterval
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
        this.animInterval = setInterval(() => {
            if (this.laughing) {
                this.stage = this.stage == 0 ? 5 : 0;
            } else if (this.dying){
                this.stage = this.stage == 6 ? 7 : 6;
            }else {
                this.stage = this.stage >= 4 ? 0 : this.stage + 1;
            }
        }, 200);
    }

    clear(){
        this.node.remove()
        clearInterval(this.animInterval)
    }
}

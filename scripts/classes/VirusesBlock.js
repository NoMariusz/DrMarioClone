import { COLORS, VIRUSES_POSITIONS } from "../constants.js";
import VirusBlock from "./VirusBlock.js";

("use strict");

export default class VirusesBlock {
    constructor() {
        this.node = document.getElementById("virusesBlock");
        this.viruses = [];
        this.initViruses();

        this.position = 0;
        this.changePosotionInterval = setInterval(() => {
            this.position =
                this.position >= VIRUSES_POSITIONS.length - 1
                    ? 0
                    : this.position + 1;
        }, 1000);
    }

    initViruses() {
        COLORS.forEach((color) => {
            let virus = new VirusBlock(color);
            this.viruses.push(virus);
            this.node.appendChild(virus.node);
        });
    }

    refreshBlock() {
        // refresh virus anim
        this.viruses.forEach((virus) => {
            virus.refreshBlock();
        });

        // refresh virus pos
        for (let virusIter = 0; virusIter < this.viruses.length; virusIter++) {
            let virus = this.viruses[virusIter];

            let pos = this.position + virusIter * 3;
            pos = pos % VIRUSES_POSITIONS.length;
            
            virus.node.style.top = VIRUSES_POSITIONS[pos][0];
            virus.node.style.left = VIRUSES_POSITIONS[pos][1];
        }
    }

    onGameOver() {
        this.viruses.forEach((virus) => {
            virus.laughing = true;
        });
        clearInterval(this.changePosotionInterval);
    }
}

import { COLORS, VIRUSES_POSITIONS } from "../constants.js";
import VirusBlock from "./VirusBlock.js";

("use strict");

export default class VirusesBlock {
    constructor(getVirusCountFunc) {
        this.node = document.getElementById("virusesBlock");
        this.viruses = [];
        this.initViruses();

        this.position = 0;
        this.changePosotionInterval = setInterval(() => {this.virusMove()}, 2000);

        // function to access dict soring all virus-color informations
        this.getVirusCountFunc = getVirusCountFunc
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

    onVirusBeat(color){
        let colorVirus = this.viruses.find(virus => virus.color == color);
        colorVirus.dying = true;
    }

    virusMove(){
        // move viruses
        this.position =
            this.position >= VIRUSES_POSITIONS.length - 1
                ? 0
                : this.position + 1;
        // check if any die hard
        let dyingViruses = this.viruses.filter(virus => virus.dying)
        dyingViruses.forEach(virus => {
            // if is no more viruses in that color, delete it
            if(this.getVirusCountFunc()[virus.color] == 0){
                let virusIndex = this.viruses.indexOf(virus)
                this.viruses.splice(virusIndex, 1)
                virus.clear()
            } else {
                virus.dying = false
            }
        })
    }
}

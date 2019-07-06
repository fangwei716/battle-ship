import {Config} from "Config";
export class Ship {
    constructor(type, index, rotation) {
        this.index = index;
        this.type = type;
        this.shipPrototype = Config.battleShipTypes[this.type];
        this.shape = this.initShape(rotation);
        this.total = this.shipPrototype.total;
        this.hitNum = 0;
        this.sunkNumer = Config.enableSunkNumMode ? this.shipPrototype.sunkNum : this.total;
    }

    initShape(rotation) {
        if (!Config.enableRotation || rotation === 0) {
            return this.shipPrototype.shape;
        }
    }

    getIsSunk() {
        return this.hitNum >= this.sunkNumer;
    }

    hit(){
        this.hitNum++;
    }
}
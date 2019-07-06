import Config from "./Config";
export default class Ship {
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
        switch (rotation){
            case 0: return this.shipPrototype.shape;
            case 1: return this.rotate90(this.shipPrototype.shape);
            case 2: return this.rotate180(this.shipPrototype.shape);
            case 3: return this.rotate270(this.shipPrototype.shape);
            default: return this.shipPrototype.shape;
        }
    }

    rotate90(shape) {
        let newShape = [...new Array(shape[0].length)].map(() => new Array(shape.length).fill(-1));
        for (var i = 0; i < newShape.length; i++) {
            for (var j = 0; j < newShape[i].length; j++) {
                newShape[i][j] = shape[newShape[i].length - j - 1][i];
            }
        }
        return newShape;
    }

    rotate180(shape){
        let newShape = [...new Array(shape.length)].map(() => new Array(shape[0].length).fill(-1));
        for (var i = 0; i < newShape.length; i++) {
            for (var j = 0; j < newShape[i].length; j++) {
                newShape[i][j] = shape[newShape.length - i - 1][newShape[i].length - j - 1];
            }
        }
        return newShape;
    }

    rotate270(shape){
        let newShape = [...new Array(shape[0].length)].map(() => new Array(shape.length).fill(-1));
        for (var i = 0; i < newShape.length; i++) {
            for (var j = 0; j < newShape[i].length; j++) {
                newShape[i][j] = shape[j][newShape.length - 1 - i];
            }
        }
        return newShape;
    }

    getIsSunk() {
        return this.hitNum >= this.sunkNumer;
    }

    hit(){
        this.hitNum = this.hitNum + 1;
    }
}
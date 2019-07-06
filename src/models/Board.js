import {Ship} from "Ship";
import {Config} from "Config";
export class Board {
    constructor(index, gridX, gridY, battleShipTypes) {
        this.index = index;
        this.gridX = gridX;
        this.gridY = gridY;
        this.grid = [...new Array(gridX)].map(() => new Array(gridY).fill(null));
        this.battleShipNum = battleShipTypes.length;
        this.battleShips = new Array(this.battleShipNum);
        this.sunkBattleShips = [];
        this.initBoard(battleShipTypes);
    }

    initBoard(battleShipTypes) {
        var rotation = 0;
        for (var i = 0; i < battleShipTypes.length; i++) {
            if (Config.enableRotation) {
                rotation = Math.floor(Math.random() * Math.floor(4));
            }
            this.battleShips[i] = new Ship(battleShipTypes[i], i, rotation);
        }
        this.placeShips(this.battleShips);
    }

    placeShips(){

    }

    hit(x, y){
        if (this.grid[x][y]){
            //hit a target
        }
    }

    clearBattleShip(x, y, ship){
        if (!Config.enableSunkNumMode) {
            return;
        }
    }

    setBattleShipNum() {
        this.battleShipNum = this.battleShips.length - this.sunkBattleShips.length;
    }
}
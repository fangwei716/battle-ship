import Ship from "./Ship";
import Config from "./Config";
export default class Board {
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
        let rotation = 0;
        for (let i = 0; i < battleShipTypes.length; i++) {
            if (Config.enableRotation) {
                rotation = this.getRandom(4);
            }
            this.battleShips[i] = new Ship(battleShipTypes[i], i, rotation);
        }
        this.placeShips(this.battleShips);
    }

    placeShips(ships){
        let failed = [];
        ships.forEach((ship) => {
            if(!this.placeShip(ship)){
                failed.push(ship);
            }
        });
        while(failed.length > 0){
            var elem = failed.pop();
            if (!this.placeShip(elem)){
                failed.push(elem);
            }
        }
    }

    placeShip(ship){
        const shape = ship.shape;
        const lenX = shape.length;
        const lenY = shape[0].length;
        const beginX = this.getRandom(8 - lenX);
        const beginY = this.getRandom(8 - lenY);
        //test round, make sure no cells are occupied
        for(let i = 0; i < lenX; i++){
           for (let j = 0; j < lenY; j++) {
                if (shape[i][j] === '*' && this.grid[beginX + i][beginY + j]) {
                    return false; //occupied
                }
           }
        }
        for (let i = 0; i < lenX; i++) {
            for (let j = 0; j < lenY; j++) {
                if (shape[i][j] === '*') {
                    this.grid[beginX + i][beginY + j] = {
                        ship: ship.index
                    }
                }
            }
        }
        return true;
    }

    getRandom(num){
        return Math.floor(Math.random() * Math.floor(num));
    }

    hit(x, y){
        if (this.grid[x][y]){
            //hit a target
            let ship = this.battleShips(this.grid[x][y].ship);
            const isSunk = ship.getIsSunk();
            if (isSunk) {
                this.sunkBattleShips.push(ship);
            }
            this.clearBattleShip(x, y, ship, isSunk);
        }
    }

    clearBattleShip(x, y, ship, isSunk) {
        if (!isSunk){
            this.grid[x][y] = null;
        }
        if (!Config.enableSunkNumMode) {
            return;
        }
        //clear rest of ship
        for (let i = 0; i < this.gridX; i++) {
            for (let j = 0; j < this.gridY; j++) {
                if (this.grid[i][j] && this.grid[i][j].ship === ship.index) {
                    this.grid[i][j] = null;
                }
            }
        }
    }

    setBattleShipNum() {
        this.battleShipNum = this.battleShips.length - this.sunkBattleShips.length;
    }

    getBattleshipNum() {
        return this.battleShipNum;
    }
}
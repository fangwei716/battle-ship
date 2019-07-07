import Ship from "./Ship";
import Config from "./Config";
export default class Board {
    constructor(index, gridX, gridY, battleShipTypes) {
        this.index = index;
        this.gridX = gridX;
        this.gridY = gridY;
        //-1 empty 
        //-2 visited but miss 
        //-3 visited and hit 
        //other index
        this.grid = [...new Array(gridX)].map(() => new Array(gridY).fill(-1));
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
        let count = 0;
        while (failed.length > 0 && count < 10000) {
            count++;
            let elem = failed.pop();
            if (!this.placeShip(elem)){
                failed.push(elem);
            }
        }
        this.battleShipNum = this.battleShipNum - failed.length;
    }

    placeShip(ship){
        const shape = ship.shape;
        const lenX = shape.length;
        const lenY = shape[0].length;
        const beginX = this.getRandom(this.gridX + 1 - lenX);
        const beginY = this.getRandom(this.gridY + 1 - lenY);
        if (beginX > 0 && this.grid[beginX-1][beginY] >= 0){
            return false;
        }
        if (beginY > 0 && this.grid[beginX][beginY-1] >= 0) {
            return false;
        }
        if (beginX < this.gridX - 1 && this.grid[beginX+1][beginY] >= 0) {
            return false;
        }
        if (beginY < this.gridY - 1 && this.grid[beginX][beginY+1] >= 0) {
            return false;
        }
        //test round, make sure no cells are occupied
        for(let i = 0; i < lenX; i++){
           for (let j = 0; j < lenY; j++) {
                if (shape[i][j] === '*' && this.grid[beginX + i][beginY + j] >= 0) {
                    return false; //occupied
                }
           }
        }
        for (let i = 0; i < lenX; i++) {
            for (let j = 0; j < lenY; j++) {
                if (shape[i][j] === '*') {
                    this.grid[beginX + i][beginY + j] = ship.index
                }
            }
        }
        return true;
    }

    getRandom(num){
        return Math.floor(Math.random() * Math.floor(num));
    }

    hit(x, y){
        if (this.grid[x][y] >= 0){
            //hit a target
            let ship = this.battleShips[this.grid[x][y]];
            ship.hit();
            const isSunk = ship.getIsSunk();
            if (isSunk) {
                this.sunkBattleShips.push(ship.type);
            }
            this.clearBattleShip(x, y, ship, isSunk);
            return {
                hit: true,
                sunk: isSunk,
                ship: ship.type
            };
        }else{
            this.grid[x][y] = -2; //missed
            return {
                hit: false
            };
        }
    }

    clearBattleShip(x, y, ship, isSunk) {
        this.grid[x][y] = -3; //hit
        if (!isSunk || !Config.enableSunkNumMode) {
            return;
        }
        //clear rest of ship when sunk
        for (let i = 0; i < this.gridX; i++) {
            for (let j = 0; j < this.gridY; j++) {
                if (this.grid[i][j] >= 0 && this.grid[i][j] === ship.index) {
                    this.grid[i][j] = -3; //consider as hit
                }
            }
        }
    }

    getRemainingBattleShipNum() {
        return this.battleShips.length - this.sunkBattleShips.length;
    }
}
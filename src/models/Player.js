import {Board} from "Board";
export class Player {
    constructor(index, gridX, gridY, battleShips) {
        this.index = index;
        this.board = null;
        this.battleShipNum = 0;
        this.initPlayer(index, gridX, gridY, battleShips);
    }

    initPlayer(index, gridX, gridY, battleShips) {
        this.board = new Board(index, gridX, gridY, battleShips);
        this.battleShipNum = this.board.getBattleshipNum();
    }

    setBattleShipNum(){
        this.battleShipNum = this.board.getBattleshipNum();
    }

    getIsLost(){
        return this.battleShipNum === 0;
    }
}
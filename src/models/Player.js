import Board from "./Board";
export default class Player {
    constructor(index, gridX, gridY, battleShips, isMachine) {
        this.index = index;
        this.board = null;
        this.lost = false;
        this.isMachine = !!isMachine;
        this.initPlayer(index, gridX, gridY, battleShips);
    }

    initPlayer(index, gridX, gridY, battleShips) {
        this.board = new Board(index, gridX, gridY, battleShips);
    }

    getHit(x, y) {
        return this.board.hit(x, y);
    }

    getIsLost(){
        this.lost = this.board.getRemainingBattleShipNum() === 0;
        return this.lost;
    }
}
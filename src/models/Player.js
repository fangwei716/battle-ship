import Board from "./Board";
export default class Player {
    constructor(index, gridX, gridY, battleShips, isMachine) {
        this.index = index;
        this.board = null;
        this.isMachine = !!isMachine;
        this.battleShipNum = 0;
        this.initPlayer(index, gridX, gridY, battleShips);
    }

    initPlayer(index, gridX, gridY, battleShips) {
        this.board = new Board(index, gridX, gridY, battleShips);
        this.battleShipNum = this.board.getBattleshipNum();
    }

    getHit(x, y) {
        this.board.hit(x, y);
    }

    setBattleShipNum(){
        this.battleShipNum = this.board.getBattleshipNum();
    }

    getIsLost(){
        return this.battleShipNum === 0;
    }
}
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

    machinePlay() {
        if (this.getIsLost()){
            return;
        }
        const gridX = this.board.gridX;
        const gridY = this.board.gridY;
        const grid = this.board.grid;
        let x = this.board.getRandom(gridX);
        let y = this.board.getRandom(gridY);
        let queue = [[x, y]];
        //bfs
        while (queue.length > 0) {
            [x, y] = queue.shift();
            if (x >= 0 && y >= 0 && x < gridX && y < gridY) {
                if(grid[x][y] >= -1){
                    return [x, y];
                }else{
                    queue.push([x - 1, y]);
                    queue.push([x + 1, y]);
                    queue.push([x, y - 1]);
                    queue.push([x, y + 1]);
                }
            }
        }
    }

    getHit(x, y) {
        if (this.getIsLost()) {
            return;
        }
        return this.board.hit(x, y);
    }

    getIsLost(){
        this.lost = this.board.getRemainingBattleShipNum() === 0;
        return this.lost;
    }
}
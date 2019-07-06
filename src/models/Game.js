import {Player} from "Player";
import {Config} from "Config";
export class Game {
    constructor(numOfPlayers, gridX, gridY, battleShips) {
        this.players = new Array(numOfPlayers);
        this.numOfPlayers = numOfPlayers ? numOfPlayers : Config.defaultPlayerNum;
        this.remainPlayersCount = this.numOfPlayers;
        this.turn = 0;
        this.moves = [];
        this.initPlayer(numOfPlayers, gridX, gridY, battleShips);
    }

    initPlayer(gridX, gridY, battleShips) {
        for (var i = 0; i < this.numOfPlayers; i++) {
            this.players[i] = new Player(i, gridX, gridY, battleShips);
        }
    }

    getPlayer(i) {
        return this.players[i]
    }

    makeMove(targetIndex, x, y) {
        this.moves.push([this.turn, targetIndex]);
        this.getPlayer(this.turn).hit(x, y);
        this.turn = (this.turn + 1) % this.numOfPlayers;
    }

    getRemainPlayersCount() {
        this.remainPlayersCount = 0;
        for (var i = 0; i < this.numOfPlayers; i++) {
            if (!this.players[i].getIsLost()){
                this.remainPlayersCount++;
            }
        }
    }

    getSummary() {

    }

    endGame(){
        return this.getSummary();
    }

    saveToLocalStorage(){
        
    }
}
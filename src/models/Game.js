import Player from "./Player";
import Config from "./Config";
export default class Game {
    constructor(numOfPlayers, gridX, gridY, battleShips, numOfMachine) {
        this.players = [];
        this.remainingPlayers = [];
        this.isEnd = false;
        this.numOfPlayers = numOfPlayers ? numOfPlayers : Config.defaultPlayerNum;
        this.numOfMachine = Config.enableMachinePlayer ? numOfMachine : 0;
        this.totalPlayerCount = this.numOfPlayers + this.numOfMachine;
        this.remainPlayersCount = this.numOfPlayers;
        this.turn = 0;
        this.moves = [];
        this.gridX = gridX ? gridX : Config.defaultGridX;
        this.gridY = gridY ? gridY : Config.defaultGridY;
        this.battleShips = battleShips ? battleShips : Config.defaultBattleShips;
        this.initPlayer();
    }

    initPlayer() {
        for (var i = 0; i < this.numOfPlayers; i++) {
            //human player
            this.players.push(new Player(i, this.gridX, this.gridY, this.battleShips));
            this.remainingPlayers.push(i);
        }
        for (var j = 0; j < this.numOfMachine; j++) {
            //AI player
            this.players.push(new Player(j + this.numOfPlayers, this.gridX, this.gridY, this.battleShips, true));
            this.remainingPlayers.push(j + this.numOfPlayers);
        }
    }

    getPlayer(i) {
        return this.players[i]
    }

    makeMove(targetIndex, x, y) {
        if (this.turn === targetIndex || this.isEnd) {
            // can not hit itself
            return;
        }
        this.moves.push([this.turn, targetIndex]);
        var hitInfo = this.getPlayer(targetIndex).getHit(x, y);
        this.getRemainPlayersCount();
        this.turn = this.findNextTurn(this.turn);
        return hitInfo;
    }

    findNextTurn(turn){
        for (let i = 0; i < this.remainingPlayers.length; i++) {
            if (this.remainingPlayers[i] > turn) {
                return this.remainingPlayers[i];
            }
        }
        return this.remainingPlayers[0];
    }

    getMoveCount(index){
        return Math.floor(this.moves.length / this.totalPlayerCount) + (this.moves.length % this.totalPlayerCount > index ? 1 : 0);
    }

    getRemainPlayersCount() {
        this.remainPlayersCount = 0;
        this.remainingPlayers = [];
        for (let i = 0; i < this.totalPlayerCount; i++) {
            if (!this.players[i].getIsLost()){
                this.remainPlayersCount++;
                this.remainingPlayers.push(i);
            }
        }
        this.isEnd = this.remainPlayersCount === 1;
    }

    getWinner() {
        let winner = "Player ";
        for (let i = 0; i < this.totalPlayerCount; i++) {
            if (!this.players[i].getIsLost()) {
                winner += (i+1);
                return winner;
            }
        }
    }

    endGame(){
        return this.getSummary();
    }

    saveToLocalStorage(){
        
    }
}
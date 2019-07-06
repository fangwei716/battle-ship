import Player from "./Player";
import Config from "./Config";
export default class Game {
    constructor(numOfPlayers, gridX, gridY, battleShips, numOfMachine) {
        this.players = [];
        this.numOfPlayers = numOfPlayers ? numOfPlayers : Config.defaultPlayerNum;
        this.numOfMachine = Config.enableMachinePlayer ? numOfMachine : 0;
        this.totalPlayerCount = this.numOfPlayers + this.totalPlayerCount;
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
        }
        for (var j = 0; j < this.numOfMachine; j++) {
            //AI player
            this.players.push(new Player(j + this.numOfPlayers, this.gridX, this.gridY, this.battleShips, true));
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
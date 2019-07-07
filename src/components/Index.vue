<template>
  <div class="container" :key="componentKey">
    <el-tag v-if="game.players" class="header-tag" type="danger"> 
      {{game && game.isEnd ? winner + ' is the winner!' : 'Turn: Player ' + (game.turn + 1)}} 
    </el-tag>
    <el-button @click="startNewGame()" v-if="game && game.isEnd" icon="el-icon-refresh" style="margin-left: 20px;" circle></el-button>
    <el-row>
      <el-col v-for="player in getVisiblePlayers(players)" :key="'player' + player.index" :md="12" :sm="24">
        <div class="board-container">
          <Board :player="player" :game="game"/>
        </div>
      </el-col>
    </el-row>
    <el-dialog width="500px" :show-close="false" title="Start Game" :visible="dialogVisible">
      <span>{{hasPrev ? 'Do you want to restore game or start a new game ?' : 'Start a new game?'}}</span>
      <el-form v-if="enableMoreThanTwoPlayer || enableMachinePlayer" style="width: 450px; margin-top: 30px;">
        <el-form-item v-if="enableMoreThanTwoPlayer" label="Human Player">
          <el-radio-group v-model="numOfHuman">
            <el-radio-button v-if="enableMachinePlayer" label="1"></el-radio-button>
            <el-radio-button label="2"></el-radio-button>
            <el-radio-button label="3"></el-radio-button>
            <el-radio-button label="4"></el-radio-button>
          </el-radio-group>
        </el-form-item>
        <el-form-item v-if="enableMachinePlayer" label="Machine Player">
          <el-radio-group v-model="numOfMachine">
            <el-radio-button v-if="numOfHuman !== '1'" label="0"></el-radio-button>
            <el-radio-button label="1"></el-radio-button>
            <el-radio-button label="2"></el-radio-button>
            <el-radio-button label="3"></el-radio-button>
            <el-radio-button label="4"></el-radio-button>
          </el-radio-group>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="initGameWithConfig()">Start New Game</el-button>
        <el-button v-if="hasPrev" @click="dialogVisible = false">Restore Game</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import Board from '@/components/Board.vue'
import Game from '@/models/Game'
import Config from '@/models/Config'
export default {
  name: 'Index',
  components: {
    Board
  },
  data() {
    return {
      componentKey: 0,
      hasPrev: false,
      game: {},
      players: [],
      winner: "",
      dialogVisible: false,
      numOfHuman: (!Config.enableMoreThanTwoPlayer && Config.enableMachinePlayer) ? "1" : "2",
      numOfMachine: "0",
      enableMachinePlayer: Config.enableMachinePlayer,
      enableMoreThanTwoPlayer: Config.enableMoreThanTwoPlayer
    }
  },
  watch: {
    'game.isEnd': function(newVal) {
      if(newVal && !this.winner){
        this.winner = this.game.getWinner();
        this.$notify({
          title: 'Game end',
          message: this.winner + ' won!',
          type: 'success'
        });
        this.hasPrev = false;
      }
    }
  },
  created() {
    this.startGame();
    window.onbeforeunload = () => {
      localStorage.setItem('battleGame', JSON.stringify(this.game));
    };
  },
  methods: {
    startGame(){
      this.dialogVisible = true;
      let battleGame = localStorage.getItem('battleGame');
      let prevGame = JSON.parse(battleGame);
      if(prevGame && prevGame.players){
        this.hasPrev = true;
        this.initGame(prevGame);
      }else{
        this.hasPrev = false;
      }
    },
    startNewGame(){
      this.dialogVisible = true;
    },
    initGameWithConfig(){
      this.initGame(null, +this.numOfHuman, +this.numOfMachine);
      this.dialogVisible = false;
      this.componentKey += 1;
    },
    initGame(prevGame, numOfHuman, numOfMachine){
      let game =  new Game(prevGame, numOfHuman, numOfMachine);
      this.game = game;
      this.players = game.players;
      if(!game.getIsInitializedCorrectly()){
        //not initialized correctly
        this.$alert('Fail to initialize the game correctly, please try again.', 'Technical Error', {
          confirmButtonText: 'Restart',
          callback: () => {
            this.hasPrev = false;
            this.startNewGame();
          }
        });
      }
    },
    getVisiblePlayers(players){
      if(this.game.isEnd){
        return players;
      }else{
        return players.filter(e => !e.lost);
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .header-tag{
    height: 48px;
    line-height: 46px;
    font-size: 22px;
    margin-bottom: 20px;
  }
</style>

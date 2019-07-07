<template>
  <div class="container">
    <el-tag v-if="game.players" class="header-tag" type="danger"> 
      {{game && game.isEnd ? winner + ' is the winner!' : 'Turn: Player ' + (game.turn + 1)}} 
    </el-tag>
    <el-button v-if="game && game.isEnd" icon="el-icon-refresh" style="margin-left: 20px;" circle></el-button>
    <el-row>
      <el-col v-for="player in getVisiblePlayers(players)" :key="'player' + player.index" :span="12">
        <div class="board-container">
          <Board :player="player" :game="game"/>
        </div>
      </el-col>
    </el-row>
    <el-dialog width="500px" :show-close="false" title="Start Game" :visible="dialogVisible">
      <el-form style="width: 450px;">
        <el-form-item label="Human Player">
          <el-radio-group v-model="numOfHuman">
            <el-radio-button label="1"></el-radio-button>
            <el-radio-button label="2"></el-radio-button>
            <el-radio-button label="3"></el-radio-button>
            <el-radio-button label="4"></el-radio-button>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="Machine Player">
          <el-radio-group v-model="numOfMachine">
            <el-radio-button label="0"></el-radio-button>
            <el-radio-button label="1"></el-radio-button>
            <el-radio-button label="2"></el-radio-button>
            <el-radio-button label="3"></el-radio-button>
            <el-radio-button label="4"></el-radio-button>
          </el-radio-group>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="initGameWithConfig()">Start</el-button>
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
      game: {},
      players: [],
      winner: "",
      dialogVisible: false,
      numOfHuman: "2",
      numOfMachine: "0",
      minPlayerNum: 2,
      maxPlayerNum: Config.maxPlayerNum
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
      }
    }
  },
  created() {
    this.startGame();
  },
  methods: {
    startGame(){
      if(!Config.enableMoreThanTwoPlayer){
        this.initGame();
      }else{
        this.dialogVisible = true;
      }
    },
    initGameWithConfig(){
      this.initGame(+this.numOfHuman, +this.numOfMachine);
      this.dialogVisible = false;
    },
    initGame(numOfHuman, numOfMachine){
      let game =  new Game(numOfHuman, numOfMachine);
      this.game = game;
      this.players = game.players;
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

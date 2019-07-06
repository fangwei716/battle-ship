<template>
  <div class="container">
    <el-tag class="header-tag" type="danger"> 
      {{game.isEnd ? winner + ' is the winner!' : 'Turn: Player ' + (game.turn + 1)}} 
    </el-tag>
    <el-button v-if="game.isEnd" icon="el-icon-refresh" style="margin-left: 20px;" circle></el-button>
    <el-row>
      <el-col v-for="player in players" :key="'player' + player.index" :span="12">
        <div class="board-container">
          <Board :player="player" :game="game"/>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import Board from '@/components/Board.vue'
import Game from '@/models/Game'
export default {
  name: 'Index',
  components: {
      Board
  },
  data() {
    return {
      game: null,
      players: [],
      winner: ""
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
    let game =  new Game();
    this.game = game;
    this.players = game.players;
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

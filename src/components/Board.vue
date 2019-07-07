<template>
  <div>
    <el-card class="board" :style="'width:' + 55*gridX + 'px;'">
      <div slot="header" class="clearfix">
        <div>
          <el-badge :is-dot="game.turn === player.index && !game.isEnd">Player {{player.index + 1}}</el-badge>
        </div>
        <div style="font-size: 16px;" v-if="game.isEnd" class="summary">Shot fired: {{getShotFired()}}; Ships sunk: {{this.board.sunkBattleShips.length > 0 ? this.board.sunkBattleShips.join(", ") : 'None'}}</div>
      </div>
      <div :class="{'grid-container': true, 'blur': game.turn === player.index && !game.isEnd }" :style="'width:' + (5 + 50*gridX) + 'px;height:' + (5 + 50*gridY) + 'px;'">
        <div class="row" :key="player.index + '-' + rowIndex" v-for="(row, rowIndex) in board.grid">
          <div class="cell" :key="player.index + '-' + rowIndex + '-' + columnIndex" v-for="(cell, columnIndex) in row">
            <span @click="hit(rowIndex, columnIndex)" v-if="cell >= -1" class="cell-available"></span>
            <span v-if="cell === -2" class="miss"></span>
            <span v-if="cell === -3" class="hit"></span>
          </div>
        </div>
      </div>
      <div class="drop" v-if="game.turn === player.index || game.isEnd">
      </div>
    </el-card>
  </div>
</template>

<script>
export default {
  name: 'Board',
  props: {
    game: Object,
    player: Object
  },
  data() {
    return {
      board: [],
      gridX: 0,
      gridY: 0
    }
  },
  created() {
    if(this.player){
      this.board = this.player.board;
      this.gridX = this.board.gridX;
      this.gridY = this.board.gridY;
    }
  },
  methods: {
    getShotFired(){
      return this.game.getMoveCount(this.player.index);
    },
    hit(x, y){
      const hitResult = this.game.makeMove(this.player.index, x, y);
      this.$forceUpdate();
      if(this.game.isEnd || !hitResult){
        return;
      }else if(this.player.lost){
        this.$notify({
          title: 'Hit',
          message: 'Player ' + (this.player.index + 1) + ' lost!',
          type: 'success',
          duration: 2500
        });
        return;
      }
      if(hitResult.hit){
        this.$notify({
          title: 'Hit',
          message: hitResult.sunk ? 'You sunk the battleship ' + hitResult.ship + '!': 'You hit a battleship!',
          type: 'success',
          duration: 1500
        });
      }else{
        this.$notify({
          title: 'Miss',
          message: 'You missed.',
          type: 'warning',
          duration: 1500
        });
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .board{
     margin: 20px auto; 
     position: relative;
  }
  .grid-container{
    height: auto;
    display: block;
    overflow: hidden;
    margin: 0 auto;
  }
  .blur{
    filter: blur(4px);
  }
  .drop{
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0; 
    left: 0;
  }
  .row{
    display: block;
    clear: both;
  }
  .row:first-child .cell{
    border-top: 1px solid #666;
  }
  .cell{
    display: block;
    float: left;
    width: 49px;
    height: 49px;
    border-right: 1px solid #666;
    border-bottom: 1px solid #666;
  }
  .cell:first-child{
    border-left: 1px solid #666;
  }
  .cell span{
    display: block;
    width: 49px;
    height: 49px;
    line-height: 49px;
  }
  .cell-available{
    cursor: pointer; 
  }
  .cell-available:hover{
    background: #ddd;
  }
  .miss{
    background: #909399;
  }
  .hit{
    background: #F56C6C;
  }
  .win-badge{
    font-size: 50px;
    color: #f4dd52;
  }
</style>

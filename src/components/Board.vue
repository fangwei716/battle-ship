<template>
  <div>
    <span>Player {{player.index + 1}}</span>
    <div class="grid-container">
      <div class="row" :key="player.index + '-' + rowIndex" v-for="(row, rowIndex) in board.grid">
        <div class="cell" :key="player.index + '-' + rowIndex + '-' + columnIndex" v-for="(cell, columnIndex) in row">
          <span @click="hit(rowIndex, columnIndex)" v-if="cell >= -1" class="cell-available"></span>
          <span v-if="cell === -2" class="miss"></span>
          <span v-if="cell === -3" class="hit"></span>
        </div>
      </div>
    </div>
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
      board: []
    }
  },
  created() {
    if(this.player){
      this.board = this.player.board;
    }
  },
  methods: {
    hit(x, y){
      this.game.makeMove(this.player.index, x, y);
      this.$forceUpdate();
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .grid-container{
    height: auto;
    display: block;
    overflow: hidden;
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
</style>

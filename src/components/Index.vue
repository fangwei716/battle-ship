<template>
  <div class="container">
    <el-row>
      <el-col v-for="player in players" :key="'player' + player.index" :span="12">
        <div class="board-container">
          <Board :player="player"/>
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
  data() {
    return {
      players: []
    }
  },
  created() {
    let game =  new Game();
    console.log(game);
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>

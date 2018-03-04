<template>
  <div>
    <button v-on:click="open=true">Deploy Droid</button>
    <div id="myModal" class="modal" :class="{'hide' : !open}">
      <div class="modal-content">
        <span class="close" v-on:click="open=false">&times;</span>
        <h2>Add Droid</h2>
        <form>
          <label for="xCoordinate">X:
            <input v-model="coordinates.x" min="0" id="xCoordinate" type="number">
          </label>
          <label for="xCoordinate">Y:
            <input v-model="coordinates.y" min="0" id="yCoordinate" type="number">
          </label>
          <label for="closest-enemies">
          <input type="checkbox" id="closest-enemies" value="closest-enemies" v-model="protocols.currentProcotols">
          Closest Enemies</label>
          <label for="furthest-enemies"><input type="checkbox" id="furthest-enemies" value="furthest-enemies" v-model="protocols.currentProcotols">
          Furthest Enemies</label>
          <label for="assist-allies"><input type="checkbox" id="assist-allies" value="assist-allies" v-model="protocols.currentProcotols">
          Assist Allies</label>
          <label for="avoid-crossfire"><input type="checkbox" id="avoid-crossfire" value="avoid-crossfire" v-model="protocols.currentProcotols">
          Avoid Crossfire</label>
          <label for="prioritize-mech"><input type="checkbox" id="prioritize-mech" value="prioritize-mech" v-model="protocols.currentProcotols">
          Prioritize Mech</label>
          <label for=avoid-mech><input type="checkbox" id="avoid-mech" value="avoid-mech" v-model="protocols.currentProcotols">
          Avoid Mech</label>
          <button v-on:click="updateCoordinates">ADD</button>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'DeployDroid',
    props:['coordinates','protocols'],
    data () {
      return {
        open:false
      }
    },
    mounted(){
      var modal = document.getElementById('myModal');
      window.onclick = function(event) {
        if (event.target == modal) {
          modal.style.display = "none";
        }
      }
    },
    methods:{
      updateCoordinates (e){
        e.preventDefault();
        this.open = false;
        this.$emit('addDroid')
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .hide{
    display: none;
  }
  .show{
    display: block;
  }
  .modal {
    position: fixed;
    z-index: 1;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    overflow: auto;
    background-color: rgb(0,0,0);
    background-color: rgba(0,0,0,0.4);
  }

  /* Modal Content/Box */
  .modal-content {
    background-color: #fefefe;
    margin: 15% auto;
    padding: 20px;
    border: 1px solid #888;
    width: 30%;
  }
  form{
    display: flex;
    flex-direction: column;
  }
  /* The Close Button */
  .close {
    color: #aaa;
    float: right;
    font-size: 28px;
    font-weight: bold;
  }

  .close:hover,
  .close:focus {
    color: black;
    text-decoration: none;
    cursor: pointer;
  }
  button{
    background-color: #aeaf0a;
    color: white;
    padding: 15px 32px;
    text-align: center;
    text-decoration: none;
    display: inline-block;
    font-size: 16px;
  }
</style>

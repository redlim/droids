<template>
  <div class="container">
    <div class="actions-container">
      <deploy-droid :coordinates="currentCoordinates" :protocols="protocols" @addDroid="addDroid" :open="openDialog"></deploy-droid>
      <button type="button" v-on:click="shoot">Shoot</button>
    </div>
    <div class="world-container">
      <div id="world" v-on:click="worldClick">
      </div>
    </div>
  </div>
</template>

<script>
  import  '../libs/battle-map/dist/world'
  import DeployDroid from './DeployDroid'
  export default {
    components:{DeployDroid},
    name: 'SedMap',
    data () {
      return {
        msg: '',
        world:{},
        currentCoordinates:{x:'0',y:'0'},
        protocols:{currentProcotols:[]},
        droidsAdded:[],
        droidsInit:1,
        openDialog:{open:false}
      }
    },
    mounted(){
      let worldElement = document.querySelector('#world');
      this.world = new World({
        element: worldElement
      });
    },
    methods:{
      addDroid (){
        const id = 'id' + this.droidsInit;
        this.world.addDroid(id,this.currentCoordinates);
        this.droidsInit++;
        this.droidsAdded.push({id:id,coordinates:this.currentCoordinates,protocols:this.protocols.currentProcotols});
      },
      shoot () {
        this.droidsAdded.forEach((droid)=> {
          const data = {};
          data.protocols = droid.protocols;
          data.scan = this.world.model.items.reduce((acum,el)=>{
            if(el.model.coords && el.model.enemies && el.model.allies)
            acum.push({coordinates:el.model.coords,enemies:el.model.enemies,allies:el.model.allies});
            return acum;
          },[]);
          console.log(data);
          this.$http.post('https://codetest.api.seedtag.com/radar',data, {
            headers: {
              'content-type': 'application/json'
            }
          }).then(response => {
            this.world.fire(droid.id,response.data);
          }, err => {
            console.log(err);
          });
        });
      },
      worldClick (){
        this.currentCoordinates = this.world.model.cursor;
        this.openDialog.open = true;
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .actions-container{
    display: flex;
    flex-direction: row;
    justify-content: center;
    width: 100%;
    height: 10%;
  }
  button{
    background-color: #fc0d1b;
    color: white;
    padding: 15px 32px;
    text-align: center;
    text-decoration: none;
    display: inline-block;
    font-size: 16px;
  }
  .world-container{
    height: 70%;
  }
</style>

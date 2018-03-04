<template>
  <div class="container">
    <deploy-droid :coordinates="currentCoordinates" :protocols="protocols" @addDroid="addDroid"></deploy-droid>
    <button v-on:click="shoot">Shoot</button>
    <div id="world">
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
        droidsInit:1
      }
    },
    mounted(){
      let worldElement = document.querySelector('#world');
      this.world = new World({
        element: worldElement
      });
      console.log(this.world.model);
    },
    methods:{
      addDroid (){
        const id = 'id' + this.droidsInit;
        this.world.addDroid(id,this.currentCoordinates);
        this.droidsInit++;
        this.droidsAdded.push({id:id,coordinates:this.currentCoordinates,protocols:this.protocols.currentProcotols});
        console.log(this.currentCoordinates);
        console.log(this.protocols);
      },
      shoot (){
        this.droidsAdded.forEach((droid)=> {
          const data = {};
          data.protocols = droid.protocols;
          data.scan = this.world.model.items.reduce((acum,el)=>{

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
            console.log(err)
          });
        });
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>

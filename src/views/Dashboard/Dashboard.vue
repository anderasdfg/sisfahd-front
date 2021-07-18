<template>
    <div>
      <div v-if="this.user">
        <div class="home" v-if="this.user.rol == '607f37c1cb41a8de70be1df3'">
          <CardPaciente :user="this.user" class="card-paciente"  />  
          <CardCitas :user="this.user"/>
        </div>
        <div class="home" v-if="this.user.rol == '607f2beacb41a8de70be1dec'">    
          <CardMedico :user="this.user" class="card-paciente" />    
        </div> 
        <div v-if="this.user.rol == '60e796bd2a653433ee7ef853'">    
          <HeaderDashboard/>
          <ResumenAtenciones/>
        </div> 
      </div>
      <div v-else>
        <v-skeleton-loader          
            type="article, actions"
          ></v-skeleton-loader>
      </div>      
    </div>  
</template>

<script>
import CardPaciente from "@/components/CardPaciente.vue";
import CardMedico from "@/components/CardMedico.vue";
import CardCitas from "@/components/CardCitas.vue";
import HeaderDashboard from "@/components/HeaderDashboard.vue";
import ResumenAtenciones from "@/components/ComponentesDashboard/ResumenAtenciones.vue";
import { mapGetters, mapActions, mapState, mapMutations } from "vuex";

export default {
  name: "Dashboard",
  components: {
    CardPaciente,
    CardCitas,
    CardMedico,
    HeaderDashboard,
    ResumenAtenciones
  },
  data(){ 
    return {
      //
    }
  },
  computed: {
    ...mapState(["drawer"]),
    ...mapGetters(["user"]),
  },

  async created() {        
    this.fetchUser(); 
  },

  methods: {    
    ...mapActions(["fetchUser"]),        
  },
};
</script>

<style lang="scss">
.home {
  margin: 1%;
  display: flex;
  justify-content: space-around;
}
.card-paciente {
  max-width: 60%;
  border-radius: 20px !important;
}
.perfil {
  width: 20%;
  height: 20%;
  border-radius: 20px;
}
</style>
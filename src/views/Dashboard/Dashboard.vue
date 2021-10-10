<template>
  <div>
    <div v-if="this.user">
      <div class="home-columns" v-if="this.user.rol == '607f37c1cb41a8de70be1df3'">
        <div class="item-left" >
          <CardPaciente :user="this.user" class="card-paciente" />
          <CardPrescripcionesExamenes :user="this.user" style="max-width: 90%" />          
        </div>        
        <CardCitas :user="this.user" />        
      </div>

      <div class="card-medico" v-if="this.user.rol == '607f2beacb41a8de70be1dec'">   
        <div class="item-left" >
          <CardMedico :user="this.user" style="max-width: 80%"  /> 
          <div class="sub-item-left">
            <ResumenAtencionesHoy :user="this.user" class="subitem-1" />   
            <ProgresoDia :user="this.user" class="subitem-2"/>
          </div>           
        </div>  
        <div class="item-right">
          <ResumenCantidadesMedico :user="this.user"  />  
        </div>
         
         
        
      </div>
      <div v-if="this.user.rol == '60e796bd2a653433ee7ef853'">
        <HeaderDashboard />
        <div class="bodyDashboard">
          <ResumenAtenciones />
          <ResumenEspecialidades />
          <ResumenDiagnosticos />
        </div>
      </div>
    </div>
    <div v-else>
      <v-skeleton-loader type="article, actions"></v-skeleton-loader>
    </div>
  </div>
</template>

<script>
import CardPaciente from "@/components/CardPaciente.vue";
import CardMedico from "@/components/CardMedico.vue";
import CardCitas from "@/components/CardCitas.vue";
import HeaderDashboard from "@/components/HeaderDashboard.vue";
import ResumenAtenciones from "@/components/ComponentesDashboard/ResumenAtenciones.vue";
import ResumenEspecialidades from "@/components/ComponentesDashboard/ResumenEspecialidades.vue";
import ResumenDiagnosticos from "@/components/ComponentesDashboard/ResumenDiagnosticos.vue";
import CardPrescripcionesExamenes from "@/components/ComponentesDashboardPaciente/CardPrescripcionesExamenes.vue";
import ResumenAtencionesHoy from "@/components/ComponentesDashboardMedico/ResumenAtencionesHoy.vue";
import { mapGetters, mapActions, mapState, mapMutations } from "vuex";
import ResumenCantidadesMedico from '../../components/ComponentesDashboardMedico/ResumenCantidadesMedico.vue';
import ProgresoDia from '../../components/ComponentesDashboardMedico/ProgresoDia.vue';

export default {
  name: "Dashboard",
  components: {
    CardPaciente,
    CardCitas,
    CardMedico,
    HeaderDashboard,
    ResumenAtenciones,
    ResumenEspecialidades,
    ResumenDiagnosticos,
    CardPrescripcionesExamenes,
    ResumenAtencionesHoy,
    ResumenCantidadesMedico,
    ProgresoDia
  },
  data() {
    return {
      //
    };
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
.card-paciente {
  max-width: 90%;
  border-radius: 20px !important;
  @include flex-center;
}
.perfil {
  width: 20%;
  height: 20%;
  border-radius: 20px;
}
.bodyDashboard {
  display: flex;
  justify-content: space-around;
  margin-top: 1%;
}
.home-columns {
  
  display: flex;
  flex-direction: row;
  justify-content: center;
  flex-wrap: nowrap;  
  margin: 1% 3%;
}
.card-medico {
  
  display:flex;
  justify-content: space-around;
  margin: 1%;
  flex-direction: row;  
}
.item-right {
  width: 20%;
}
.item-left {   
  margin-top: 1%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-content: center;
  align-items: center;
  width: 100%;

}
.sub-item-left {    
  display: flex;
  width: 80%;
  justify-content: space-between;  
}

.subitem-1 {
  
  max-width: 46% ;
}

.subitem-2 {
  max-width: 40% !important;
}

</style>
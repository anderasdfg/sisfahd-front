<template>
  <v-card elevation="3" outlined class="card">
    <template v-if="showInfo">
      <div class="progress">
        <v-progress-circular
          size="80"
          width="10"
          color="blue"
          indeterminate
        ></v-progress-circular>
      </div>
    </template>
    <template v-else>
    <div class>
    <v-card-title class="titulo">Servicios pendientes</v-card-title>
    </div>
      <v-card-subtitle
        >Visualice todos los pacientes con servicios pendientes a realizar.
      </v-card-subtitle>
    <v-card-title style="margin-top:0px !important">
        <v-text-field
          v-model="search"
          class="pt-0 mt-0"
          append-icon="mdi-magnify"
          label="Buscar pacientes"
          style="margin-top:0px !important"
          single-line
          hide-details
        ></v-text-field>
    </v-card-title>
    <div v-for="n in totalNumeros" :key="n"  style="display: flex; justify-content:space-evenly;">
      <PacientesPendientes :mostrar ="pacientepedidos.length >= n"  :paciente="pacientepedidos[n-1]" @emit-atender-paciente="atenderPacienteExamenes(pacientepedidos[n-1].id_usuario, pacientepedidos[n-1]._id)"></PacientesPendientes>
      <PacientesPendientes :mostrar ="pacientepedidos.length >= (n+1)" :paciente="pacientepedidos[n]" @emit-atender-paciente="atenderPacienteExamenes(pacientepedidos[n].id_usuario, pacientepedidos[n]._id)"></PacientesPendientes>
    </div>
    <v-pagination
        style="padding:50px; borders"
        v-model="page"
        :length="pageCount"
        :total-visible="6"
      ></v-pagination>
    </template>
  </v-card>
</template>

<script>
import axios from "axios"
import PacientesPendientes from "@/components/Pedidos/PacientesPendientes"
import { mapActions,mapGetters } from "vuex";
export default {
name: "GestionarPedido",
components: {
  PacientesPendientes,
},
data(){
    return{
      showInfo:false,
      totalNumeros: [ 1, 3, 5 ],
      search:'',
      page: 1,
      pageCount: 1,
      pacientepedidos: [],
      idMedico:"",
    };
},
async created(){
  this.showInfo = true;
  await this.obtenerMedico(this.user.id);
  await this.obtenerPacientesPedidos();
  this.showInfo = false
  //probando algo
},
methods:{
  /*async obtenerPacientesPedidos() {
    await axios
    .get("/Pedidos/pacientepedidopendiente")
    .then((x) => {    
      this.pacientepedidos = x.data;
      console.log("Cosas locas del paciente con pedidos")
      console.log(this.pacientepedidos);
    })
    .catch((err) => console.log(err));
  },*/
  ...mapActions(['fetchUser']),
  atenderPacienteExamenes(idusuario, idpaciente){
    this.$router.push({ name: 'ExamenesPorPaciente', params: {idusuario: idusuario, idpaciente: idpaciente, idmedico: this.idMedico }})
  },
  async obtenerPacientesPedidos() {
    await axios
    .get("/Turno_Orden/byidmedicopacientespendientes?id_medico=" + this.idMedico)
    .then((x) => {    
      this.pacientepedidos = x.data;
      console.log("Cosas locas del paciente con pedidos")
      console.log(this.pacientepedidos);
    })
    .catch((err) => console.log(err));
  },
  async obtenerMedico(idUsuario){
    await axios
      .get("/Medico/medicodatos/"+idUsuario)
      .then((x) => {
        this.idMedico = x.data.id;
        console.log(this.idMedico);
      })
      .catch((err) => console.log(err));
  },
},
computed:{
  ...mapGetters(['user']),
},

}
</script>
<style lang="scss" scoped>
.card {
  width: 95%;
  margin: 0px auto;
  margin-left: 50px;
  margin-top: 40px;
  padding-bottom: 20px;
}

.progress {
  width: 50%;
  margin: 0px auto;
  text-align: center;
  padding-top: 15px;
}

.label-title {
  font-size: 1.2rem;
  color: $blue;
  
}
.label-text {
  margin-top: 2px;
  font-size: 1rem;
  text-transform: capitalize;
}
.titulo{
  padding-top: 30px;
  color: $blue;
  font-weight: bold;
  font-size: 2rem;
}
.subtitulo{
  font-size: 1.5rem;
  color: $blue;
  font-weight: bold;
}
.v-data-table th {
  font-size: 50px;
}
</style>
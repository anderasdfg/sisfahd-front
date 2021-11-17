<template>
  <div class="viewDiv">
    <div class="contaninerDiv-resultados">
      <v-card>
        <v-card-title class="titulo-resultados">Mis Ordenes</v-card-title>
        <div class="content-view-resultados">
          <v-card class="content-resultados" elevation="0"> 
            <v-card height="500" elevation="0" class="mt-0 mb-0">
              <CardListaOrdenes
                :ListTableElem="listExamElem"
              ></CardListaOrdenes>
            </v-card>
          </v-card>
        </div>
      </v-card>
    </div>
  </div>
</template>


<script>
import axios from "axios";
import { mapGetters } from 'vuex'
import CardListaOrdenes from "@/components/Ordenes/CardListaOrdenes"
export default {
  components:{
    CardListaOrdenes
  },
  data(){
    return{
      dialogEditarResult:false,
      infoResultExamenAuxiliar:{},
      seccion: 1,
      //Lista de Exámenes Auxiliares solicitados por el médico durante la cita.
      listExamElem:[],
      //Lista de Resultados subidos por el paciente.
      listOrdenes:[],
    }
  },
  mounted () {
    this.GetListOrdenes();
  },
  watch:{
    'listOrdenes': function (){
      //Vuelve a consultar la lista de ordenes
      this.GetListOrdenes();
    }
  },
  methods:{
    async GetListOrdenes() {
      let idUsuario = this.user.id
      //let idUsuario = "6184a00bef62b9593104063b";
      await axios
        .get(`/Ordenes/allOrdenes?idUsuario=${idUsuario}`)
        .then((res) => {
          
          res.data.forEach((x) =>{
            //x.medico = x.datos_medico.nombre + " " + x.datos_medico.apellido;
            x.fecha_orden = x.fecha_orden.split("T")[0].split("-")[2] + "-" + x.fecha_orden.split("T")[0].split("-")[1]+ "-" + x.fecha_orden.split("T")[0].split("-")[0];
            //x.especialidad = x.datos_medico.especialidad
          });
          this.listExamElem = res.data;
          console.log("listExamAux: " + res.data);
        })
        .catch((err) => console.log(err));
    },
  },
  computed:{
    ...mapGetters(["user"]),
  }
}
</script>

<style>
.viewDiv{
  height: 100%;
  width: 100%;
}
.contaninerDiv-resultados{
  margin: 5% 1% 2% 5%;
  height: 80%;
}
.titulo-resultados{
  padding-top: 50px !important;
  padding-left: 50px !important;
  color: #4172F2;
  font-weight: bold;
  font-size: 2rem !important;
}
.seccion-resaltada-resultados{
  font-size: 1rem;
  color: #4172F2;
  font-weight:800;
}
.btn-secciones-resultados{
  margin-top: 20px !important;
}
.content-view-resultados{
  padding: 0% 2%;
}
.content-resultados{
  padding: 1%;
  margin-top: 20px !important;
  /*background-color: #4172F2 !important;*/
  min-height: 500px;
}
.btn-seccion-res-1 .btn-seccion-res-2{
  background-color: white !important;
}
</style>
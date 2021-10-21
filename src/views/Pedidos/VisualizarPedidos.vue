<template>
  <div class="viewDiv">
    <div class="contaninerDiv-resultados">
      <v-card>
        <v-card-title class="titulo-resultados">Pedidos de Compra</v-card-title>
        <div class="content-view-resultados">
          <v-card-actions class="btn-secciones-resultados">
            <v-btn
              text
              @click="seccion=1"
            >
              <span v-if="seccion==1" class="seccion-resaltada-resultados">Todos</span>
              <span v-else>Todos</span>
            </v-btn>
            <v-btn 
              text
              @click="seccion=2"
            >
              <span v-if="seccion==2" class="seccion-resaltada-resultados">Medicamentos</span>
              <span v-else>Medicamentos</span>
            </v-btn>
            <v-btn 
              text
              @click="seccion=3"
            >
              <span v-if="seccion==3" class="seccion-resaltada-resultados">Exámenes auxiliares</span>
              <span v-else>Exámenes auxiliares</span>
            </v-btn>
            <v-btn
              text
              @click="seccion=4"
            >
              <span v-if="seccion==4" class="seccion-resaltada-resultados">Otros servicios</span>
              <span v-else>Otros servicios</span>
            </v-btn>
          </v-card-actions>
          <v-card class="content-resultados" elevation="0"> 
            <v-window v-model="seccion">
              <v-window-item :value="1">
                <v-card height="500" elevation="0" class="mt-0 mb-0">
                  <TablaPedidos
                    :ListaPedidos="listaPedidos"
                  ></TablaPedidos>
                </v-card>
              </v-window-item>
            </v-window>
          </v-card>
        </div>
      </v-card>
    </div>
  </div>
</template>


<script>
import axios from "axios";
import TablaPedidos from "@/components/Pedidos/TablaPedidos"
import { mapGetters } from "vuex";
export default {
  components:{
    TablaPedidos
  },
  data(){
    return{
      seccion: 1,
      listaPedidos:[],
      idPaciente:"",
    }
  },
  async created () {
    await this.obtenerPaciente();
    await this.obtenerPedidos();
  },
  methods:{
    async obtenerPaciente() {
      await axios
        .get("/Paciente/usuario?idusuario=" + this.user.id)
        .then((x) => {
          this.idPaciente = x.data.id;
        })
        .catch((err) => console.log(err));
    },
    async obtenerPedidos() {
      await axios
        .get("/Pedidos/byidpaciente?id_paciente="+this.idPaciente)
        .then((x) => {
          for (var i in x.data) {
            x.data[i].estado_pago = this.capitalizarPrimeraLetra(x.data[i].estado_pago);
            x.data[i].fecha_creacion = new Date (x.data[i].fecha_creacion).toLocaleDateString('ja-JP', { year: 'numeric', month: '2-digit', day: '2-digit'}).replace(/\//gi,'-');
          }
          this.listaPedidos = x.data;
        })
        .catch((err) => console.log(err));
    },
    capitalizarPrimeraLetra(str) {
      return str.charAt(0).toUpperCase() + str.slice(1);
    },
  },
  computed: {
    ...mapGetters(["user"]),
  },
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
  margin-top: 0px !important;
  /*background-color: #4172F2 !important;*/
  min-height: 500px;
}
.btn-seccion-res-1 .btn-seccion-res-2{
  background-color: white !important;
}
</style>
<template>
  <v-card >
    <template>
      <div class>
        <v-card-title class="titulo">Servicios Adicionales</v-card-title>
      </div>
      <v-toolbar flat>
        <v-col cols="12" sm="6" md="4">
          <v-toolbar flat>
            <div>
              <button>
                <img src="https://i.ibb.co/8r082Dt/Carrito.png" alt="" />
              </button>
            </div>
          </v-toolbar>
        </v-col>

        <v-spacer></v-spacer>
      </v-toolbar>

      <v-card-text class="card-text">
        <v-card elevation="0" outlined shaped>
          <v-card-title class="subtitulo">Examenes</v-card-title>
          <v-data-table
            :headers="headers1"
             :items="listaExamenes"
           
            class="elevation-1"
          >
            <template v-slot:top>
              <v-toolbar flat>
                <v-spacer></v-spacer>
                <v-text-field
                item-text="des1"
              item-value="des1"
                  v-model="des1"
                  append-icon="mdi-magnify"
                  label="Descripcion"
                  single-line
                  hide-details
                   @input="obtenerExamenes(des1)"
                ></v-text-field>
              </v-toolbar>
            </template>

            <!--Aqui va todo los botones -->
            <template v-slot:[`item.actions`]="{ item }">
              <v-row align="center" justify="space-around">
                <div class="in-flex">
                  <v-btn
                    x-small
                    color="info"
                    dark
                    @click="abrirDialogoDetalleExamenes(item.id)"
                  >
                    <v-icon left> info </v-icon>
                  </v-btn>
                </div>
                <div class="in-flex">
                  <v-btn
                    x-small
                    color="success"
                    dark
                    @click="agregarExamenaPedidos(item.id)"
                  >
                    <v-icon left> mdi-file-eye </v-icon>
                  </v-btn>
                </div>
              </v-row>
            </template>
          </v-data-table>
        </v-card>
      </v-card-text>

      <v-card-text class="card-text">
        <v-card elevation="0" outlined shaped>
          <v-card-title class="subtitulo">Medicamentos</v-card-title>
          <v-data-table
             :headers="headers2"
        :items="listaGMedicamentos"
 
        class="elevation-1"
          >
            <template v-slot:top>
              <v-toolbar flat>
                <v-spacer></v-spacer>
                <v-text-field
                   item-text="des2"
              item-value="des2"
                  v-model="des2"
                  append-icon="mdi-magnify"
                  label="Descripcion"
                  single-line
                  hide-details
                   @input="obtenerMedicamento(des2)"
                ></v-text-field>
                <v-spacer></v-spacer>
              </v-toolbar>
            </template>

            <!--Aqui va todo los botones -->
            <template v-slot:[`item.actions`]="{ item }">
              <v-row align="center" justify="space-around">
                <div class="in-flex">
                  <v-btn
                    x-small
                    color="info"
                    dark
                    @click="abrirDialogoDetalleMedicamentos(item.id)"
                  >
                    <v-icon left> info </v-icon>
                  </v-btn>
                </div>
                <div class="in-flex">
                  <v-btn
                    x-small
                    color="success"
                    dark
                    @click="agregarMedicamentoaPedidos(item.id)"
                  >
                    <v-icon left> mdi-file-eye </v-icon>
                  </v-btn>
                </div>
              </v-row>
            </template>
          </v-data-table>

          <v-dialog persistent v-model="dialogodetalleExamen" max-width="880px">
          <VisualizarExamenes
            v-if="dialogodetalleExamen"
            :examen="examen"                              
            @close-dialog-detalle="closeDialogDetalle()"
          >
          </VisualizarExamenes>
    </v-dialog>

    <v-dialog persistent v-model="dialogodetalleMedicina" max-width="880px">
          <VisualizarMedicamentos
            v-if="dialogodetalleMedicina"
            :Medicinas="Medicinas"                              
            @close-dialog-detalle="closeDialogDetalle()"
          >
          </VisualizarMedicamentos>
    </v-dialog>
        </v-card>
      </v-card-text>
    </template>
  </v-card>
</template>

<script>
import VisualizarExamenes from "@/components/GestionarPedidos/VisualizarExamenes.vue";
import VisualizarMedicamentos from "@/components/GestionarPedidos/VisualizarMedicamentos.vue";
import axios from "axios";
import { mapState, mapGetters, mapMutations } from "vuex";
export default {
  name: "ComprarServicios",
  components: {
    VisualizarExamenes,
    VisualizarMedicamentos,
  },
  data() {
    return {
      des1:"",
      des2:"",       
      examen: {
        descripcion: "",
        precio: 0,
        id_especialidad: "",
        duracion: "",
        recomendaciones_previas: "",
        recomendaciones_posteriores: "",
      },
     headers1: [
        {
          text: "Descripción",
          align: "start",
          sortable: false,
          value: "descripcion",
        },
        { text: "Precio", value: "precio" },
        { text: "Duracion", value: "duracion" },

        { text: "", value: "actions", sortable: false },
      ],
        headers2: [

         {text:"Descripcion", align: "start", sortable: false, value:"descripcion"},
        { text: "Generico", value: "generico" },
        { text: "Precio", value: "precio" },
        
         { text: "", value: "actions", sortable: false },
      ],

      Medicinas: {
        descripcion: "",
        generico: "",
        precio: "",        
      },
      Pedido:{



      },
      dialogodetalleExamen: false,
      dialogodetalleMedicina: false,
    };
  },
  async created() {
    this.obtenerExamenes();
    this.obtenerMedicamento();
  },
  methods: {
     //cerrar dialogo 
 closeDialogDetalle() {
      this.dialogodetalleExamen= false;
      this.dialogodetalleMedicina= false;
    },    
    async abrirDialogoDetalleExamenes(id) {
      console.log(this.id);
      console.log("muestra la listaE");
      this.examen = await this.loadExamenByID(id);
      this.dialogodetalleExamen = !this.dialogodetalleExamen;
    },
    async abrirDialogoDetalleMedicamentos(id) {
      console.log(this.id);
      console.log("muestra la lista")
      this.Medicinas = await this.loadMedicamento(id);
      this.dialogodetalleMedicina= !this.dialogodetalleMedicina;
    },
    async agregarExamenaPedidos(){
      if(count==null||count==0){await axios 
      .post("/Pedidos")
      }else {
        await axios
        .put("")







      }
      

    },

    async obtenerExamenes(des1) {
      if (this.des1 == "" || this.des1 == null) {
        await axios
          .get("/Examenes/100Examnes")
          .then((x) => {
            let listaE = [];
            this.listaE = x.data;
            this.setListaExamenes(this.listaE);
            console.log(this.listaE);
          })
          .catch((err) => console.log(err));
      } else {
        await axios
          .get("/Examenes/nombre?nombre=" + this.des1.toUpperCase())
          .then((x) => {
            console.log(this.des1);
            let listaE = [];
            this.listaE = x.data;
            this.setListaExamenes(this.listaE);
            console.log(this.listaE);
          })
          .catch((err) => console.log(err));
      }
    },
    async obtenerMedicamento() {
     if (this.des2 == "" || this.des2 == null) {
        await axios
          .get("/Medicinas/100Medicinas")
          .then((x) => {
            let lista = [];
            this.lista = x.data;            
            this.setListaMedicamento(this.lista);
             console.log(this.lista);
          })
          .catch((err) => console.log(err));
      } else {
        await axios
          .get("/Medicinas/filter?descripcion=" + this.des2.toUpperCase())
          .then((x) => {
            console.log(this.des2);
            let lista = [];
            this.lista = x.data;
            this.setListaMedicamento(this.lista);
            console.log(this.lista);
          })
          .catch((err) => console.log(err));}},
    async loadMedicamento(id) {
      var med = {};
      await axios
        .get("/Medicinas/Id?id=" + id)
        .then((res) => {
          console.log(res);
          med = res.data;
          console.log(med)
        })
        .catch((err) => console.log(err));
      console.log(med);     
      return med;
    }, 
     async loadExamenByID(id) {
      var examen = {};
      await axios
        .get("/Examenes/Id?id=" + id)
        .then((res) => {
          console.log(res);
          examen = res.data;
          console.log(examen);
        })
        .catch((err) => console.log(err));
      console.log(examen);
      return examen;
    },
    
 ...mapMutations(["setListaExamenes","setListaMedicamento"]),
   
  },
  computed: {
     ...mapState(["listaExamenes","listaGMedicamentos"]),
    ...mapGetters(["user"]),
  },
};
</script>
<style lang="scss" scoped>
.card-text {
  margin-top: -50px;
}
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
.titulo {
  padding-top: 30px;
  color: $blue;
  font-weight: bold;
  font-size: 2rem;
}
.subtitulo {
  font-size: 1.5rem;
  color: $blue;
  font-weight: bold;
}
.v-data-table th {
  font-size: 50px;
}
</style>

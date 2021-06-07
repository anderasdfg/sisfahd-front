<template>
  <v-card>
    <h1 class="title-card">Detalles Especialidad</h1>
    <div class="estilo-stepper">
    <v-stepper v-model="step">
      <v-stepper-header>
          <v-stepper-step step="1" :complete="step>1">
            Datos de la especialidad
          </v-stepper-step>
          <v-divider></v-divider>
          
      </v-stepper-header>
    <v-stepper-items>
    <v-stepper-content step="1">
    <v-card-text>
      <v-text-field
        label="nombre"
        class="campos"
        v-model="especialidad.nombre" 
        readonly
      ></v-text-field>
      <v-text-field
        label="codigo"
        class="campos"
        v-model="especialidad.codigo" 
        readonly
      ></v-text-field>
      <v-row class="filas">
        <v-text-field
        label="descripcion"
        class="campos"
        v-model="especialidad.descripcion" 
        readonly
      ></v-text-field>
      
      </v-row>
     
      
      <v-row class="filas">
       
        <v-col align="right">
          <button class="btn-volver" block @click="cerrarDialogo()">Volver</button>
        </v-col>
      </v-row>
    </v-card-text>
      </v-stepper-content>
    
      </v-stepper-items>
    </v-stepper>
    </div>
  
  </v-card>
</template>

<script>
import axios from "axios";
import {
  required,
} from "vuelidate/lib/validators";
export default {
  name: "VisualizarEspecialidad",
  props: ["Especialidad"],
  data() {
    return {
      listaEspecialidad:[],
      search:"",
      headers: [
        { text: "Nombre", value: "nombre", sortable: false },
        { text: "Codigo", value: "codigo", sortable: false},
        { text: "Descripcion", value: "descripcion", sortable: false },
        
      ],
      step: 1,
      dialog: false,
          
      modal: false,
      
      especialidad : {
        nombre: "",
        codigo: "",
        descripcion: "",
      },
     
      listaEspecialidad:[],       
    };
  },
  async created(){
  
    this.obtenerEspecialidad();
    
  },
  
  watch: {
    dialog(val) {
      val || this.close();
    },
  },
  methods: {
    cerrarDialogo() {
      
      this.$emit("emit-close-dialog");
    },
    close() {
      this.dialog = false;
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      });
    },
    async obtenerEspecialidad() {
      await axios
          .get("/Especialidad/nombre/"+this.especialidad.nombre)
          .then((x) => {
            this.especialidad = x.data;
            console.log(this.especialidad);
          })
          .catch((err) => console.log(err));
    },
    
        
   
  },
    /*async mensaje(icono, titulo, texto, footer) {
      await this.$swal({
        icon: icono,
        title: titulo,
        text: texto,
        footer: footer,
      });
    },*/
}
</script>

<style lang="scss" scoped>
.title-card {
  font-size: 25px;
  color: $blue;
  padding-top: 7%;
  text-align: center;
}
.estilo-stepper{
  padding-top: 2%;
}
.v-dialog .v-card .v-card__title {
  font-size: 25px;
  font-weight: bold;
}
.campos {
  margin: 2% 10% 5% 10%;  
}
.filas{
  margin: 2% 8% 5% 8%;
}
.btn-volver{
  margin-top: 4%;
  margin-bottom: 1%;
  margin-left: 5%;
  margin-right: 6%;
  background: $blue;
  color: white;
  border-radius: 10px;
  width: 90%;
  height: 5vh;
  font-weight: bold;
  font-size: 20px;
}
.btn-registrar {  
  background: $blue;
  color: white;
  border-radius: 10px;
  width: 90%;
  height: 5vh;
  font-weight: bold;
  font-size: 20px;
}
</style>
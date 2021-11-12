<template>
  <div>
    <v-card class="card" style="margin:80px auto 0;width:80%;">
      <v-card-title> Gestionar Medicamentos </v-card-title>
      <v-data-table
        :headers="headers"
        :items="listaGMedicamentos"
        :search="search"
        class="elevation-1"
      >
        <template v-slot:top>
          <v-toolbar flat>
            <v-spacer></v-spacer>
            <v-text-field
              v-model="search"
              append-icon="mdi-magnify"
              label="Search"
              single-line
              hide-details
            ></v-text-field>
            <v-col cols="12" sm="6" md="4">
              
           <v-toolbar
          flat>
          <v-btn 
            class="mr-4"
            color="white darken-1"
            @click="abrirDialogo">
          
             <span>Registrar nuevo Medicamento</span>
          </v-btn>
           </v-toolbar>

            </v-col>
            
            <v-spacer></v-spacer>            
          </v-toolbar>
        </template>
 <!--Aqui va todo los botones -->
        <template v-slot:[`item.actions`]="{ item }">
          <v-row align="center" justify="space-around">
                               

            <v-btn color="success" dark @click="abrirModificarDetalle(item.id)">
              <v-icon left>  mdi-file-eye </v-icon>
              <span>Modificar</span>
            </v-btn>

              <v-btn v-if="estadoActual(item.id)" color="info" dark @click="abrirDialogoDetalle(item.id)">
                <v-icon left> info </v-icon>
                <span>Ver detalles</span>
              </v-btn>

          </v-row>
        </template>
      </v-data-table> 
<!--Aqui llamo a los componentes de vuetify-->
    <v-dialog persistent v-model="dialogoRegistrar" max-width="880px">
          <RegistrarMedicamento
            v-if="dialogoRegistrar"   
            :Medicinas="Medicinas"              
            @close-dialog-Registrar="closeDialogRegistrar()"
             @emit-obtener-1medicamentos="obtenerMedicamento()"
          >
          </RegistrarMedicamento>
    </v-dialog>

    <v-dialog persistent v-model="dialogoactualizacion" max-width="880px">
          <ModificarMedicamento
            v-if="dialogoactualizacion" 
            :Medicinas="Medicinas"                
            @close-dialog-Modificar="closeDialogModificar()" 
            @emit-obtener-2medicamentos="obtenerMedicamento()"
          >
          </ModificarMedicamento>
    </v-dialog>

     <v-dialog persistent v-model="dialogodetalle" max-width="880px">
          <VisualizarMedicamento
            v-if="dialogodetalle"
            :Medicinas="Medicinas"                              
            @close-dialog-detalle="closeDialogDetalle()"
          >
          </VisualizarMedicamento>
    </v-dialog>
    </v-card>
  </div>
</template>
<script>

import RegistrarMedicamento from "@/components/GestionarMedicamentos/RegistrarMedicamento.vue";
import ModificarMedicamento from "@/components/GestionarMedicamentos/ModificarMedicamento.vue";
import VisualizarMedicamento from "@/components/GestionarMedicamentos/VisualizarMedicamento.vue"
import axios from "axios";
import { mapMutations, mapState } from "vuex";


export default {
  name: "GestionarMedicamentos",
  components: {
   RegistrarMedicamento,
   ModificarMedicamento,
   VisualizarMedicamento
   
  },
  data() {
    return {
      search: "",
      Medicinas:{},
     headers: [

         {text:"Descripcion", align: "start", sortable: false, value:"descripcion"},
        { text: "Generico", value: "generico" },
        { text: "Precio", value: "precio" },
        
         { text: "", value: "actions", sortable: false },
      ],
      dialogoRegistrar: false,
      dialogoactualizacion: false,
      dialogodetalle: false,
     
             
    };

    
  },
  async created() {
    this.obtenerMedicamento();
  
  },
  methods:{
     ...mapMutations(["setListaMedicamento"]),
     //cerrar dialogo 
       closeDialogRegistrar() {
      this.dialogoRegistrar = false;
    },
     closeDialogDetalle() {
      this.dialogodetalle= false;
    },
     closeDialogModificar() {
      this.dialogoactualizacion = false;
    },
      estadoActual(array){
      if(array === 'lista'){
        return false
      }else{
        return true
      }
    },
     async abrirDialogo(id) {
      this.dialogoRegistrar= !this.dialogoRegistrar;
    },
    async abrirDialogoDetalle(id) {
      console.log(this.id);
      console.log("muestra la lista")
      this.dialogodetalle= !this.dialogodetalle;
    },
    async abrirModificarDetalle(id) {
      this.dialogoactualizacion= !this.dialogoactualizacion;
    },
 //obtener todos los medcamentos
    async obtenerMedicamento() {
      await axios
        .get("/Medicinas/all")
        .then((x) => {
          let lista=[];
          this.lista = x.data;
          console.log(this.lista);
          console.log(this.lista)
           this.setListaMedicamento(this.lista);
        })
        .catch((err) => console.log(err));
    },
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
   
  },
 
  computed: {
    ...mapState(["listaGMedicamentos"]),
  
  }
};
</script>
<style scoped>
.card {
  margin: 20px;
}
</style>
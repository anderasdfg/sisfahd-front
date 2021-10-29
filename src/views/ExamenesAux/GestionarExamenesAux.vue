<template>
  <div>
    <v-card class="card" style="margin:80px auto 0;width:80%;">
      <v-card-title> Gestionar Exámenes Auxiliares </v-card-title>
      <v-data-table
        :headers="headers"
        :items="listaExamenes"
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
          
             <span>Registrar nuevo examen auxiliar</span>
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

              <v-btn v-if="estadoActual(item.id)" color="error" dark @click="abrirDialogoDetalle(item.id)">
                <v-icon left> info </v-icon>
                <span>Eliminar</span>
              </v-btn>

          </v-row>
        </template>
      </v-data-table> 
<!--Aqui llamo a los componentes de vuetify-->
    <v-dialog persistent v-model="dialogoRegistrar" max-width="880px">
          <RegistrarExamenesAux
            v-if="dialogoRegistrar"   
            :Especialidad="Especialidad"              
            @close-dialog-Registrar="closeDialogRegistrar()"
            @emit-obtener-especialidades="obtenerExamenes()"
          >
          </RegistrarExamenesAux>
    </v-dialog>

    <v-dialog persistent v-model="dialogoactualizacion" max-width="880px">
          <ModificarExamenesAux
            v-if="dialogoactualizacion"   
            :examen="examen"              
            @close-dialog-Modificar="closeDialogModificar()" 
            @emit-obtener-especialidades="obtenerExamenes()"
          >
          </ModificarExamenesAux>
    </v-dialog>

     <v-dialog persistent v-model="dialogodetalle" max-width="880px">
          <EliminarExamenesAux
            v-if="dialogodetalle" 
            :Especialidad2="Especialidad2"        
                       
            @close-dialog-detalle="closeDialogDetalle()"
            @emit-obtener-especialidades="obtenerExamenes()"
          >
          </EliminarExamenesAux>
    </v-dialog>
    </v-card>
  </div>
</template>
<script>

import RegistrarExamenesAux from "@/components/GestionarExamenesAux/RegistrarExamenesAux.vue";
import ModificarExamenesAux from "@/components/GestionarExamenesAux/ModificarExamenesAux.vue";
import EliminarExamenesAux from "@/components/GestionarExamenesAux/EliminarExamenesAux.vue";

import axios from "axios";
import { mapMutations, mapState } from "vuex";


export default {
  name: "GestionarExamenesAux",
  components: {
    RegistrarExamenesAux,
   ModificarExamenesAux,
   EliminarExamenesAux
   
  },
  data() {
    return {
      search: "",
      Especialidad:{},
      Especialidad3:{},
       Especialidad2:{},

       examen:{
         descripcion:"",
         precio:0

       },
     

     headers: [

         {text:"Descripción", align: "start", sortable: false, value:"descripcion"},
        { text: "Precio", value: "precio" },
        
         { text: "", value: "actions", sortable: false },
      ],
      dialogoRegistrar: false,
      dialogoactualizacion: false,
      dialogodetalle: false,
     
             
    };

    
  },
  async created() {
    this.obtenerExamenes();
  
  },
  methods:{
     ...mapMutations(["setListaExamenes"]),
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
      if(array === 'listo'){
        return false
      }else{
        return true
      }
    },
     async abrirDialogo(id) {
      /*this.Especialidad = await this.loadUsuarioEspecialidad(id);*/
      this.dialogoRegistrar= !this.dialogoRegistrar;
    },
    async abrirDialogoDetalle(id) {
      console.log(this.id);
      console.log("muestra la listaE")
      this.examen = await this.loadExamenByID(id);
      this.dialogodetalle= !this.dialogodetalle;
    },
    async abrirModificarDetalle(id) {
      this.examen = await this.loadExamenByID(id);
      this.dialogoactualizacion= !this.dialogoactualizacion;
    },
    

 //obtener todos los pagos del usuario
    async obtenerExamenes() {
      await axios
        .get("/Examenes/all")
        .then((x) => {
          let listaE=[];
          this.listaE = x.data;
          console.log(this.listaE);
          console.log(this.prueba)
           this.setListaExamenes(this.listaE);
        })
        .catch((err) => console.log(err));
    },
    async loadExamenByID(id) {
      var examen = {};
      await axios
        .get("/Examenes/Id?id=" + id)
        .then((res) => {
          console.log(res);
          examen = res.data;
          console.log(examen)
        })
        .catch((err) => console.log(err));
      console.log(examen);     
      return examen;
    },    
   
  },
 
  computed: {
    ...mapState(["listaExamenes"]),
  
  }
};
</script>
<style scoped>
.card {
  margin: 20px;
}
</style>
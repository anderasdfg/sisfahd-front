<template>
  <div>
    <v-card class="card" style="margin:80px auto 0;width:80%;">
      <v-card-title> Gestionar Enfermedades </v-card-title>
      <v-data-table
        :headers="headers"
        :items="listaEnfermedades"
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
          
             <span>Registrar nueva enfermedad</span>
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
          <RegistrarEnfermedades
            v-if="dialogoRegistrar"   
            :RegistroEnfermedad="RegistroEnfermedad"              
            @close-dialog-Registrar="closeDialogRegistrar()"
            @emit-obtener-enfermedades="obtenerEnfermedades()"
          >
          </RegistrarEnfermedades>
    </v-dialog>

    <v-dialog persistent v-model="dialogoactualizacion" max-width="880px">
          <ModificarEnfermedades
            v-if="dialogoactualizacion"   
            :ModificoEnfermedad="ModificoEnfermedad"              
            @close-dialog-Modificar="closeDialogModificar()" 
            @emit-obtener-enfermedades="obtenerEnfermedades()"
          >
          </ModificarEnfermedades>
    </v-dialog>

     <v-dialog persistent v-model="dialogodetalle" max-width="880px">
          <EliminarEnfermedades
            v-if="dialogodetalle" 
            :EliminoEnfermedad="EliminoEnfermedad"        
                       
            @close-dialog-detalle="closeDialogDetalle()"
            @emit-obtener-enfermedades="obtenerEnfermedades()"
          >
          </EliminarEnfermedades>
    </v-dialog>
    </v-card>
  </div>
</template>
<script>

import RegistrarEnfermedades from "@/components/ComponenteGestionarEnfermedades/RegistrarEnfermedades.vue";
import ModificarEnfermedades from "@/components/ComponenteGestionarEnfermedades/ModificarEnfermedades.vue";
import EliminarEnfermedades from "@/components/ComponenteGestionarEnfermedades/EliminarEnfermedades.vue";

import axios from "axios";
import { mapMutations, mapState } from "vuex";


export default {
  name: "GestionarEnfermedades",
  components: {
    RegistrarEnfermedades,
   ModificarEnfermedades,
   EliminarEnfermedades
   
  },
  data() {
    return {
      search: "",
      RegistroEnfermedad:{},
      ModificoEnfermedad:{},
       EliminoEnfermedad:{},

       enfermedad:{
         codigo_cie:"",
         descripcion:""
       },
     

     headers: [

         {text:"Codigo_CIE", align: "start", sortable: false, value:"codigo_cie"},
        { text: "Descripcion", value: "descripcion" },
        
         { text: "", value: "actions", sortable: false },
      ],
      dialogoRegistrar: false,
      dialogoactualizacion: false,
      dialogodetalle: false,
     
             
    };

    
  },
  async created() {
    this.obtenerEnfermedades();
  
  },
  methods:{
     ...mapMutations(["setListaEnfermedades"]),
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
      
      this.dialogoRegistrar= !this.dialogoRegistrar;
    },
    async abrirDialogoDetalle(id) {
      console.log(this.id);
      console.log("muestra la listaE")
      //this.examen = await this.loadExamenByID(id);
      this.dialogodetalle= !this.dialogodetalle;
    },
    async abrirModificarDetalle(id) {
      //this.examen = await this.loadExamenByID(id);
      this.dialogoactualizacion= !this.dialogoactualizacion;
    },
    

 //obtener todas las enfermedades
    async obtenerEnfermedades() {
      await axios
        .get("/Enfermedades/all")
        .then((x) => {
          let listaE=[];
          this.listaE = x.data;
          console.log(this.listaE);
          console.log(this.prueba)
           this.setListaEnfermedades(this.listaE);
        })
        .catch((err) => console.log(err));
    },
    
    /*async loadExamenByID(id) {
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
    },   */ 
   
  },
 
  computed: {
    ...mapState(["listaEnfermedades"]),
  
  }
};
</script>
<style scoped>
.card {
  margin: 20px;
}
</style>
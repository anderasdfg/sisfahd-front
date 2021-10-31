<template>
  <div>
    <v-card class="card" style="margin:80px auto 0;width:80%;">
      <v-card-title> Gestionar Especialidades </v-card-title>
      <v-data-table
        :headers="headers"
        :items="listaEspecialidad"
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
          
             <span>Registrar nueva especialidad</span>
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
          <RegistrarEspecialidad
            v-if="dialogoRegistrar"   
            :Especialidad="Especialidad"              
            @close-dialog-Registrar="closeDialogRegistrar()"
             @emit-obtener-especialidades="obtenerEspecialidad()"
          >
          </RegistrarEspecialidad>
    </v-dialog>

    <v-dialog persistent v-model="dialogoactualizacion" max-width="880px">
          <ModificarEspecialidad
            v-if="dialogoactualizacion"   
            :Especialidad3="Especialidad3"              
            @close-dialog-Modificar="closeDialogModificar()" 
            @emit-obtener-especialidades="obtenerEspecialidad()"
          >
          </ModificarEspecialidad>
    </v-dialog>

     <v-dialog persistent v-model="dialogodetalle" max-width="880px">
          <VisualizarEspecialidad
            v-if="dialogodetalle" 
            :Especialidad2="Especialidad2"        
                       
            @close-dialog-detalle="closeDialogDetalle()"
          >
          </VisualizarEspecialidad>
    </v-dialog>
    </v-card>
  </div>
</template>
<script>

import RegistrarEspecialidad from "@/components/GestionarEspecialidad/RegistrarEspecialidad.vue";
import ModificarEspecialidad from "@/components/GestionarEspecialidad/ModificarEspecialidad.vue";
import VisualizarEspecialidad from "@/components/GestionarEspecialidad/VisualizarEspecialidad.vue"
import axios from "axios";
import { mapMutations, mapState } from "vuex";


export default {
  name: "GestionarEspecialidades",
  components: {
    RegistrarEspecialidad,
   ModificarEspecialidad,
   VisualizarEspecialidad
   
  },
  data() {
    return {
      search: "",
      Especialidad:{},
      Especialidad3:{},
       Especialidad2:{},
     

     headers: [

         {text:"Nombre", align: "start", sortable: false, value:"nombre"},
        { text: "Código", value: "codigo" },
        { text: "Estado", value: "estado" },
        { text: "Descripción", value: "descripcion" },
        
        
         { text: "", value: "actions", sortable: false },
      ],
      dialogoRegistrar: false,
      dialogoactualizacion: false,
      dialogodetalle: false,
     
             
    };

    
  },
  async created() {
    this.obtenerEspecialidad();
  
  },
  methods:{
     ...mapMutations(["setListaEspecialidad"]),
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
      this.Especialidad2 = await this.loadUsuarioEspecialidad(id);
      this.dialogodetalle= !this.dialogodetalle;
    },
    async abrirModificarDetalle(id) {
      this.Especialidad3 = await this.loadUsuarioEspecialidad(id);
      this.dialogoactualizacion= !this.dialogoactualizacion;
    },
 //obtener todos los pagos del usuario
    async obtenerEspecialidad() {
      await axios
        .get("/Especialidad/all")
        .then((x) => {
          let listaE=[];
          this.listaE = x.data;
          console.log(this.listaE);
          console.log(this.prueba)
           this.setListaEspecialidad(this.listaE);
        })
        .catch((err) => console.log(err));
    },
    async loadUsuarioEspecialidad(id) {
      var user = {};
      await axios
        .get("/Especialidad/Id?id=" + id)
        .then((res) => {
          console.log(res);
          user = res.data;
          console.log(user)
        })
        .catch((err) => console.log(err));
      console.log(user);     
      return user;
    },    
   
  },
 
  computed: {
    ...mapState(["listaEspecialidad"]),
  
  }
};
</script>
<style scoped>
.card {
  margin: 20px;
}
</style>
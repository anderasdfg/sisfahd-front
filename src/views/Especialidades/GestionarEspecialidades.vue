<template>
  <div>
    <v-card class="card" style="margin:80px auto 0;width:80%;">
      <v-card-title> Gestionar Especialidades </v-card-title>
      <v-data-table
        :headers="headers"
        :items="id"
        :search="search"
        class="elevation-1"
      >
        <template v-slot:top>
          <v-toolbar flat>
           
            <v-divider class="mx-4" inset vertical></v-divider>
            <v-spacer></v-spacer>
            <v-text-field
              v-model="search"
              append-icon="mdi-magnify"
              label="Search"
              single-line
              hide-details
            ></v-text-field>
            <v-col cols="12" sm="6" md="4">
              
              <v-dialog ref="dialog" v-model="modal" persistent width="290px">
                            

              </v-dialog>

              <v-toolbar
          flat>
          <v-btn
            outlined
            class="mr-4"
            color="grey darken-2"
            @click="setToday">
            Registrar nueva especialidad
          </v-btn>
          
                </v-toolbar>


            </v-col>

            
            <v-spacer></v-spacer>
            
          </v-toolbar>
        </template>
 <!--Aqui va todo los botones -->
        <template v-slot:[`item.actions`]="{ item }">
          <v-row align="center" justify="space-around">
           


           
            <v-btn color="success" dark @click="abrirDialogo(item.id)">
              <v-icon left>  mdi-cash-usd </v-icon>
              <span>Registrar nueva especilidad</span>
            </v-btn>

            <v-btn color="success" dark @click="abrirDialogo(item.id)">
              <v-icon left>  mdi-cash-usd </v-icon>
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
            @close-dialog-Especialidad="closeDialogEspecialidad()"
          >
          </RegistrarEspecialidad>
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
import ModificarEspecialidad from "@/components/GestionarEspecialidad/RegistrarEspecialidad.vue";
import VisualizarEspecialidad from "@/components/GestionarEspecialidad/RegistrarEspecialidad.vue"
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
      Especialidad2:{},
     

     headers: [

         {text:"Nombre", align: "start", sortable: false, value:"nombre"},
        { text: "Codigo", value: "codigo" },
        { text: "Descripcion", value: "descripcion" },
        
        { text: "Actions", value: "actions", sortable: false },
      ],
      dialogoEspecialidad: false,
      dialogoactualizacion: false,
      dialogodetalle: false,
     
             
    };

    
  },
  async created() {
    this.obtenerEspecialidad();
  
  },
  methods:{
     ...mapMutations(["setListaEspecialidad"]),
     //cerrar dialogo Pago
       closeDialogEspecialidad() {
      this.dialogoEspecialidad = false;
    },
     closeDialogDetalle() {
      this.dialogodetalle= false;
    },
      estadoActual(array){
      if(array === 'listo'){
        return false
      }else{
        return true
      }
    },
     async abrirDialogo(id) {
      this.Especialidad = await this.loadUsuarioEspecialidad(id);
      this.dialogoEspecialidad= !this.dialogoEspecialidad;
    },
    async abrirDialogoDetalle(id) {
      this.Especialidad2 = await this.loadUsuarioEspecialidad(id);
      this.dialogodetalle= !this.dialogodetalle;
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
    async loadUsuarioPago(id) {
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
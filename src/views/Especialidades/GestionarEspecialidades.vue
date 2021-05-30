<template>
  <div>
    <v-card class="card" style="margin:80px auto 0;width:80%;">
      <v-card-title> Gestionar Especialidades </v-card-title>
      <v-data-table
        :headers="headers"
        :items="listaPagos"
        :search="search"
        class="elevation-1"
      >
        <template v-slot:top>
          <v-toolbar flat>
            <v-toolbar-title
              ></v-toolbar-title
            >
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
            </v-col>
            <v-spacer></v-spacer>
            
          </v-toolbar>
        </template>
 <!--Aqui va todo los botones -->
        <template v-slot:[`item.actions`]="{ item }">
          <v-row align="center" justify="space-around">
           
            <v-btn color="success" dark @click="abrirDialogoPagar(item.id)">
              <v-icon left>  mdi-cash-usd </v-icon>
              <span>Registrar nueva especilidad</span>
            </v-btn>

            <v-btn color="success" dark @click="abrirDialogoPagar(item.id)">
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
    <v-dialog persistent v-model="dialogoPago" max-width="880px">
          <RegistrarEspecialidad
            v-if="dialogoPago"   
            :pago="pago"              
            @close-dialog-Pago="closeDialogPago()"
          >
          </RegistrarEspecialidad>
    </v-dialog>

     <v-dialog persistent v-model="dialogodetalle" max-width="880px">
          <VisualizarEspecialidad
            v-if="dialogodetalle" 
            :cita="cita"                 
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
  name: "GestionarMiCita",
  components: {
    RegistrarEspecialidad,
   ModificarEspecialidad,
   VisualizarEspecialidad
   
  },
  data() {
    return {
      search: "",
      pago:{},
      cita:{},
     

     headers: [

        { text: "Codigo", align: "start", sortable: false, value: "datos_paciente.datos.nombre_apellido_paciente" },
        { text: "Nombre", value: "datos_turno.datos_medico.nombre_apellido_medico" },
        { text: "Descripcion", value: "datos_turno.especialidad.nombre" },
        
        { text: "Actions", value: "actions", sortable: false },
      ],
      dialogoPago: false,
      dialogoactualizacion: false,
      dialogodetalle: false,
     
      fromDate: null,
      toDate: null,
      dates: [],
      modal: false,
       
    };

    
  },
  async created() {
    this.obtenerPagos();
  
  },
  methods:{
     ...mapMutations(["setListaPagos"]),
     //cerrar dialogo Pago
       closeDialogPago() {
      this.dialogoPago = false;
    },
     closeDialogDetalle() {
      this.dialogodetalle= false;
    },
      estadoActual(array){
      if(array === 'no pagado'){
        return false
      }else{
        return true
      }
    },
     async abrirDialogoPagar(idusuario) {
      this.pago = await this.loadUsuarioPago(idusuario);
      this.dialogoPago= !this.dialogoPago;
    },
    async abrirDialogoDetalle(idusuario) {
      this.cita = await this.loadUsuarioPago(idusuario);
      this.dialogodetalle= !this.dialogodetalle;
    },
 //obtener todos los pagos del usuario
    async obtenerPagos() {
      await axios
        .get("/Cita/all")
        .then((x) => {
          let listaP=[];
          this.listaP = x.data;
          console.log(this.listaP);
          console.log(this.prueba)
           this.setListaPagos(this.listaP);
        })
        .catch((err) => console.log(err));
    },
    async loadUsuarioPago(idusuario) {
      var user = {};
      await axios
        .get("/Cita/id?id=" + idusuario)
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
    ...mapState(["listaPagos"]),
  
  }
};
</script>
<style scoped>
.card {
  margin: 20px;
}
</style>
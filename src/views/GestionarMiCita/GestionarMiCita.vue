<template>
  <div>
    <v-card class="card" style="margin:80px auto 0;width:80%;">
      <v-card-title> Mis Citas </v-card-title>
      <v-data-table
        :headers="headers"
        :items="listaPagos"
        :search="search"
        class="elevation-1"
      >
        <template v-slot:top>
          <v-toolbar flat>
            <v-toolbar-title
              >Pendientes / Pagados</v-toolbar-title
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
                <template v-slot:activator="{ on, attrs }">
                  <v-text-field
                    v-model="dates"
                    label="Rango de fechas"
                    prepend-icon="mdi-calendar"
                    readonly
                    single-line
                    v-bind="attrs"
                    v-on="on"
                    hide-details
                  ></v-text-field>
                </template>
                <v-date-picker v-model="dates" locale="es-es" range scrollable>
                  <v-spacer></v-spacer>
                  <v-btn text color="primary" @click="modal = false">
                    Cancel
                  </v-btn>
                  <v-btn text color="primary" @click="cargarDocumentosRango(dates)">
                    OK
                  </v-btn>
                </v-date-picker>
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
              <span>Pagar</span>
            </v-btn>
              <v-btn v-if="estadoActual(item.estado_pago)" color="info" dark @click="abrirDialogoDetalle(item.id)">
                <v-icon left> info </v-icon>
                <span>Visualizar</span>
              </v-btn>
          </v-row>
        </template>
      </v-data-table> 
<!--Aqui llamo a los componentes de vuetify-->
    <v-dialog persistent v-model="dialogoPago" max-width="880px">
          <RealizarPago
            v-if="dialogoPago"   
            :pago="pago"              
            @close-dialog-Pago="closeDialogPago()"
          >
          </RealizarPago>
    </v-dialog>
     <v-dialog persistent v-model="dialogodetalle" max-width="880px">
          <MiCita
            v-if="dialogodetalle" 
            :cita="cita"                 
            @close-dialog-detalle="closeDialogDetalle()"
          >
          </MiCita>
    </v-dialog>
    </v-card>
  </div>
</template>
<script>

import RealizarPago from "@/components/GestionarPago/RealizarPago.vue";
import MiCita       from "@/components/GestionarPago/MiCita.vue"
import axios from "axios";
import { mapMutations, mapState } from "vuex";


export default {
  name: "GestionarMiCita",
  components: {
    RealizarPago,
    MiCita
   
  },
  data() {
    return {
      search: "",
      pago:{},
      cita:{},
     

     headers: [

        { text: "Paciente", align: "start", sortable: false, value: "datos_paciente.datos.nombre_apellido_paciente" },
        { text: "Profesional", value: "datos_turno.datos_medico.nombre_apellido_medico" },
        { text: "Especialidad", value: "datos_turno.especialidad.nombre" },
        { text: "Fecha de Cita", value: "fecha_cita" },
        { text: "Estado", value: "estado_pago" },
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
<template>
  <div>
    <v-card class="card" style="margin:80px auto 0;width:80%;">
      <v-card-title> Visualizar Prescripciones</v-card-title>
      <v-data-table
        :headers="headers"
        :items="listaPagos"
        :search="search"
        class="elevation-1"
      >
        <template v-slot:top>
          <v-toolbar flat>
            <v-toolbar-title
              >Examenes Auxiliares</v-toolbar-title
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
           
              <v-btn  color="info" dark @click="abrirDialogoDetalle(item.id)">
                <v-icon left> info </v-icon>
                <span>Visualizar</span>
              </v-btn>
          </v-row>
        </template>
      </v-data-table> 
<!--Aqui llamo a los componentes de vuetify-->
   <!-- <v-dialog persistent v-model="dialogoPago" max-width="880px">
          <DetallePrescripcion
            v-if="dialogodetalle"   
            :pago="pago"              
            @close-dialog-Pago="closeDialogPago()"
          >
          </DetallePrescripcion>
    </v-dialog> -->
     
    
    </v-card>
  </div>
</template>
<script>

import DetallePrescripcion from "@/components/DetallePrescripcion/DetallePrescripcion.vue";

import axios from "axios";
import { mapMutations, mapState,mapGetters } from "vuex";
;


export default {
  name: "VisualizarPrescripcion",
  components: {
   DetallePrescripcion
    
  },
  data() {
    return {
      search: "",
      pago:{},
      detalle:{},
     

     headers: [

          {text:"Nombre Paciente", align: "start", sortable: false, value:"datos_paciente.datos.nombre_apellido_paciente"},
        { text: "Profesional",  value: "datos_turno.datos_medico.nombre_apellido_medico" },
        { text: "Especialidad", value: "datos_turno.especialidad.nombre" },
        { text: "Fecha de Cita", value: "fecha_cita" },
        {text:"Hora de Cita", value:"datos_turno.hora_inicio"},
        { text: "Estado", value: "estado_pago" },
        { text: "Actions", value: "actions", sortable: false },
      ],
      
      dialogodetalle: false,
     
      fromDate: null,
      toDate: null,
      dates: [],
      modal: false,
       
    };

    
  },
  async created() {
    this.obtenerPrescripcion();
  
  },
  methods:{
     ...mapMutations(["setVisualizar"]),
     //cerrar dialogo Pago
     
     closeDialogDetalle() {
      this.dialogodetalle= false;
    },
   
    async abrirDialogoDetalle(idusuario) {
      this.detalel = await this.loadUsuarioPago(idusuario);
      this.dialogodetalle= !this.dialogodetalle;
    },
    //obtener todas las prodemiemientos de  las citas
    async obtenerPrescripcion() {
      await axios
        .get("/Cita/acto_medico_2?idUsuario=" + "607f4008cb41a8de70be1df5")
        .then((res) => {
          var info={};
          info = res.data;
          console.log(info);
         
           this.setVisualizar(info);
        })
        .catch((err) => console.log(err));
    },
  },
 
  computed: {
    ...mapState(["ExamenesAuxiliar"]),
    ...mapGetters(["user"]),
  
  }
};
</script>
<style scoped>
.card {
  margin: 20px;
}
</style>
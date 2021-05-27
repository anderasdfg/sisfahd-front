<template>
  <div>
    <v-card class="card" style="margin:80px auto 0;width:80%;">
      <v-card-title> Pago de Citas </v-card-title>
      <v-data-table
        :headers="headers"
        :items="listaPagos"
        :search="search"
        class="elevation-1"
      >
        <template v-slot:top>
          <v-toolbar flat>
            <v-toolbar-title
              >Pagos Pendientes / Pagados</v-toolbar-title
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

        <template v-slot:[`item.actions`]="{ item }">
          <v-row align="center" justify="space-around">
            <v-btn color="warning" dark @click="abrirDialogoModificar(item.id)">
              <v-icon left> mdi-pencil </v-icon>
              <span>Pagar</span>
            </v-btn>

            
          </v-row>
        </template>
      </v-data-table>
      <!--Dialogo de Modificacion-->
      <v-dialog persistent v-model="dialogoactualizacion" max-width="880px">
        
      </v-dialog>
      <v-dialog persistent v-model="dialogodetalle" max-width="880px">
      
      </v-dialog>
    </v-card>

  
  </div>
</template>
<script>


import axios from "axios";
import { mapMutations, mapState } from "vuex";



export default {
  name: "RealizarPago",
  components: {
   
  },
  data() {
    return {
      search: "",
     

      headers: [
        {
          text: "Estado",
          align: "start",
          sortable: false,
          value: "estado_pago",
        },
        { text: "Nombre del paciente", value: "datos_paciente.datos.nombre" },
        { text: "Apellido del paciente", value: "datos_paciente.datos.apellido" },
        { text: "Precio", value: "precio_neto" },
        { text: "Estado de atencion", value: "estado_atencion" },
        { text: "Actions", value: "actions", sortable: false },
      ],

      dialogoregistro: false,
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
 //obtener todos los pagos del usuario
    async obtenerPagos() {
       
      await axios
        .get("/RealizarPago/all")
        .then((x) => {
          let listaP=[];
          this.listaP = x.data;
          console.log(this.listaP);
          console.log(this.prueba)
           this.setListaPagos(this.listaP);
        })
        .catch((err) => console.log(err));
    },
    probarFuncion(){
      return  console.log(this.precio_neto);  
    }
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
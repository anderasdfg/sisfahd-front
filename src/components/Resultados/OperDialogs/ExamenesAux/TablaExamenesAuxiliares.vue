<template>
  <v-card  elevation="0"  class="mt-1 mb-6">
    <v-card-title>Exámenes Auxiliares</v-card-title>
    <v-card elevation="0" class="mt-0 mb-0 ml-5 mr-5">
      <div class="table-exam-aux" >
        <v-card-title style="margin-top:0px !important">
          <v-text-field
            v-model="search"
            class="pt-0 mt-0"
            append-icon="mdi-magnify"
            label="Buscar Resultados"
            style="margin-top:0px !important"
            single-line
            hide-details
          ></v-text-field>
        </v-card-title>
        <v-data-table
        :headers="headers"
        :items="ListTableElem"
        :page.sync="page"
        :items-per-page="itemsPerPage"
        :search="search"
        hide-default-footer
        class="elevation-1"
        @page-count="pageCount = $event"
        >
          <template v-slot:[`item.actions`]="{ item }">
            <v-tooltip top>
              <template v-slot:activator="{ on, attrs }">
                <v-btn
                  class="mx-0"
                  small
                  dark
                  color="primary"
                  v-bind="attrs"
                  v-on="on"
                  @click="OpenDialog(item)"
                >
                  <v-icon dark>
                    mdi-eye
                  </v-icon>
                </v-btn>
              </template>
              <span>Visualizar detalles del examen auxiliar.</span>
            </v-tooltip>
          </template>
          <template v-slot:no-data>
            <v-card-text class="mt-1">Lista vacía. Si cree que existe un error, por favor recargue la página</v-card-text>
          </template>
        </v-data-table>
        <v-pagination
          style="padding:50px; borders"
          v-model="page"
          :length="pageCount"
        ></v-pagination>
      </div>
      <template>
        <v-row justify="center">
          <v-dialog
            v-model="dialogConsultarExamenAux"
            persistent
            max-width="600"
          >
            <ConsultarExamenAux
              :infoExamenAuxiliar="examObj"
              @emit-close-dialog="CloseDialog()"
            ></ConsultarExamenAux>
          </v-dialog>
        </v-row>
      </template>
    </v-card>
  </v-card>
</template>

<script>
  import ConsultarExamenAux from "@/components/Resultados/OperDialogs/ExamenesAux/ConsultarExamenAux";
  import EditarResultExamenAux from "@/components/Resultados/OperDialogs/ResultadosExamenAux/EditarResultExamenAux";
  import SubirResultExamenAux from "@/components/Resultados/OperDialogs/ResultadosExamenAux/SubirResultExamenAux";
  export default {
    name:"ComponentMisExamenesAuxiliares",
    components:{
      EditarResultExamenAux,
      SubirResultExamenAux,
      ConsultarExamenAux
    },
    props:["ListTableElem","userId"],
    data: () => ({
      search:'',
      page: 1,
      pageCount: 0,
      itemsPerPage: 6,
      dialog: false,
      examObj:{
        observaciones:[],
        nombre: '',
        tipo: '',
        estado:'',
        resultado:{
          titulo:'',
          url:''
        }
      },
      dialogConsultarExamenAux:false,
      headers: [
        {
          text: 'Nombre de Examen',
          align: 'start',
          sortable: false,
          value: 'nombre',
        },
        { text: 'Estado de Exámen Auxiliar', value: 'estado' },
        { text: 'Acciones', value: 'actions', sortable: false }
      ],
      editedIndex: -1,
      editedItem: {
        codigo: '',
        nombre: '',
        observaciones: [],
        numObs_msg:'',
        numObs_val:0,
        estadoExamAux_val:false,
        estadoExamAux_msg:'',
        tipo: ''
      },
      defaultItem: {
        codigo: '',
        nombre: '',
        numObs_msg:'',
        numObs_val:0,
        observaciones: [],
        estadoExamAux_val:false,
        estadoExamAux_msg:'',
        tipo: ''
      },
    }),

    computed: {
      formTitle () {
        return this.editedIndex === -1 ? 'New Item' : 'Edit Item'
      },
    },

    watch: {
      dialog (val) {
        val || this.close()
      },
      dialogDelete (val) {
        val || this.closeDelete()
      },
    },

    methods: {
      RecargarTablas(){
        this.$emit("emit-recargar-tablas-2");
      },
      OpenDialog(item){
        this.examObj.nombre = item.nombre;
        this.examObj.tipo = item.tipo;
        this.examObj.observaciones = item.observaciones;
        this.examObj.estado = item.estado;
        this.examObj.resultado = item.resultado;
        this.dialogConsultarExamenAux=true;
      },
      CloseDialog(){
        this.dialogConsultarExamenAux=false;
      },
    },
  }
</script>

<style>
.table-exam-aux{
  margin-left: 10px;
  margin-right: 10px;
}
</style>
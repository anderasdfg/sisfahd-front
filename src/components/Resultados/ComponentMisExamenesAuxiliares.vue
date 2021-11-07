<template>
  <v-card elevation="0" class="mt-0 mb-0">
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
            <span>Visualizar exámenes auxiliares.</span>
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
          v-model="dialogTablaExamenesAux"
         
          max-width="700"
        >
          <TablaExamenesAuxiliares
            :ListTableElem="examObj"
          ></TablaExamenesAuxiliares>
        </v-dialog>
      </v-row>
    </template>
  </v-card>
</template>

<script>
  import TablaExamenesAuxiliares from "@/components/Resultados/OperDialogs/ExamenesAux/TablaExamenesAuxiliares";
  export default {
    name:"ComponentMisExamenesAuxiliares",
    components:{
      TablaExamenesAuxiliares,
    },
    props:["ListTableElem"],
    data: () => ({
      search:'',
      page: 1,
      pageCount: 0,
      itemsPerPage: 6,
      dialog: false,
      examObj:{
        codigo: '',
        nombre: '',
        observaciones: [],
        numObs_msg:'',
        numObs_val:0,
        estadoExamAux_val:false,
        estadoExamAux_msg:'',
        tipo: ''
      },
      resultadoObjToAgregar:{
        codigo: '',
        nombre: '',
        observaciones: '',
        documento_anexo: '',
        tipo: ''
      },
      dialogDelete: false,
      dialogSubirResult:false,
      dialogEditarResult:false,
      dialogTablaExamenesAux:false,
      headers: [
        {
          text: 'Fecha de Cita',
          align: 'start',
          sortable: false,
          value: 'fecha',
        },
        { text: 'Medico solicitante', value: 'medico' },
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
        this.examObj=item.examenes_aux;
        this.dialogTablaExamenesAux=true;
      },
      CloseDialog(){
        this.dialogTablaExamenesAux=false;
      },
    },
  }
</script>

<style>
.panels-exam-aux{
  margin-left: 20px;
  margin-right: 20px;
}
</style>
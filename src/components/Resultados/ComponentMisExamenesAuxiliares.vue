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
                class="mx-2"
                small
                dark
                color="primary"
                v-bind="attrs"
                v-on="on"
                @click="OpenDialog(3,item)"
              >
                <v-icon dark>
                  mdi-eye
                </v-icon>
              </v-btn>
            </template>
            <span>Visualizar detalles del examen auxiliar.</span>
          </v-tooltip>
          <v-tooltip top v-if="!item.estadoExamAux_val">
            <template v-slot:activator="{ on, attrs }">
              <v-btn
                class="mx-2"
                small
                dark
                color="primary"
                v-bind="attrs"
                v-on="on"
                @click="OpenDialog(1)"
              >
                <v-icon dark left>
                  mdi-plus
                </v-icon>
                <span>Agregar</span>
              </v-btn>
            </template>
            <span>Agrega los resultados de este examen auxiliar.</span>
          </v-tooltip>
          <v-tooltip top v-else>
            <template v-slot:activator="{ on, attrs }">
              <v-btn
                class="mx-2"
                small
                dark
                style="width:104px"
                color="yellow"
                v-bind="attrs"
                v-on="on"
                @click="OpenDialog(2,item)"
              >
                <v-icon color="black" dark left>
                  mdi-pencil
                </v-icon>
                <span style="color:black;">Editar</span>
              </v-btn>
            </template>
            <span>Edita los resultados de este examen auxiliar.</span>
          </v-tooltip>
        </template>
        <template v-slot:no-data>
          <v-btn
            color="primary"
            @click="initialize"
          >
            Reset
          </v-btn>
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
          v-model="dialogSubirResult"
          persistent
          max-width="600"
        >
          <SubirResultExamenAux
            @emit-close-dialog="CloseDialog(1)"
          ></SubirResultExamenAux>
        </v-dialog>
      </v-row>
    </template>
    <template>
      <v-row justify="center">
        <v-dialog
          v-model="dialogEditarResult"
          persistent
          max-width="600"
        >
          <EditarResultExamenAux
            :infoResultExamenAuxiliar="examObj"
            @emit-close-dialog="CloseDialog(2)"
          ></EditarResultExamenAux>
        </v-dialog>
      </v-row>
    </template>
    <template>
      <v-row justify="center">
        <v-dialog
          v-model="dialogConsultarExamenAux"
          persistent
          max-width="600"
        >
          <ConsultarExamenAux
            :infoExamenAuxiliar="examObj"
            @emit-close-dialog="CloseDialog(3)"
          ></ConsultarExamenAux>
        </v-dialog>
      </v-row>
    </template>
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
      dialogDelete: false,
      dialogSubirResult:false,
      dialogEditarResult:false,
      dialogConsultarExamenAux:false,
      headers: [
        {
          text: 'Nombre de Examen',
          align: 'start',
          sortable: false,
          value: 'nombre',
        },
        { text: 'Tipo de Examen', value: 'tipo' },
        { text: 'Nº Observaciones', value: 'numObs_msg' },
        { text: 'Estado de Exámen Auxiliar', value: 'estadoExamAux_msg' },
        { text: 'Actions', value: 'actions', sortable: false }
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
      OpenDialog(tipoModal,item){
        if(tipoModal==1){
          //this.dialogSubirResult=true;
           this.$emit("emit-subir-result",item.codigo);
        }else if(tipoModal==2){
          //this.dialogEditarResult=true;
          this.$emit("emit-editar-result",item.codigo);
        }else if(tipoModal==3){
          this.dialogConsultarExamenAux=true;
        }
      },
      CloseDialog(tipoModal){
        if(tipoModal==1){
          this.dialogSubirResult=false;
        }else if(tipoModal==2){
          this.dialogEditarResult=false;
        }else{
          this.dialogConsultarExamenAux=false;
        }
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
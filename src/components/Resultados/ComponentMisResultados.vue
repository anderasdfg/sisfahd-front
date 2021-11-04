<template>
  <div>
    <v-card elevation="0" class="mt-0 mb-0">
      <v-tooltip right>
        <template v-slot:activator="{ on, attrs }">
          <v-btn
            class="mx-2"
            style="margin-bottom:15px;"
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
        <span>Agrega los resultados de un examen auxiliar realizado.</span>
      </v-tooltip>
      <div class="table-exam-aux">
        <v-card-title>
          <v-text-field
            class="pt-0 mt-0"
            v-model="search"
            append-icon="mdi-magnify"
            label="Buscar Resultados"
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
          <template v-slot:top>
            <v-dialog v-model="dialogDelete" max-width="500px">
              <v-card>
                <v-card-title class="text-h5">¿Estas seguro de que deseas eliminar este resultado?</v-card-title>
                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn color="blue darken-1" text @click="closeDelete">Cancelar</v-btn>
                  <v-btn color="blue darken-1" text @click="deleteItemConfirm">Eliminar</v-btn>
                  <v-spacer></v-spacer>
                </v-card-actions>
              </v-card>
            </v-dialog>
          </template>
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
                  @click="OpenDialog(3,item)"
                >
                  <v-icon dark>
                    mdi-eye
                  </v-icon>
                </v-btn>
              </template>
              <span>Visualiza los detalles de estos resultados.</span>
            </v-tooltip>
            <v-tooltip top>
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
            <v-tooltip top>
              <template v-slot:activator="{ on, attrs }">
                <v-btn
                  class="mx-2"
                  small
                  dark
                  style="width:104px"
                  color="red"
                  v-bind="attrs"
                  v-on="on"
                  @click="deleteItem(item)"
                >
                  <v-icon dark left>
                    mdi-delete
                  </v-icon>
                  <span>Eliminar</span>
                </v-btn>
              </template>
              <span>Elimina los resultados de este examen auxiliar.</span>
            </v-tooltip>
          </template>
          <template v-slot:no-data>
            <v-card-text class="mt-1">Lista vacía. Si cree que existe un error, por favor recargue la página</v-card-text>
          </template>
        </v-data-table>
      </div>
      <v-pagination
        style="padding:50px; borders"
        v-model="page"
        :length="pageCount"
      ></v-pagination>
    </v-card>
    <template>
      <v-row justify="center">
        <v-dialog
          v-model="dialogSubirResult"
          persistent
          max-width="600"
        >
          <SubirResultExamenAux
            @emit-close-dialog="CloseDialog(1)"
            @emit-recargar-tablas="RecargarTablas()"
            :userId="userId"
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
            :infoResultExamenAuxiliar="resultObj"
            @emit-close-dialog="CloseDialog(2)"
            @emit-recargar-tablas="RecargarTablas()"
          ></EditarResultExamenAux>
        </v-dialog>
      </v-row>
    </template>
    <template>
      <v-row justify="center">
        <v-dialog
          v-model="dialogConsultarResult"
          persistent
          max-width="600"
        >
          <ConsultarResultExamenAux
            :infoResultExamenAuxiliar="resultObj"
            @emit-close-dialog="CloseDialog(3)"
          ></ConsultarResultExamenAux>
        </v-dialog>
      </v-row>
    </template>
  </div>
  
</template>

<script>
import axios from "axios";
import ConsultarResultExamenAux from "@/components/Resultados/OperDialogs/ResultadosExamenAux/ConsultarResultExamenAux";
import EditarResultExamenAux from "@/components/Resultados/OperDialogs/ResultadosExamenAux/EditarResultExamenAux";
import SubirResultExamenAux from "@/components/Resultados/OperDialogs/ResultadosExamenAux/SubirResultExamenAux";
export default {
  name:"ComponentMisResultados",
  components:{
    SubirResultExamenAux,
    EditarResultExamenAux,
    ConsultarResultExamenAux
  },
  props:["ListTableElem","userId"],
  data: () => ({
    tipoDialog:1,
    search: '',
    page: 1,
    pageCount: 0,
    itemsPerPage: 5,
    dialog: false,
    dialogDelete: false,
    dialogSubirResult:false,
    dialogEditarResult:false,
    dialogConsultarResult:false,
    headers: [
      {
        text: 'Nombre de Examen',
        align: 'start',
        sortable: false,
        value: 'nombre',
      },
      { text: 'Nº Documentos adjuntos', value: 'numDocs_msg' },
      { text: 'Actions', value: 'actions', sortable: false }
    ],
    editedIndex: -1,
    resultObj: {
      codigo: '',
      nombre: '',
      observaciones: '',
      documento_anexo:[],
      numDocs_val:0,
      numDocs_msg:'',
      tipo: ''
    },
    editedItem: {
      codigo: '',
      nombre: '',
      observaciones: '',
      documento_anexo:[],
      numDocs_val:0,
      numDocs_msg:'',
      tipo: ''
    },
    defaultItem: {
      codigo: '',
      nombre: '',
      observaciones: '',
      numDocs:{
        msg:'',
        val:0
      },
      documento_anexo:[],
      tipo: ''
    }
  }),

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
      console.log("llegó a componente mis resultados");
      this.$emit("emit-recargar-tablas-2");
    },
    OpenDialog(tipoModal,item){
      if(tipoModal==1){
        this.dialogSubirResult=true;
      }else if(tipoModal==2){
        this.dialogEditarResult=true;
        this.resultObj=item;
      }else if(tipoModal==3){
        this.dialogConsultarResult=true;
        this.resultObj=item;
      }
    },
    CloseDialog(tipoModal){
      if(tipoModal==1){
        this.dialogSubirResult=false;
      }else if(tipoModal==2){
        this.dialogEditarResult=false;
      }else{
        this.dialogConsultarResult=false;
      }
    },

    deleteItem (item) {
      this.editedIndex = this.ListTableElem.indexOf(item)
      this.editedItem = Object.assign({}, item)
      this.dialogDelete = true
    },

    async deleteItemConfirm () {
      const idResultado = this.ListTableElem[this.editedIndex].id;
      const idUsuario = this.userId
      await this.deleteResultado(idResultado, idUsuario);
      this.RecargarTablas();
      this.ListTableElem.splice(this.editedIndex, 1);
    },

    async deleteResultado(idRes, idUs){
      const request = {
        idResultado: idRes,
        idUsuario: idUs
      }
      await axios
        .delete("/ResultadoExamen/eliminar",  { data: request })
        .then((res) => {
          console.log(res);
          this.closeDelete();
        })
        .catch((err) => console.log(err));

    },

    close () {
      this.dialog = false
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem)
        this.editedIndex = -1
      })
    },

    closeDelete () {
      this.dialogDelete = false
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem)
        this.editedIndex = -1
      })
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
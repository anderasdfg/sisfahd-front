<template>
  <v-card elevation="0" class="mt-0 mb-0">
    <div>
      <v-data-table
      :headers="headers"
      :items="ListTableElem.procedimientos"
      :page.sync="page"
      :items-per-page="itemsPerPage"
      :search="search"
      hide-default-footer
      :single-expand="singleExpand"
      :expanded.sync="expanded"
      item-key="id_examen"
      show-expand
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
                  mdi-pen
                </v-icon>
                <span style="margin-left: 7px">Reservar</span>
              </v-btn>
            </template>
            <span>Realizar reserva para el procedimiento</span>
          </v-tooltip>
        </template>
        <template v-slot:no-data>
          <v-card-text class="mt-1">Lista vacía. Si cree que existe un error, por favor recargue la página</v-card-text>
        </template>
        <template v-slot:expanded-item="{ headers, item }">
          <td :colspan="headers.length">
            <p style="margin-top:8px;margin-bottom:8px;">
              <b>Recomendaciones Previas:</b>
              <span v-if="item.datos_examen.recomendaciones_previas==''"> No hay recomendaciones previas</span>
              <span v-else> {{item.datos_examen.recomendaciones_previas}}</span>
            </p>
            <p style="margin-top:8px;margin-bottom:8px;">
              <b>Recomendaciones Posteriores:</b>
              <span v-if="item.datos_examen.recomendaciones_posteriores==''"> No hay recomendaciones posteriores</span>
              <span v-else> {{item.datos_examen.recomendaciones_posteriores}}</span>
            </p>
          </td>
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
          v-model="dialogReservaProc"
          max-width="800"
        >
          <CardReservaProcedimiento
            @emit-close-dialog="CloseDialog"
            :ListTableElem="procedObj"
            :InfoOrden="ListTableElem"
          ></CardReservaProcedimiento>
        </v-dialog>
      </v-row>
    </template>
  </v-card>
</template>

<script>
  import CardReservaProcedimiento from "@/components/Ordenes/CardReservaProcedimiento";
  export default {
    name:"CardTablaProcedimientos",
    components:{
      CardReservaProcedimiento,
    },
    props:["ListTableElem"],
    data: () => ({
      expanded: [],
      singleExpand: false,
      search:'',
      page: 1,
      pageCount: 0,
      itemsPerPage: 6,
      dialog: false,
      dialogReservaProc:false,
      procedObj:[],
      headers: [
        {
          text: 'Descripcion',
          align: 'start',
          sortable: false,
          value: 'datos_examen.descripcion',
        },
        { text: 'Duración', value: 'datos_examen.duracion' },
        { text: 'Estado de Atención', value: 'estado' },
        { text: 'Acciones', value: 'actions', sortable: false }
      ],
      editedIndex: -1,
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
    },

    methods: {

      OpenDialog(item){
        //item.datos_acto_medico.fecha_atencion = item.datos_acto_medico.fecha_atencion.split("T")[0].split("-")[2] + "-" + 
        //item.datos_acto_medico.fecha_atencion.split("T")[0].split("-")[1]+ "-" + 
        //item.datos_acto_medico.fecha_atencion.split("T")[0].split("-")[0];
        this.procedObj=item;
        console.log(this.procedObj);
        this.dialogReservaProc=true;
      },
      CloseDialog(){
        this.dialogReservaProc=false;
      },
      CapitalizarPrimeraLetra(str){
        return str.charAt(0).toUpperCase() + str.slice(1);
      }
    },
  }
</script>

<style>
.panels-exam-aux{
  margin-left: 20px;
  margin-right: 20px;
}
</style>
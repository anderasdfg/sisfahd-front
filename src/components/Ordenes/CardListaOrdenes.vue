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
            <span>Visualizar detalles de orden.</span>
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
          v-model="dialogDetalleOrden"
          max-width="900"
        >
          <CardOrdenesDetalle
            @emit-close-dialog="CloseDialog"
            :ListTableElem="ordenObj"
          ></CardOrdenesDetalle>
        </v-dialog>
      </v-row>
    </template>
  </v-card>
</template>

<script>
  import CardOrdenesDetalle from "@/components/Ordenes/CardOrdenesDetalle";
  export default {
    name:"CardListaOrdenes",
    components:{
      CardOrdenesDetalle,
    },
    props:["ListTableElem"],
    data: () => ({
      ordenObj:[],
      search:'',
      page: 1,
      pageCount: 0,
      itemsPerPage: 6,
      dialog: false,
      dialogDetalleOrden:false,
      headers: [
        {
          text: 'Especialidad',
          align: 'start',
          sortable: false,
          value: 'especialidad',
        },
        { text: 'Fecha de Cita', value: 'fecha_orden' },
        { text: 'Estado de Atención', value: 'estado_atencion' },
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
      //https://cutt.ly/ATWQUl3
      OpenDialog(item){
        item.datos_acto_medico.fecha_atencion = item.datos_acto_medico.fecha_atencion.split("T")[0].split("-")[2] + "-" + 
        item.datos_acto_medico.fecha_atencion.split("T")[0].split("-")[1]+ "-" + 
        item.datos_acto_medico.fecha_atencion.split("T")[0].split("-")[0];
        this.ordenObj=item;
        console.log(this.ordenObj);
        this.dialogDetalleOrden=true;
      },
      CloseDialog(){
        this.dialogDetalleOrden=false;
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
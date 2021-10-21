<template>
  <v-card elevation="0" class="mt-0 mb-0">
    <div class="table-exam-aux" >
      <v-card-title style="margin-top:0px !important">
        <v-text-field
          v-model="search"
          class="pt-0 mt-0"
          append-icon="mdi-magnify"
          label="Buscar Pedidos"
          style="margin-top:0px !important"
          single-line
          hide-details
        ></v-text-field>
      </v-card-title>
      <v-data-table
      :headers="headers"
      :items="ListaPedidos"
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
                @click="OpenDialog(item)"
              >
                <v-icon dark>
                  mdi-eye
                </v-icon>
              </v-btn>
            </template>
            <span>Visualizar detalles del pedido.</span>
          </v-tooltip>
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
          Hola
        </v-dialog>
      </v-row>
    </template>
  </v-card>
</template>

<script>
  export default {
    name:"TablaPedidos",
    components:{
      
    },
    props:["ListaPedidos"],
    data: () => ({
      search:'',
      page: 1,
      pageCount: 0,
      itemsPerPage: 6,
      dialogConsultarExamenAux:false,
      headers: [
        {
          text: 'Tipo',
          align: 'start',
          sortable: false,
          value: 'tipo',
        },
        { text: 'Estado de pago', value: 'estado_pago' },
        { text: 'Fecha de pedido', value: 'fecha_creacion' },
        { text: 'Precio Total', value: 'precio_neto' },
        { text: 'Actions', value: 'actions', sortable: false }
      ],
    }),
    methods: {
      OpenDialog(item){
        this.dialogConsultarExamenAux=true;
      },
      CloseDialog(tipoModal){
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
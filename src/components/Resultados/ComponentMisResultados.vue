<template>
  <v-card elevation="0">
    <v-tooltip right>
      <template v-slot:activator="{ on, attrs }">
        <v-btn
          class="mx-2"
          style="margin-bottom:15px;"
          dark
          color="primary"
          v-bind="attrs"
          v-on="on"
        >
          <v-icon dark left>
            mdi-plus
          </v-icon>
          <span>Agregar</span>
        </v-btn>
      </template>
      <span>Agrega los resultados de este examen auxiliar.</span>
    </v-tooltip>
    <div class="table-exam-aux">
      <v-data-table
      :headers="headers"
      :items="ListTableElem"
      :page.sync="page"
      :items-per-page="itemsPerPage"
      hide-default-footer
      class="elevation-1"
      @page-count="pageCount = $event"
      >
        <template v-slot:top>
          <v-dialog
            v-model="dialog"
            max-width="500px"
          >
            <v-card elevation="0">
              <v-card-title>
                <span class="text-h5">{{ formTitle }}</span>
              </v-card-title>

              <v-card-text>
                <v-container>
                  <v-text-field
                    v-model="editedItem.nombre"
                    label="Dessert nombre"
                  ></v-text-field>
                  <v-text-field
                    v-model="editedItem.tipo"
                    label="Calories"
                  ></v-text-field>
                </v-container>
              </v-card-text>

              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn
                  color="blue darken-1"
                  text
                  @click="close"
                >
                  Cancel
                </v-btn>
                <v-btn
                  color="blue darken-1"
                  text
                  @click="save"
                >
                  Save
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
          <v-dialog v-model="dialogDelete" max-width="500px">
            <v-card>
              <v-card-title class="text-h5">Are you sure you want to delete this item?</v-card-title>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="blue darken-1" text @click="closeDelete">Cancel</v-btn>
                <v-btn color="blue darken-1" text @click="deleteItemConfirm">OK</v-btn>
                <v-spacer></v-spacer>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </template>
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
              >
                <v-icon dark>
                  mdi-eye
                </v-icon>
              </v-btn>
            </template>
            <span>Visualizar detalles de los resultados subidos.</span>
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
                @click="editItem(item)"
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
          <v-btn
            color="primary"
            @click="initialize"
          >
            Reset
          </v-btn>
        </template>
      </v-data-table>
    </div>
    <v-pagination
      style="padding:50px; borders"
      v-model="page"
      :length="pageCount"
    ></v-pagination>
  </v-card>
</template>

<script>
  export default {
    name:"ComponentMisResultados",
    props:["ListTableElem"],
    data: () => ({
      page: 1,
      pageCount: 0,
      itemsPerPage: 6,
      dialog: false,
      dialogDelete: false,
      headers: [
        {
          text: 'Nombre de Examen',
          align: 'start',
          sortable: false,
          value: 'nombre',
        },
        { text: 'Tipo de Examen', value: 'tipo' },
        { text: 'Nº Documentos adjuntos', value: 'numDocs_msg' },
        { text: 'Actions', value: 'actions', sortable: false }
      ],
      editedIndex: -1,
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

      editItem (item) {
        this.editedIndex = this.ListTableElem.indexOf(item)
        this.editedItem = Object.assign({}, item)
        this.dialog = true
      },

      deleteItem (item) {
        this.editedIndex = this.ListTableElem.indexOf(item)
        this.editedItem = Object.assign({}, item)
        this.dialogDelete = true
      },

      deleteItemConfirm () {
        this.ListTableElem.splice(this.editedIndex, 1)
        this.closeDelete()
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

      save () {
        if (this.editedIndex > -1) {
          Object.assign(this.ListTableElem[this.editedIndex], this.editedItem)
        } else {
          this.ListTableElem.push(this.editedItem)
        }
        this.close()
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
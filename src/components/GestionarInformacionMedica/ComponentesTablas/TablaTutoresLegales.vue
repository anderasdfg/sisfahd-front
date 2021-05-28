<template>
  <v-data-table
    :headers="headers"
    :items="lista_tutores_legales"
    sort-by="calories"
    class="elevation-1"
  >
    <template v-slot:top>
      <v-toolbar
        flat
      >
        <v-toolbar-title>Lista de Tutores Legales</v-toolbar-title>
        <v-divider
          class="mx-4"
          inset
          vertical
        ></v-divider>
        <v-spacer></v-spacer>
        <v-dialog
          v-model="dialog"
          max-width="500px"
        >
          <template v-slot:activator="{ on, attrs }">
            <v-btn
              color="primary"
              dark
              class="mb-2"
              v-bind="attrs"
              v-on="on"
            >
              Agregar nuevo
            </v-btn>
          </template>
            <v-card>
              <v-card-title>
                <span class="headline">{{ formTitle }}</span>
              </v-card-title>

              <v-card-text>
                <v-container>
                  <v-row>
                    <v-col
                      cols="12"
                      sm="6"
                      md="4"
                    >
                      <v-text-field
                        v-model="editedItem.parentesco"
                        label="Parentesco"
                      ></v-text-field>
                    </v-col>
                    <v-col
                      cols="12"
                      sm="6"
                      md="4"
                    >
                      <v-text-field
                        v-model="editedItem.nombres"
                        label="Nombres"
                      ></v-text-field>
                    </v-col>
                    <v-col
                      cols="12"
                      sm="6"
                      md="4"
                    >
                      <v-text-field
                        v-model="editedItem.apellidos"
                        label="Apellidos"
                      ></v-text-field>
                    </v-col>
                  </v-row>
                </v-container>
              </v-card-text>

              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn
                  color="blue darken-1"
                  text
                  @click="close()"
                >
                  <v-icon dark>
                    mdi-cancel
                  </v-icon>
                  <span style="margin-left:2%">Cancelar</span>
                </v-btn>
                <v-btn
                  color="blue darken-1"
                  text
                  @click="save()"
                >
                  <v-icon dark>
                    mdi-checkbox-marked-circle
                  </v-icon>
                  <span style="margin-left:2%">Guardar</span>
                </v-btn>
              </v-card-actions>
            </v-card>
        </v-dialog>
        <v-dialog v-model="dialogDelete" max-width="500px">
          <v-card>
            <v-card-title class="headline">Are you sure you want to delete this item?</v-card-title>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1" text @click="closeDelete">Cancel</v-btn>
              <v-btn color="blue darken-1" text @click="deleteItemConfirm">OK</v-btn>
              <v-spacer></v-spacer>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-toolbar>
    </template>
    <template v-slot:[`item.actions`]="{ item }">
      <v-icon
        small
        class="mr-2"
        @click="editItem(item)"
      >
        mdi-pencil
      </v-icon>
      <v-icon
        small
        @click="deleteItem(item)"
      >
        mdi-delete
      </v-icon>
    </template>
    <template v-slot:no-data>
      <span>Agregue sus tutores legales</span>
    </template>
  </v-data-table>
</template>

<script>
import Vuelidate from "vuelidate";
import { required } from "vuelidate/lib/validators";

//Para una sola palabra o frase
function esTexto(value) {
  return /^[A-Za-z\sáéíóúÁÉÍÓÚñÑ]+$/.test(value); 
}
//Para oraciones o parrafos
function esParrafo(value) {
  return /^[A-Za-z\d\s.,;°"“()áéíóúÁÉÍÓÚñÑ]+$/.test(value); 
}

export default { 
  name:'TablaTutoresLegales',
  props:["lista_tutores_legales"],
  data(){
    return{
      //lista_tutores_legales:[],
      editedItem: {
        parentesco: '',
        nombres: '',
        apellidos: ''
      },
      defaultItem: {
        parentesco: '',
        nombres: '',
        apellidos: ''
      },
      dialog: false,
      dialogDelete: false,
      headers: [
        {
          text: 'Parentesco',
          align: 'start',
          sortable: false,
          value: 'parentesco',
        },
        { 
          text: 'Nombres',
          sortable: false,
          value: 'nombres'
        },
        { 
          text: 'Apellidos',
          sortable: false,
          value: 'apellidos'
        },
        { text: 'Actions', value: 'actions', sortable: false }
      ],
      //lista_tutores_legales: [],
      editedIndex: -1,
    }
  },
  
  watch: {
    dialog (val) {
      val || this.close()
    },
    dialogDelete (val) {
      val || this.closeDelete()
    },
  },
  computed:{
    formTitle () {
      return this.editedIndex === -1 ? 'Registre un tutor legal' : 'Edite un tutor legal'
    },
  },
  methods:{

    deleteItem (item) {
      this.editedIndex = this.lista_tutores_legales.indexOf(item)
      this.editedItem = Object.assign({}, item)
      this.dialogDelete = true
    },

    editItem (item) {
      this.editedIndex = this.lista_tutores_legales.indexOf(item)
      this.editedItem = Object.assign({}, item)
      this.dialog = true
    },

    deleteItemConfirm () {
      this.lista_tutores_legales.splice(this.editedIndex, 1)
      //this.$emit('emited_lista_tutores_legales',this.lista_tutores_legales)
      this.closeDelete()
    },
    close(){
      this.dialog = false
      this.editedItem = Object.assign({}, this.defaultItem)   
      this.editedIndex = -1
    },
    closeDelete (){
      this.dialogDelete = false
      this.editedIndex = -1
      this.editedItem = Object.assign({}, this.defaultItem) 
    },
    save() {

      if (this.editedIndex > -1) {
        Object.assign(this.lista_tutores_legales[this.editedIndex], this.editedItem)       
      } else {
        this.lista_tutores_legales.push(this.editedItem)
      }
      //this.$emit('sync_lista_tutores_legales',this.lista_tutores_legales)
      this.close();
    },

    miau(){
      console.log("Estamos activadisimos del padre");
    }
  }

}
</script>

<style>

</style>
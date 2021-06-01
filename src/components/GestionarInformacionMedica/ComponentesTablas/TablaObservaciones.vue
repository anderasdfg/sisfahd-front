<template>
  <v-data-table
    :headers="headers"
    :items="lista_observaciones"
    sort-by="calories"
    class="elevation-1 class-on-data-table table"
  >
    <template v-slot:top>
      <v-toolbar
        flat
      >
        <v-toolbar-title>Observaciones</v-toolbar-title>
        <v-divider
          class="mx-4"
          inset
          vertical
        ></v-divider>
        <v-spacer></v-spacer>
        <v-btn
          color="primary"
          dark
          class="mb-2"
          @click="AbrirModalObservaciones()"
        >
          Agregar nuevo
        </v-btn>
        <v-dialog
          v-model="dialog"
          max-width="500px"
          persistent
        >
          <v-card>
            <v-card-title>
              <span class="headline">{{ formTitle }}</span>
            </v-card-title>

            <v-card-text>
              <v-container>
                <v-textarea
                  v-model="editedItem.observacion"
                  label="Parentesco"
                ></v-textarea>
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
            <v-card-title class="headline">¿Seguro que quiere eliminar esta observación?</v-card-title>
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
  name:'TablaObservaciones',
  props:["lista_observaciones"],
  data(){
    return{
      editedItem: {
        observacion:''
      },
      defaultItem: {
        observacion:''
      },
      dialog: false,
      dialogDelete: false,
      headers: [
        {
          text: 'Observacion',
          align: 'start',
          sortable: false,
          value: 'observacion',
          width: 70
        },
        { 
          text: 'Actions', 
          value: 'actions',
          sortable: false, 
          width: 20
        }
      ],
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
      return this.editedIndex === -1 ? 'Registre una observacion' : 'Edite una observacion'
    },
  },
  methods:{
    AbrirModalObservaciones(){
      this.dialog=true;
    },
    deleteItem (item) {
      this.editedIndex = this.lista_observaciones.indexOf(item)
      this.editedItem = Object.assign({}, item)
      this.dialogDelete = true
    },

    editItem (item) {
      this.editedIndex = this.lista_observaciones.indexOf(item)
      this.editedItem = Object.assign({}, item)
      this.dialog = true
    },

    deleteItemConfirm () {
      this.lista_observaciones.splice(this.editedIndex, 1)
      this.$emit('emited_lista_tutores_legales',this.lista_observaciones)
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
        Object.assign(this.lista_observaciones[this.editedIndex], this.editedItem)       
      } else {
        this.lista_observaciones.push(this.editedItem)
      }
      this.close();
    },
  }

}
</script>

<style>
  .class-on-data-table table {
    table-layout: fixed;
  }
</style>
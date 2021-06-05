
<template>
  <v-data-table
    :headers="headers"
    :items="lista_problemas_cronicos"
    sort-by="calories"
    class="elevation-1"
  >
    <template v-slot:top>
      <v-toolbar
        flat
      >
        <v-toolbar-title>Lista de {{ antecedente }}</v-toolbar-title>
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
          @click="AbrirModalAntecedentesFamiliares()"
        >
          Agregar nuevo
        </v-btn>
        <v-dialog
          v-model="dialog"
          max-width="40%"
          persistent
        >
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
                    <v-dialog
                      ref="dialog3"
                      v-model="menu"
                      :return-value.sync="editedItem.fecha"
                      persistent
                      width="290px"
                    >
                      <template v-slot:activator="{ on, attrs }">
                        <v-text-field
                          v-model="editedItem.fecha"
                          label="Fecha de cita"
                          prepend-icon="mdi-calendar"
                          readonly
                          class="autocomplete-search"
                          v-bind="attrs"
                          v-on="on"
                        ></v-text-field>
                      </template>
                      <v-date-picker locale="es-es" v-model="editedItem.fecha" scrollable>
                        <v-spacer></v-spacer>
                        <v-btn text color="primary" @click="menu = false"> Cancelar </v-btn>
                        <v-btn text color="primary" @click="$refs.dialog3.save(editedItem.fecha)">
                          OK
                        </v-btn>
                      </v-date-picker>
                    </v-dialog>
                  </v-col>
                  <v-col
                    cols="12"
                    sm="6"
                    md="4"
                  >
                    <v-text-field
                      v-model="editedItem.numero"
                      label="Numero"
                    ></v-text-field>
                  </v-col>
                  <v-col
                    cols="12"
                    sm="6"
                    md="4"
                  >
                    <v-text-field
                      v-model="editedItem.problema"
                      label="Problema"
                    ></v-text-field>
                  </v-col>
                </v-row>
                <TablaObservaciones
                  :lista_observaciones="editedItem.observaciones"
                ></TablaObservaciones>
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
        <v-dialog v-model="dialogDelete" max-width="25%">
          <v-card>
            <v-card-title class="headline">¿Seguro que quiere eliminar este <br> {{antecedenteSing}}?</v-card-title>
            <v-card-actions style="margin-top:3%">
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1" text @click="closeDelete">Cancelar</v-btn>
              <v-btn color="blue darken-1" text @click="deleteItemConfirm">Eliminar</v-btn>
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
      <span>Agregue sus {{ antecedente }}</span>
    </template>
  </v-data-table>
</template>

<script>

import TablaObservaciones from "@/components/GestionarInformacionMedica/ComponentesTablas/TablaObservaciones"
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
  name:'TablaAntecedentesProblemasCronicos',
  components:{
    TablaObservaciones
  },
  props:["lista_problemas_cronicos","antecedente","antecedenteSing"],
  data(){
    return{
      editedItem: {
        numero: '',
        fecha:null,
        problema:'',
        observaciones: []
      },
      defaultItem: {
        numero: '',
        fecha:null,
        problema:'',
        observaciones: []
      },
      menu:false,
      dialog: false,
      dialogDelete: false,
      headers: [
        {
          text: 'Numero',
          align: 'start',
          sortable: false,
          value: 'numero',
        },
        { 
          text: 'Problema',
          sortable: false,
          value: 'problema'
        },
        { 
          text: 'Actions', 
          value: 'actions',
          sortable: false 
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
      return this.editedIndex === -1 ? `Registre un ${this.antecedenteSing}` : `Edite un ${this.antecedenteSing}`
    },
  },
  methods:{
    AbrirModalAntecedentesFamiliares(){
      this.dialog=true;
      this.lista_observaciones= []; //importante
    },
    deleteItem (item) {
      this.editedIndex = this.lista_problemas_cronicos.indexOf(item)
      this.editedItem = Object.assign({}, item)
      this.dialogDelete = true
    },

    editItem (item) {
      this.editedIndex = this.lista_problemas_cronicos.indexOf(item)
      this.editedItem = Object.assign({}, item)
      this.lista_observaciones= this.editedItem.observaciones //importante
      this.dialog = true
    },

    deleteItemConfirm () {
      this.lista_problemas_cronicos.splice(this.editedIndex, 1)
      this.$emit('emited_lista_tutores_legales',this.lista_problemas_cronicos)
      this.closeDelete()
    },
    close(){
      this.dialog = false
      this.editedItem = Object.assign({}, this.defaultItem)   
      this.editedItem.observaciones = Object.assign([], this.defaultItem.observaciones)  
      this.editedIndex = -1
    },
    closeDelete (){
      this.dialogDelete = false
      this.editedIndex = -1
      this.editedItem = Object.assign({}, this.defaultItem) 
    },
    save() {
      if (this.editedIndex > -1) {
        Object.assign(this.lista_problemas_cronicos[this.editedIndex], this.editedItem)       
      } else {
        this.lista_problemas_cronicos.push(this.editedItem)
      }
      this.close();
    },
  }

}
</script>

<style>

</style>
<template>
  <v-data-table
    :headers="headers"
    :items="lista_metodos"
    sort-by="calories"
    class="elevation-1 class-on-data-table table"
  >
    <template v-slot:top>
      <v-toolbar
        flat
      >
        <v-toolbar-title>Lista de Metodos Anticonceptivos</v-toolbar-title>
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
          max-width="40%"
          persistent
        >
          <v-card>
            <v-card-title>
              <span class="headline">{{ formTitle }}</span>
            </v-card-title>

            <v-card-text>
              <v-container>
                <v-select
                  v-model="editedItem.nombre"
                  :items="selectMetodos"
                  :item-text="selectMetodos.text"
                  :item-value="selectMetodos.value"
                  prepend-inner-icon="mdi-magnify"
                  label="Seleccione un método anticonceptivo"
                ></v-select>
                <v-row>
                  <v-col
                    cols="12"
                    sm="6"
                    md="4"
                  >
                    <v-dialog
                      ref="dialog1"
                      v-model="menu"
                      :return-value.sync="editedItem.fecha_inicio"
                      persistent
                      width="290px"
                    >
                      <template v-slot:activator="{ on, attrs }">
                        <v-text-field
                          v-model="editedItem.fecha_inicio"
                          label="Fecha de cita"
                          prepend-icon="mdi-calendar"
                          readonly
                          class="autocomplete-search"
                          v-bind="attrs"
                          v-on="on"
                        ></v-text-field>
                      </template>
                      <v-date-picker locale="es-es" v-model="editedItem.fecha_inicio" scrollable>
                        <v-spacer></v-spacer>
                        <v-btn text color="primary" @click="menu = false"> Cancelar </v-btn>
                        <v-btn text color="primary" @click="$refs.dialog1.save(editedItem.fecha_inicio)">
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
                    <v-dialog
                      ref="dialog"
                      v-model="menu2"
                      :return-value.sync="editedItem.fecha_fin"
                      persistent
                      width="290px"
                    >
                      <template v-slot:activator="{ on, attrs }">
                        <v-text-field
                          :disabled="checkboxFechaFin"
                          v-model="editedItem.fecha_fin"
                          label="Fecha de cita"
                          prepend-icon="mdi-calendar"
                          readonly
                          class="autocomplete-search"
                          v-bind="attrs"
                          v-on="on"
                        ></v-text-field>
                      </template>
                      <v-date-picker locale="es-es" v-model="editedItem.fecha_fin" scrollable>
                        <v-spacer></v-spacer>
                        <v-btn text color="primary" @click="$refs.dialog.save(editedItem.fecha_fin)">
                          OK
                        </v-btn>
                      </v-date-picker>
                    </v-dialog>
                  </v-col>
                  <v-col>
                    <v-container
                      class="px-0"
                      fluid
                    >
                      <v-checkbox
                        v-model="checkboxFechaFin"
                        label="Presente"
                      ></v-checkbox>
                    </v-container>
                  </v-col>      
                </v-row>
                <!-- fecha inicio
                fecha fin -->

                <TablaObservaciones
                  :lista_observaciones="lista_observaciones"
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
        <v-dialog v-model="dialogDelete" max-width="40%">
          <v-card>
            <v-card-title class="headline">¿Seguro que quiere eliminar este<br>metodo anticonceptivo?</v-card-title>
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
import TablaObservaciones from "@/components/GestionarInformacionMedica/ComponentesTablas/TablaObservaciones"
export default { 
  name:'TablaMetodosAnticonceptivos',
  props:["lista_metodos"],
  components:{
    TablaObservaciones,
  },
  data(){
    return{
      checkboxFechaFin:true,
      menu:false,
      menu2:false,
      selectMetodos:[
        { value: "preservativo", text: 'Preservativo'},
        { value: "pastilla del dia siguiente", text: 'Pastilla del dia siguiente'},
        { value: "tdc", text: 'T de Cobre'},
      ],
      lista_observaciones:[],
      editedItem: {
        nombre:'',
        fecha_inicio:null,
        fecha_fin:null,
        observaciones:[]
      },
      defaultItem: {
        nombre:'',
        fecha_inicio:null,
        fecha_fin:null,
        observaciones:[]
      },
      dialog: false,
      dialogDelete: false,
      headers: [
        {
          text: 'Nombre del método',
          align: 'start',
          sortable: false,
          value: 'nombre',
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
    'checkboxFechaFin': function (newVal, oldVal) {
      if(newVal){
        this.editedItem.fecha_fin=null
      }
    }, 
    // 'editedItem.fecha_fin': function (newVal, oldVal) {
    //   //No sé porque funciona, pero funciona
    //   //Creo que si el newVal no está, su valor no se actualizará (a lo indicado en el formulario) y solo ejecutará la segunda parte: 
    //   newVal && (this.checkboxFechaFin=false);
    // }, 
    
  },
  computed:{
    formTitle () {
      return this.editedIndex === -1 ? 'Registre un metodo anticonceptivo' : 'Edite un metodo anticonceptivo'
    },
  },
  methods:{

    AbrirModalObservaciones(){
      this.dialog=true;
      console.log(this.lista_observaciones);
      this.lista_observaciones= []; //importante
    },
    deleteItem (item) {
      this.editedIndex = this.lista_metodos.indexOf(item)
      this.editedItem = Object.assign({}, item)
      this.dialogDelete = true
    },

    editItem (item) {
      this.editedIndex = this.lista_metodos.indexOf(item)
      this.editedItem = Object.assign({}, item)
      this.lista_observaciones= this.editedItem.observaciones //importante
      this.dialog = true
    },

    deleteItemConfirm () {
      this.lista_metodos.splice(this.editedIndex, 1)
      this.$emit('emited_lista_tutores_legales',this.lista_metodos)
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
      this.editedItem.observaciones = Object.assign([], this.lista_observaciones)  
      if (this.editedIndex > -1) {
        Object.assign(this.lista_metodos[this.editedIndex], this.editedItem)       
      } else {
        this.lista_metodos.push(this.editedItem)
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
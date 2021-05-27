<template>
  <v-card>
    <v-card-title class="justify-center">Registrar Información Medica</v-card-title>
    <v-card-text>
      <v-stepper v-model="step">
        <v-stepper-header>
          <v-stepper-step editable step="1">General</v-stepper-step>
          <v-divider></v-divider>
          <v-stepper-step editable step="2">Antecedentes<br>(opcional)</v-stepper-step>
        </v-stepper-header>
        <v-stepper-items>
          <v-stepper-content step="1">
            <div class="container-user">
              <form style="margin-top: 15px">
                <v-text-field
                  v-model.trim="datos.lugar_nacimiento"
                  label="Ingrese su lugar de nacimiento"
                  outlined
                  color="#009900"
                  @input="$v.datos.lugar_nacimiento.$touch()"
                  @blur="$v.datos.lugar_nacimiento.$touch()"
                  :error-messages="error_lugar_nacimiento"
                ></v-text-field>
                <v-text-field
                  v-model.trim="datos.procedencia"
                  label="Ingrese su procedencia"
                  outlined
                  color="#009900"
                  @input="$v.datos.procedencia.$touch()"
                  @blur="$v.datos.procedencia.$touch()"
                  :error-messages="error_procedencia"
                ></v-text-field>
                <v-text-field
                  v-model.trim="datos.grupo_instruccion"
                  label="Ingrese su grupo de instruccion"
                  outlined
                  color="#009900"
                  @input="$v.datos.grupo_instruccion.$touch()"
                  @blur="$v.datos.grupo_instruccion.$touch()"
                  :error-messages="error_grupo_instruccion"
                ></v-text-field>
                <v-select
                  :items="['Casado','Soltero','Viudo','Divorciado']"
                  label="Ingrese su estado civil"
                  outlined
                  v-model="datos.estado_civil"
                  @input="$v.datos.estado_civil.$touch()"
                  @blur="$v.datos.estado_civil.$touch()"
                  :error-messages="error_estado_civil"
                  color="#009900"       
                ></v-select>
                <v-text-field
                  v-model.trim="datos.domicilio"
                  label="Ingrese su domicilio"
                  outlined
                  color="#009900"
                  @input="$v.datos.domicilio.$touch()"
                  @blur="$v.datos.domicilio.$touch()"
                  :error-messages="error_domicilio"
                ></v-text-field>
                <v-select
                  :items="['Grupo A','Grupo B','C','Grupo C']"
                  label="Ingrese su grupo sanguineo"
                  outlined
                  v-model="datos.grupo_sanguineo"
                  @input="$v.datos.grupo_sanguineo.$touch()"
                  @blur="$v.datos.grupo_sanguineo.$touch()"
                  :error-messages="error_grupo_sanguineo"
                  color="#009900"       
                ></v-select>
                
                <v-text-field
                  v-model.trim="datos.ocupacion"
                  label="Ingrese su ocupacion"
                  outlined
                  color="#009900"
                  @input="$v.datos.ocupacion.$touch()"
                  @blur="$v.datos.ocupacion.$touch()"
                  :error-messages="error_ocupacion"
                ></v-text-field>
                  <v-expansion-panels flat class="borde-fino" >
                    <v-expansion-panel>
                      <v-expansion-panel-header>Tutores Legales</v-expansion-panel-header>
                      <v-expansion-panel-content>
                        <v-data-table
                          :headers="headers"
                          :items="datos.tutores_legales"
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
                      </v-expansion-panel-content>
                    </v-expansion-panel>
                  </v-expansion-panels>
                <v-card-actions style="padding-left:0px">
                  <v-btn
                  class="ma-2 boton-izquierda"
                  color="primary"
                  dark
                >
                  Guardar y continuar
                  <v-icon
                    dark
                    right
                  >
                    mdi-checkbox-marked-circle
                  </v-icon>
                </v-btn>
                </v-card-actions>
                <!-- BOTONES DE AVANZAR Y RETROCEDER
                <v-btn
                  class="ma-2"
                  color="primary"
                  dark
                >
                  <v-icon
                    dark
                    left
                  >
                    mdi-arrow-left
                  </v-icon>Retroceder
                </v-btn>
                <v-btn
                  class="ma-2"
                  color="primary"
                  dark
                >
                  Accept
                  <v-icon
                    dark
                    right
                  >
                    mdi-arrow-right
                  </v-icon>
                </v-btn>
                -->
              </form>
            </div>
          </v-stepper-content>
          <v-stepper-content step="2">
            
          </v-stepper-content>
        </v-stepper-items>
      </v-stepper>  
    </v-card-text>
  </v-card>
</template>

<script>
import Vuelidate from "vuelidate";
//import axios from "axios";
//import vue2Dropzone from "vue2-dropzone";
//import "vue2-dropzone/dist/vue2Dropzone.min.css";
//import { mapMutations, mapState } from "vuex";
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
  name:"RegistrarInformacionMedica",
  data(){
    return{
      step:1,
      textoErrores:{
        requerido: 'Debe llenar el campo obligatoriamente',
        crtEspeciales:'El campo no puede contener caracteres especiales'
      },
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
      tutores_legales: [],
      datos:{
        lugar_nacimiento:'',
        procedencia:'',
        grupo_instruccion:'',
        estado_civil:'',
        domicilio:'',
        ocupacion:'',
        grupo_sanguineo:'',
        tutores_legales:[]
      },
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

  created () {
    this.initialize()
  },
  computed:{
    formTitle () {
      return this.editedIndex === -1 ? 'Registre un tutor legal' : 'Edite un tutor legal'
    },
    error_lugar_nacimiento() {
      const errors = [];
      if (!this.$v.datos.lugar_nacimiento.$dirty) return errors;
      !this.$v.datos.lugar_nacimiento.required &&
        errors.push(this.textoErrores.requerido);
      !this.$v.datos.lugar_nacimiento.esParrafo &&
        errors.push(this.textoErrores.crtEspeciales);
      return errors;
    },
    error_procedencia() {
      const errors = [];
      if (!this.$v.datos.procedencia.$dirty) return errors;
      !this.$v.datos.procedencia.required &&
        errors.push(this.textoErrores.requerido);
      !this.$v.datos.procedencia.esParrafo &&
        errors.push(this.textoErrores.crtEspeciales);
      return errors;
    },
    error_grupo_instruccion() {
      const errors = [];
      if (!this.$v.datos.grupo_instruccion.$dirty) return errors;
      !this.$v.datos.grupo_instruccion.required &&
        errors.push(this.textoErrores.requerido);
      !this.$v.datos.grupo_instruccion.esParrafo &&
        errors.push(this.textoErrores.crtEspeciales);
      return errors;
    },
    error_estado_civil() {
      const errors = [];
      if (!this.$v.datos.estado_civil.$dirty) return errors;
      !this.$v.datos.estado_civil.required &&
        errors.push(this.textoErrores.requerido);
      return errors;
    },
    error_domicilio() {
      const errors = [];
      if (!this.$v.datos.domicilio.$dirty) return errors;
      !this.$v.datos.domicilio.required &&
        errors.push(this.textoErrores.requerido);
      !this.$v.datos.domicilio.esParrafo &&
        errors.push(this.textoErrores.crtEspeciales);
      return errors;
    },
    error_grupo_sanguineo() {
      const errors = [];
      if (!this.$v.datos.grupo_sanguineo.$dirty) return errors;
      !this.$v.datos.grupo_sanguineo.required &&
        errors.push(this.textoErrores.requerido);
      return errors;
    },
    error_ocupacion() {
      const errors = [];
      if (!this.$v.datos.domicilio.$dirty) return errors;
      !this.$v.datos.domicilio.required &&
        errors.push(this.textoErrores.requerido);
      !this.$v.datos.domicilio.esParrafo &&
        errors.push(this.textoErrores.crtEspeciales);
      return errors;
    },

  },
  methods: {
    initialize () {
      this.datos.tutores_legales = [
        {
          parentesco: 'Frozen Yogurt',
          nombres: 159,
          apellidos: 6.0,
        },
        {
          parentesco: 'Ice cream sandwich',
          nombres: 237,
          apellidos: 9.0,
        },
        {
          parentesco: 'Eclair',
          nombres: 262,
          apellidos: 16.0,
        },
      ]
    },
    cerrarDialogo() {
      //this.$v.datos.$reset();
      this.step = 1;
      //this.datos = this.limpiarResidente();
      this.$emit("emit-close-dialog");
    },
    
    deleteItem (item) {
      this.editedIndex = this.datos.tutores_legales.indexOf(item)
      this.editedItem = Object.assign({}, item)
      this.dialogDelete = true
    },

    editItem (item) {
      this.editedIndex = this.datos.tutores_legales.indexOf(item)
      this.editedItem = Object.assign({}, item)
      this.dialog = true
    },

    deleteItemConfirm () {
      this.datos.tutores_legales.splice(this.editedIndex, 1)
      this.closeDelete()
    },
    close(){
      this.dialog = false
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem)
        this.editedIndex = -1
      })
    },
    closeDelete () {
      this.dialogDelete = false
      this.$nextTick(() => {
        this.editedIndex = -1
      })
    },
    save () {
      if (this.editedIndex > -1) {
        
        Object.assign(this.datos.tutores_legales[this.editedIndex], this.editedItem)
      } else {
        this.datos.tutores_legales.push(this.editedItem)
      }
      this.close()
    },

  },
  validations(){
    return{
      datos:{
        lugar_nacimiento:{
          required,
          esParrafo
        },
        procedencia:{
          required,
          esParrafo
        },
        grupo_instruccion:{
          required,
          esParrafo
        },
        estado_civil:{
          required,
        },
        domicilio:{
          required,
          esParrafo
        },
        grupo_sanguineo:{
          required,
        },
        ocupacion:{
          required,
          esParrafo
        },
        
      },
    }
  }
}
//jum pruebita aaaaaaaaaaaa
//background-color: rgba(0,0,0,0.7);
</script>

<style scoped>
.borde-fino{
    border-color: rgba(0, 0, 0, 0.42) !important;
    border-top-color: rgba(0, 0, 0, 0.42) !important;
    border-right-color: rgba(0, 0, 0, 0.42) !important;
    border-bottom-color: rgba(0, 0, 0, 0.42) !important;
    border-left-color: rgba(0, 0, 0, 0.42) !important;
    border-style: solid !important;
    border-top-style: solid !important;
    border-right-style: solid !important;
    border-bottom-style: solid !important;
    border-left-style: solid  !important;
    border-width: thin 0 thin 0 !important;
    border-top-width: thin  !important;
    border-right-width: thin !important;
    border-bottom-width: thin !important;
    border-left-width: thin !important;
}

.boton-izquierda{
  float: left  !important;
  margin-left: 0px !important;
}

.boton-derecha{
  float: right !important;
  margin-right: 0px !important;
}
</style>
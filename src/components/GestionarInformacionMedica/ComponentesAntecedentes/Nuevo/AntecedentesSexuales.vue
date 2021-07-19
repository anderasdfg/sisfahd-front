<template>
  <div>
    <v-expansion-panels style="max-width: 820px;"  v-model="panel" >
      <v-expansion-panel>
        <v-expansion-panel-header>

          <span class="header-expansion-panel-im">Actividad Sexuales</span>
          <template v-slot:actions>
            <v-icon color="primary">
              $expand
            </v-icon>
          </template>
        </v-expansion-panel-header>
        <v-expansion-panel-content>
          <v-card-title class="div-expansion-preguntas">
            <div class="numero-modulo texto-pregunta-im">¿Ha tenido relaciones sexuales?</div>
            <v-spacer></v-spacer>
            <v-radio-group
              style="margin-top:0px;"
              v-model="sexuales.inicio_actividad_sexual.estado"
              row
            >
              <v-radio
                style="margin-left:16px;"
                label="Si"
                v-bind:value="true"
              ></v-radio>
              <v-radio
                style="margin-left:16px"
                label="No"
                v-bind:value="false"
              ></v-radio>
            </v-radio-group>
          </v-card-title>
          <v-expand-transition>
            <div v-show="expandInicioActivSexual" style="max-width: 450px">
              <div style="padding:20px 20px 0px 20px">
                <div class="numero-modulo">¿A que edad empezó con la actividad sexual?</div>
                <v-text-field
                  outlined
                  v-model.trim="sexuales.inicio_actividad_sexual.edad"
                  label="Ingrese su edad de inicio de actividad sexual"
                  @input="$v.sexuales.inicio_actividad_sexual.edad.$touch()"
                  @blur="$v.sexuales.inicio_actividad_sexual.edad.$touch()"
                  :error-messages="error_edad"
                ></v-text-field>
                <div class="numero-modulo">¿Cuantas parejas sexuales ha tenido?</div>
                <v-text-field
                  outlined
                  v-model.trim="sexuales.parejas_sexuales"
                  label="Ingrese el numero de parejas sexuales"
                  @input="$v.sexuales.parejas_sexuales.$touch()"
                  @blur="$v.sexuales.parejas_sexuales.$touch()"
                  :error-messages="error_cuenta"
                ></v-text-field>
              </div>
            </div>
          </v-expand-transition>
        </v-expansion-panel-content>
      </v-expansion-panel>

      <v-expansion-panel>
        <v-expansion-panel-header>
          <span class="header-expansion-panel-im">Métodos Anticonceptivos</span>
          <template v-slot:actions>
            <v-icon color="primary">
              $expand
            </v-icon>
          </template>
        </v-expansion-panel-header>
        <v-expansion-panel-content>
          <v-card-title class="div-expansion-preguntas">
            <div class="numero-modulo  texto-pregunta-im">¿Utiliza o ha utilizado algun método anticonceptivo?</div>
            <v-spacer></v-spacer>
            <v-radio-group
              style="margin-top:0px;"
              v-model="sexuales.uso_metodos_anticonceptivos.uso_metodos"
              row
            >
              <v-radio
                style="margin-left:16px;"
                label="Si"
                v-bind:value="true"
              ></v-radio>
              <v-radio
                style="margin-left:16px"
                label="No"
                v-bind:value="false"
              ></v-radio>
            </v-radio-group>

          </v-card-title>
          <v-expand-transition>
            <div v-show="expandMetodosAnticonceptivos" class="div-expansion">
              <div class="numero-modulo" style="padding-bottom:0px !important">¿Cuáles ha utilizado?</div>
              <v-sheet 
                class="mx-auto"
                max-width="700"
                style="margin-top:20px"
              >
                <v-slide-group
                  v-model="model"
                  show-arrows
                  
                >
                  <v-slide-item
                    v-for="(item, index) in sexuales.uso_metodos_anticonceptivos.metodos" 
                    :key="item.codigo" 
                    v-slot="{ active, toggle }"
                    style="margin-right:8px;margin-bottom:8px;"
                  >
                    <div
                      @click="EditarMetodo(index)"
                    >
                      <v-btn
                        :input-value="active"
                        color="#F0F0F0"
                        active-class="blue white--text"
                        depressed
                        rounded
                        @click="toggle"
                      >{{ item.nombre }}
                      </v-btn>
                    </div>
                  </v-slide-item>
                </v-slide-group>

              </v-sheet>
              <v-expand-transition>
                <div v-show="expandEditarMetodo" class="div-expansion contenedor-info">
                  <div style="padding:20px;">
                  <v-row>
                    <v-col cols="6">
                      <v-dialog
                        ref="dialog1"
                        v-model="menu1"
                        :return-value.sync="info_metodo_edit.fecha_inicio"
                        persistent
                        width="290px"
                      >
                        <template v-slot:activator="{ on, attrs }">
                          <v-text-field
                            outlined
                            v-model="info_metodo_edit.fecha_inicio"
                            label="Fecha de inicio de uso"
                            readonly
                            class="autocomplete-search"
                            v-bind="attrs"
                            v-on="on"
                            @input="$v.info_metodo_edit.fecha_inicio.$touch()"
                            @blur="$v.info_metodo_edit.fecha_inicio.$touch()"
                            :error-messages="error_fecha_inicio_edit"
                          ></v-text-field>
                        </template>
                        <v-date-picker locale="es-es" v-model="info_metodo_edit.fecha_inicio" scrollable>
                          <v-spacer></v-spacer>
                          <v-btn text color="primary" @click="$refs.dialog1.save(info_metodo_edit.fecha_inicio)">
                            OK
                          </v-btn>
                        </v-date-picker>
                      </v-dialog>
                    </v-col>
                    <v-col cols="6">
                      <v-dialog
                        ref="dialog2"
                        v-model="menu2"
                        :return-value.sync="info_metodo_edit.fecha_fin"
                        persistent
                        width="290px"
                      >
                        <template v-slot:activator="{ on, attrs }">
                          <v-text-field
                            outlined
                            v-model="info_metodo_edit.fecha_fin"
                            label="Fecha de fin de uso"
                            readonly
                            class="autocomplete-search"
                            v-bind="attrs"
                            v-on="on"
                            @input="$v.info_metodo_edit.fecha_fin.$touch()"
                            @blur="$v.info_metodo_edit.fecha_fin.$touch()"
                            :error-messages="error_fecha_fin_edit"
                          ></v-text-field>
                        </template>
                        <v-date-picker locale="es-es" v-model="info_metodo_edit.fecha_fin" scrollable>
                          <v-spacer></v-spacer>
                          <v-btn text color="primary" @click="$refs.dialog2.save(info_metodo_edit.fecha_fin)">
                            OK
                          </v-btn>
                        </v-date-picker>
                      </v-dialog>
                    </v-col>
                  </v-row>
                  <div class="numero-modulo">* Presione <span class="boton-observaciones-im" @click="dialogObservaciones_edit=true">aquí</span> si desea agregar o modificar alguna observación</div>
                  <v-btn
                    color="#4172F2"
                    style="margin-bottom:10px"
                    dark
                    @click="GuardarEdicionMetodo()"
                  >
                    Guardar
                  </v-btn>
                  <v-btn
                    color="#4172F2"
                    style="margin-bottom:10px; margin-left:5px"
                    dark
                    @click="EliminarMetodo()"
                  >
                    Eliminar
                  </v-btn>
                  <v-btn
                    color="#4172F2"
                    style="margin-bottom:10px; margin-left:5px"
                    dark
                    @click="CerrarEdicionMetodo()"
                  >
                    Cerrar
                  </v-btn>
                  <v-dialog v-model="dialogObservaciones_edit" max-width="55%">
                    <v-card>
                      <v-card-title>Observaciones</v-card-title>
                      <v-card-text>
                        <TablaObservaciones
                          :lista_observaciones="info_metodo_edit.observaciones"
                        ></TablaObservaciones>
                        <br>
                        <v-btn
                          dark
                          color="#4172F2"
                          style="margin-bottom:10px"
                          @click="dialogObservaciones_edit=false"
                        >
                          Cerrar
                        </v-btn>
                      </v-card-text>
                    </v-card>
                  </v-dialog> 
                  </div>
                  
                </div>
              </v-expand-transition>
              <v-expand-transition>   
                <v-card v-show="expandTablaMetodos"> 
                  <v-card-title>
                    <v-text-field
                      v-model="search"
                      append-icon="mdi-magnify"
                      label="Buscar método anticonceptivo"
                      single-line
                      hide-details
                    ></v-text-field>
                  </v-card-title>
                  <v-data-table
                    :items-per-page="itemsPerPage"
                    :page.sync="page"
                    hide-default-footer
                    :search="search"
                    @page-count="pageCount = $event"
                    v-model="selected"
                    item-key="codigo"
                    class="elevation-1"
                    :headers="headers"
                    :items="listaMetodosAnticonceptivos"
                    :single-select="true"
                    show-select
                    loading-text="Cargando... Por favor, espere"
                  >
                    <template v-slot:no-data>
                      <p>No se encontraron resultados</p>
                    </template>
                  </v-data-table>
                  <div class="text-center pt-2">
                    <v-pagination
                      v-model="page"
                      :length="pageCount"
                    ></v-pagination>
                  </div>
                </v-card>     
              </v-expand-transition>             
            </div>
          </v-expand-transition>
          <v-expand-transition>
            <div v-show="expandInfoMetodo" class="div-expansion contenedor-info">
              <div style="padding:20px;">
              <v-row>
                <v-col cols="6">
                  <v-dialog
                    ref="dialog3"
                    v-model="menu3"
                    :return-value.sync="info_metodo.fecha_inicio"
                    persistent
                    width="290px"
                  >
                    <template v-slot:activator="{ on, attrs }">
                      <v-text-field
                        outlined
                        v-model="info_metodo.fecha_inicio"
                        label="Fecha de inicio de uso"
                        readonly
                        class="autocomplete-search"
                        v-bind="attrs"
                        v-on="on"
                        @input="$v.info_metodo.fecha_inicio.$touch()"
                        @blur="$v.info_metodo.fecha_inicio.$touch()"
                        :error-messages="error_fecha_inicio"
                      ></v-text-field>
                    </template>
                    <v-date-picker locale="es-es" v-model="info_metodo.fecha_inicio" scrollable>
                      <v-spacer></v-spacer>
                      <v-btn text color="primary" @click="$refs.dialog3.save(info_metodo.fecha_inicio)">
                        OK
                      </v-btn>
                    </v-date-picker>
                  </v-dialog>
                </v-col>
                <v-col cols="6">
                  <v-dialog
                    ref="dialog4"
                    v-model="menu4"
                    :return-value.sync="info_metodo.fecha_fin"
                    persistent
                    width="290px"
                  >
                    <template v-slot:activator="{ on, attrs }">
                      <v-text-field
                        outlined
                        v-model="info_metodo.fecha_fin"
                        label="Fecha de fin de uso"
                        readonly
                        class="autocomplete-search"
                        v-bind="attrs"
                        v-on="on"
                        @input="$v.info_metodo.fecha_fin.$touch()"
                        @blur="$v.info_metodo.fecha_fin.$touch()"
                        :error-messages="error_fecha_fin"
                      ></v-text-field>
                    </template>
                    <v-date-picker locale="es-es" v-model="info_metodo.fecha_fin" scrollable>
                      <v-spacer></v-spacer>
                      <v-btn text color="primary" @click="$refs.dialog4.save(info_metodo.fecha_fin)">
                        OK
                      </v-btn>
                    </v-date-picker>
                  </v-dialog>
                </v-col>
              </v-row>
              <div class="numero-modulo">* Presione <span class="boton-observaciones-im" @click="dialogObservaciones=true">aquí</span> si desea agregar alguna observación</div>
              <v-btn
                color="#4172F2"
                style="margin-bottom:10px"
                dark
                @click="GuardarMetodo()"
              >
                Guardar
              </v-btn>
              <v-dialog v-model="dialogObservaciones" max-width="55%">
                <v-card>
                  <v-card-title>Observaciones</v-card-title>
                  <v-card-text>
                    <TablaObservaciones
                      :lista_observaciones="info_metodo.observaciones"
                    ></TablaObservaciones>
                    <br>
                    <v-btn
                      dark
                      color="#4172F2"
                      style="margin-bottom:10px"
                      @click="dialogObservaciones=false"
                    >
                      Cerrar
                    </v-btn>
                  </v-card-text>
                </v-card>
              </v-dialog> 
              </div>
              
            </div>
          </v-expand-transition>
        </v-expansion-panel-content>
      </v-expansion-panel>
    </v-expansion-panels>
    <br>
    <v-snackbar
      v-model="snackbar"
      color="#4172F2"
    >
      {{ textoSnackBar }}

      <template v-slot:action="{ attrs }">
        <v-btn
          color="white"
          text
          v-bind="attrs"
          @click="snackbar = false"
        >
          Cerrar
        </v-btn>
      </template>
    </v-snackbar>
    <v-btn dark color="#4172F2" @click="GuardarTodaInfo()">Guardar Informacion</v-btn>
    <v-btn style="margin-left:16px" text color="#4172F2" @click="CambiarSeccion(false)">Retroceder</v-btn>
  </div>
</template>

<script>
import Vuelidate from "vuelidate";
import axios from "axios";
//import vue2Dropzone from "vue2-dropzone";
//import "vue2-dropzone/dist/vue2Dropzone.min.css";
//import { mapMutations, mapState } from "vuex";
import { required,between } from "vuelidate/lib/validators";
//Para una sola palabra o frase
function esTexto(value) {
  return /^[A-Za-z\sáéíóúÁÉÍÓÚñÑ]+$/.test(value); 
}
//Para oraciones o parrafos
function esParrafo(value) {
  return /^[A-Za-z\d\s.,;°"“()áéíóúÁÉÍÓÚñÑ]+$/.test(value); 
}
import TablaObservaciones from "@/components/GestionarInformacionMedica/ComponentesAntecedentes/Nuevo/Tablas/TablaObservaciones"
export default {
  name: 'AntecedentesSexuales',
  props:['sexuales'],
  components:{
    TablaObservaciones
  },
  data(){
    return{
      panel:0,
      textoSnackBar:'Debe llenar toda la informacion necesaria para continuar',
      snackbar:false,
      expandInicioActivSexual:false,
      expandMetodosAnticonceptivos:false,
      expandEditarMetodo:false,
      expandInfoEnfermedad:false,
      dialogObservaciones:false,
      dialogObservaciones_edit:false,
      expandInfoMetodo:false,
      expandTablaMetodos:true,
      model:null,
      menu1:false,
      menu2:false,
      menu3:false,
      menu4:false,
      index:null,
      page: 1,
      pageCount: 0,
      itemsPerPage:5,
      search:'',
      selected:[],
      info_metodo_edit:{
        codigo:'',
        nombre:'',
        fecha_inicio:null,
        fecha_fin:null,
        observaciones:[]
      },
      info_metodo:{
        codigo:'',
        nombre:'',
        fecha_inicio:null,
        fecha_fin:null,
        observaciones:[]
      },
      headers:[
        {
          text: 'Nombre',
          align: 'start',
          sortable: false,
          value: 'nombre',
        }
      ],
      listaMetodosAnticonceptivos:[
        {
          codigo:'001',
          nombre:'Preservativo'
        },
        {
          codigo:'002',
          nombre:'Diafragma'
        },
        {
          codigo:'003',
          nombre:'Inyectable'
        },
        {
          codigo:'004',
          nombre:'Parches'
        },
        {
          codigo:'005',
          nombre:'Esponja anticonceptiva'
        },
        {
          codigo:'006',
          nombre:'Capuchón cervical'
        }
      ],
      textoErrores:{
        requerido: 'Debe llenar el campo obligatoriamente',
        crtEspeciales:'El campo no puede contener caracteres especiales'
      },
    }
  },
  created(){
    if(this.sexuales.inicio_actividad_sexual.estado){
      this.expandInicioActivSexual = true;
    }
    if(this.sexuales.uso_metodos_anticonceptivos.uso_metodos){
      this.expandMetodosAnticonceptivos = true;
    }
  },
  methods:{
    CambiarSeccion(valor) {
      this.expandInfoMetodo=false;
      this.selected=[];
      this.search="";
      this.limpiarInfoMetodo();
      this.LimpiarEdicionMetodo();
      this.$emit("emit-cambiar-seccion",valor);
    },
    GuardarTodaInfo(){
      this.$emit("emit-guardar-todo");
    },
    limpiarInfoMetodo(){
      var vacio = {
        codigo:'',
        nombre:'',
        fecha_inicio:null,
        fecha_fin:null,
        observaciones:[]
      };
      this.info_metodo = vacio;
    },
    GuardarMetodo(){
      this.sexuales.uso_metodos_anticonceptivos.metodos.push(this.info_metodo);
      this.limpiarInfoMetodo();
      this.expandInfoMetodo=false;
      var i = this.listaMetodosAnticonceptivos.indexOf( this.selected[0] );
      this.listaMetodosAnticonceptivos.splice( i, 1 );
      this.selected=[];
      this.search="";
    },
    GuardarEdicionMetodo(){
      this.sexuales.uso_metodos_anticonceptivos.metodos[this.index] = this.info_metodo_edit;
      this.LimpiarEdicionMetodo();
      this.expandTablaMetodos=true;
      this.model = null;
    },
    EliminarMetodo(){
      var metodo_temp = {
        codigo:this.info_metodo_edit.codigo,
        nombre:this.info_metodo_edit.nombre,
      }
      this.listaMetodosAnticonceptivos.push(metodo_temp);
      this.sexuales.uso_metodos_anticonceptivos.metodos.splice(this.index,1);
      this.LimpiarEdicionMetodo();
      this.expandTablaMetodos=true;
      this.model = null;
    },
    CerrarEdicionMetodo(){
      this.LimpiarEdicionMetodo();
      this.expandTablaMetodos=true;
      this.model = null;
    },
    LimpiarEdicionMetodo(){
      var vacio = {
        codigo:'',
        nombre:'',
        fecha_inicio:null,
        fecha_fin:null,
        observaciones:[]
      };
      this.info_metodo_edit = vacio;
      this.expandEditarMetodo=false;
    },
    EditarMetodo(index){
      this.model = index;
      this.expandEditarMetodo=true;
      this.expandTablaMetodos=false;
      this.expandInfoMetodo=false;
      this.selected=[];
      this.search="";
      this.limpiarInfoMetodo();
      this.index=index;
      this.info_metodo_edit.codigo = this.sexuales.uso_metodos_anticonceptivos.metodos[index].codigo;
      this.info_metodo_edit.nombre = this.sexuales.uso_metodos_anticonceptivos.metodos[index].nombre;
      this.info_metodo_edit.fecha_inicio = this.sexuales.uso_metodos_anticonceptivos.metodos[index].fecha_inicio;
      this.info_metodo_edit.fecha_fin = this.sexuales.uso_metodos_anticonceptivos.metodos[index].fecha_fin;
      this.info_metodo_edit.observaciones = this.sexuales.uso_metodos_anticonceptivos.metodos[index].observaciones;

    },
  },
  computed:{
    codigo() {
      return this.selected.map(selec => selec.codigo)
    },
    
    error_edad() {
      const errors = [];
      if (!this.$v.sexuales.inicio_actividad_sexual.edad.$dirty) return errors;
      !this.$v.sexuales.inicio_actividad_sexual.edad.between &&
        errors.push("Ingrese una edad correcta");
      !this.$v.sexuales.inicio_actividad_sexual.edad.between &&
        errors.push("Ingrese una edad correcta");
      return errors;
    },
    error_cuenta() {
      const errors = [];
      if (!this.$v.sexuales.parejas_sexuales.$dirty) return errors;
      !this.$v.sexuales.parejas_sexuales.between &&
        errors.push("Ingrese un número adecuado");
      !this.$v.sexuales.parejas_sexuales.between &&
        errors.push("Ingrese un número adecuado");
      return errors;
    },
    error_fecha_inicio() {
      const errors = [];
      if (!this.$v.info_metodo.fecha_inicio.$dirty) return errors;
      !this.$v.info_metodo.fecha_inicio.required &&
        errors.push(this.textoErrores.requerido);
      var dateselected = new Date(this.info_metodo.fecha_inicio);
      var fecha_fin = new Date(this.info_metodo.fecha_fin);
      var maxdate = new Date();
      !(dateselected.getTime() < maxdate.getTime() || dateselected.getTime() < fecha_fin.getTime()) &&
        errors.push("La fecha no debe ser mayor a la actual");
      return errors;
    },
    error_fecha_fin() {
      const errors = [];
      if (!this.$v.info_metodo.fecha_fin.$dirty) return errors;
      !this.$v.info_metodo.fecha_fin.required &&
        errors.push(this.textoErrores.requerido);
      var dateselected = new Date(this.info_metodo.fecha_fin);
      var fecha_inicio = new Date(this.info_metodo.fecha_inicio);
      var mindate = new Date();
      !(dateselected.getTime() < mindate.getTime() && dateselected.getTime() > fecha_inicio.getTime()) &&
        errors.push("La fecha no debe ser mayor a la actual");
      return errors;
    },
    error_fecha_inicio_edit() {
      const errors = [];
      if (!this.$v.info_metodo_edit.fecha_inicio.$dirty) return errors;
      !this.$v.info_metodo_edit.fecha_inicio.required &&
        errors.push(this.textoErrores.requerido);
      var dateselected = new Date(this.info_metodo_edit.fecha_inicio);
      var fecha_fin = new Date(this.info_metodo_edit.fecha_fin);
      var maxdate = new Date();
      !(dateselected.getTime() < maxdate.getTime() || dateselected.getTime() < fecha_fin.getTime()) &&
        errors.push("La fecha no debe ser mayor a la actual");
      return errors;
    },
    error_fecha_fin_edit() {
      const errors = [];
      if (!this.$v.info_metodo_edit.fecha_fin.$dirty) return errors;
      !this.$v.info_metodo_edit.fecha_fin.required &&
        errors.push(this.textoErrores.requerido);
      var dateselected = new Date(this.info_metodo_edit.fecha_fin);
      var fecha_inicio = new Date(this.info_metodo_edit.fecha_inicio);
      var mindate = new Date();
      !(dateselected.getTime() < mindate.getTime() && dateselected.getTime() > fecha_inicio.getTime()) &&
        errors.push("La fecha no debe ser mayor a la actual");
      return errors;
    },
  },
  watch:{
    'sexuales.inicio_actividad_sexual.estado': function (newVal){
      if(newVal){
        this.expandInicioActivSexual = true
      }else{
        this.expandInicioActivSexual = false
      }
    },
    'sexuales.uso_metodos_anticonceptivos.uso_metodos': function (newVal){
      if(newVal){
        this.expandMetodosAnticonceptivos = true
      }else{
        this.expandMetodosAnticonceptivos = false;
        this.limpiarInfoMetodo();
        this.selected = [];
        this.sexuales.uso_metodos_anticonceptivos.metodos=[];
      }
    },
    codigo(newVal){
      if(newVal==""){
        this.expandInfoMetodo=false;
        this.limpiarInfoMetodo();
      }else{
        this.expandInfoMetodo=true;
        this.info_metodo.nombre = this.selected[0].nombre;
        this.info_metodo.codigo = this.selected[0].codigo;
      }
    }
  },
  validations(){

    const esFechaInicio = (value)=>{
      var dateselected = new Date(this.info_metodo.fecha_inicio);
      var fecha_fin = new Date(this.info_metodo.fecha_fin);
      var maxdate = new Date();
      return (dateselected.getTime() < maxdate.getTime() || dateselected.getTime() < fecha_fin.getTime()) 
    };
    const esFechaFin = (value)=>{
      var dateselected = new Date(this.info_metodo.fecha_fin);
      var fecha_inicio = new Date(this.info_metodo.fecha_inicio);
      var mindate = new Date();
      return (dateselected.getTime() < mindate.getTime() && dateselected.getTime() > fecha_inicio.getTime()) 
    };
    const esFechaInicio_edit = (value)=>{
      var dateselected = new Date(this.info_metodo_edit.fecha_inicio);
      var fecha_fin = new Date(this.info_metodo_edit.fecha_fin);
      var maxdate = new Date();
      return (dateselected.getTime() < maxdate.getTime() || dateselected.getTime() < fecha_fin.getTime()) 
    };
    const esFechaFin_edit = (value)=>{
      var dateselected = new Date(this.info_metodo_edit.fecha_fin);
      var fecha_inicio = new Date(this.info_metodo_edit.fecha_inicio);
      var mindate = new Date();
      return (dateselected.getTime() < mindate.getTime() && dateselected.getTime() > fecha_inicio.getTime())
    };
    return{
      sexuales:{
        inicio_actividad_sexual:{
          edad:{
            between: between(0, 150)
          }
        },
        parejas_sexuales:{
          between: between(0, 500)
        }
      },
      info_metodo_edit:{
        fecha_inicio:{
          required,
          esFechaInicio_edit
        },
        fecha_fin:{
          required,
          esFechaFin_edit
        }
      },
      info_metodo:{
        fecha_inicio:{
          required,
          esFechaInicio
        },
        fecha_fin:{
          required,
          esFechaFin
        }
      }
    }
  }
}
</script>

<style scoped>
.mx-2{
  color: white !important;
}
.coloractivo{
  background-color: #4172F2;
}
</style>
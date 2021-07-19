<template>
  <div class="container-im-user">
    <form style="margin-top: 15px">
      <v-card-title class="div-expansion-preguntas">
        <div class="numero-modulo texto-pregunta-im">¿Algún familiar suyo sufre alguna enfermedad cronica?</div>
        <v-spacer></v-spacer>
        <v-radio-group
          style="margin-top:0px;"
          v-model="familiares.existencia"
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
        <div v-show="expand" class="div-expansion">
          <div class="numero-modulo texto-pregunta-im" style="padding-bottom:0px">¿Que enfermedad/es sufren?</div>
          <v-sheet
            v-if="familiares.enfermedades.length>0"
            class="mx-auto"
            style="margin-top:20px"
            max-width="700"
          >
            <v-slide-group
              v-model="model"
              show-arrows
            >
              <v-slide-item
                v-for="(item,index) in familiares.enfermedades" 
                :key="item.codigo"
                v-slot="{ active, toggle }"  
                style="margin-right:8px;margin-bottom:8px;"
                
              >
                <div
                  @click="EditarEnfermedad(index)"
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
            <div v-show="expandEditarEnfermedad" class="div-expansion contenedor-info">
              <div style="padding:20px;">
                <v-row>
                <v-col cols="8">
                  <v-select
                    outlined
                    :items="selectSituacion"
                    label="Situación de la enfermedad"
                    v-model="info_enfermedad_edit.situacion" 
                    @input="$v.info_enfermedad_edit.situacion.$touch()"
                    @blur="$v.info_enfermedad_edit.situacion.$touch()"
                    :error-messages="error_situacion_edit" 
                  ></v-select>
                </v-col>
                <v-col cols="4">
                  <v-dialog
                    ref="dialog2"
                    v-model="menu2"
                    :return-value.sync="info_enfermedad_edit.fecha_inicio"
                    persistent
                    width="290px"
                  >
                    <template v-slot:activator="{ on, attrs }">
                      <v-text-field
                        outlined
                        v-model="info_enfermedad_edit.fecha_inicio"
                        label="Fecha de inicio"
                        readonly
                        class="autocomplete-search"
                        v-bind="attrs"
                        v-on="on"
                        @input="$v.info_enfermedad_edit.fecha_inicio.$touch()"
                        @blur="$v.info_enfermedad_edit.fecha_inicio.$touch()"
                        :error-messages="error_fecha_inicio_edit"
                      ></v-text-field>
                    </template>
                    <v-date-picker locale="es-es" v-model="info_enfermedad_edit.fecha_inicio" scrollable>
                      <v-spacer></v-spacer>
                      <v-btn text color="primary" @click="$refs.dialog2.save(info_enfermedad_edit.fecha_inicio)">
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
                @click="GuardarEdicionEnfermedad()"
              >
                Guardar
              </v-btn>
              <v-btn
                color="#4172F2"
                style="margin-bottom:10px; margin-left:5px"
                dark
                @click="EliminarEnfermedad()"
              >
                Eliminar
              </v-btn>
              <v-btn
                color="#4172F2"
                style="margin-bottom:10px; margin-left:5px"
                dark
                @click="CerrarEdicionEnfermedad()"
              >
                Cerrar
              </v-btn>
              <v-dialog v-model="dialogObservaciones_edit" max-width="55%">
                <v-card>
                  <v-card-title>Observaciones</v-card-title>
                  <v-card-text>
                    <TablaObservaciones
                      :lista_observaciones="info_enfermedad_edit.observaciones"
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
            <v-card v-show="expandTablaEnfermedades">
              <v-card-title>
                <v-text-field
                  v-model="search"
                  append-icon="mdi-magnify"
                  label="Buscar enfermedad"
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
                item-key="codigo_cie"
                class="elevation-1"
                :headers="headers"
                :items="listaEnfermedades"
                :single-select="true"
                show-select
                :loading="loading"
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
        <div v-show="expandInfoEnfermedad" class="div-expansion contenedor-info">
          <div style="padding:20px;">
            <v-row>
              <v-col cols="8">
                <v-select
                  outlined
                  :items="selectSituacion"
                  label="Situación de la enfermedad"
                  v-model="info_enfermedad.situacion" 
                  @input="$v.info_enfermedad.situacion.$touch()"
                  @blur="$v.info_enfermedad.situacion.$touch()"
                  :error-messages="error_situacion_info"  
                ></v-select>
              </v-col>
              <v-col cols="4">
                <v-dialog
                  ref="dialog"
                  v-model="menu"
                  :return-value.sync="info_enfermedad.fecha_inicio"
                  persistent
                  width="290px"
                >
                  <template v-slot:activator="{ on, attrs }">
                    <v-text-field
                      outlined
                      v-model="info_enfermedad.fecha_inicio"
                      label="Fecha de inicio"
                      readonly
                      class="autocomplete-search"
                      v-bind="attrs"
                      v-on="on"
                      @input="$v.info_enfermedad.fecha_inicio.$touch()"
                      @blur="$v.info_enfermedad.fecha_inicio.$touch()"
                      :error-messages="error_fecha_inicio_info"
                    ></v-text-field>
                  </template>
                  <v-date-picker locale="es-es" v-model="info_enfermedad.fecha_inicio" scrollable>
                    <v-spacer></v-spacer>
                    <v-btn text color="primary" @click="$refs.dialog.save(info_enfermedad.fecha_inicio)">
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
              @click="GuardarEnfermedad()"
            >
              Guardar
            </v-btn>
            <v-dialog v-model="dialogObservaciones" max-width="55%">
              <v-card>
                <v-card-title>Observaciones</v-card-title>
                <v-card-text>
                  <TablaObservaciones
                    :lista_observaciones="info_enfermedad.observaciones"
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
      <div style="margin-top: 16px">
        <v-btn dark color="#4172F2" @click="CambiarSeccion(true)">Continuar</v-btn>
        <v-btn style="margin-left:16px" text color="#4172F2" @click="CambiarSeccion(false)">Retroceder</v-btn>
      </div>
    </form>
  </div>
</template>

<script>
import Vuelidate from "vuelidate";
import axios from "axios";
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
import TablaObservaciones from "@/components/GestionarInformacionMedica/ComponentesAntecedentes/Nuevo/Tablas/TablaObservaciones"
export default {
  name: 'AntecedentesFamiliares',
  props:['familiares'],
  components:{
    TablaObservaciones
  },
  data(){
    return{
      textoSnackBar:'Debe llenar toda la informacion necesaria para continuar',
      snackbar:false,
      index:null,
      model:null,
      page: 1,
      pageCount: 0,
      itemsPerPage:5,
      dialogObservaciones:false,
      dialogObservaciones_edit:false,
      expandInfoEnfermedad:false,
      expandEditarEnfermedad:false,
      expandTablaEnfermedades:true,
      menu:false,
      menu2:false,
      expand: false,
      loading:false,
      selectSituacion:[
        { value: "controlado", text: 'Controlado'},
        { value: "no controlado", text: 'No Controlado'},
      ],
      search:'',
      selected:[],
      info_enfermedad_edit:{
        codigo:'',
        nombre:'',
        situacion:'',
        fecha_inicio:null,
        observaciones:[]
      },
      info_enfermedad:{
        codigo:'',
        nombre:'',
        situacion:'',
        fecha_inicio:null,
        observaciones:[]
      },
      headers:[
        {
          text: 'Nombre',
          align: 'start',
          sortable: false,
          value: 'descripcion',
        }
      ],
      listaEnfermedades:[],
      textoErrores:{
        requerido: 'Debe llenar el campo obligatoriamente',
        crtEspeciales:'El campo no puede contener caracteres especiales'
      },
      //Dentro del campo "antecedentes"
      //lista_tutores_legales:[],
      
    }
  },
  created(){
    if(this.familiares.existencia){
      this.expand = true
    }else{
      this.Buscar();
    }
  },
  watch:{
    'familiares.existencia': function (newVal){
      if(newVal){
        this.expand = true
        this.Buscar()
      }else{
        this.expand = false
        this.limpiarInfoEnfermedad();
        this.selected = [];
        this.familiares.enfermedades=[];
      }
    },
    codigo_cie(newVal){
      if(newVal==""){
        this.expandInfoEnfermedad=false;
        this.limpiarInfoEnfermedad();
      }else{
        this.expandInfoEnfermedad=true;
        this.info_enfermedad.nombre = this.selected[0].descripcion;
        this.info_enfermedad.codigo = this.selected[0].codigo_cie;
      }
    }

  },
  methods:{
    CambiarSeccion(valor) {
      this.expandInfoEnfermedad=false;
      this.selected=[];
      this.search="";
      this.limpiarInfoEnfermedad();
      this.LimpiarEdicionEnfermedad();
      this.$emit("emit-cambiar-seccion",valor);
    },
    limpiarInfoEnfermedad(){
      var vacio = {
        codigo:'',
        nombre:'',
        situacion:'',
        fecha_inicio:null,
        observaciones:[]
      };
      this.info_enfermedad = vacio;
    },
    GuardarEnfermedad(){
      this.$v.info_enfermedad.$touch();
      if(!this.$v.info_enfermedad.$invalid){
        this.familiares.enfermedades.push(this.info_enfermedad);
        this.limpiarInfoEnfermedad();
        this.expandInfoEnfermedad=false;
        var i = this.listaEnfermedades.indexOf( this.selected[0] );
        this.listaEnfermedades.splice( i, 1 );
        this.selected=[];
        this.search="";
      }else{
        this.snackbar=true;
      }
    },
    GuardarEdicionEnfermedad(){
      this.$v.info_enfermedad_edit.$touch();
      if(!this.$v.info_enfermedad_edit.$invalid){
        this.familiares.enfermedades[this.index] = this.info_enfermedad_edit;
        this.LimpiarEdicionEnfermedad();
        this.expandTablaEnfermedades=true;
        this.model = null;
      }else{
        this.snackbar=true;
      }
    },
    EliminarEnfermedad(){
      var enfermedad_temp = {
        codigo_cie:this.info_enfermedad_edit.codigo,
        descripcion:this.info_enfermedad_edit.nombre,
        id:""
      }
      this.listaEnfermedades.push(enfermedad_temp);
      this.familiares.enfermedades.splice(this.index,1);
      this.LimpiarEdicionEnfermedad();
      this.expandTablaEnfermedades=true;
      this.model = null;
    },
    CerrarEdicionEnfermedad(){
      this.LimpiarEdicionEnfermedad();
      this.expandTablaEnfermedades=true;
      this.model = null;
    },
    LimpiarEdicionEnfermedad(){
      var vacio = {
        codigo:'',
        nombre:'',
        situacion:'',
        fecha_inicio:null,
        observaciones:[]
      };
      this.info_enfermedad_edit = vacio;
      this.expandEditarEnfermedad=false;
    },
    EditarEnfermedad(index){
      this.model = index;
      this.expandEditarEnfermedad=true;
      this.expandTablaEnfermedades=false;
      this.expandInfoEnfermedad=false;
      this.selected=[];
      this.search="";
      this.limpiarInfoEnfermedad();
      this.index=index;
      this.info_enfermedad_edit.codigo = this.familiares.enfermedades[index].codigo;
      this.info_enfermedad_edit.nombre = this.familiares.enfermedades[index].nombre;
      this.info_enfermedad_edit.situacion = this.familiares.enfermedades[index].situacion;
      this.info_enfermedad_edit.fecha_inicio = this.familiares.enfermedades[index].fecha_inicio;
      this.info_enfermedad_edit.observaciones = this.familiares.enfermedades[index].observaciones;

    },
    async Buscar(){
      this.listaEnfermedades=[];
      this.loading=true;
      var busqueda = this.search
      var cie;
      var descripcion;

      if(this.tipoFiltro=="codigo"){
        cie = busqueda;
      }else{
        descripcion = busqueda;
      }
      await axios
        .get("/enfermedades/filter",cie,descripcion)
        .then((res) => {
          var info = res.data;
          if(info.length>0){
            this.listaEnfermedades = info;
          }
          this.loading = false;
          // console.log("Residentes:");
          // console.log(info);
        })
        .catch((err) => console.log(err));
    }
  },
  computed:{
    codigo_cie() {
      return this.selected.map(selec => selec.codigo_cie)
    },
    error_situacion_info() {
      const errors = [];
      if (!this.$v.info_enfermedad.situacion.$dirty) return errors;
      !this.$v.info_enfermedad.situacion.required &&
        errors.push(this.textoErrores.requerido);
      return errors;
    },
    error_situacion_edit() {
      const errors = [];
      if (!this.$v.info_enfermedad_edit.situacion.$dirty) return errors;
      !this.$v.info_enfermedad_edit.situacion.required &&
        errors.push(this.textoErrores.requerido);
      return errors;
    },
    error_fecha_inicio_info() {
      const errors = [];
      if (!this.$v.info_enfermedad.fecha_inicio.$dirty) return errors;
      !this.$v.info_enfermedad.fecha_inicio.required &&
        errors.push(this.textoErrores.requerido);
      var dateselected = new Date(this.info_enfermedad.fecha_inicio);
      var maxdate = new Date();
      !(dateselected.getTime() < maxdate.getTime()) &&
        errors.push("La fecha no debe ser mayor a la actual");

      return errors;
    },
    error_fecha_inicio_edit() {
      const errors = [];
      if (!this.$v.info_enfermedad_edit.fecha_inicio.$dirty) return errors;
      !this.$v.info_enfermedad_edit.fecha_inicio.required &&
        errors.push(this.textoErrores.requerido);
      var dateselected = new Date(this.info_enfermedad_edit.fecha_inicio);
      var maxdate = new Date();
      !(dateselected.getTime() < maxdate.getTime()) &&
        errors.push("La fecha no debe ser mayor a la actual");

      return errors;
    },
  },
  validations(){
    const validacionfecha_info = (value)=>{
      var dateselected = new Date(this.info_enfermedad.fecha_inicio);
      var maxdate = new Date();
      return (dateselected.getTime() < maxdate.getTime()) 
    };
    const validacionfecha_edit = (value)=>{
      var dateselected = new Date(this.info_enfermedad_edit.fecha_inicio);
      var maxdate = new Date();
      return (dateselected.getTime() < maxdate.getTime()) 
    };
    return{
      info_enfermedad:{
        situacion:{
          required
        },
        fecha_inicio:{
          required,
          validacionfecha_info
        }
      },
      info_enfermedad_edit:{
        situacion:{
          required
        },
        fecha_inicio:{
          required,
          validacionfecha_edit
        }
      },
    }
  }
}
</script>

<style>

</style>
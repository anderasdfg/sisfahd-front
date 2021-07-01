<template>
  <div class="container-user">
    <form style="margin-top: 15px">
      <v-radio-group
        style="margin-top:0px;"
        v-model="personales.existencia"
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
      <v-row>
        <v-col>
          <v-expand-transition>
            <div v-show="expand" class="div-expansion">
              <div v-for="(item,index) in personales.enfermedades" :key="item.codigo"  style="margin-right:8px;margin-bottom:8px;">
                <v-chip
                  @click="EditarEnfermedad(index)"
                >
                  <strong>{{ item.nombre }}</strong>
                </v-chip>
              </div>
              <v-row>
                <v-col>
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
                                label="Fecha de cita"
                                readonly
                                class="autocomplete-search"
                                v-bind="attrs"
                                v-on="on"
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
                      <v-btn
                        color="#4172F2"
                        style="margin-bottom:10px"
                        outlined
                        @click="dialogObservaciones_edit=true"
                      >
                        Modificar Observaciones
                      </v-btn>
                      <br>
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
                </v-col>
              </v-row>


              <v-card-title>
                <v-select
                  hide-details
                  :items="filtroBusqueda"
                  label="Filtrar por:"
                  v-model="tipoFiltro" 
                  style="max-width:150px; margin-right:20px"
                ></v-select>
                <v-text-field
                  hide-details
                  v-model="search"
                  label="Buscar enfermedades"
                  clearable
                  style="max-width: 250px;margin-right:20px"
                ></v-text-field>
                <v-btn    
                  dark
                  class="mx-2"
                  fab
                  small
                  color="#4172F2"
                  @click="Buscar()"
                >
                  <v-icon dark>
                    mdi-magnify
                  </v-icon>
                </v-btn>
              </v-card-title>              
              <v-card>
                <v-data-table
                  :items-per-page="itemsPerPage"
                  :page.sync="page"
                  hide-default-footer
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
            </div>
          </v-expand-transition>
        </v-col>
      </v-row>
      <v-row>
        <v-col>
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
                        label="Fecha de cita"
                        readonly
                        class="autocomplete-search"
                        v-bind="attrs"
                        v-on="on"
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
              <v-btn
                color="#4172F2"
                style="margin-bottom:10px"
                outlined
                @click="dialogObservaciones=true"
              >
                Observaciones (opcional).
              </v-btn>
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
        </v-col>
      </v-row>
      <div style="margin-top: 16px">
        <v-btn dark color="#4172F2" @click="CambiarSeccion(true)">Continuar</v-btn>
        <v-btn text color="#4172F2" @click="CambiarSeccion(false)">Retroceder</v-btn>
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
  name: 'AntecedentesPersonales',
  props:['personales'],
  components:{
    TablaObservaciones
  },
  data(){
    return{
      page: 1,
      pageCount: 0,
      itemsPerPage:5,
      dialogObservaciones:false,
      dialogObservaciones_edit:false,
      expandInfoEnfermedad:false,
      expandEditarEnfermedad:false,
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
      filtroBusqueda:[
        { value: "cie", text: 'Codigo'},
        { value: "descripcion", text: 'Nombre'},
      ],
      tipoFiltro:'descripcion',
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
  watch:{
    'personales.existencia': function (newVal){
      if(newVal){
        this.expand = true
      }else{
        this.expand = false
        this.limpiarInfoEnfermedad();
        this.selected = [];
        this.personales.enfermedades=[];
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
      this.personales.enfermedades.push(this.info_enfermedad);
      this.limpiarInfoEnfermedad();
      this.expandInfoEnfermedad=false;
      this.selected=[];
      this.search="";
      this.listaEnfermedades=[];
    },
    GuardarEdicionEnfermedad(){
      this.personales.enfermedades[this.index] = this.info_enfermedad_edit;
      this.LimpiarEdicionEnfermedad();
    },
    EliminarEnfermedad(){
      this.personales.enfermedades.splice(this.index,1);
      this.LimpiarEdicionEnfermedad();
    },
    CerrarEdicionEnfermedad(){
      this.LimpiarEdicionEnfermedad();
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
      this.expandEditarEnfermedad=true;
      this.index=index;
      this.info_enfermedad_edit.codigo = this.personales.enfermedades[index].codigo;
      this.info_enfermedad_edit.nombre = this.personales.enfermedades[index].nombre;
      this.info_enfermedad_edit.situacion = this.personales.enfermedades[index].situacion;
      this.info_enfermedad_edit.fecha_inicio = this.personales.enfermedades[index].fecha_inicio;
      this.info_enfermedad_edit.observaciones = this.personales.enfermedades[index].observaciones;

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
    }
  },
  validations(){
    return{
      personales:{
        nombre:{
          required,
          esParrafo
        },
      },
    }
  }
}
</script>

<style>
.contenedor-info{
  border-radius: 5px;
  border-style: solid;
  border-width: 1px;
}
</style>
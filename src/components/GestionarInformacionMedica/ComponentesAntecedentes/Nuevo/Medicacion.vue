<template>
  <div class="container-user">
    <form style="margin-top: 15px">
      <v-radio-group
        style="margin-top:0px;"
        v-model="medicacion.existencia"
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
              <div v-for="(item,index) in medicacion.medicamentos" :key="item.codigo"  style="margin-right:8px;margin-bottom:8px;">
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
                        <v-btn
                          color="#4172F2"
                          style="margin-bottom:10px;margin-right:5px"
                          outlined
                          @click="dialogObservaciones_edit=true"
                        >
                          Modificar Observaciones
                        </v-btn>
                        <v-btn
                          color="#4172F2"
                          style="margin-bottom:10px; margin-left:5px"
                          dark
                          @click="EliminarMedicamento()"
                        >
                          Eliminar
                        </v-btn>
                        <v-btn
                          color="#4172F2"
                          style="margin-bottom:10px; margin-left:5px"
                          dark
                          @click="CerrarEdicionMedicamento()"
                        >
                          Cerrar
                        </v-btn>
                        
                        <v-dialog v-model="dialogObservaciones_edit" max-width="55%">
                          <v-card>
                            <v-card-title>Observaciones</v-card-title>
                            <v-card-text>
                              <TablaObservaciones
                                :lista_observaciones="info_medicamento_edit.observaciones"
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
                  label="Buscar medicamentos"
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
                  item-key="codigo"
                  class="elevation-1"
                  :headers="headers"
                  :items="listaMedicamentos"
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
                  style="margin-bottom:10px; margin-left:10px"
                  dark
                  @click="GuardarMedicamento()"
                >
                  Guardar
                </v-btn>
                <v-dialog v-model="dialogObservaciones" max-width="55%">
                  <v-card>
                    <v-card-title>Observaciones</v-card-title>
                    <v-card-text>
                      <TablaObservaciones
                        :lista_observaciones="info_medicamento.observaciones"
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
  props:['medicacion'],
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
        { value: "codigo", text: 'Codigo'},
        { value: "nombre", text: 'Nombre'},
      ],
      tipoFiltro:'nombre',
      info_medicamento_edit:{
        observaciones:[]
      },
      info_medicamento:{
        codigo:'',
        nombre:'',
        concentracion:'',
        formula_farmaceutica_simplificada:null,
        observaciones:[]
      },
      headers:[
        {
          text: 'Nombre',
          sortable: false,
          value: 'nombre',
        },
        {
          text: 'Concentracion',
          sortable: false,
          value: 'concentracion',
        },
        {
          text: 'Formula',
          sortable: false,
          value: 'formula_farmaceutica_simplificada',
        },

      ],
      listaMedicamentos:[],
      textoErrores:{
        requerido: 'Debe llenar el campo obligatoriamente',
        crtEspeciales:'El campo no puede contener caracteres especiales'
      },
      //Dentro del campo "antecedentes"
      //lista_tutores_legales:[],
      
    }
  },
  watch:{
    'medicacion.existencia': function (newVal){
      if(newVal){
        this.expand = true
      }else{
        this.expand = false
        this.limpiarInfoMedicamento();
        this.selected = [];
        this.medicacion.medicamentos=[];
      }
    },
    codigo(newVal){
      if(newVal==""){
        this.expandInfoEnfermedad=false;
        this.limpiarInfoMedicamento();
      }else{
        this.expandInfoEnfermedad=true;
        this.info_medicamento.nombre = this.selected[0].nombre;
        this.info_medicamento.codigo = this.selected[0].codigo;
        this.info_medicamento.concentracion = this.selected[0].concentracion;
        this.info_medicamento.formula_farmaceutica_simplificada = this.selected[0].formula_farmaceutica_simplificada;
      }
    }

  },
  methods:{
    CambiarSeccion(valor) {
      this.limpiarInfoMedicamento();
      this.LimpiarEdicionMedicamento();
      this.$emit("emit-cambiar-seccion",valor);
    },
    limpiarInfoMedicamento(){
      var vacio = {
        codigo:'',
        nombre:'',
        concentracion:'',
        formula_farmaceutica_simplificada:null,
        observaciones:[]
      };
      this.info_medicamento = vacio;
    },
    GuardarMedicamento(){
      this.medicacion.medicamentos.push(this.info_medicamento);
      this.limpiarInfoMedicamento();
      this.expandInfoEnfermedad=false;
      this.selected=[];
      this.search="";
      this.listaMedicamentos=[];
    },
    EliminarMedicamento(){
      this.medicacion.medicamentos.splice(this.index,1);
      this.LimpiarEdicionMedicamento();
    },
    CerrarEdicionMedicamento(){
      this.LimpiarEdicionMedicamento();
    },
    LimpiarEdicionMedicamento(){
      var vacio = {
        observaciones:[]
      };
      this.info_medicamento_edit = vacio;
      this.expandEditarEnfermedad=false;
    },
    EditarEnfermedad(index){
      this.expandEditarEnfermedad=true;
      this.index=index;
      this.info_medicamento_edit.observaciones = this.medicacion.medicamentos[index].observaciones;

    },
    async Buscar(){
      this.listaMedicamentos=[];
      this.loading=true;
      var busqueda = this.search
      var codigo;
      var nombre;
      var concentracion="";

      if(this.tipoFiltro=="codigo"){
        codigo = busqueda;
      }else{
        nombre = busqueda;
      }
      await axios
        .get("/medicamento/filter",codigo,nombre,concentracion)
        .then((res) => {
          var info = res.data;
          if(info.length>0){
            this.listaMedicamentos = info;
          }
          this.loading = false;
          // console.log("Residentes:");
          // console.log(info);
        })
        .catch((err) => console.log(err));
    }
  },
  computed:{
    codigo() {
      return this.selected.map(selec => selec.codigo)
    }
  },
  validations(){
    return{
      medicacion:{
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
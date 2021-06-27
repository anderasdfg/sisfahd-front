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
              <v-card>
                <v-card-title>
                  Enfermedades
                  <v-spacer></v-spacer>
                  <v-text-field
                    v-model="search"
                    append-icon="mdi-magnify"
                    label="Buscar"
                    single-line
                    hide-details
                  ></v-text-field>
                </v-card-title>
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
                  :search="search"
                  :single-select="false"
                  show-select
                  :loading="!enfermedadesObtenidas"
                  loading-text="Cargando... Por favor, espere"
                ></v-data-table>
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
      <div style="margin-top: 16px">
        <v-btn dark color="#4172F2" @click="CambiarSeccion(true)">Continuar</v-btn>
        <v-btn text color="#4172F2" @click="CambiarSeccion(false)">Retroceder</v-btn>
      </div>
    </form>
  </div>
</template>

<script>
import Vuelidate from "vuelidate";
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
  name: 'AntecedentesPersonales',
  props:['personales'],
  data(){
    return{
      page: 1,
      pageCount: 0,
      itemsPerPage:5,
      expand: false,
      enfermedadesObtenidas:true,
      search:'',
      selected:[],
      headers:[
        {
          text: 'Nombre',
          align: 'start',
          sortable: false,
          value: 'descripcion',
        }
      ],
      listaEnfermedades:[
        {
          codigo_cie:"A199",
          descripcion:"TUBERCULOSIS MILIAR, SIN OTRA ESPECIFICACION"
        },
        {
          codigo_cie:"A202",
          descripcion:"PESTE NEUMONICA"
        },
        {
          codigo_cie:"A506",
          descripcion:"SIFILIS CONGENITA TARDIA, LATENTE"
        },
        {
          codigo_cie: "A523",
          descripcion: "NEUROSIFILIS NO ESPECIFICADA"
        },
        {
          codigo_cie: "A549",
          descripcion: "INFECCION GONOCOCICA, NO ESPECIFICADA"
        },
        {
          codigo_cie: "A58",
          descripcion: "GRANULOMA INGUINAL"
        },
        {
          codigo_cie: "A601",
          descripcion: "INFECCION DE LA PIEL PERIANAL Y RECTO POR VIRUS DEL HERPES SIMPLE"
        }
      ],

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
      }
    }
  },
  methods:{
    CambiarSeccion(valor) {
      this.$emit("emit-cambiar-seccion",valor);
    },
  },
  computed:{

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

</style>
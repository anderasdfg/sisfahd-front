<template>
  <v-card>
    <v-card-title class="mb-3">Consulta de Exámen Auxiliar</v-card-title>
    <v-stepper non-linear>
    <v-stepper-header>
      <v-stepper-step
        editable
        step="1"
      >
        Informacion General
      </v-stepper-step>
      <v-divider></v-divider>
      <v-stepper-step
        editable
        step="2"
      >
        Resultados
      </v-stepper-step>
      <v-divider></v-divider>
    </v-stepper-header>
    <v-stepper-items>
      <v-stepper-content step="1">        
        <v-card class="mx-5 my-2" elevation="0">
          <v-card-text>
            <v-text-field
              label="Examen Auxiliar"
              required
              v-model="infoExamenAuxiliar.nombre"
              readonly
            ></v-text-field>
            <div v-if="infoExamenAuxiliar.observaciones.length>0">
              <v-card-text class="pl-0 color-text-obs-examaux">Observaciones</v-card-text>
              <ul>
                <div
                  style="margin-top:5px"
                  v-for="(value, index) in infoExamenAuxiliar.observaciones" :key="index"
                  readonly
                ><li>{{value}}</li></div>        
              </ul>
            </div>
          </v-card-text>
          <v-card-actions class="px-5 py-5">
            <v-spacer></v-spacer>
            <v-btn
              color="blue darken-1"
              text
              @click="closeDialog()"
            >
              Cerrar
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-stepper-content>
      <v-stepper-content step="2">
        <v-card class="mx-5 my-2" elevation="0">
          <v-card-text>
            <v-text-field
              label="Estado de Resultados"
              required
              v-model="infoExamenAuxiliar.estado"
              readonly
            ></v-text-field>
            <div v-if="infoExamenAuxiliar.estado=='subido'">
              <v-card-text class="pl-0 color-text-obs-examaux">Archivos anexos</v-card-text>
              <ul>
                <div v-for="(value, index) in infoExamenAuxiliar.resultado" :key="index">
                  <li>
                    <a :href="value.url" target="_blank"
                    >
                      <span>{{value.titulo}}.pdf</span>
                    </a>
                  </li>
                </div>
              </ul>
            </div>

          </v-card-text>
          <v-card-actions class="px-5 py-5">
            <v-spacer></v-spacer>
            <v-btn
              color="blue darken-1"
              text
              @click="closeDialog()"
            >
              Cerrar
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-stepper-content>
    </v-stepper-items>
  </v-stepper>
  </v-card>
</template>

<script>
import axios from "axios";
import vue2Dropzone from "vue2-dropzone";
import "vue2-dropzone/dist/vue2Dropzone.min.css";
export default {
  props:[
    "infoExamenAuxiliar"
  ],
  components: {
    vueDropzone: vue2Dropzone
  },
  data () {
    return {
      step: 1,
      search:null,
      listExamAuxFromDB:[],
      archivos:[],
      fileList: [],
      dropzoneOptions: {
        url: "https://httpbin.org/post",
        thumbnailWidth: 250,
        maxFilesize: 3.0,
        maxFiles: 10,
        acceptedFiles: ".pdf",
        headers: { "My-Awesome-Header": "header value" },
        addRemoveLinks: true,
        uploadMultiple: true
      },
      examenAuxiliar:{
        id:'',
        descripcion:'',
        precio:''
      }

    }
  },
  methods:{
    closeDialog(){
      this.$emit("emit-close-dialog");
    }
  }


}
</script>

<style>

.dropzone-custom-content {
  margin-left: 20px;
  margin-right: 20px;
  text-align: center;
}
.dropzone-custom-title {
  margin-top: 0;
  color: #4172F2;
}
.color-text-obs-examaux{
  color: #4172F2;
  font-weight:700;
}
.subtitle {
  color: #314b5f;
}
</style>
<template>
  <div>
    <v-card class="mx-5 my-2" elevation="0">
      <v-card-title class="mb-5">
        <span class="text-h5">Consulta de Resultados</span>
      </v-card-title>
      <v-card-text>
        <v-text-field
          label="Examen Auxiliar"
          required
          v-model="infoExamenAuxiliar.nombre"
          readonly
        ></v-text-field>
        <v-text-field
          label="Tipo de Examen Auxiliar"
          required
          v-model="infoExamenAuxiliar.tipo"
          readonly
        ></v-text-field>

        <v-card-text class="pl-0 color-text-obs-examaux">Observaciones</v-card-text>
        <div
          style="margin-top:5px"
          v-for="(value, index) in infoExamenAuxiliar.observaciones" :key="index"
          readonly
        ><span>* {{value}}</span></div>        
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
  </div>
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
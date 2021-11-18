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
          v-model="infoResultExamenAuxiliar.nombre"
          readonly
        ></v-text-field>
        <v-text-field
          label="Tipo de Examen Auxiliar"
          required
          v-model="infoResultExamenAuxiliar.tipo"
          readonly
        ></v-text-field>
        <v-textarea
          label="Observaciones"
          v-model="infoResultExamenAuxiliar.observaciones"
          readonly
        ></v-textarea>        
      </v-card-text>
        <v-card
          color="#FAFAFA"
          style="margin-top:5px"
          height="60"
          v-for="(item, index) in infoResultExamenAuxiliar.documento_anexo"
          :key="index"
        >
          <v-row style="heigh:100%" align="center">
            <v-col :cols="8">
              <article>
                <img
                  style="width:7% "
                  src="https://cdn-icons-png.flaticon.com/512/482/482216.png"
                  alt="imagen documento"
                />
                <span style="font-size:18px">
                  {{ item.titulo }}</span
                >
              </article>
            </v-col>
            <v-col :cols="4" align="center">
              <template>
                <v-btn
                  class="mx-2"
                  small
                  dark
                  color="primary"
                  @click="verAnexo(index)"
                >
                 <v-icon dark left>
                  mdi-eye-settings
                </v-icon>
                <span>Visualizar pdf</span>
                </v-btn>
              </template>
            </v-col>
          </v-row>
        </v-card>

        <v-dialog
          v-model="dialogVistaPreviaAnexos"
          persistent
          max-width="600px"
        >
          <v-card align="center">
            <v-card-title>
              <span class="headline">Vista previa</span>
            </v-card-title>
            <v-card-text>
              <iframe
              :src= pdf
              width=100% height=600></iframe>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn
                color="blue darken-1"
                text
                @click="cerrarVistaPreviaAnexo()"
              >
                Cerrar
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>

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
    "infoResultExamenAuxiliar"
  ],
  components: {
    vueDropzone: vue2Dropzone
  },
  data () {
    return {
      dialogVistaPreviaAnexos:false,
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
      },
      pdf : "",

    }
  },
  methods:{
    closeDialog(){
      this.$emit("emit-close-dialog");
    },
     verAnexo(index) {
      this.pdf = this.infoResultExamenAuxiliar.documento_anexo[index].url;
      console.log(this.pdf);
      this.dialogVistaPreviaAnexos = true;
    },
     cerrarVistaPreviaAnexo() {
      this.dialogVistaPreviaAnexos = false;
    },
   
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

.subtitle {
  color: #314b5f;
}
</style>
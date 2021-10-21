<template>
  <div>
    <v-card class="mx-5 my-2" elevation="0">
      <v-card-title class="mb-5">
        <span class="text-h5">Agrega un nuevo resultado</span>
      </v-card-title>
      <v-card-text>
        <v-autocomplete
          :items="listExamAuxFromDB"
          :loading="isLoading"
          :search-input.sync="search"
          clearable
          hide-details
          hide-selected
          item-value="symbol"
          item-text="name"
          label="Exámen Auxiliar*"
          v-model="examenAuxiliar"
          return-object
        >
          <template v-slot:no-data>
            <v-list-item>
              <v-list-item-title>
                Busca el <strong>Examen Auxiliar</strong> al que deseas subir el resultado.
              </v-list-item-title>
            </v-list-item>
          </template>
          <template v-slot:selection="{ item }">
            <span v-text="item.name"></span>
          </template>
          <template v-slot:item="{ item }">
            <v-list-item-content>
              <v-list-item-title v-text="item.name"></v-list-item-title>
            </v-list-item-content>
          </template>
        </v-autocomplete>
        <v-text-field
          label="Indique el tipo de examen auxiliar*"
          required
          v-model="resultadosObj.tipo"
        ></v-text-field>

        <v-textarea
          label="Indique una observación (No es obligatorio)"
          v-model="resultadosObj.observaciones"
        ></v-textarea>

        <vue-dropzone 
          ref="myVueDropzone"
          @vdropzone-success="afterSuccess"
          @vdropzone-removed-file="afterRemoved"
          id="dropzone"
          :options="dropzoneOptions"
          :useCustomSlot=true 
        >
          <div class="dropzone-custom-content">
            <h3 class="dropzone-custom-title">Arrastra los documentos que deseas adjuntar</h3>
            <div class="subtitle">...o haz click para seleccionar un archivo desde su computadora</div>
          </div>
        </vue-dropzone>
        <small>*Indica los campos requeridos</small>
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
        <v-btn
          color="blue darken-1"
          dark
          @click="closeDialog()"
        >
          Guardar
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
  components: {
    vueDropzone: vue2Dropzone
  },
  data () {
    return {
      isLoading: false,
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
        name:'',
        symbol:''
      },
      resultadosObj:{
        nombre:'',
        tipo:'',
        observaciones:'',
        codigo:'',
        documento_anexo:[]
      }

    }
  },
  watch:{
    search (val) {
        // Items have already been loaded
        if (this.listExamAuxFromDB.length > 0) return

        this.isLoading = true

        // Lazily load input items
        fetch('https://api.coingecko.com/api/v3/coins/list')
          .then(res => res.clone().json())
          .then(res => {
            this.listExamAuxFromDB = res
          })
          .catch(err => {
            console.log(err)
          })
          .finally(() => (this.isLoading = false))
      },
  },
  methods:{
    afterSuccess(file, response) {
      this.fileList.push(file);
      console.log(this.fileList.length)
    },
    afterRemoved(file, error, xhr) {
      this.fileList.forEach(function(car, index, object) {
        if (car === file) {
          object.splice(index, 1);
        }
      });
      console.log(this.fileList.length)
    },
    async sendPDFFiles() {
      let listaTitulos = [];
      let listaanexos = this.fileList;
      for (let index = 0; index < this.fileList.length; index++) {
        let formData = new FormData();
        listaTitulos.push(this.fileList[index].name);
        formData.append("file", this.fileList[index]);
        await axios
          .post("/Media/archivos/pdf", formData)
          .then((res) => {
            listaanexos[index] = res.data;
          })
          .catch((err) => console.log(err));
      }
      for (let index = 0; index < this.fileList.length; index++) {
        this.resultadosObj.documento_anexo.push({
          url: listaanexos[index],
          titulo: listaTitulos[index],
        });
      }
      console.log(this.resultadosObj.documento_anexo);
    },
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

.subtitle {
  color: #314b5f;
}
</style>
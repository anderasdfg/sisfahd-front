<template>
  <div>
    <v-card class="mx-5 my-2" elevation="0">
      <v-card-title class="mb-5">
        <span class="text-h5">Agrega un nuevo resultado</span>
      </v-card-title>
      <v-card-text> 
        <div v-if="resultadoObjToAgregar">
          <v-text-field
            label="Examen Auxiliar"
            required
            v-model="resultadoObjToAgregar.nombre"
            readonly
          ></v-text-field>
          <v-text-field
            label="Tipo de Examen Auxiliar"
            required
            v-model="resultadoObjToAgregar.tipo"
            readonly
          ></v-text-field>
        </div>
        <div v-else>
          <v-autocomplete
            :items="listExamAuxFromDB"
            :loading="isLoading"
            :search-input.sync="search"
            clearable
            hide-details
            hide-selected
            item-value="id"
            item-text="descripcion"
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
              <span v-text="item.descripcion"></span>
            </template>
            <template v-slot:item="{ item }">
              <v-list-item-content>
                <v-list-item-title v-text="item.descripcion"></v-list-item-title>
              </v-list-item-content>
            </template>
          </v-autocomplete>
          <v-text-field
            label="Indique el tipo de examen auxiliar*"
            required
            v-model="resultadosObj.tipo"
          ></v-text-field>
        </div>
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
          @click="RegistrarResultado()"
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
  props:["resultadoObjToAgregar","userId"],
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
        descripcion:'',
        precio:''
      },
      defaultExamenAuxiliar:{
        id:'',
        descripcion:'',
        precio:''
      },
      resultadosObj:{
        nombre:'',
        tipo:'',
        observaciones:'',
        codigo:'',
        documento_anexo:[]
      },
      defaultResultadosObj:{
        nombre:'',
        tipo:'',
        observaciones:'',
        codigo:'',
        documento_anexo:[]
      }

    }
  },
  watch:{
    async search (val) {
        // Items have already been loaded
        if (this.listExamAuxFromDB.length > 0) return

        this.isLoading = true

        // Lazily load input items
        await axios
          .get("/Examenes/all")
          .then((x) => {
            this.listExamAuxFromDB = x.data;
            this.isLoading = false;
            console.log(x.data);
          })
          .catch((err) => console.log(err));
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
      console.log("Filelist: ");
      console.log(this.fileList);
      for (let index = 0; index < this.fileList.length; index++) {
        let formData = new FormData();
        listaTitulos.push(this.fileList[index].name);
        formData.append("file", this.fileList[index]);
        console.log("file: ");
        console.log(formData);
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
    async RegistrarResultado(){
      //await this.sendPDFFiles();
      let resultado = {
        codigo: this.examenAuxiliar.id,
        nombre: this.examenAuxiliar.descripcion,
        observaciones: this.resultadosObj.observaciones,
        documento_anexo: this.resultadosObj.documento_anexo,
        tipo: this.resultadosObj.tipo
      };
       let id = this.userId
      console.log(id);
      
      if(this.resultadoObjToAgregar){
        resultado.codigo=this.resultadoObjToAgregar.codigo,
        resultado.nombre=this.resultadoObjToAgregar.nombre,
        resultado.tipo=this.resultadoObjToAgregar.tipo
      }
      console.log(resultado);
      //-----------------------Prueba------------------------------
      let resultadoDTO = {
        resultadoExamen:resultado,
        idusuario:id        
      };
      //-----------------------------------------------------------
     
     await axios
     .post("/ResultadoExamen/RegistrarDTO",resultadoDTO)
         .then((response) => { 
          var numDocs_val = response.data.documento_anexo.length;
           var numDocs_msg = "";
          if(numDocs_val>1){
             numDocs_msg = numDocs_val + " documentos";
           }
           else{
             numDocs_msg = numDocs_val + " documento";
           }

           let resultadoObjtToFront = {
             codigo: response.data.codigo,
             nombre: response.data.nombre,
             observaciones: response.data.observaciones,
             documento_anexo: response.data.documento_anexo,
             numDocs_val: numDocs_val,
             numDocs_msg: numDocs_msg,
             tipo: response.data.tipo
           };
           console.log("codigo: "+resultadoObjtToFront.codigo);
           console.log("nombre: " + resultadoObjtToFront.nombre);
           console.log("observaciones: " + resultadoObjtToFront.observaciones);
           console.log("documento_anexo: " + resultadoObjtToFront.documento_anexo);
           console.log("numDocs_val: " + resultadoObjtToFront.numDocs_val);
           console.log("numDOcs_msg: " + resultadoObjtToFront.numDocs_msg);
           console.log("tipo: " + resultadoObjtToFront.tipo);
          //  this.addToListResultados(resultadoObjtToFront);
         })
         .catch((err) => console.log(err));
      // await axios
      //   .post("/ResultadoExamen/Registrar",{ params: { resultado, id }})
      //   .then((response) => { 
      //     var numDocs_val = response.data.documento_anexo.length;
      //     var numDocs_msg = "";
      //     if(numDocs_val>1){
      //       numDocs_msg = numDocs_val + " documentos";
      //     }
      //     else{
      //       numDocs_msg = numDocs_val + " documento";
      //     }

      //     let resultadoObjtToFront = {
      //       codigo: response.data.codigo,
      //       nombre: response.data.nombre,
      //       observaciones: response.data.observaciones,
      //       documento_anexo: response.data.documento_anexo,
      //       numDocs_val: numDocs_val,
      //       numDocs_msg: numDocs_msg,
      //       tipo: response.data.tipo
      //     };
      //     this.addToListResultados(resultadoObjtToFront);
      //   })
      //   .catch((err) => console.log(err));
        
    },
    closeDialog(){
      this.$emit("emit-close-dialog");
      this.ClearDialog();
      
    },
    ClearDialog(){
      this.fileList = [];
      this.resultadosObj.documento_anexo = [];
      this.resultadosObj = Object.assign({}, this.defaultResultadosObj);
      this.examenAuxiliar = Object.assign({}, this.defaultExamenAuxiliar);
      this.$refs.myVueDropzone.removeAllFiles()
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
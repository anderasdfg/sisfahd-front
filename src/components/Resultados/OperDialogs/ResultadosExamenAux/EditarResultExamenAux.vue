<template>
  <div>
    <v-card class="mx-5 my-2" elevation="0">
      <v-card-title class="mb-5">
        <span class="text-h5">Editar Resultados</span>
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
          label="Indique una observación (No es obligatorio)"
          v-model="infoResultExamenAuxiliar.observaciones"
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
            <v-card
                color="#FAFAFA"
                
                 
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
                      <v-col :cols="2" align="center">
                        <template>
                            <v-btn
                              fab
                              icon=""
                              x-small
                              dark
                              color="#EAEAEA"
                              @click="verAnexo(index)"
                            >
                              <img
                                style="width:10% "
                                src="https://cdn-icons-png.flaticon.com/512/709/709612.png"
                                alt="visualizar"
                              />
                            </v-btn>
                          </template>
                      </v-col>
                      <v-col :cols="2" align="right">
                        <div style="margin-right:20px">
                          <v-btn
                            fab
                            x-small
                            dark
                            color="red"
                            @click="eliminarAnexo(index)"
                          >
                            <v-icon dark>
                              mdi-minus
                            </v-icon>
                          </v-btn>
                        </div>
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
        <v-btn
          color="blue darken-1"
          dark
          @click="ModificarResultado()"
        >
          Editar
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
     verAnexo(index) {
      this.pdf = this.infoResultExamenAuxiliar.documento_anexo[index].url;
      console.log(this.pdf),
      this.dialogVistaPreviaAnexos = true;
    },
     cerrarVistaPreviaAnexo() {
      this.dialogVistaPreviaAnexos = false;
    },
    eliminarAnexo(index) {
      this.infoResultExamenAuxiliar.documento_anexo.splice(index, 1);
    },
    recharge(){
      this.$emit("emit-recargar-tablas");
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
        this.infoResultExamenAuxiliar.documento_anexo.push({
          url: listaanexos[index],
          titulo: listaTitulos[index],
        });
      }
      console.log(this.infoResultExamenAuxiliar.documento_anexo);
    },
    async   ModificarResultado(){
      await this.sendPDFFiles();
      let resultado = {
        codigo: this.infoResultExamenAuxiliar.id,
        nombre: this.infoResultExamenAuxiliar.descripcion,
        observaciones: this.infoResultExamenAuxiliar.observaciones,
        documento_anexo: this.infoResultExamenAuxiliar.documento_anexo,
        tipo: this.infoResultExamenAuxiliar.tipo
      };
       let id = this.userId
      console.log(id);
      
      if(this.infoResultExamenAuxiliar){
        resultado.codigo=this.infoResultExamenAuxiliar.codigo,
        resultado.nombre=this.infoResultExamenAuxiliar.nombre,
        resultado.tipo=this.infoResultExamenAuxiliar.tipo
      }
      console.log(resultado);
     
     
     await axios
     .put("/ResultadoExamen/Modificar",this.infoResultExamenAuxiliar)
         .then((response) => { 
           console.log(response.data);
          var numDocs_val = response.data.documento_anexo.length;
          
           var numDocs_msg = "";
          if(numDocs_val>1){
             numDocs_msg = numDocs_val + " documentos";
           }
           else{
             numDocs_msg = numDocs_val + " documento";
           }

          this.recharge();
         })
         .catch((err) => console.log(err));
      
        
    },
    closeDialog(){
        this.$refs.myVueDropzone.removeAllFiles()

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
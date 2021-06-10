<template>
  <v-card>
    <v-card-title class="justify-center">Modificar Especialidad</v-card-title>

    <div class="container-Especialidad3">
      <form>
        <v-text-field
          v-model.trim="Especialidad3.nombre"
          label="Nombre"
          outlined
          @input="$v.Especialidad3.nombre.$touch()"
          @blur="$v.Especialidad3.nombre.$touch()"
          :error-messages="errorNombre"
          color="#009900"
        ></v-text-field>
          
          <v-text-field
          v-model.trim="Especialidad3.codigo"
          label="Codigo"
          outlined
          @input="$v.Especialidad3.codigo.$touch()"
          @blur="$v.Especialidad3.codigo.$touch()"
          :error-messages="errorCodigo"
          color="#009900"
        ></v-text-field>
 <!--Para archivos :3 -->
        <!--<div>  
          <vue-dropzone
            ref="myVueDropzone"
            id="dropzone"
            @vdropzone-success="afterSuccess"
            @vdropzone-removed-file="afterRemoved"
            @vdropzone-file-added="vfileAdded"
            :options="dropzoneOptions"
          >
          </vue-dropzone>
          <v-alert type="error" v-if="!$v.anexosAux.required" class="mt-2">
            Debe subir un anexo obligatoriamente
          </v-alert>
        </div>-->

        <v-textarea
          v-model.trim="Especialidad3.descripcion"
          label="Descripcion"
          @input="$v.Especialidad3.descripcion.$touch()"
          @blur="$v.Especialidad3.descripcion.$touch()"
          height="25"
          rows="2"
          :error-messages="errorDescripcion"
          outlined
          color="#009900"
        ></v-textarea>

        

        <div>
          
        </div>
        <v-divider class="divider-custom"></v-divider>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-col cols="12" sm="6" md="6">
            <v-btn block color="success" elevation="2" @click="modificarEspecialidades">
              <v-icon left>mdi-content-save-all-outline</v-icon>
              <span>Modificar Especialidades</span>
            </v-btn>
          </v-col>
          <v-col cols="12" sm="6" md="6">
            <v-btn color="error" elevation="2" block @click="closeDialog">
              <v-icon left>mdi-close-outline</v-icon>
              Cerrar
            </v-btn>
          </v-col>
        </v-card-actions>
      </form>
    </div>
    <v-dialog width="450px" v-model="cargaRegistro" persistent>
      <v-card height="300px">
        <v-card-title class="justify-center">Modificando el anexo</v-card-title>
        <div>
          <v-progress-circular
            style="display: block; margin: 40px auto"
            :size="90"
            :width="9"
            color="purple"
            indeterminate
          ></v-progress-circular>
        </div>
        <v-card-subtitle
          class="justify-center"
          style="font-weight: bold; text-align: center"
          >En unos momentos finalizaremos...</v-card-subtitle
        >
      </v-card>
    </v-dialog>
  </v-card>
</template>

<script>
import axios from "axios";
/*import vue2Dropzone from "vue2-dropzone";
import "vue2-dropzone/dist/vue2Dropzone.min.css";*/
import { mapMutations, mapState } from "vuex";
import { required, minLength, between } from "vuelidate/lib/validators";
export default {
  props: ["Especialidad3"],
    data() {
    return {
      /*Options: {
        url: "https://httpbin.org/post",
        thumbnailWidth: 250,
        acceptedFiles: ".pdf",
        headers: { "My-Awesome-Header": "header value" },
        addropzonedRemoveLinks: true,
        dictDefaultMessage: "Seleccione el anexo respectivo o arrástrelo aquí",
      },*/
      listResidentes: [],
      areas: [
        { text: "Psicológica", value: "psicologica" },
        { text: "Social", value: "social" },
        { text: "Educativa", value: "educativa" },
      ],
      residente: {
        residente: "",
        id: "",
      },
      
      EspecialidadAux: [],
      /*searchResidente: null,*/
      loadingSearch: false,
      cargaRegistro: false
    };
  },
  
  methods: {
    ...mapMutations(["setResidentes"]),
    vfileAdded(file) {
      //console.log(file);
    },
    async modificarEspecialidades() {
      this.$v.$touch();
      if (this.$v.$invalid) {
        this.mensaje(
          "error",
          "..Oops",
          "Se encontraron errores en el formulario",
         
          false
        );
      } else {
        this.cargaRegistro = true;
        this.Especialidad3.enlaces = [];
        for (let index = 0; index < this.EspecialidadAux.length; index++) {
          if (this.EspecialidadAux[index].url !== undefined) {
            this.Especialidad3.enlaces.push({
              link: this.EspecialidadAux[index].url,
              descripcion: "Enlace " + (index + 1),
            });
            /*this.anexo.enlaces[index].link = this.anexosAux[index].url;
            this.anexo.enlaces[index].descripcion = "Enlace " + (index + 1);*/
          } else {
            let formData = new FormData();

            formData.append("file", this.EspecialidadAux[index]);

            await axios
              .post("/Media/archivos/pdf", formData)
              .then((res) => {
                this.Especialidad3.enlaces.push({
                  link: res.data,
                  descripcion: "Enlace " + (index + 1),
                });
                /*this.anexo.enlaces[index].link = res.data;
                this.anexo.enlaces[index].descripcion = "Enlace " + (index + 1);*/
              })
              .catch((err) => {
                console.error(err);
              });
          }
        }

        this.Especialidad3.idresidente = this.residente.id;

        await axios
          .put("/Anexo", this.Especialidad3)
          .then((res) => {
            this.Especialidad3 = res.data;
            if (this.Especialidad3.id !== "") {
              this.cargaRegistro = false;
              this.mensaje(
                "success",
                "Listo",
                "Anexo actualizado satisfactoriamente",
                "<strong>Se redirigiá a la Interfaz de Gestión<strong>",
                true
              );
            }
          })
          .catch((err) => console.log(err));
      }
    },
    afterSuccess(file, response) {
      this.EspecialidadAux.push(file);
    },
    afterRemoved(file, error, xhr) {
      let indexFile = this.EspecialidadAux.findIndex((document) => document == file);
      if (indexFile != -1) {
        this.EspecialidadAux.splice(indexFile, 1);
      }
    },
    mensaje(icono, titulo, texto, footer, valid) {
      this.$swal({
        icon: icono,
        title: titulo,
        text: texto,
        footer: footer,
      }).then((res) => {
        if (valid) {
          this.$emit("modifier-complete");
        }
      });
    },
    closeDialog() {
      this.$emit("close-dialog");
    },
  },
  computed: {
    ...mapState(["residentes"]),
    verifyColor() {
      return "red";
    },
    errorNombre() {
      const errors = [];
      if (!this.$v.Especialidad3.nombre.$dirty) return errors;
            !this.$v.Especialidad3.nombre.minLength &&
        errors.push("El título de anexo debe poseer al menos 4 caracteres");
      return errors;
    },
    errorCodigo() {
      const errors = [];
      if (!this.$v.Especialidad3.codigo.$dirty) return errors;
            !this.$v.Especialidad3.codigo.minLength &&
        errors.push("El título de anexo debe poseer al menos 4 caracteres");
      return errors;
    },
    errorDescripcion() {
      const errors = [];
      if (!this.$v.Especialidad3.descripcion.$dirty) return errors;
           !this.$v.Especialidad3.descripcion.minLength &&
        errors.push("La descripción debe poseer al menos 4 caracteres");
      return errors;
    },
   
   /*mounted() {
    this.$refs.myVueDropzone.removeAllFiles();
    for (let index = 0; index < this.anexo.enlaces.length; index++) {
      var file = {
        size: 250,
        name: `${this.anexo.enlaces[index].descripcion}.pdf`,
        type: "application/pdf",
        url: `${this.anexo.enlaces[index].link}`,
        accepted: true,
      };
      var url = this.anexo.enlaces[index].link;
      this.$refs.myVueDropzone.manuallyAddFile(file, url);
      this.anexosAux.push(
        this.$refs.myVueDropzone.$refs.dropzoneElement.dropzone.files[index]
      );
    }*/
    
  },
  watch: {
    searchResidente(value) {
      if (value == null) {
        this.residente = {
          residente: "",
          id: "",
        };
      }

      if (this.listResidentes.length > 0) {
        return;
      }
      if (this.loadingSearch) {
        return;
      }

      this.loadingSearch = true;

      axios
        .get("/residente/all")
        .then((res) => {
          let residentesMap = res.data.map(function (res) {
            return {
              residente: res.nombre + " " + res.apellido,
              numeroDocumento: res.numeroDocumento,
              id: res.id,
            };
          });

          this.listResidentes = residentesMap;

          this.loadingSearch = false;
        })
        .catch((error) => {
          console.error(error);
        });
    },
  },
  validations() {
    return {
      residente: {
        id: {
          required,
        },
      },
      Especialidad3: {
        descripcion: {
          required,
          minLength: minLength(7),
        },
        nombre: {
          required,
          minLength: minLength(8),
        },
        codigo: {
          required,
          minLength: minLength(6),
        },
      },
      EspecialidadAux: {
        required,
      },
    };
  },
};
</script>

<style  scoped>
.container-Especialidad3 {
  margin: 15px;
}

.subtitle {
  color: #314b5f;
}
.divider-custom {
  margin-top: 7px;
  margin-bottom: 7px;
}
.dropzone-custom-content {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  text-align: center;
}

.dropzone-custom-title {
  margin-top: 0;
  color: #00b782;
}
.inputTextField {
  border-color: green;
}
</style>